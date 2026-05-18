import { NextRequest, NextResponse } from "next/server";

import { createSetSchema } from "@/features/vocabulary/types/schema";

import { readDb, writeDb } from "../../_db";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, context: { params: Promise<{ setId: string }> }) {
  const params = await context.params;
  const setId = params.setId;

  const db = readDb();
  const set = db.sets.find((s) => s.id === setId);

  if (!set) {
    return NextResponse.json({ error: "Set not found" }, { status: 404 });
  }

  return NextResponse.json({ data: set });
}

export async function PUT(request: NextRequest, context: { params: Promise<{ setId: string }> }) {
  try {
    const params = await context.params;
    const setId = params.setId;
    const body = await request.json();
    const parsed = createSetSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error }, { status: 400 });
    }

    const data = parsed.data;
    const db = readDb();
    const setIndex = db.sets.findIndex((s) => s.id === setId);

    if (setIndex === -1) {
      return NextResponse.json({ error: "Set not found" }, { status: 404 });
    }

    const updatedSet = {
      ...db.sets[setIndex]!,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    db.sets[setIndex] = updatedSet;
    writeDb(db);

    return NextResponse.json({ data: updatedSet });
  } catch (error) {
    console.error("Failed to update set", error);
    return NextResponse.json({ error: "Failed to update set" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ setId: string }> },
) {
  try {
    const params = await context.params;
    const setId = params.setId;
    const db = readDb();
    const setIndex = db.sets.findIndex((s) => s.id === setId);

    if (setIndex === -1) {
      return NextResponse.json({ error: "Set not found" }, { status: 404 });
    }

    db.sets.splice(setIndex, 1);
    delete db.words[setId];
    writeDb(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete set", error);
    return NextResponse.json({ error: "Failed to delete set" }, { status: 500 });
  }
}
