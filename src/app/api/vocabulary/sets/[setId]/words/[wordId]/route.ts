import { NextRequest, NextResponse } from "next/server";

import { createWordSchema } from "@/features/vocabulary/types/schema";

import { readDb, writeDb } from "../../../../_db";

export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ setId: string; wordId: string }> },
) {
  try {
    const params = await context.params;
    const { setId, wordId } = params;
    const body = await request.json();
    const parsed = createWordSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error }, { status: 400 });
    }

    const data = parsed.data;
    const db = readDb();
    const setIndex = db.sets.findIndex((s) => s.id === setId);

    if (setIndex === -1) {
      return NextResponse.json({ error: "Set not found" }, { status: 404 });
    }

    const words = db.words[setId];
    if (!words) {
      return NextResponse.json({ error: "Word not found" }, { status: 404 });
    }

    const wordIndex = words.findIndex((w) => w.id === wordId);
    if (wordIndex === -1) {
      return NextResponse.json({ error: "Word not found" }, { status: 404 });
    }

    const updatedWord = {
      ...words[wordIndex]!,
      ...data,
    };

    db.words[setId]![wordIndex] = updatedWord;
    db.sets[setIndex]!.updatedAt = new Date().toISOString();
    writeDb(db);

    return NextResponse.json({ data: updatedWord });
  } catch (error) {
    console.error("Failed to update word", error);
    return NextResponse.json({ error: "Failed to update word" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ setId: string; wordId: string }> },
) {
  try {
    const params = await context.params;
    const { setId, wordId } = params;
    const db = readDb();
    const setIndex = db.sets.findIndex((s) => s.id === setId);

    if (setIndex === -1) {
      return NextResponse.json({ error: "Set not found" }, { status: 404 });
    }

    const words = db.words[setId];
    if (!words) {
      return NextResponse.json({ error: "Word not found" }, { status: 404 });
    }

    const wordIndex = words.findIndex((w) => w.id === wordId);
    if (wordIndex === -1) {
      return NextResponse.json({ error: "Word not found" }, { status: 404 });
    }

    db.words[setId]!.splice(wordIndex, 1);

    // Update set wordCount and updatedAt
    db.sets[setIndex]!.wordCount = db.words[setId]!.length;
    db.sets[setIndex]!.updatedAt = new Date().toISOString();

    writeDb(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete word", error);
    return NextResponse.json({ error: "Failed to delete word" }, { status: 500 });
  }
}
