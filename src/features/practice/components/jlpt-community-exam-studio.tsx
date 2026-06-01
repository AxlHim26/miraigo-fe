"use client";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { importCommunityExam } from "../services/jlpt-service";

const steps = [
  "Chọn Cấp độ",
  "Tạo Từ Vựng (Vocab)",
  "Tạo Ngữ Pháp (Grammar)",
  "Xác nhận & Hoàn tất",
];

const getVocabRequirements = (level: string) => {
  if (level === "N5" || level === "N4") {
    return `- 9 câu Cách đọc Kanji.
- 6 câu Cách viết Kanji.
- 10 câu Điền từ vào văn cảnh.
- 5 câu Tìm từ đồng nghĩa.
- 5 câu Cách dùng từ.`;
  } else if (level === "N3") {
    return `- 8 câu Cách đọc Kanji.
- 6 câu Cách viết Kanji.
- 11 câu Điền từ vào văn cảnh.
- 5 câu Tìm từ đồng nghĩa.
- 5 câu Cách dùng từ.`;
  } else {
    return `- Tập trung vào cách đọc Kanji, điền từ, từ đồng nghĩa và cách dùng từ khó (khoảng 32 câu).`;
  }
};

const getGrammarRequirements = (level: string) => {
  if (level === "N5" || level === "N4") {
    return `- 15 câu Chọn ngữ pháp đúng.
- 5 câu Ghép câu dấu sao (*).
- 5 câu Điền từ vào đoạn văn.
- Đọc hiểu: 2 đoạn văn ngắn (mỗi đoạn 2 câu hỏi), 1 đoạn văn trung bình (3 câu hỏi).`;
  } else if (level === "N3") {
    return `- 13 câu Chọn ngữ pháp.
- 5 câu Ghép câu dấu sao (*).
- 5 câu Điền từ vào đoạn văn.
- Đọc hiểu: 2 đoạn văn ngắn, 2 đoạn trung bình, 1 đoạn dài (Kèm theo 16 câu hỏi trắc nghiệm chia đều).`;
  } else {
    return `- 22 câu ngữ pháp (chọn đáp án, dấu sao, điền vào đoạn văn).
- 21 câu đọc hiểu (đoạn văn ngắn, trung bình, dài, và so sánh 2 đoạn văn).`;
  }
};

const PROMPT_TEMPLATE_VOCAB = (
  level: string,
) => `Bạn là một chuyên gia ra đề thi JLPT tiếng Nhật. Hãy tạo PHẦN TỪ VỰNG (VOCABULARY) cho đề thi trình độ ${level} theo cấu trúc JSON nghiêm ngặt dưới đây. Tuyệt đối không giải thích thêm, chỉ in ra định dạng JSON hợp lệ.

Yêu cầu nội dung (Khoảng 35 câu):
${getVocabRequirements(level)}

Cấu trúc JSON BẮT BUỘC:
{
  "type": "VOCABULARY",
  "problems": [
    {
      "problemNumber": "1",
      "questions": [
        {
          "number": "1",
          "prompt": "新しいプロジェクトの【計画】を立てる。",
          "options": [
            {"key": "A", "text": "けいかく"},
            {"key": "B", "text": "けいがく"},
            {"key": "C", "text": "けいこう"},
            {"key": "D", "text": "けいか"}
          ],
          "correctAnswer": "A",
          "explanation": "計画 (けいかく) nghĩa là Kế hoạch."
        }
      ]
    }
  ]
}`;

const PROMPT_TEMPLATE_GRAMMAR = (
  level: string,
) => `Bạn là một chuyên gia ra đề thi JLPT tiếng Nhật. Hãy tạo PHẦN NGỮ PHÁP VÀ ĐỌC HIỂU (GRAMMAR_READING) cho đề thi trình độ ${level} theo cấu trúc JSON nghiêm ngặt dưới đây. Tuyệt đối không giải thích thêm, chỉ in ra định dạng JSON hợp lệ.

Yêu cầu nội dung (Khoảng 35-40 câu):
${getGrammarRequirements(level)}

Cấu trúc JSON BẮT BUỘC:
{
  "type": "GRAMMAR_READING",
  "problems": [
    {
      "problemNumber": "2",
      "questions": [
        {
          "number": "36",
          "prompt": "あしたは雨が _____ _____  __*__  _____ から、傘を持っていきます。",
          "passageText": "Đoạn văn đọc hiểu (nếu là câu ngữ pháp đơn thuần thì không cần trường này).",
          "options": [
            {"key": "A", "text": "降る"},
            {"key": "B", "text": "そう"},
            {"key": "C", "text": "だ"},
            {"key": "D", "text": "に"}
          ],
          "correctAnswer": "C",
          "explanation": "Giải thích chi tiết."
        }
      ]
    }
  ]
}`;

