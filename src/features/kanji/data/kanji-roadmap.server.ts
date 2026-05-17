import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import { cache } from "react";

import {
  createRoadmapDays,
  deriveCurrentDay,
  type KanjiRoadmapLevel,
  kanjiRoadmapLevels,
  roadmapLevelOrder,
} from "@/features/kanji/data/kanji-roadmap";

type RawKanjiFile = {
  id?: string;
  jlpt?: string;
  jishoData?: {
    jlptLevel?: string;
    strokeCount?: number;
  };
};

type KanjiBucketItem = {
  kanji: string;
  strokeCount: number;
};

type JlptLevel = KanjiRoadmapLevel["level"];

const readKanjiBuckets = cache(async (): Promise<Record<JlptLevel, KanjiBucketItem[]>> => {
  const kanjiDir = path.join(process.cwd(), "data", "kanji");
  const files = await fs.readdir(kanjiDir);

  const buckets: Record<JlptLevel, KanjiBucketItem[]> = {
    N5: [],
    N4: [],
    N3: [],
    N2: [],
    N1: [],
  };

  await Promise.all(
    files
      .filter(
        (file) => file.endsWith(".json") && file !== "default.json" && !file.startsWith("CDP-"),
      )
      .map(async (file) => {
        try {
          const raw = await fs.readFile(path.join(kanjiDir, file), "utf-8");
          const data = JSON.parse(raw) as RawKanjiFile;
          const level = data.jlpt ?? data.jishoData?.jlptLevel;

          if (!level || !(level in buckets)) {
            return;
          }

          buckets[level as JlptLevel].push({
            kanji: data.id ?? file.replace(/\.json$/, ""),
            strokeCount: data.jishoData?.strokeCount ?? 0,
          });
        } catch {
          // Skip malformed files.
        }
      }),
  );

  for (const items of Object.values(buckets)) {
    items.sort((left, right) => {
      if (left.strokeCount !== right.strokeCount) {
        return left.strokeCount - right.strokeCount;
      }

      return left.kanji.localeCompare(right.kanji, "ja");
    });
  }

  return buckets;
});

export const getKanjiRoadmapLevels = cache(
  async (): Promise<[KanjiRoadmapLevel, ...KanjiRoadmapLevel[]]> => {
    const buckets = await readKanjiBuckets();
    const presetMap = new Map(kanjiRoadmapLevels.map((level) => [level.id, level]));

    return roadmapLevelOrder.map((levelId) => {
      const preset = presetMap.get(levelId) ?? kanjiRoadmapLevels[0];
      const kanjiList = buckets[preset.level].map((item) => item.kanji);
      const days = createRoadmapDays(levelId, preset.level, kanjiList);

      return {
        ...preset,
        kanjiCount: kanjiList.length,
        totalDays: days.length,
        currentDay: deriveCurrentDay(days.length, preset.progress),
        days,
      };
    }) as [KanjiRoadmapLevel, ...KanjiRoadmapLevel[]];
  },
);
