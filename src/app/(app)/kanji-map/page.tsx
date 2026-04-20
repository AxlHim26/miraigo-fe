import type { Metadata } from "next";

import KanjiRoadmapView from "@/features/kanji/components/kanji-roadmap-view";

export const metadata: Metadata = {
  title: "Hán tự | Lộ trình",
  description: "Học Hán tự theo lộ trình từng chặng JLPT",
};

export default function KanjiMapPage() {
  return <KanjiRoadmapView />;
}
