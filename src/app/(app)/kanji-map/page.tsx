import type { Metadata } from "next";

import KanjiRoadmapView from "@/features/kanji/components/kanji-roadmap-view";
import { getKanjiRoadmapLevels } from "@/features/kanji/data/kanji-roadmap.server";

export const metadata: Metadata = {
  title: "Hán tự | Lộ trình",
  description: "Học Hán tự theo lộ trình từng chặng JLPT",
};

export default async function KanjiMapPage() {
  const levels = await getKanjiRoadmapLevels();

  return <KanjiRoadmapView levels={levels} />;
}
