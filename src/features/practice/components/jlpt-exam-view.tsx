"use client";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  getJlptExamDetail,
  saveJlptAnswers,
  startJlptAttempt,
  submitJlptAttempt,
} from "../services/jlpt-service";
import { CountdownTimer } from "./countdown-timer";

export default function JlptExamView({ examId }: { examId: string }) {
  const router = useRouter();
  const numericExamId = parseInt(examId, 10);

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // 1. Fetch exam structure
  const { data: examDetail, isLoading: isLoadingExam } = useQuery({
    queryKey: ["jlpt-exam", numericExamId],
    queryFn: () => getJlptExamDetail(numericExamId),
    enabled: !isNaN(numericExamId),
  });

  // 2. Start attempt
  const { data: attemptData, isLoading: isStartingAttempt } = useQuery({
    queryKey: ["jlpt-attempt", numericExamId],
    queryFn: () => startJlptAttempt(numericExamId),
    enabled: !!examDetail,
  });

  // 3. Setup answers from previous session if any
  useEffect(() => {
    if (attemptData?.answers) {
      const initialAnswers: Record<number, string> = {};
      attemptData.answers.forEach((a) => {
        if (a.selectedOptionKey) {
          initialAnswers[a.questionId] = a.selectedOptionKey;
        }
      });
      setAnswers(initialAnswers);
    }
  }, [attemptData]);

  // 4. Save answers mutation
  const saveAnswersMutation = useMutation({
    mutationFn: (newAnswers: { questionId: number; selectedOptionKey: string }[]) => {
      if (!attemptData?.attemptId) throw new Error("No attempt active");
      return saveJlptAnswers(attemptData.attemptId, newAnswers);
    },
  });

  // 5. Submit mutation
  const submitMutation = useMutation({
    mutationFn: () => {
      if (!attemptData?.attemptId) throw new Error("No attempt active");
      return submitJlptAttempt(attemptData.attemptId);
    },
    onSuccess: () => {
      router.push(`/practice/jlpt/exam/${examId}/result`);
    },
  });

  const isLoading = isLoadingExam || isStartingAttempt;

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

  if (!examDetail || !attemptData) {
    return (
      <Container
        maxWidth="md"
        className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4"
      >
        <Typography>Không thể tải bài thi.</Typography>
        <Button onClick={() => router.push("/practice/jlpt")}>Quay lại</Button>
      </Container>
    );
  }

  const currentSection = examDetail.sections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];

  const handleSelectOption = (questionId: number, optionKey: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));

    // Auto-save periodically in a real app, here we save immediately for simplicity
    saveAnswersMutation.mutate([{ questionId, selectedOptionKey: optionKey }]);
  };

  const handleTimeUp = () => {
    submitMutation.mutate();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (currentSection?.questions.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentSectionIndex < examDetail.sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      setShowSubmitConfirm(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentSectionIndex > 0 && examDetail) {
      setCurrentSectionIndex((prev) => prev - 1);
      const prevSection = examDetail.sections[currentSectionIndex - 1];
      setCurrentQuestionIndex(
        prevSection?.questions?.length ? prevSection.questions.length - 1 : 0,
      );
    }
  };

  return (
    <Container
      maxWidth="lg"
      className="animate-fade-in flex min-h-[calc(100vh-64px)] flex-col py-8"
    >
      {/* Header */}
      <Box className="mb-6 flex items-center justify-between">
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => router.push("/practice/jlpt")}
          className="text-slate-500"
        >
          Thoát
        </Button>
        <Typography variant="h6" fontWeight={700}>
          {examDetail.title} - {currentSection?.title}
        </Typography>
        <CountdownTimer initialSeconds={attemptData.remainingSeconds} onTimeUp={handleTimeUp} />
      </Box>

      <Box className="flex flex-1 gap-6">
        {/* Left Side: Question grid navigation */}
        <Box className="flex w-64 flex-shrink-0 flex-col gap-4">
          <Paper className="flex flex-1 flex-col rounded-2xl p-4">
            <Typography variant="subtitle1" fontWeight={700} className="mb-4">
              Phần thi
            </Typography>
            <Box className="mb-6 space-y-2">
              {examDetail.sections.map((sec, sIdx) => (
                <Button
                  key={sec.id}
                  fullWidth
                  variant={currentSectionIndex === sIdx ? "contained" : "text"}
                  className={`justify-start text-left ${currentSectionIndex === sIdx ? "bg-blue-600" : ""}`}
                  onClick={() => {
                    setCurrentSectionIndex(sIdx);
                    setCurrentQuestionIndex(0);
                  }}
                >
                  {sec.title}
                </Button>
              ))}
            </Box>

            <Typography variant="subtitle1" fontWeight={700} className="mb-4">
              Câu hỏi
            </Typography>
            <Box className="grid grid-cols-5 gap-2 overflow-y-auto">
              {currentSection?.questions.map((q, qIdx) => {
                const isAnswered = !!answers[q.id];
                const isCurrent = currentQuestionIndex === qIdx;
                return (
                  <Button
                    key={q.id}
                    variant={isCurrent ? "contained" : isAnswered ? "outlined" : "text"}
                    className={`h-10 w-10 min-w-0 rounded-lg p-0 ${isCurrent ? "bg-blue-600" : isAnswered ? "border-blue-300 text-blue-600" : "bg-slate-100 text-slate-500"}`}
                    onClick={() => setCurrentQuestionIndex(qIdx)}
                  >
                    {qIdx + 1}
                  </Button>
                );
              })}
            </Box>
          </Paper>
          <Button
            variant="contained"
            color="success"
            size="large"
            className="rounded-xl py-3 font-bold shadow-lg"
            onClick={() => setShowSubmitConfirm(true)}
            disabled={submitMutation.isPending}
          >
            Nộp bài
          </Button>
        </Box>

        {/* Right Side: Current Question */}
        <Box className="flex flex-1 flex-col">
          {currentQuestion && (
            <Paper className="relative flex flex-1 flex-col overflow-hidden rounded-3xl p-8">
              {/* Question Number */}
              <Typography variant="overline" className="mb-4 font-bold text-blue-600">
                Câu {currentQuestionIndex + 1} / {currentSection.questions.length}
              </Typography>

              {/* Passage text if any */}
              {currentQuestion.passageText && (
                <Box className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                  <Typography className="whitespace-pre-line leading-relaxed text-slate-800 dark:text-slate-200">
                    {currentQuestion.passageText}
                  </Typography>
                </Box>
              )}

              {/* Audio if any */}
              {currentQuestion.audioUrl && (
                <Box className="mb-6">
                  <audio
                    controls
                    src={currentQuestion.audioUrl}
                    className="w-full"
                    controlsList="nodownload"
                  />
                </Box>
              )}

              {/* Prompt */}
              <Typography variant="h6" className="mb-8 font-medium">
                {currentQuestion.prompt}
              </Typography>

              {/* Options */}
              <Box className="mt-auto space-y-4">
                {currentQuestion.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.key;
                  return (
                    <Box
                      key={opt.key}
                      onClick={() => handleSelectOption(currentQuestion.id, opt.key)}
                      className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200 ${isSelected ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-900/20 dark:text-blue-300" : "border-slate-200 hover:border-blue-300 dark:border-slate-700 dark:hover:border-blue-600"} `}
                    >
                      <Typography className="text-lg font-medium">
                        {opt.key}. {opt.text}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>

              {/* Navigation buttons */}
              <Box className="mt-8 flex justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
                <Button
                  variant="outlined"
                  onClick={handlePrevQuestion}
                  disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
                  className="rounded-xl px-6"
                >
                  Câu trước
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNextQuestion}
                  className="rounded-xl bg-blue-600 px-8"
                >
                  {currentSectionIndex === examDetail.sections.length - 1 &&
                  currentQuestionIndex === currentSection.questions.length - 1
                    ? "Hoàn thành"
                    : "Câu tiếp"}
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitConfirm} onClose={() => setShowSubmitConfirm(false)}>
        <DialogTitle>Nộp bài thi?</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn nộp bài thi? Sau khi nộp bạn sẽ không thể thay đổi đáp án được
            nữa.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setShowSubmitConfirm(false)} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={() => {
              setShowSubmitConfirm(false);
              submitMutation.mutate();
            }}
            variant="contained"
            color="success"
            className="shadow-md"
            disabled={submitMutation.isPending}
          >
            {submitMutation.isPending ? <CircularProgress size={24} /> : "Nộp bài"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
