"use client";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import QuizIcon from "@mui/icons-material/Quiz";
import ReplayIcon from "@mui/icons-material/Replay";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useRef, useState } from "react";

import { listeningQuestions } from "@/features/practice/data/listening-data";

/* ------------------------------------------------------------------ */
/*  Character-level diff (reused from shadowing)                       */
/* ------------------------------------------------------------------ */
interface CharDiff {
  char: string;
  status: "match" | "miss" | "extra";
}

function diffChars(expected: string, actual: string): CharDiff[] {
  const norm = (s: string) => s.replace(/[\s、。？！?!.,]+/g, "");
  const exp = norm(expected);
  const act = norm(actual);

  const m = exp.length;
  const n = act.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i]![j] =
        exp[i - 1] === act[j - 1]
          ? dp[i - 1]![j - 1]! + 1
          : Math.max(dp[i - 1]![j]!, dp[i]![j - 1]!);
    }
  }

  const stack: CharDiff[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && exp[i - 1] === act[j - 1]) {
      stack.push({ char: exp[i - 1]!, status: "match" });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i]![j - 1]! >= dp[i - 1]![j]!)) {
      stack.push({ char: act[j - 1]!, status: "extra" });
      j--;
    } else {
      stack.push({ char: exp[i - 1]!, status: "miss" });
      i--;
    }
  }

  const result: CharDiff[] = [];
  while (stack.length > 0) result.push(stack.pop()!);
  return result;
}

