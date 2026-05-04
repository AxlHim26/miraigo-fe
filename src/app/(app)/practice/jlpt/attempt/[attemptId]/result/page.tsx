import { CircularProgress } from "@mui/material";
import { Suspense } from "react";

import JlptResultView from "@/features/practice/components/jlpt-result-view";

export const metadata = {
  title: "JLPT Exam Result",
};

export default function JlptAttemptResultPage({ params }: { params: { attemptId: string } }) {
  return (
    <Suspense fallback={<CircularProgress />}>
      <JlptResultView attemptId={params.attemptId} />
    </Suspense>
  );
}
