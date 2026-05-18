import { NextRequest, NextResponse } from "next/server";

import { createWordSchema } from "@/features/vocabulary/types/schema";

import { readDb, writeDb } from "../../../_db";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, context: { params: Promise<{ setId: string }> }) {
  const params = await context.params;
  const setId = params.setId;

  const db = readDb();
  const words = db.words[setId] || [];

  return NextResponse.json({ data: words });
}

export async function POST(request: NextRequest, context: { params: Promise<{ setId: string }> }) {
  try {
    const params = await context.params;
    const setId = params.setId;
    const body = await request.json();
    const parsed = createWordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error }, { status: 400 });
    }

    const data = parsed.data;
    const db = readDb();
    const setIndex = db.sets.findIndex((s) => s.id === setId);

    if (setIndex === -1) {
      return NextResponse.json({ error: "Set not found" }, { status: 404 });
    }

    if (!db.words[setId]) {
      db.words[setId] = [];
    }

    const newWord = {
      id: `word-${Date.now()}`,
      japanese: data.japanese,
      reading: data.reading,
      meaning: data.meaning,
      example: data.example,
      exampleMeaning: data.exampleMeaning,
    };

    db.words[setId].push(newWord);

    // Update set wordCount and updatedAt
    db.sets[setIndex]!.wordCount = db.words[setId].length;
    db.sets[setIndex]!.updatedAt = new Date().toISOString();

    writeDb(db);

    return NextResponse.json({ data: newWord }, { status: 201 });
  } catch (error) {
    console.error("Failed to create word", error);
    return NextResponse.json({ error: "Failed to create word" }, { status: 500 });
  }
}
