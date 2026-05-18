import { CircularProgress } from "@mui/material";
import { Suspense } from "react";

import JlptResultView from "@/features/practice/components/jlpt-result-view";

export const metadata = {
  title: "JLPT Exam Result",
};

export default async function JlptAttemptResultPage(props: {
  params: Promise<{ attemptId: string }>;
}) {
  const params = await props.params;
  return (
    <Suspense fallback={<CircularProgress />}>
      <JlptResultView attemptId={params.attemptId} />
    </Suspense>
  );
}
