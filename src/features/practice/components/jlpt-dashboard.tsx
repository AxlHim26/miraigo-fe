"use client";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { getJlptAttemptHistory } from "../services/jlpt-service";

// Demo data for the dashboard
const LEVELS = [
  {
    id: "N5",
    title: "JLPT N5",
    desc: "Basic Japanese",
    progress: 80,
    color: "from-blue-400 to-indigo-500",
    shadow: "shadow-blue-500/20",
  },
  {
    id: "N4",
    title: "JLPT N4",
    desc: "Elementary Japanese",
    progress: 45,
    color: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-500/20",
  },
  {
    id: "N3",
    title: "JLPT N3",
    desc: "Intermediate Japanese",
    progress: 15,
    color: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/20",
  },
  {
    id: "N2",
    title: "JLPT N2",
    desc: "Pre-Advanced Japanese",
    progress: 0,
    color: "from-rose-400 to-pink-500",
    shadow: "shadow-rose-500/20",
  },
  {
    id: "N1",
    title: "JLPT N1",
    desc: "Advanced Japanese",
    progress: 0,
    color: "from-fuchsia-500 to-purple-600",
    shadow: "shadow-purple-500/20",
  },
];

export default function JlptDashboard() {
  const router = useRouter();
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  const { data: attemptHistory = [], isLoading: historyLoading } = useQuery({
    queryKey: ["jlpt-attempt-history"],
    queryFn: () => getJlptAttemptHistory(),
  });

  const levelsWithProgress = useMemo(() => {
    return LEVELS.map((level) => {
      const attempts = attemptHistory.filter((a) => a.level === level.id);
      let progress = 0;
      if (attempts.length > 0) {
        const passed = attempts.some((a) => a.passed);
        progress = passed ? 100 : 50;
      }
      return { ...level, progress };
    });
  }, [attemptHistory]);

  const handleStartPractice = (level: string) => {
    router.push(`/practice/jlpt/${level}`);
  };

  return (
    <Container maxWidth="lg" className="min-h-[calc(100vh-64px)] space-y-8 py-8">
      {/* Header Section */}
      <Box className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>

        <Grid container spacing={4} alignItems="center" className="relative z-10">
          <Grid item xs={12} md={8} className="space-y-4">
            <Typography
              variant="h3"
              fontWeight={800}
              className="bg-gradient-to-r from-blue-200 to-white bg-clip-text tracking-tight text-transparent"
            >
              JLPT Dojo
            </Typography>
            <Typography variant="h6" className="max-w-xl font-medium text-slate-300">
              Chinh phục kỳ thi năng lực tiếng Nhật qua các bài tập tương tác, giải thích chi tiết
              và theo dõi tiến độ chuẩn hóa.
            </Typography>
            <Box className="flex gap-4 pt-4">
              <Button
                variant="contained"
                size="large"
                startIcon={<SchoolRoundedIcon />}
                className="rounded-full bg-blue-600 px-6 py-2.5 font-bold shadow-blue-500/30 hover:bg-blue-700"
                onClick={() => handleStartPractice("placement")}
              >
                Kiểm tra xếp lớp
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<HistoryRoundedIcon />}
                className="rounded-full border-slate-500 px-6 py-2.5 font-bold text-slate-200 hover:border-slate-300 hover:bg-white/5"
                onClick={() => setHistoryOpen(true)}
              >
                Lịch sử làm bài
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} className="hidden justify-center md:flex">
            <WorkspacePremiumRoundedIcon className="text-9xl text-blue-400 opacity-80" />
          </Grid>
        </Grid>
      </Box>

      {/* Levels Grid */}
      <Box className="space-y-6">
        <Typography
          variant="h5"
          fontWeight={700}
          className="px-2 text-slate-800 dark:text-slate-100"
        >
          Chọn cấp độ ôn tập
        </Typography>

        <Grid container spacing={3}>
          {levelsWithProgress.map((level) => (
            <Grid item xs={12} sm={6} md={4} key={level.id}>
              <Card
                className={`h-full transform rounded-2xl transition-all duration-300 ${hoveredLevel === level.id ? "-translate-y-2 " + level.shadow : "shadow-md"} border border-slate-200 bg-white backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/80`}
                onMouseEnter={() => setHoveredLevel(level.id)}
                onMouseLeave={() => setHoveredLevel(null)}
              >
                <CardActionArea
                  className="h-full p-2"
                  onClick={() => handleStartPractice(level.id)}
                >
                  <CardContent className="space-y-4">
                    <Box className="flex items-start justify-between">
                      <Box
                        className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${level.color} text-white shadow-lg`}
                      >
                        <Typography variant="h6" fontWeight={800}>
                          {level.id}
                        </Typography>
                      </Box>
                      {level.progress === 100 ? (
                        <Chip label="Mastered" size="small" color="success" className="font-bold" />
                      ) : level.progress > 0 ? (
                        <Chip
                          label="In Progress"
                          size="small"
                          color="primary"
                          className="bg-blue-100 font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        />
                      ) : null}
                    </Box>

                    <Box>
                      <Typography variant="h6" fontWeight={700} className="mb-1 dark:text-white">
                        {level.title}
                      </Typography>
                      <Typography variant="body2" className="text-slate-500 dark:text-slate-400">
                        {level.desc}
                      </Typography>
                    </Box>

                    <Box className="space-y-2 pt-4">
                      <Box className="flex items-center justify-between">
                        <Typography
                          variant="caption"
                          fontWeight={600}
                          className="text-slate-600 dark:text-slate-300"
                        >
                          Tiến độ hoàn thành
                        </Typography>
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          className="text-blue-600 dark:text-blue-400"
                        >
                          {level.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={level.progress}
                        className="h-2 rounded-full bg-slate-100 dark:bg-slate-700"
                        sx={{
                          "& .MuiLinearProgress-bar": {
                            backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                            className: level.color,
                            borderRadius: "9999px",
                          },
                        }}
                      />
                    </Box>

                    <Box
                      className={`flex items-center pt-2 font-semibold text-blue-600 transition-opacity duration-300 dark:text-blue-400 ${hoveredLevel === level.id ? "opacity-100" : "opacity-0"}`}
                    >
                      Bắt đầu ngay <PlayArrowRoundedIcon fontSize="small" className="ml-1" />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ── History Drawer ── */}
      <Drawer
        anchor="right"
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        PaperProps={{ className: "w-96" }}
      >
        <Box className="flex h-full flex-col">
          <Box className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <Box className="flex items-center gap-2">
              <HistoryRoundedIcon className="text-blue-500" />
              <Typography variant="subtitle1" fontWeight={700}>
                Lịch sử làm bài
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setHistoryOpen(false)}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box className="flex-1 overflow-y-auto p-4">
            {historyLoading && (
              <Box className="flex justify-center py-12">
                <CircularProgress />
              </Box>
            )}

            {!historyLoading && attemptHistory.length === 0 && (
              <Box className="flex flex-col items-center gap-3 py-16 text-center">
                <HistoryRoundedIcon className="text-6xl text-slate-300" />
                <Typography className="text-slate-500">Chưa có lịch sử làm bài nào.</Typography>
                <Button
                  variant="contained"
                  size="small"
                  className="mt-2 rounded-xl"
                  onClick={() => setHistoryOpen(false)}
                >
                  Bắt đầu làm bài
                </Button>
              </Box>
            )}

            <Box className="flex flex-col gap-3">
              {attemptHistory.map((attempt) => {
                const isSubmitted = attempt.status === "SUBMITTED";
                const scoreLabel =
                  attempt.totalScaledScore != null ? `${attempt.totalScaledScore}/180` : "—";
                const dateStr = new Date(attempt.startedAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });

                return (
                  <Paper
                    key={attempt.attemptId}
                    className="cursor-pointer rounded-2xl border border-slate-200 p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-slate-700"
                    onClick={() => {
                      setHistoryOpen(false);
                      if (isSubmitted) {
                        router.push(`/practice/jlpt/attempt/${attempt.attemptId}/result`);
                      } else {
                        router.push(`/practice/jlpt/exam/${attempt.examId}`);
                      }
                    }}
                  >
                    <Box className="mb-2 flex items-start justify-between gap-2">
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          className="text-slate-800 dark:text-slate-100"
                        >
                          {attempt.examTitle}
                        </Typography>
                        <Typography variant="caption" className="text-slate-400">
                          {dateStr}
                        </Typography>
                      </Box>
                      <Box className="flex shrink-0 flex-col items-end gap-1">
                        <Chip
                          size="small"
                          label={attempt.level}
                          className="font-bold"
                          color="primary"
                          variant="outlined"
                        />
                        {isSubmitted ? (
                          <Chip
                            size="small"
                            label={attempt.passed ? "Đỗ" : "Trượt"}
                            color={attempt.passed ? "success" : "error"}
                            className="font-bold"
                            {...(attempt.passed ? { icon: <CheckCircleRoundedIcon /> } : {})}
                          />
                        ) : (
                          <Chip
                            size="small"
                            label="Đang làm"
                            color="warning"
                            className="font-bold"
                          />
                        )}
                      </Box>
                    </Box>

                    <Divider className="my-2" />

                    <Box className="flex items-center justify-between">
                      <Typography variant="body2" className="text-slate-500">
                        Điểm:{" "}
                        <b
                          className={`${attempt.passed ? "text-emerald-600" : attempt.totalScaledScore != null ? "text-red-600" : "text-slate-400"} dark:text-current`}
                        >
                          {scoreLabel}
                        </b>
                      </Typography>
                      <Button
                        size="small"
                        variant={isSubmitted ? "outlined" : "contained"}
                        color={isSubmitted ? "primary" : "warning"}
                        className="rounded-lg text-xs font-bold"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHistoryOpen(false);
                          if (isSubmitted) {
                            router.push(`/practice/jlpt/attempt/${attempt.attemptId}/result`);
                          } else {
                            router.push(`/practice/jlpt/exam/${attempt.examId}`);
                          }
                        }}
                      >
                        {isSubmitted ? "Xem kết quả" : "Tiếp tục"}
                      </Button>
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Container>
  );
}
