import { NextResponse } from "next/server";

import { readDb } from "../_db";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = readDb();
  // Filter sets that are community shared
  const communitySets = db.sets.filter((set) => set.isCommunity);
  return NextResponse.json({ data: communitySets });
}
