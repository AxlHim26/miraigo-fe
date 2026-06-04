import { NextResponse } from "next/server";

import { getGroqModel, groq } from "@/lib/groq";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { text?: string } | null;
  const text = body?.text?.trim() ?? "";

  if (!text) {
    return NextResponse.json({ text: "" });
  }

  if (!process.env["GROQ_API_KEY"]) {
    return NextResponse.json({ text });
  }

  const prompt = [
    "Rewrite the Japanese sentence with furigana for every kanji word.",
    "Rules:",
    "- Keep meaning and punctuation unchanged.",
    "- Output only one plain text line.",
    "- For each kanji word, use exact format: 漢字(かんじ).",
    "- Kana-only words must stay as-is.",
    `Input: ${text}`,
  ].join("\n");

  try {
    const completion = await groq().chat.completions.create({
      model: getGroqModel(),
      temperature: 0.1,
      max_tokens: 400,
      messages: [
        {
          role: "system",
          content:
            "You output only transformed Japanese text. Never output JSON or markdown. Never output extra commentary.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const converted = completion.choices?.[0]?.message?.content?.trim() ?? "";
    return NextResponse.json({ text: converted || text });
  } catch {
    return NextResponse.json({ text });
  }
}
