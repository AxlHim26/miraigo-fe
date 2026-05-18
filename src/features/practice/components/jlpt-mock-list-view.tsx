"use client";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  CircularProgress,
  Container,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { getPublishedExams } from "../services/jlpt-service";

export default function JlptMockListView({ level }: { level: string }) {
  const router = useRouter();

  const [tabIndex, setTabIndex] = useState(0);

  const { data: exams, isLoading } = useQuery({
    queryKey: ["jlpt-exams"],
    queryFn: () => getPublishedExams(),
  });

  type ExamItem = {
    level: string;
    code: string;
    id: number;
    title: string;
    examYear?: number;
    examMonth?: number;
    totalDurationMinutes?: number;
  };
  const levelExams: ExamItem[] =
    exams?.filter((exam: ExamItem) => exam.level === level.toUpperCase()) || [];

  const officialExams = levelExams.filter((exam: ExamItem) => !exam.code.includes("-COMM-"));
  const communityExams = levelExams.filter((exam: ExamItem) => exam.code.includes("-COMM-"));

  const displayExams = tabIndex === 0 ? officialExams : communityExams;

  return (
    <Container maxWidth="md" className="animate-fade-in min-h-[calc(100vh-64px)] py-8">
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={() => router.push(`/practice/jlpt/${level.toLowerCase()}`)}
        className="mb-8 text-slate-500"
      >
        Trở lại
      </Button>

      <Typography variant="h4" fontWeight={800} className="mb-2 dark:text-white">
        Đề Thi Thử (Mock Tests) - {level.toUpperCase()}
      </Typography>
      <Typography variant="body1" className="mb-8 text-slate-500">
        Chọn một đề thi để bắt đầu làm bài. Thời gian và cấu trúc đề thi được mô phỏng giống với kỳ
        thi thực tế.
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        className="mb-6 border-b border-slate-200 dark:border-slate-700"
        TabIndicatorProps={{ className: "bg-indigo-600" }}
      >
        <Tab
          icon={<VerifiedIcon className="mb-0 mr-2" />}
          iconPosition="start"
          label={`Đề chính thức (${officialExams.length})`}
          className="font-bold text-slate-600 data-[state=selected]:text-indigo-600"
        />
        <Tab
          icon={<AutoAwesomeIcon className="mb-0 mr-2" />}
          iconPosition="start"
          label={`Đề cộng đồng AI (${communityExams.length})`}
          className="font-bold text-slate-600 data-[state=selected]:text-indigo-600"
        />
      </Tabs>

      {isLoading ? (
        <Box className="flex justify-center py-12">
          <CircularProgress />
        </Box>
      ) : displayExams.length === 0 ? (
        <Box className="py-12 text-center">
          <Typography variant="h6" className="mb-4 text-slate-500">
            {tabIndex === 0
              ? "Hiện tại chưa có đề thi chính thức nào cho cấp độ này."
              : "Hiện tại chưa có đề thi AI nào do cộng đồng đóng góp."}
          </Typography>
          {tabIndex === 1 && (
            <Button
              variant="outlined"
              onClick={() => router.push("/practice/jlpt/create-exam")}
              startIcon={<AutoAwesomeIcon />}
            >
              Hãy là người đầu tiên tạo đề AI
            </Button>
          )}
        </Box>
      ) : (
        <Box className="grid gap-4">
          {displayExams.map((exam: ExamItem) => (
            <Card
              key={exam.id}
              className="rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700"
            >
              <CardActionArea
                onClick={() => router.push(`/practice/jlpt/exam/${exam.id}`)}
                className="flex flex-row items-center justify-between p-6"
              >
                <Box>
                  <Box className="mb-1 flex items-center gap-3">
                    <Typography variant="h6" fontWeight={700} className="dark:text-white">
                      {exam.title}
                    </Typography>
                    {exam.code.includes("-COMM-") && (
                      <Chip
                        size="small"
                        label="AI Generated"
                        color="secondary"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Typography variant="body2" className="text-slate-500">
                    Mã đề: {exam.code} • Thời gian: {exam.totalDurationMinutes} phút
                  </Typography>
                </Box>
                <Box className="flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-2 font-bold text-white shadow-md transition-colors hover:bg-indigo-700">
                  Làm bài
                </Box>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}
