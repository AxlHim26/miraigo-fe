import type { Metadata } from "next";

import PracticeListeningView from "@/features/practice/components/practice-listening-view";

export const metadata: Metadata = {
  title: "Luyện Nghe",
  description: "Luyện nghe tiếng Nhật với 2 mode: Quiz và Dictation",
};

export default function PracticeListeningPage() {
  return <PracticeListeningView />;
}
