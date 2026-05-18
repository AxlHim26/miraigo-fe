"use client";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Fab,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  getJlptExamDetail,
  saveJlptAnswers,
  startJlptAttempt,
  startJlptSectionAttempt,
  submitJlptAttempt,
  submitJlptSectionAttempt,
} from "../services/jlpt-service";
import { CountdownTimer } from "./countdown-timer";

export default function JlptExamView({ examId }: { examId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const numericExamId = parseInt(examId, 10);

  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showSectionSubmitConfirm, setShowSectionSubmitConfirm] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  // 1. Fetch exam structure
  const { data: examDetail, isLoading: isLoadingExam } = useQuery({
    queryKey: ["jlpt-exam", numericExamId],
    queryFn: () => getJlptExamDetail(numericExamId),
    enabled: !isNaN(numericExamId),
  });

  // 2. Start overall attempt
  const { data: attemptData, isLoading: isStartingAttempt } = useQuery({
    queryKey: ["jlpt-attempt", numericExamId],
    queryFn: () => startJlptAttempt(numericExamId),
    enabled: !!examDetail,
  });

  // 3. Restore answers
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

  // 5. Start section mutation
  const startSectionMutation = useMutation({
    mutationFn: (sectionId: number) => {
      if (!attemptData?.attemptId) throw new Error("No attempt active");
      return startJlptSectionAttempt(attemptData.attemptId, sectionId);
    },
    onSuccess: (_, sectionId) => {
      queryClient.invalidateQueries({ queryKey: ["jlpt-attempt", numericExamId] });
      setActiveSectionId(sectionId);
      setCurrentQuestionIndex(0);
    },
  });

  // 6. Submit section mutation
  const submitSectionMutation = useMutation({
    mutationFn: (sectionId: number) => {
      if (!attemptData?.attemptId) throw new Error("No attempt active");
      return submitJlptSectionAttempt(attemptData.attemptId, sectionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jlpt-attempt", numericExamId] });
      setActiveSectionId(null);
    },
  });

  // 7. Submit attempt mutation
  const submitMutation = useMutation({
    mutationFn: () => {
      if (!attemptData?.attemptId) throw new Error("No attempt active");
      return submitJlptAttempt(attemptData.attemptId);
    },
    onSuccess: () => {
      router.push(`/practice/jlpt/attempt/${attemptData?.attemptId}/result`);
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

  const handleSelectOption = (questionId: number, optionKey: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
    saveAnswersMutation.mutate([{ questionId, selectedOptionKey: optionKey }]);
  };

  const toggleFlag = (questionId: number) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const activeSection = examDetail.sections.find((s) => s.id === activeSectionId);
  const activeSectionAttempt = attemptData.sectionAttempts?.find(
    (sa) => sa.sectionId === activeSectionId,
  );
  const currentQuestion = activeSection?.questions[currentQuestionIndex];

  const handleSectionTimeUp = () => {
    if (activeSectionId) submitSectionMutation.mutate(activeSectionId);
  };

  const handleNextQuestion = () => {
    if (!activeSection) return;
    if (currentQuestionIndex < activeSection.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowSectionSubmitConfirm(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex((prev) => prev - 1);
  };

  // ── Question status helpers ──
  const getQuestionStatus = (qId: number) => {
    if (flagged.has(qId)) return "flagged";
    if (answers[qId]) return "answered";
    return "unanswered";
  };

  const statusStyle = (status: string, isCurrent: boolean) => {
    if (isCurrent) return "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30";
    if (status === "answered")
      return "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400";
    if (status === "flagged")
      return "bg-amber-400/10 border-amber-400 text-amber-600 dark:text-amber-400";
    return "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-500";
  };

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION MENU (Dashboard view)
  // ─────────────────────────────────────────────────────────────────────────
  if (!activeSectionId) {
    const allSubmitted = examDetail.sections.every((sec) => {
      const sa = attemptData.sectionAttempts?.find((a) => a.sectionId === sec.id);
      return sa?.sectionStatus === "SUBMITTED";
    });

    return (
      <Container
        maxWidth="md"
        className="animate-fade-in flex min-h-[calc(100vh-64px)] flex-col py-8"
      >
        <Box className="mb-8 flex items-center justify-between">
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => router.push("/practice/jlpt")}
            className="text-slate-500"
          >
            Thoát
          </Button>
        </Box>

        <Paper className="rounded-3xl border border-slate-100 p-8 shadow-md dark:border-slate-800 dark:bg-slate-900">
          <Typography variant="h5" fontWeight={800} className="mb-2 text-center">
            {examDetail.title}
          </Typography>
          <Typography variant="body1" className="mb-8 text-center text-slate-500">
            Chọn một phần thi để bắt đầu làm bài. Bạn có thể làm các phần thi theo thứ tự tùy ý.
          </Typography>

          <Box className="flex flex-col gap-4">
            {examDetail.sections.map((sec, index) => {
              const sa = attemptData.sectionAttempts?.find((a) => a.sectionId === sec.id);
              const status = sa?.sectionStatus || "NOT_STARTED";

              // Count answered questions in this section
              const answeredCount = sec.questions.filter((q) => !!answers[q.id]).length;
              const totalQ = sec.questions.length;

              let statusLabel = "Chưa làm";
              let statusColor = "default" as "default" | "primary" | "success" | "warning";
              if (status === "IN_PROGRESS") {
                statusLabel = "Đang làm";
                statusColor = "warning";
              } else if (status === "SUBMITTED") {
                statusLabel = "Đã nộp";
                statusColor = "success";
              }

              return (
                <Card
                  key={sec.id}
                  variant="outlined"
                  className="rounded-2xl border-slate-200 dark:border-slate-700"
                >
                  <Box className="flex flex-row items-center justify-between p-5">
                    <Box className="flex-1">
                      <Box className="mb-1 flex items-center gap-3">
                        <Typography variant="subtitle1" fontWeight={700}>
                          Phần {index + 1}: {sec.title}
                        </Typography>
                        <Chip
                          size="small"
                          label={statusLabel}
                          color={statusColor}
                          className="font-bold"
                        />
                      </Box>
                      <Typography variant="body2" className="text-slate-500">
                        Thời gian: {sec.durationMinutes} phút • {totalQ} câu hỏi
                        {status === "IN_PROGRESS" && (
                          <span className="ml-2 text-amber-600 dark:text-amber-400">
                            ({answeredCount}/{totalQ} đã trả lời)
                          </span>
                        )}
                      </Typography>
                    </Box>

                    <Button
                      variant={status === "SUBMITTED" ? "text" : "contained"}
                      color={status === "IN_PROGRESS" ? "warning" : "primary"}
                      disabled={status === "SUBMITTED" || startSectionMutation.isPending}
                      onClick={() => startSectionMutation.mutate(sec.id)}
                      className="ml-4 rounded-xl px-6 font-bold shadow-none"
                      startIcon={
                        status === "SUBMITTED" ? (
                          <CheckCircleRoundedIcon />
                        ) : (
                          <PlayArrowRoundedIcon />
                        )
                      }
                    >
                      {status === "NOT_STARTED" && "Bắt đầu"}
                      {status === "IN_PROGRESS" && "Tiếp tục"}
                      {status === "SUBMITTED" && "Hoàn thành"}
                    </Button>
                  </Box>
                </Card>
              );
            })}
          </Box>

          <Box className="mt-10 flex justify-center">
            <Button
              variant="contained"
              color={allSubmitted ? "success" : "primary"}
              size="large"
              className="rounded-xl px-12 py-3 font-bold shadow-lg"
              onClick={() => setShowSubmitConfirm(true)}
            >
              Nộp Toàn Bộ Bài Thi
            </Button>
          </Box>
        </Paper>

        <Dialog open={showSubmitConfirm} onClose={() => setShowSubmitConfirm(false)}>
          <DialogTitle>Nộp bài thi?</DialogTitle>
          <DialogContent>
            <Typography>
              Bạn có chắc chắn muốn nộp bài thi?{" "}
              {!allSubmitted && (
                <span className="mt-2 block font-bold text-red-500">
                  Cảnh báo: Bạn vẫn còn phần thi chưa nộp. Điểm của phần chưa nộp sẽ là 0.
                </span>
              )}
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

  // ─────────────────────────────────────────────────────────────────────────
  // ACTIVE SECTION — Taking the exam
  // ─────────────────────────────────────────────────────────────────────────
  const answeredCount = activeSection?.questions.filter((q) => !!answers[q.id]).length ?? 0;
  const flaggedCount = activeSection?.questions.filter((q) => flagged.has(q.id)).length ?? 0;
  const isCurrentFlagged = currentQuestion ? flagged.has(currentQuestion.id) : false;

  return (
    <Box className="animate-fade-in flex min-h-screen flex-col">
      {/* Top bar */}
      <Box className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => setActiveSectionId(null)}
          className="text-slate-500"
        >
          Danh sách
        </Button>
        <Box className="flex flex-col items-center">
          <Typography variant="subtitle1" fontWeight={700}>
            {activeSection?.title}
          </Typography>
          <Typography variant="caption" className="text-slate-500">
            {answeredCount}/{activeSection?.questions.length ?? 0} đã trả lời
            {flaggedCount > 0 && ` • ${flaggedCount} đã đánh dấu`}
          </Typography>
        </Box>
        <Box className="flex items-center gap-3">
          {activeSectionAttempt && (
            <CountdownTimer
              initialSeconds={activeSectionAttempt.remainingSeconds}
              onTimeUp={handleSectionTimeUp}
            />
          )}
          <Tooltip title="Navigator câu hỏi">
            <Fab
              size="small"
              color="primary"
              onClick={() => setNavDrawerOpen(true)}
              className="shadow-lg"
            >
              <GridViewRoundedIcon fontSize="small" />
            </Fab>
          </Tooltip>
        </Box>
      </Box>

      {/* Question area */}
      <Box className="flex flex-1 justify-center px-4 py-8">
        <Box className="w-full max-w-3xl">
          {currentQuestion && activeSection && (
            <Paper className="flex flex-col rounded-3xl p-8 shadow-md">
              {/* Question header */}
              <Box className="mb-6 flex items-center justify-between">
                <Typography variant="overline" className="font-bold text-blue-600">
                  Câu {currentQuestionIndex + 1} / {activeSection.questions.length}
                </Typography>
                <Tooltip title={isCurrentFlagged ? "Bỏ đánh dấu" : "Đánh dấu để xem lại"}>
                  <IconButton
                    onClick={() => toggleFlag(currentQuestion.id)}
                    className={isCurrentFlagged ? "text-amber-500" : "text-slate-400"}
                    size="small"
                  >
                    {isCurrentFlagged ? (
                      <BookmarkAddedRoundedIcon />
                    ) : (
                      <BookmarkBorderRoundedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Passage */}
              {currentQuestion.passageText && (
                <Box className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                  <Typography className="whitespace-pre-line leading-relaxed text-slate-800 dark:text-slate-200">
                    {currentQuestion.passageText}
                  </Typography>
                </Box>
              )}

              {/* Audio */}
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

              <Typography variant="h6" className="mb-8 font-medium">
                {currentQuestion.prompt}
              </Typography>

              {/* Options */}
              <Box className="space-y-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.key;
                  return (
                    <Box
                      key={opt.key}
                      onClick={() => handleSelectOption(currentQuestion.id, opt.key)}
                      className={`cursor-pointer rounded-2xl border-2 p-4 transition-all duration-200 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 shadow-sm dark:bg-blue-900/20"
                          : "border-slate-200 hover:border-blue-300 dark:border-slate-700 dark:hover:border-blue-600"
                      }`}
                    >
                      <Box className="flex items-center gap-3">
                        <Box
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                            isSelected
                              ? "border-blue-500 bg-blue-500 text-white"
                              : "border-slate-300 text-slate-500 dark:border-slate-600"
                          }`}
                        >
                          {opt.key}
                        </Box>
                        <Typography
                          className={`font-medium ${isSelected ? "text-blue-700 dark:text-blue-300" : ""}`}
                        >
                          {opt.text}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {/* Navigation */}
              <Box className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
                <Button
                  variant="outlined"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  startIcon={<NavigateBeforeRoundedIcon />}
                  className="rounded-xl px-6"
                >
                  Câu trước
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNextQuestion}
                  endIcon={
                    currentQuestionIndex < activeSection.questions.length - 1 ? (
                      <NavigateNextRoundedIcon />
                    ) : undefined
                  }
                  className="rounded-xl bg-blue-600 px-8"
                >
                  {currentQuestionIndex === activeSection.questions.length - 1
                    ? "Hoàn thành"
                    : "Câu tiếp"}
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>

      {/* ── Floating Question Navigator Drawer ── */}
      <Drawer
        anchor="right"
        open={navDrawerOpen}
        onClose={() => setNavDrawerOpen(false)}
        PaperProps={{ className: "w-80 p-0" }}
      >
        <Box className="flex h-full flex-col">
          {/* Header */}
          <Box className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <Typography variant="subtitle1" fontWeight={700}>
              Navigator câu hỏi
            </Typography>
            <IconButton size="small" onClick={() => setNavDrawerOpen(false)}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Legend */}
          <Box className="flex flex-wrap gap-2 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
            <Chip
              size="small"
              label="Chưa làm"
              className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            />
            <Chip
              size="small"
              label="Đã làm"
              className="border border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
            />
            <Chip
              size="small"
              label="Đánh dấu"
              className="border border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
            />
          </Box>

          {/* Summary */}
          <Box className="grid grid-cols-3 gap-2 border-b border-slate-100 px-4 py-3 text-center dark:border-slate-800">
            <Box>
              <Typography
                variant="h6"
                fontWeight={800}
                className="text-slate-700 dark:text-slate-200"
              >
                {activeSection?.questions.length ?? 0}
              </Typography>
              <Typography variant="caption" className="text-slate-500">
                Tổng
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={800} className="text-emerald-600">
                {answeredCount}
              </Typography>
              <Typography variant="caption" className="text-slate-500">
                Đã làm
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={800} className="text-amber-500">
                {flaggedCount}
              </Typography>
              <Typography variant="caption" className="text-slate-500">
                Đánh dấu
              </Typography>
            </Box>
          </Box>

          {/* Grid */}
          <Box className="flex-1 overflow-y-auto p-4">
            <Box className="grid grid-cols-5 gap-2">
              {activeSection?.questions.map((q, qIdx) => {
                const status = getQuestionStatus(q.id);
                const isCurrent = currentQuestionIndex === qIdx;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestionIndex(qIdx);
                      setNavDrawerOpen(false);
                    }}
                    className={`relative flex h-10 w-full items-center justify-center rounded-lg border-2 text-sm font-bold transition-all ${statusStyle(status, isCurrent)}`}
                  >
                    {qIdx + 1}
                    {status === "flagged" && (
                      <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </Box>
          </Box>

          {/* Submit button */}
          <Box className="border-t border-slate-200 p-4 dark:border-slate-700">
            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              className="rounded-xl py-3 font-bold shadow-lg"
              onClick={() => {
                setNavDrawerOpen(false);
                setShowSectionSubmitConfirm(true);
              }}
              disabled={submitSectionMutation.isPending}
            >
              Nộp phần thi này
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Submit SECTION Dialog */}
      <Dialog open={showSectionSubmitConfirm} onClose={() => setShowSectionSubmitConfirm(false)}>
        <DialogTitle>Nộp phần thi?</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn nộp <b>{activeSection?.title}</b>?{" "}
          </Typography>
          {answeredCount < (activeSection?.questions.length ?? 0) && (
            <Box className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-900/20">
              <Typography
                variant="body2"
                className="font-semibold text-amber-700 dark:text-amber-400"
              >
                ⚠️ Còn {(activeSection?.questions.length ?? 0) - answeredCount} câu chưa trả lời.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setShowSectionSubmitConfirm(false)} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={() => {
              setShowSectionSubmitConfirm(false);
              if (activeSectionId) submitSectionMutation.mutate(activeSectionId);
            }}
            variant="contained"
            color="success"
            className="shadow-md"
            disabled={submitSectionMutation.isPending}
          >
            {submitSectionMutation.isPending ? <CircularProgress size={24} /> : "Nộp phần này"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
