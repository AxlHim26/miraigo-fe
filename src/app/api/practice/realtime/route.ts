import Groq from "groq-sdk";

import type { AgentSettings } from "@/features/practice/types/agent";
import { buildSystemPrompt } from "@/features/practice/utils/jp-agent";
import { getGroqModel, groq } from "@/lib/groq";

export const runtime = "nodejs";

type GroqStreamSuccess = {
  ok: true;
  stream: AsyncIterable<Groq.Chat.Completions.ChatCompletionChunk>;
};

type GroqStreamFailure = {
  ok: false;
  status: number;
  error: string;
};

type GroqStreamResult = GroqStreamSuccess | GroqStreamFailure;

const computeBaseMaxTokens = (message: string) => {
  const length = message.trim().length;
  if (length <= 8) {
    return 96;
  }
  if (length <= 20) {
    return 144;
  }
  if (length <= 80) {
    return 224;
  }
  return 288;
};

const computeMaxTokens = (message: string, model: string) => {
  const base = computeBaseMaxTokens(message);
  // gpt-oss models spend many tokens in reasoning before final answer.
  // Keep a larger output budget so assistant content can still be emitted.
  if (/gpt-oss/i.test(model)) {
    return Math.max(512, base);
  }
  return base;
};

const parsePositiveInt = (value: string | undefined, fallback: number) => {
  if (!value) {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const readRetryAfterMs = (headers: Headers) => {
  const retryAfter = headers.get("retry-after");
  if (!retryAfter) {
    return null;
  }
  const retrySeconds = Number(retryAfter);
  if (Number.isFinite(retrySeconds) && retrySeconds > 0) {
    return retrySeconds * 1000;
  }
  return null;
};

const isRateLimitError = (status: number, message: string) =>
  status === 429 || /rate[_\s-]?limit|too many requests/i.test(message);

const createGroqStream = async (
  message: string,
  settings: AgentSettings,
  history: Array<{ role: "user" | "assistant"; content: string }> = [],
): Promise<GroqStreamResult> => {
  const apiKey = process.env["GROQ_API_KEY"];
  const model = getGroqModel();
  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      error: "Thiếu GROQ_API_KEY trong .env",
    };
  }

  const maxRateLimitRetries = parsePositiveInt(process.env["GROQ_RATE_LIMIT_RETRIES"], 2);
  const baseRetryDelayMs = parsePositiveInt(process.env["GROQ_RATE_LIMIT_DELAY_MS"], 1200);

  for (let attempt = 0; attempt <= maxRateLimitRetries; attempt += 1) {
    try {
      const stream = await groq().chat.completions.create({
        model,
        stream: true,
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: computeMaxTokens(message, model),
        messages: [
          { role: "system", content: buildSystemPrompt(settings) },
          ...history,
          { role: "user", content: message },
        ],
      });

      return {
        ok: true,
        stream,
      };
    } catch (error: unknown) {
      const statusCode = error instanceof Groq.APIError ? error.status : 500;
      const errorMessage = error instanceof Error ? error.message : "Không thể kết nối Groq.";
      const rateLimited = isRateLimitError(statusCode, errorMessage);

      if (rateLimited && attempt < maxRateLimitRetries) {
        const headerDelay =
          error instanceof Groq.APIError && error.headers
            ? readRetryAfterMs(new Headers(error.headers as Record<string, string>))
            : null;
        const retryDelay = headerDelay ?? baseRetryDelayMs * (attempt + 1);
        await sleep(retryDelay);
        continue;
      }

      return {
        ok: false,
        status: statusCode,
        error: `Groq (${model}): ${errorMessage}`,
      };
    }
  }

  return {
    ok: false,
    status: 429,
    error:
      "Groq đang quá tải tạm thời. Hệ thống đã tự retry nhưng vẫn chạm giới hạn. Đợi vài giây rồi gửi lại.",
  };
};

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    message: string;
    settings: AgentSettings;
    history?: Array<{ role: "user" | "assistant"; content: string }>;
  };
  const encoder = new TextEncoder();

  const groqResult = await createGroqStream(
    payload.message,
    payload.settings,
    payload.history ?? [],
  );
  if (!groqResult.ok) {
    return new Response(
      JSON.stringify({
        error: groqResult.error,
      }),
      { status: groqResult.status || 500 },
    );
  }

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of groqResult.stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(encoder.encode(`data: ${text}\n\n`));
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch {
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
