"use client";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  LinearProgress,
  Paper,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { getJlptAttemptResult } from "../services/jlpt-service";

type Filter = "all" | "correct" | "wrong" | "skipped";

export default function JlptResultView({ attemptId }: { attemptId: string }) {
  const router = useRouter();
  const numericAttemptId = parseInt(attemptId, 10);
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

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
  const currentSection = resultData.sections[activeTab];

  const filteredQuestions =
    currentSection?.questions.filter((q) => {
      if (filter === "correct") return q.correct;
      if (filter === "wrong") return !q.correct && !!q.selectedOptionKey;
      if (filter === "skipped") return !q.selectedOptionKey;
      return true;
    }) ?? [];

  const toggleExpand = (id: number) => {
    setExpandedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Container maxWidth="lg" className="animate-fade-in flex flex-col gap-6 py-8">
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={() => router.push("/practice/jlpt")}
        className="self-start text-slate-500"
      >
        Quay lại trang chủ
      </Button>

      {/* ── Score Card ── */}
      <Paper className="flex flex-col items-center rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-10 text-center shadow-lg dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
        <Typography variant="h5" className="mb-2 font-bold text-slate-500">
          Kết quả bài thi {resultData.examTitle} ({resultData.level})
        </Typography>

        <Box className="my-6 flex flex-col items-center">
          <Typography
            variant="h2"
            fontWeight={900}
            className={passed ? "text-emerald-500" : "text-red-500"}
          >
            {passed ? "合格" : "不合格"}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={800}
            className={`mt-2 ${passed ? "text-emerald-600" : "text-red-600"}`}
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

        {/* Section score cards */}
        <Box className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-3">
          {resultData.sections.map((section, idx) => {
            const pct = Math.round((section.scaledScore / section.scaledMaxScore) * 100);
            const correct = section.questions.filter((q) => q.correct).length;
            const sectionPassed = section.scaledScore >= 19;
            return (
              <Paper
                key={section.sectionId}
                className={`cursor-pointer rounded-2xl border-2 p-4 shadow-sm transition-all ${
                  activeTab === idx
                    ? "border-blue-500 dark:border-blue-400"
                    : "border-slate-100 dark:border-slate-700"
                }`}
                onClick={() => setActiveTab(idx)}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  className="mb-2 text-center text-slate-600 dark:text-slate-300"
                >
                  {section.title}
                </Typography>
                <Box className="mb-1 flex items-end justify-center gap-1">
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    className={sectionPassed ? "text-emerald-600" : "text-red-600"}
                  >
                    {section.scaledScore}
                  </Typography>
                  <Typography variant="caption" className="pb-1 text-slate-400">
                    / {section.scaledMaxScore}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  className="mb-2 h-2 rounded-full"
                  color={sectionPassed ? "success" : "error"}
                />
                <Typography variant="caption" className="block text-center text-slate-500">
                  {correct}/{section.questions.length} câu đúng
                </Typography>
                {!sectionPassed && (
                  <Typography
                    variant="caption"
                    color="error"
                    className="mt-1 block text-center font-semibold"
                  >
                    Điểm liệt (&lt;19)
                  </Typography>
                )}
              </Paper>
            );
          })}
        </Box>
      </Paper>

      {/* ── Detail Review ── */}
      <Paper className="rounded-3xl p-6 shadow-sm">
        {/* Section tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, v) => {
            setActiveTab(v);
            setFilter("all");
          }}
          variant="scrollable"
          scrollButtons="auto"
          className="mb-4 border-b border-slate-200 dark:border-slate-700"
        >
          {resultData.sections.map((s) => (
            <Tab key={s.sectionId} label={s.title} className="font-semibold" />
          ))}
        </Tabs>

        {/* Filter bar */}
        <Box className="mb-6 flex flex-wrap items-center gap-3">
          <FilterListRoundedIcon className="text-slate-400" fontSize="small" />
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(_, v) => v && setFilter(v)}
            size="small"
          >
            <ToggleButton value="all" className="rounded-lg px-4 font-semibold">
              Tất cả ({currentSection?.questions.length ?? 0})
            </ToggleButton>
            <ToggleButton
              value="correct"
              className="rounded-lg px-4 font-semibold text-emerald-600"
            >
              Đúng ({currentSection?.questions.filter((q) => q.correct).length ?? 0})
            </ToggleButton>
            <ToggleButton value="wrong" className="rounded-lg px-4 font-semibold text-red-600">
              Sai (
              {currentSection?.questions.filter((q) => !q.correct && !!q.selectedOptionKey)
                .length ?? 0}
              )
            </ToggleButton>
            <ToggleButton value="skipped" className="rounded-lg px-4 font-semibold text-slate-500">
              Bỏ qua ({currentSection?.questions.filter((q) => !q.selectedOptionKey).length ?? 0})
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Question list */}
        <Box className="flex flex-col gap-4">
          {filteredQuestions.map((question, index) => {
            const isExpanded = expandedQuestions.has(question.questionId);
            const skipped = !question.selectedOptionKey;
            const statusIcon = skipped ? (
              <RemoveCircleOutlineRoundedIcon className="text-slate-400" />
            ) : question.correct ? (
              <CheckCircleRoundedIcon className="text-emerald-500" />
            ) : (
              <CancelRoundedIcon className="text-red-500" />
            );

            const rowBg = skipped
              ? "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
              : question.correct
                ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800/50 dark:bg-emerald-900/10"
                : "border-red-200 bg-red-50/50 dark:border-red-800/50 dark:bg-red-900/10";

            return (
              <Box
                key={question.questionId}
                className={`overflow-hidden rounded-2xl border-2 transition-all ${rowBg}`}
              >
                {/* Collapsed header — always visible */}
                <Box
                  className="flex cursor-pointer items-center gap-3 p-4"
                  onClick={() => toggleExpand(question.questionId)}
                >
                  {statusIcon}
                  <Typography variant="subtitle2" fontWeight={700} className="flex-1">
                    Câu {question.questionNumber || index + 1}
                    {!skipped && (
                      <span className="ml-2 font-normal text-slate-500">
                        — Bạn chọn:{" "}
                        <b
                          className={
                            question.correct
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-red-600 dark:text-red-400"
                          }
                        >
                          {question.selectedOptionKey}
                        </b>
                        {!question.correct && (
                          <>
                            {" "}
                            &nbsp;| Đáp án:{" "}
                            <b className="text-emerald-600 dark:text-emerald-400">
                              {question.correctOptionKey}
                            </b>
                          </>
                        )}
                      </span>
                    )}
                    {skipped && <span className="ml-2 font-normal text-slate-400">— Bỏ qua</span>}
                  </Typography>
                  <Chip
                    size="small"
                    label={skipped ? "Bỏ qua" : question.correct ? "Đúng" : "Sai"}
                    color={skipped ? "default" : question.correct ? "success" : "error"}
                    className="font-bold"
                  />
                  {isExpanded ? (
                    <ExpandLessRoundedIcon className="text-slate-400" />
                  ) : (
                    <ExpandMoreRoundedIcon className="text-slate-400" />
                  )}
                </Box>

                {/* Expanded detail */}
                <Collapse in={isExpanded}>
                  <Box className="border-t border-slate-200 px-5 pb-5 pt-4 dark:border-slate-700">
                    {/* Passage */}
                    {question.passageText && (
                      <Box className="mb-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
                        <Typography className="whitespace-pre-line text-sm text-slate-700 dark:text-slate-300">
                          {question.passageText}
                        </Typography>
                      </Box>
                    )}

                    {/* Audio */}
                    {question.audioUrl && (
                      <Box className="mb-4">
                        <audio controls src={question.audioUrl} className="h-10 w-full max-w-md" />
                      </Box>
                    )}

                    <Typography
                      variant="body1"
                      fontWeight={600}
                      className="mb-4 text-slate-800 dark:text-slate-100"
                    >
                      {question.prompt}
                    </Typography>

                    {/* Options with color coding */}
                    <Box className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-2">
                      {question.options.map((opt) => {
                        const isCorrectOpt = opt.key === question.correctOptionKey;
                        const isSelectedOpt = opt.key === question.selectedOptionKey;
                        const isWrongSelection = isSelectedOpt && !isCorrectOpt;

                        let optStyle =
                          "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800";
                        if (isCorrectOpt)
                          optStyle =
                            "border-emerald-500 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/30";
                        else if (isWrongSelection)
                          optStyle =
                            "border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-900/30";

                        return (
                          <Box
                            key={opt.key}
                            className={`flex items-center gap-3 rounded-xl border-2 p-3 transition-all ${optStyle}`}
                          >
                            <Box
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                                isCorrectOpt
                                  ? "border-emerald-500 bg-emerald-500 text-white"
                                  : isWrongSelection
                                    ? "border-red-400 bg-red-400 text-white"
                                    : "border-slate-300 text-slate-500 dark:border-slate-600"
                              }`}
                            >
                              {opt.key}
                            </Box>
                            <Typography
                              className={`flex-1 text-sm font-medium ${
                                isCorrectOpt
                                  ? "text-emerald-700 dark:text-emerald-300"
                                  : isWrongSelection
                                    ? "text-red-700 dark:text-red-400"
                                    : "text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              {opt.text}
                            </Typography>
                            {isCorrectOpt && (
                              <CheckCircleRoundedIcon
                                fontSize="small"
                                className="shrink-0 text-emerald-500"
                              />
                            )}
                            {isWrongSelection && (
                              <CancelRoundedIcon
                                fontSize="small"
                                className="shrink-0 text-red-400"
                              />
                            )}
                          </Box>
                        );
                      })}
                    </Box>

                    {/* Explanation */}
                    {question.explanation && (
                      <Box className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-800/50 dark:bg-blue-900/10">
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          className="mb-1 text-blue-700 dark:text-blue-400"
                        >
                          💡 Giải thích
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
                </Collapse>
              </Box>
            );
          })}

          {filteredQuestions.length === 0 && (
            <Box className="flex flex-col items-center gap-2 py-12 text-slate-400">
              <Typography>Không có câu hỏi nào trong bộ lọc này.</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
