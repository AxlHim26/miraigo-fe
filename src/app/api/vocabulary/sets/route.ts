import { NextRequest, NextResponse } from "next/server";

import { createSetSchema } from "@/features/vocabulary/types/schema";

import { DbSet, readDb, writeDb } from "../_db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createSetSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error }, { status: 400 });
    }

    const data = parsed.data;
    const db = readDb();

    const newSet: DbSet = {
      id: `set-${Date.now()}`,
      title: data.title,
      wordCount: 0,
      updatedAt: new Date().toISOString(),
      isCommunity: data.isCommunity || false,
    };

    if (data.description !== undefined) newSet.description = data.description;
    if (data.level !== undefined) newSet.level = data.level;

    db.sets.push(newSet);
    db.words[newSet.id] = [];
    writeDb(db);

    return NextResponse.json({ data: newSet }, { status: 201 });
  } catch (error) {
    console.error("Failed to create set", error);
    return NextResponse.json({ error: "Failed to create set" }, { status: 500 });
  }
}
