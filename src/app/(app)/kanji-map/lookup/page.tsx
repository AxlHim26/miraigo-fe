import type { Metadata } from "next";

import KanjiLookupView from "@/features/kanji/components/kanji-lookup-view";

export const metadata: Metadata = {
  title: "Hán tự | Tra cứu",
  description: "Tra cứu Hán tự bằng tìm kiếm, vẽ tay và kho chữ theo cấp độ",
};

export default function KanjiLookupPage() {
  return <KanjiLookupView />;
}
