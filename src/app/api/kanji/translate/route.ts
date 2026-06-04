import { NextResponse } from "next/server";

import { getGroqModel, groq } from "@/lib/groq";

export async function POST(request: Request) {
  if (!process.env["GROQ_API_KEY"]) {
    return NextResponse.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as { texts?: string[] } | null;
  const texts = body?.texts?.filter((text) => typeof text === "string" && text.trim()) ?? [];
  if (texts.length === 0) {
    return NextResponse.json({ translations: [] });
  }

  const prompt = [
    "Bạn là dịch giả. Dịch các cụm tiếng Anh/Japanese ngắn sau sang tiếng Việt tự nhiên.",
    "Trả về đúng JSON array các chuỗi tiếng Việt theo đúng thứ tự.",
    "Không thêm chú thích, không thêm ký tự thừa.",
    "Danh sách:",
    ...texts.map((text, index) => `${index + 1}. ${text}`),
  ].join("\n");

  try {
    const completion = await groq().chat.completions.create({
      model: getGroqModel(),
      messages: [
        {
          role: "system",
          content: "Bạn chỉ trả về JSON array. Không được giải thích thêm.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    const content = completion.choices[0]?.message?.content ?? "";

    try {
      const parsed = JSON.parse(content) as string[];
      return NextResponse.json({ translations: parsed });
    } catch {
      const match = content.match(/\[[\s\S]*\]/);
      if (match) {
        try {
          const parsed = JSON.parse(match[0]) as string[];
          return NextResponse.json({ translations: parsed });
        } catch {
          return NextResponse.json({ translations: [] });
        }
      }
      return NextResponse.json({ translations: [] });
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Translation failed", detail }, { status: 500 });
  }
}
