import { Metadata } from "next";

import JlptCommunityExamStudio from "@/features/practice/components/jlpt-community-exam-studio";

export const metadata: Metadata = {
  title: "AI Exam Studio - JLPT",
  description: "Tạo đề thi JLPT bằng AI",
};

export default function JlptCreateExamPage() {
  return <JlptCommunityExamStudio />;
}
