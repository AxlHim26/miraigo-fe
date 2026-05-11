import type { Metadata } from "next";

import PracticePronunciationView from "@/features/practice/components/practice-pronunciation-view";

export const metadata: Metadata = {
  title: "Luyện Phát Âm",
  description: "Luyện phát âm tiếng Nhật với AI nhận diện ngôn ngữ",
};

export default function PracticePronunciationPage() {
  return <PracticePronunciationView />;
}