export default function JlptCommunityExamStudio() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [level, setLevel] = useState("N4");
  const [jsonVocab, setJsonVocab] = useState("");
  const [jsonGrammar, setJsonGrammar] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNext = () => {
    setError(null);
    if (activeStep === 1) {
      try {
        JSON.parse(jsonVocab);
      } catch {
        setError("JSON Từ Vựng không hợp lệ. Vui lòng kiểm tra lại.");
        return;
      }
    }
    if (activeStep === 2) {
      try {
        JSON.parse(jsonGrammar);
      } catch {
        setError("JSON Ngữ Pháp không hợp lệ. Vui lòng kiểm tra lại.");
        return;
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError(null);
    setActiveStep((prev) => prev - 1);
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      const parsedVocab = JSON.parse(jsonVocab);
      const parsedGrammar = JSON.parse(jsonGrammar);

      const combinedData = {
        level: level,
        title: `Đề thi ${level} Full Test do AI tạo`,
        sections: [parsedVocab, parsedGrammar],
      };

      const result = await importCommunityExam(combinedData);
      if (result && result.status === 200 && result.data) {
        router.push(`/practice/jlpt/exam/${result.data.examId}`);
      } else {
        setError(result?.message || "Có lỗi xảy ra khi import đề thi.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Kết nối tới server thất bại.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" className="animate-fade-in min-h-[calc(100vh-64px)] py-8">
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={() => router.push("/practice/jlpt")}
        className="mb-6 text-slate-500"
      >
        Trở lại
      </Button>

      <Typography variant="h4" fontWeight={800} className="mb-2 dark:text-white">
        AI Exam Studio
      </Typography>
      <Typography variant="body1" className="mb-8 text-slate-500">
        Tạo đề thi JLPT mới toanh bằng cách ghép 2 phần Từ Vựng và Ngữ Pháp/Đọc Hiểu.
      </Typography>

      <Stepper activeStep={activeStep} className="mb-10" alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper className="rounded-3xl border border-slate-200 bg-white/50 p-8 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/50">
        {activeStep === 0 && (
          <Box className="flex flex-col items-center">
            <Typography variant="h6" className="mb-6">
              Bạn muốn tạo đề thi cấp độ nào?
            </Typography>
            <FormControl className="mb-8 w-full max-w-xs">
              <InputLabel>Cấp độ JLPT</InputLabel>
              <Select
                value={level}
                label="Cấp độ JLPT"
                onChange={(e) => setLevel(e.target.value as string)}
                className="rounded-xl"
              >
                <MenuItem value="N5">N5</MenuItem>
                <MenuItem value="N4">N4</MenuItem>
                <MenuItem value="N3">N3</MenuItem>
                <MenuItem value="N2">N2</MenuItem>
                <MenuItem value="N1">N1</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              size="large"
              onClick={handleNext}
              className="rounded-xl bg-indigo-600 px-8 font-bold"
            >
              Tiếp tục
            </Button>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Alert severity="info" className="mb-6 rounded-xl">
              1. Copy Prompt bên dưới và dán vào AI.
              <br />
              2. Chờ AI trả kết quả, copy phần JSON và dán vào ô nhập liệu bên dưới.
            </Alert>
            <Box className="relative mb-6">
              <TextField
                multiline
                fullWidth
                rows={8}
                value={PROMPT_TEMPLATE_VOCAB(level)}
                InputProps={{ readOnly: true }}
                className="rounded-xl bg-slate-50 dark:bg-slate-900"
              />
              <Button
                variant="contained"
                color={copied ? "success" : "primary"}
                startIcon={<ContentCopyIcon />}
                onClick={() => handleCopyPrompt(PROMPT_TEMPLATE_VOCAB(level))}
                className="absolute right-4 top-4 rounded-lg font-bold shadow-md"
              >
                {copied ? "Đã Copy" : "Copy Prompt"}
              </Button>
            </Box>
            <Typography variant="subtitle2" className="mb-2 font-bold dark:text-white">
              Dán JSON Từ Vựng vào đây:
            </Typography>
            <TextField
              multiline
              fullWidth
              rows={8}
              placeholder='{\n  "type": "VOCABULARY",\n  "problems": [...]\n}'
              value={jsonVocab}
              onChange={(e) => setJsonVocab(e.target.value)}
              className="mb-6 rounded-xl bg-slate-50 font-mono dark:bg-slate-900"
            />
            {error && (
              <Alert severity="error" className="mb-6 rounded-xl">
                {error}
              </Alert>
            )}
            <Box className="flex justify-between">
              <Button onClick={handleBack} variant="outlined" className="rounded-xl">
                Quay lại
              </Button>
              <Button
                onClick={handleNext}
                disabled={!jsonVocab.trim()}
                variant="contained"
                className="rounded-xl bg-indigo-600 font-bold"
              >
                Tiếp tục phần Ngữ Pháp
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Alert severity="info" className="mb-6 rounded-xl">
              Tương tự, hãy yêu cầu AI sinh tiếp phần NGỮ PHÁP & ĐỌC HIỂU và dán JSON vào đây.
            </Alert>
            <Box className="relative mb-6">
              <TextField
                multiline
                fullWidth
                rows={8}
                value={PROMPT_TEMPLATE_GRAMMAR(level)}
                InputProps={{ readOnly: true }}
                className="rounded-xl bg-slate-50 dark:bg-slate-900"
              />
              <Button
                variant="contained"
                color={copied ? "success" : "primary"}
                startIcon={<ContentCopyIcon />}
                onClick={() => handleCopyPrompt(PROMPT_TEMPLATE_GRAMMAR(level))}
                className="absolute right-4 top-4 rounded-lg font-bold shadow-md"
              >
                {copied ? "Đã Copy" : "Copy Prompt"}
              </Button>
            </Box>
            <Typography variant="subtitle2" className="mb-2 font-bold dark:text-white">
              Dán JSON Ngữ Pháp/Đọc hiểu vào đây:
            </Typography>
            <TextField
              multiline
              fullWidth
              rows={8}
              placeholder='{\n  "type": "GRAMMAR_READING",\n  "problems": [...]\n}'
              value={jsonGrammar}
              onChange={(e) => setJsonGrammar(e.target.value)}
              className="mb-6 rounded-xl bg-slate-50 font-mono dark:bg-slate-900"
            />
            {error && (
              <Alert severity="error" className="mb-6 rounded-xl">
                {error}
              </Alert>
            )}
            <Box className="flex justify-between">
              <Button onClick={handleBack} variant="outlined" className="rounded-xl">
                Quay lại
              </Button>
              <Button
                onClick={handleNext}
                disabled={!jsonGrammar.trim()}
                variant="contained"
                className="rounded-xl bg-indigo-600 font-bold"
              >
                Đã có đủ 2 JSON
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 3 && (
          <Box className="text-center">
            <Typography variant="h5" fontWeight={800} className="mb-4 dark:text-white">
              Sẵn sàng tạo đề thi! 🎉
            </Typography>
            <Typography className="mb-8 text-slate-500">
              Bạn đã cung cấp đủ JSON cho Từ vựng và Ngữ pháp. Hệ thống sẽ tự động ghép nối và lưu
              vào cơ sở dữ liệu.
            </Typography>
            {error && (
              <Alert severity="error" className="mb-6 rounded-xl text-left">
                {error}
              </Alert>
            )}
            <Box className="flex justify-center gap-4">
              <Button
                onClick={handleBack}
                variant="outlined"
                disabled={isSubmitting}
                className="rounded-xl"
              >
                Quay lại sửa JSON
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="success"
                disabled={isSubmitting}
                className="rounded-xl px-8 font-bold shadow-lg"
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" className="mr-2" />
                ) : null}
                {isSubmitting ? "Đang xử lý..." : "Hợp nhất & Tạo Đề"}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
