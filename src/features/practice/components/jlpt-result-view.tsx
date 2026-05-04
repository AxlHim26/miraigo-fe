"use client";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { getJlptAttemptResult } from "../services/jlpt-service";

export default function JlptResultView({ attemptId }: { attemptId: string }) {
  const router = useRouter();
  const numericAttemptId = parseInt(attemptId, 10);
  const [viewDetails, setViewDetails] = useState(false);

  const { data: resultData, isLoading } = useQuery({
    queryKey: ["jlpt-attempt-result", numericAttemptId],
    queryFn: () => getJlptAttemptResult(numericAttemptId),
    enabled: !isNaN(numericAttemptId),
  });

  if (isLoading) {
    return (
      <Container
        maxWidth="md"
        className="flex min-h-[calc(100vh-64px)] items-center justify-center"
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!resultData) {
    return (
      <Container
        maxWidth="md"
        className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4"
      >
        <Typography>Không thể tải kết quả.</Typography>
        <Button onClick={() => router.push("/practice/jlpt")}>Quay lại trang chủ</Button>
      </Container>
    );
  }

  const passed = resultData.passed;

  return (
    <Container maxWidth="lg" className="animate-fade-in flex flex-col gap-6 py-8">
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={() => router.push("/practice/jlpt")}
        className="self-start text-slate-500"
      >
        Quay lại trang chủ
      </Button>

      {/* Main Score Card */}
      <Paper className="flex flex-col items-center rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-10 text-center shadow-lg dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
        <Typography variant="h5" className="mb-2 font-bold text-slate-500">
          Kết quả bài thi {resultData.examTitle} ({resultData.level})
        </Typography>

        <Box className="my-6 flex flex-col items-center justify-center">
          <Typography
            variant="h2"
            fontWeight={900}
            className={passed ? "text-green-500" : "text-red-500"}
          >
            {passed ? "合格" : "不合格"}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={800}
            className={`mt-2 ${passed ? "text-green-600" : "text-red-600"}`}
          >
            {passed ? "ĐỖ" : "TRƯỢT"}
          </Typography>
        </Box>

        <Box className="flex flex-col items-center">
          <Typography variant="h3" fontWeight={800} className="text-blue-600">
            {resultData.totalScaledScore} <span className="text-xl text-slate-400">/ 180</span>
          </Typography>
          <Typography variant="subtitle1" className="mt-2 text-slate-500">
            Điểm tổng (Điểm chuẩn hóa)
          </Typography>
        </Box>

        {/* Section Scores Progress */}
        <Box className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-3">
          {resultData.sections.map((section) => (
            <Paper
              key={section.sectionId}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <Typography
                variant="subtitle2"
                fontWeight={700}
                className="mb-2 text-center text-slate-600 dark:text-slate-300"
              >
                {section.title}
              </Typography>
              <Box className="mb-3 flex items-end justify-center gap-1">
                <Typography variant="h5" fontWeight={800}>
                  {section.scaledScore}
                </Typography>
                <Typography variant="caption" className="pb-1 text-slate-400">
                  / {section.scaledMaxScore}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(section.scaledScore / section.scaledMaxScore) * 100}
                className="mb-1 h-2 rounded-full"
                color={section.scaledScore < 19 ? "error" : "primary"}
              />
              {section.scaledScore < 19 && (
                <Typography
                  variant="caption"
                  color="error"
                  className="mt-2 block text-center font-medium"
                >
                  Điểm liệt (&lt;19)
                </Typography>
              )}
            </Paper>
          ))}
        </Box>

        <Button
          variant="contained"
          size="large"
          className="mt-10 rounded-xl px-8 py-3 font-bold shadow-md"
          onClick={() => setViewDetails(!viewDetails)}
        >
          {viewDetails ? "Ẩn Chi Tiết Lỗi Sai" : "Xem Chi Tiết Lỗi Sai"}
        </Button>
      </Paper>

      {/* Detail Review Section */}
      {viewDetails && (
        <Box className="animate-fade-in mt-4 flex flex-col gap-6">
          <Typography
            variant="h5"
            fontWeight={700}
            className="mb-2 border-l-4 border-blue-500 px-2"
          >
            Chi tiết các phần thi
          </Typography>

          {resultData.sections.map((section) => (
            <Paper
              key={section.sectionId}
              className="rounded-2xl border border-slate-200 p-6 shadow-sm dark:border-slate-700"
            >
              <Typography variant="h6" fontWeight={700} className="mb-4 text-blue-600">
                {section.title}
                <span className="ml-2 text-sm font-normal text-slate-500">
                  (Đúng {section.questions.filter((q) => q.correct).length} /{" "}
                  {section.questions.length} câu)
                </span>
              </Typography>

              <Box className="flex flex-col gap-8">
                {section.questions.map((question, index) => (
                  <Box
                    key={question.questionId}
                    className={`rounded-2xl border-l-4 p-5 ${question.correct ? "border-green-400 bg-green-50/30" : "border-red-400 bg-red-50/30"}`}
                  >
                    {/* Header */}
                    <Box className="mb-3 flex items-center gap-2">
                      {question.correct ? (
                        <CheckCircleRoundedIcon className="text-green-500" />
                      ) : (
                        <CancelRoundedIcon className="text-red-500" />
                      )}
                      <Typography variant="subtitle1" fontWeight={700}>
                        Câu {question.questionNumber || index + 1}
                      </Typography>
                    </Box>

                    {/* Passage text if any */}
                    {question.passageText && (
                      <Box className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <Typography className="whitespace-pre-line text-sm text-slate-700">
                          {question.passageText}
                        </Typography>
                      </Box>
                    )}

                    {/* Audio if any */}
                    {question.audioUrl && (
                      <Box className="mb-4">
                        <audio controls src={question.audioUrl} className="h-10 w-full max-w-md" />
                      </Box>
                    )}

                    {/* Prompt */}
                    <Typography variant="body1" fontWeight={500} className="mb-4">
                      {question.prompt}
                    </Typography>

                    {/* Options */}
                    <Box className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                      {question.options.map((opt) => {
                        const isSelected = question.selectedOptionKey === opt.key;
                        const isCorrect = question.correctOptionKey === opt.key;

                        let optClass = "border-slate-200 bg-white";
                        if (isCorrect)
                          optClass =
                            "border-green-500 bg-green-50/50 text-green-700 font-medium ring-1 ring-green-500";
                        else if (isSelected && !isCorrect)
                          optClass = "border-red-300 bg-red-50 text-red-700";

                        return (
                          <Paper
                            key={opt.key}
                            variant="outlined"
                            className={`rounded-xl p-3 transition-colors ${optClass}`}
                          >
                            <Box className="flex items-center justify-between">
                              <Typography>
                                <span className="mr-2 font-bold">{opt.key}.</span> {opt.text}
                              </Typography>
                              {isCorrect && (
                                <CheckCircleRoundedIcon
                                  fontSize="small"
                                  className="text-green-500"
                                />
                              )}
                              {isSelected && !isCorrect && (
                                <CancelRoundedIcon fontSize="small" className="text-red-400" />
                              )}
                            </Box>
                          </Paper>
                        );
                      })}
                    </Box>

                    {/* Explanation */}
                    {question.explanation && (
                      <Box className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-800/50 dark:bg-blue-900/10">
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          className="mb-1 flex items-center gap-1 text-blue-700"
                        >
                          Giải thích
                        </Typography>
                        <Typography
                          variant="body2"
                          className="whitespace-pre-line text-slate-700 dark:text-slate-300"
                        >
                          {question.explanation}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
}
