import { NextResponse } from "next/server";

import { buildOpenRouterChatCompletionsUrl } from "@/lib/openrouter";

const OPENROUTER_API_KEY = process.env["OPENROUTER_API_KEY"];
const OPENROUTER_COMPLETIONS_URL = buildOpenRouterChatCompletionsUrl(
  process.env["OPENROUTER_BASE_URL"],
);
const OPENROUTER_MODEL = process.env["OPENROUTER_MODEL"] || "openai/gpt-oss-120b:free";

type GrammarFeedback = {
  corrected: string;
  explanation: string;
  betterSuggestion: string;
};

const fallbackResult = (text: string): GrammarFeedback => ({
  corrected: text,
  explanation: "Hiện chưa phân tích được lỗi cụ thể. Bạn thử lại sau nhé.",
  betterSuggestion: text,
});

const parseResult = (raw: string, originalText: string): GrammarFeedback | null => {
  const toResult = (parsed: Partial<GrammarFeedback>): GrammarFeedback => ({
    corrected: parsed.corrected?.trim() || originalText,
    explanation:
      parsed.explanation?.trim() || "Câu của bạn nhìn chung ổn, nhưng có thể chỉnh tự nhiên hơn.",
    betterSuggestion: parsed.betterSuggestion?.trim() || parsed.corrected?.trim() || originalText,
  });

  try {
    const parsed = JSON.parse(raw) as Partial<GrammarFeedback>;
    return toResult(parsed);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      return null;
    }
    try {
      const parsed = JSON.parse(match[0]) as Partial<GrammarFeedback>;
      return toResult(parsed);
    } catch {
      return null;
    }
  }
};

export async function POST(request: Request) {
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json({ error: "Missing OPENROUTER_API_KEY" }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as { text?: string } | null;
  const text = body?.text?.trim() ?? "";

  if (!text) {
    return NextResponse.json(fallbackResult(""));
  }

  const prompt = [
    "Bạn là giáo viên tiếng Nhật cho người Việt.",
    "Hãy kiểm tra câu tiếng Nhật của học viên và trả về đúng JSON object với 3 trường:",
    '{"corrected":"...", "explanation":"...", "betterSuggestion":"..."}',
    "Yêu cầu:",
    "- corrected: câu sửa đúng tự nhiên (tiếng Nhật)",
    "- explanation: giải thích ngắn gọn bằng tiếng Việt",
    "- betterSuggestion: gợi ý câu hay hơn, tự nhiên hơn (tiếng Nhật)",
    "- Không trả thêm markdown hay text ngoài JSON object.",
    `Câu cần kiểm tra: ${text}`,
  ].join("\n");

  const response = await fetch(OPENROUTER_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      temperature: 0.2,
      max_tokens: 280,
      messages: [
        {
          role: "system",
          content: "Bạn chỉ được trả về JSON object hợp lệ.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json(fallbackResult(text));
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = payload.choices?.[0]?.message?.content?.trim() ?? "";
  return NextResponse.json(parseResult(content, text) ?? fallbackResult(text));
}
