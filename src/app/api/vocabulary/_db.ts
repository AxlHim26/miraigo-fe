import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "vocabulary-db.json");

export interface DbSet {
  id: string;
  title: string;
  description?: string;
  level?: "N5" | "N4" | "N3" | "N2" | "N1";
  wordCount: number;
  updatedAt: string;
  isCommunity?: boolean;
}

export interface DbWord {
  id: string;
  japanese: string;
  reading: string;
  meaning: string;
  example?: string;
  exampleMeaning?: string;
}

export interface DbSchema {
  sets: DbSet[];
  words: Record<string, DbWord[]>;
}

export function readDb(): DbSchema {
  try {
    if (!fs.existsSync(dbPath)) {
      return { sets: [], words: {} };
    }
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data) as DbSchema;
  } catch (error) {
    console.error("Failed to read vocabulary db", error);
    return { sets: [], words: {} };
  }
}

export function writeDb(data: DbSchema) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write vocabulary db", error);
  }
}
