import type { Metadata } from "next";

import PracticeFlashcardView from "@/features/practice/components/practice-flashcard-view";

export const metadata: Metadata = {
  title: "Flashcard",
  description: "Học từ vựng tiếng Nhật bằng flashcard",
};

export default function PracticeFlashcardPage() {
  return <PracticeFlashcardView />;
}
