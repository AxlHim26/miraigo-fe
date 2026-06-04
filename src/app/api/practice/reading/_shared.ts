import { getGroqModel, groq } from "@/lib/groq";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type CompletionOptions = {
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
};

export class GroqError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GroqError";
    this.status = status;
  }
}

const stripCodeFence = (raw: string) => {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("```")) {
    return trimmed;
  }

  return trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
};

const extractStructuredBlock = (raw: string) => {
  const cleaned = stripCodeFence(raw);
  if (!cleaned) {
    return null;
  }

  try {
    JSON.parse(cleaned);
    return cleaned;
  } catch {
    // continue
  }

  const firstIndex = cleaned.search(/[[\{]/);
  if (firstIndex < 0) {
    return null;
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = firstIndex; i < cleaned.length; i += 1) {
    const char = cleaned[i] ?? "";

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "{" || char === "[") {
      depth += 1;
      continue;
    }

    if (char === "}" || char === "]") {
      depth -= 1;
      if (depth === 0) {
        const candidate = cleaned.slice(firstIndex, i + 1);
        try {
          JSON.parse(candidate);
          return candidate;
        } catch {
          return null;
        }
      }
    }
  }

  return null;
};

export const parseJsonBlock = <T>(rawContent: string): T | null => {
  const block = extractStructuredBlock(rawContent);
  if (!block) {
    return null;
  }

  try {
    return JSON.parse(block) as T;
  } catch {
    return null;
  }
};

export const requestGroqContent = async ({
  messages,
  temperature = 0.55,
  maxTokens = 1200,
}: CompletionOptions) => {
  if (!process.env["GROQ_API_KEY"]) {
    throw new GroqError("Missing GROQ_API_KEY", 500);
  }

  try {
    const completion = await groq().chat.completions.create({
      model: getGroqModel(),
      temperature,
      max_tokens: maxTokens,
      messages,
    });

    const content = completion.choices[0]?.message?.content?.trim();
    if (!content) {
      throw new GroqError("Groq returned empty content.", 502);
    }

    return content;
  } catch (error) {
    if (error instanceof GroqError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : "Groq request failed.";
    const status =
      error != null &&
      typeof error === "object" &&
      "status" in error &&
      typeof (error as Record<string, unknown>)["status"] === "number"
        ? ((error as Record<string, unknown>)["status"] as number)
        : 500;

    throw new GroqError(message, status);
  }
};
