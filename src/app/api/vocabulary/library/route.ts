import { NextResponse } from "next/server";

import { readDb } from "../_db";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = readDb();
  // Filter sets that belong to the user (for now, those without isCommunity true)
  const userSets = db.sets.filter((set) => !set.isCommunity);
  return NextResponse.json({ data: { sets: userSets, limit: 10 } });
}
