import type { Metadata } from "next";

import PracticeTranscribeView from "@/features/practice/components/practice-transcribe-view";

export const metadata: Metadata = {
  title: "Gỡ Băng AI",
  description: "Upload audio và gỡ băng văn bản đa ngôn ngữ bằng AI",
};

export default function PracticeTranscribePage() {
  return <PracticeTranscribeView />;
}