function computeAccuracy(expected: string, actual: string): number {
  const diffs = diffChars(expected, actual);
  const matched = diffs.filter((d) => d.status === "match").length;
  const total = diffs.filter((d) => d.status !== "extra").length;
  return total > 0 ? Math.round((matched / total) * 100) : 0;
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
type ListenMode = "dictation" | "quiz";
type AnswerState = "idle" | "correct" | "wrong";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function PracticeListeningView() {
  const [mode, setMode] = useState<ListenMode>("quiz");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Quiz state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [streak, setStreak] = useState(0);

  // Dictation state
  const [userInput, setUserInput] = useState("");
  const [dictationSubmitted, setDictationSubmitted] = useState(false);
  const [dictationDiffs, setDictationDiffs] = useState<CharDiff[]>([]);
  const [dictationAccuracy, setDictationAccuracy] = useState(0);

  // Stats
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const question = listeningQuestions[currentIdx];

  // Shuffle answers for quiz mode
  const [quizChoices, setQuizChoices] = useState<string[]>([]);

  useEffect(() => {
    if (!question) {
      setQuizChoices([]);
      return;
    }
    const all = [question.meaning, ...question.distractors];
    // Fisher-Yates shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j]!, all[i]!];
    }
    setQuizChoices(all);
  }, [question]);

  // ── TTS ──
  const handleSpeak = useCallback(() => {
    if (!question) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(question.speakText);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;

    const voices = synth.getVoices();
    const jaVoice = voices.find((v) => v.lang.startsWith("ja"));
    if (jaVoice) utterance.voice = jaVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
  }, [question]);

  // ── Quiz: Select answer ──
  const handleQuizSelect = useCallback(
    (choice: string) => {
      if (answerState !== "idle" || !question) return;
      setSelectedAnswer(choice);
      setTotalAnswered((p) => p + 1);

      if (choice === question.meaning) {
        setAnswerState("correct");
        setStreak((p) => p + 1);
        setTotalCorrect((p) => p + 1);
      } else {
        setAnswerState("wrong");
        setStreak(0);
      }
    },
    [answerState, question],
  );

  // ── Dictation: Submit ──
  const handleDictationSubmit = useCallback(() => {
    if (!question || !userInput.trim()) return;
    const diffs = diffChars(question.japanese, userInput);
    const acc = computeAccuracy(question.japanese, userInput);
    setDictationDiffs(diffs);
    setDictationAccuracy(acc);
    setDictationSubmitted(true);
    setTotalAnswered((p) => p + 1);
    if (acc >= 80) {
      setTotalCorrect((p) => p + 1);
      setStreak((p) => p + 1);
    } else {
      setStreak(0);
    }
  }, [question, userInput]);

  // ── Navigation ──
  const handleNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % listeningQuestions.length);
    setSelectedAnswer(null);
    setAnswerState("idle");
    setUserInput("");
    setDictationSubmitted(false);
    setDictationDiffs([]);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + listeningQuestions.length) % listeningQuestions.length);
    setSelectedAnswer(null);
    setAnswerState("idle");
    setUserInput("");
    setDictationSubmitted(false);
    setDictationDiffs([]);
  }, []);

  const handleModeChange = useCallback((_: unknown, val: ListenMode | null) => {
    if (!val) return;
    setMode(val);
    setSelectedAnswer(null);
    setAnswerState("idle");
    setUserInput("");
    setDictationSubmitted(false);
    setDictationDiffs([]);
  }, []);

  if (!question) return null;

  return (
    <Stack spacing={3} className="mx-auto max-w-2xl">
      <Typography variant="h4" fontWeight={700}>
        Luyện Nghe
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Nghe câu tiếng Nhật và trả lời — chọn giữa mode Quiz hoặc Dictation.
      </Typography>

      {/* ===== MODE TOGGLE ===== */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              textTransform: "none",
              fontWeight: 600,
              px: 2,
              borderRadius: "12px !important",
              fontSize: "0.85rem",
            },
            "& .Mui-selected": {
              bgcolor: "var(--app-primary) !important",
              color: "#fff !important",
            },
          }}
        >
          <ToggleButton value="quiz">
            <QuizIcon sx={{ mr: 0.5, fontSize: 18 }} /> Quiz
          </ToggleButton>
          <ToggleButton value="dictation">
            <EditNoteIcon sx={{ mr: 0.5, fontSize: 18 }} /> Dictation
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Stats */}
        <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
          {streak > 1 && (
            <Chip
              label={`🔥 ${streak}`}
              size="small"
              sx={{
                fontWeight: 700,
                bgcolor: "var(--app-warning)",
                color: "#fff",
                fontSize: "0.75rem",
              }}
            />
          )}
          <Chip
            label={`${totalCorrect}/${totalAnswered}`}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 600, fontSize: "0.75rem" }}
          />
        </Stack>
      </Stack>

      {/* ===== LISTEN CARD ===== */}
      <Box className="app-card rounded-2xl p-6" sx={{ textAlign: "center" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Chip label={question.level} size="small" sx={{ fontWeight: 700, fontSize: "0.75rem" }} />
          <Typography variant="caption" color="text.secondary">
            {currentIdx + 1} / {listeningQuestions.length}
          </Typography>
        </Stack>

        {/* Big speaker button */}
        <Tooltip title="Nhấn để nghe">
          <IconButton
            onClick={handleSpeak}
            disabled={isSpeaking}
            sx={{
              width: 80,
              height: 80,
              bgcolor: "var(--app-primary-soft)",
              color: "var(--app-primary)",
              transition: "all 200ms",
              "&:hover": { bgcolor: "var(--app-primary)", color: "#fff", transform: "scale(1.05)" },
            }}
          >
            <VolumeUpIcon sx={{ fontSize: 36 }} />
          </IconButton>
        </Tooltip>
        {isSpeaking && (
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
            Đang phát...
          </Typography>
        )}

        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
          {mode === "quiz" ? "Nghe và chọn nghĩa đúng" : "Nghe và gõ lại bằng tiếng Nhật"}
        </Typography>
      </Box>

      {/* ===== QUIZ MODE ===== */}
      {mode === "quiz" && (
        <Stack spacing={1.5}>
          {quizChoices.map((choice, idx) => {
            const isSelected = selectedAnswer === choice;
            const isCorrect = choice === question.meaning;
            const showResult = answerState !== "idle";

            let borderColor = "var(--app-border)";
            let bgColor = "transparent";
            let icon = null;

            if (showResult && isCorrect) {
              borderColor = "var(--app-success)";
              bgColor = "rgba(34, 197, 94, 0.08)";
              icon = <CheckIcon sx={{ color: "var(--app-success)", fontSize: 20 }} />;
            } else if (showResult && isSelected && !isCorrect) {
              borderColor = "var(--app-danger)";
              bgColor = "rgba(239, 68, 68, 0.08)";
              icon = <CloseIcon sx={{ color: "var(--app-danger)", fontSize: 20 }} />;
            }

            return (
              <Box
                key={idx}
                onClick={() => handleQuizSelect(choice)}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: `2px solid ${borderColor}`,
                  bgcolor: bgColor,
                  cursor: answerState === "idle" ? "pointer" : "default",
                  transition: "all 150ms",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  "&:hover":
                    answerState === "idle"
                      ? { borderColor: "var(--app-primary)", bgcolor: "var(--app-primary-soft)" }
                      : {},
                }}
              >
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    bgcolor: isSelected ? "var(--app-primary)" : "var(--app-surface-2)",
                    color: isSelected ? "#fff" : "var(--app-muted)",
                    flexShrink: 0,
                  }}
                >
                  {String.fromCharCode(65 + idx)}
                </Box>
                <Typography variant="body2" fontWeight={isSelected ? 600 : 400} sx={{ flex: 1 }}>
                  {choice}
                </Typography>
                {icon}
              </Box>
            );
          })}

          {/* Result feedback */}
          {answerState !== "idle" && (
            <Stack spacing={1.5} sx={{ mt: 1 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "var(--app-surface-2)",
                  fontFamily: "'Noto Sans JP', sans-serif",
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                  {question.japanese}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {question.meaning}
                </Typography>
              </Box>
              <Button
                variant="contained"
                endIcon={<NavigateNextIcon />}
                onClick={handleNext}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  alignSelf: "center",
                }}
              >
                Câu tiếp
              </Button>
            </Stack>
          )}
        </Stack>
      )}

      {/* ===== DICTATION MODE ===== */}
      {mode === "dictation" && (
        <Stack spacing={2}>
          {!dictationSubmitted ? (
            <>
              <TextField
                inputRef={inputRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Gõ lại câu tiếng Nhật bạn nghe được..."
                multiline
                minRows={2}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleDictationSubmit();
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontSize: "1.1rem",
                  },
                }}
              />
              <Stack direction="row" spacing={1.5} justifyContent="center">
                <Button
                  variant="contained"
                  onClick={handleDictationSubmit}
                  disabled={!userInput.trim()}
                  sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600 }}
                >
                  Kiểm tra
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ReplayIcon />}
                  onClick={handleSpeak}
                  sx={{ borderRadius: 3, textTransform: "none" }}
                >
                  Nghe lại
                </Button>
              </Stack>
            </>
          ) : (
            <Stack spacing={2}>
              {/* Accuracy */}
              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={600}>
                    Độ chính xác
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{
                      color:
                        dictationAccuracy >= 80
                          ? "var(--app-success)"
                          : dictationAccuracy >= 50
                            ? "var(--app-warning)"
                            : "var(--app-danger)",
                    }}
                  >
                    {dictationAccuracy}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={dictationAccuracy}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "var(--app-surface-2)",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      background:
                        dictationAccuracy >= 80
                          ? "var(--app-success)"
                          : dictationAccuracy >= 50
                            ? "var(--app-warning)"
                            : "var(--app-danger)",
                    },
                  }}
                />
              </Box>

              {/* Char diff */}
              <Box>
                <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                  So sánh ký tự:
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "var(--app-surface-2)",
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontSize: "1.2rem",
                    lineHeight: 2,
                    letterSpacing: "0.05em",
                  }}
                >
                  {dictationDiffs.map((d, idx) => (
                    <span
                      key={idx}
                      style={{
                        color:
                          d.status === "match"
                            ? "var(--app-success)"
                            : d.status === "miss"
                              ? "var(--app-danger)"
                              : "var(--app-warning)",
                        textDecoration:
                          d.status === "miss"
                            ? "line-through"
                            : d.status === "extra"
                              ? "underline"
                              : "none",
                        fontWeight: d.status === "match" ? 400 : 700,
                      }}
                    >
                      {d.char}
                    </span>
                  ))}
                </Box>
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Typography variant="caption" sx={{ color: "var(--app-success)" }}>
                    ● Đúng
                  </Typography>
                  <Typography variant="caption" sx={{ color: "var(--app-danger)" }}>
                    ● Thiếu
                  </Typography>
                  <Typography variant="caption" sx={{ color: "var(--app-warning)" }}>
                    ● Thừa
                  </Typography>
                </Stack>
              </Box>

              {/* Correct answer */}
              <Box
                sx={{ p: 2, borderRadius: 2, bgcolor: "var(--app-surface-2)", textAlign: "center" }}
              >
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{ fontFamily: "'Noto Sans JP', sans-serif", mb: 0.5 }}
                >
                  {question.japanese}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {question.meaning}
                </Typography>
              </Box>

              <Button
                variant="contained"
                endIcon={<NavigateNextIcon />}
                onClick={handleNext}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  alignSelf: "center",
                }}
              >
                Câu tiếp
              </Button>
            </Stack>
          )}
        </Stack>
      )}

      {/* ===== NAV ARROWS ===== */}
      <Stack direction="row" justifyContent="center" spacing={1}>
        <IconButton onClick={handlePrev} size="small" aria-label="Câu trước">
          <SkipPreviousIcon />
        </IconButton>
        <IconButton onClick={handleNext} size="small" aria-label="Câu sau">
          <SkipNextIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}
