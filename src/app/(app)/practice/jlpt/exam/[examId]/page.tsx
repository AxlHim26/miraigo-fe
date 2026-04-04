import { Metadata } from "next";

import JlptExamView from "@/features/practice/components/jlpt-exam-view";

export const metadata: Metadata = {
  title: "Thi thử JLPT",
  description: "Thi thử JLPT",
};

export default async function JlptMockExamPage(props: { params: Promise<{ examId: string }> }) {
  const params = await props.params;
  return <JlptExamView examId={params.examId} />;
}
