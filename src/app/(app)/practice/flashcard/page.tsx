import type { Metadata } from "next";
import { Suspense } from "react";

import PracticeFlashcardView from "@/features/practice/components/practice-flashcard-view";

export const metadata: Metadata = {
  title: "Flashcard",
  description: "Học từ vựng tiếng Nhật bằng flashcard",
};

export default function PracticeFlashcardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PracticeFlashcardView />
    </Suspense>
  );
}
