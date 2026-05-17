"use client";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useCallback, useMemo, useRef, useState } from "react";

import VoiceRecorderButton from "@/features/practice/components/voice-recorder-button";
import { shadowingSentences } from "@/features/practice/data/shadowing-data";
import { useVoiceRecorder } from "@/features/practice/hooks/use-voice-recorder";
import { predictAudio } from "@/features/practice/services/voice-ai.service";
import { LANGUAGE_MAP } from "@/features/practice/types/voice-ai.types";

/* ------------------------------------------------------------------ */
/*  Character-level diff for Japanese text comparison                  */
/* ------------------------------------------------------------------ */
interface CharDiff {
  char: string;
  status: "match" | "miss" | "extra";
}

function diffChars(expected: string, actual: string): CharDiff[] {
  const norm = (s: string) => s.replace(/[\s、。？！?!.,]+/g, "");
  const exp = norm(expected);
  const act = norm(actual);

  // Simple LCS-based diff
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

  // Backtrack to build diff
  const result: CharDiff[] = [];
  let i = m;
  let j = n;

  const stack: CharDiff[] = [];
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

  while (stack.length > 0) {
    result.push(stack.pop()!);
  }

  return result;
}

function computeAccuracy(expected: string, actual: string): number {
  const diffs = diffChars(expected, actual);
  const matched = diffs.filter((d) => d.status === "match").length;
  const total = diffs.filter((d) => d.status !== "extra").length;
  return total > 0 ? Math.round((matched / total) * 100) : 0;
}

/* ------------------------------------------------------------------ */
/*  Step definitions                                                   */
/* ------------------------------------------------------------------ */
type ShadowStep = "listen" | "record" | "result";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function PracticeShadowingView() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [step, setStep] = useState<ShadowStep>("listen");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Result state
  const [transcript, setTranscript] = useState("");
  const [language, setLanguage] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [charDiffs, setCharDiffs] = useState<CharDiff[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);

  const { isRecording, audioBlob, audioUrl, startRecording, stopRecording, reset } =
    useVoiceRecorder({ autoStopMs: 15_000 });

  const sentence = shadowingSentences[currentIdx];

  // ── Speak the sentence using Web Speech API ──
  const handleSpeak = useCallback(() => {
    if (!sentence) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(sentence.speakText);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;

    // Prefer a Japanese voice
    const voices = synth.getVoices();
    const jaVoice = voices.find((v) => v.lang.startsWith("ja"));
    if (jaVoice) utterance.voice = jaVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
  }, [sentence]);

  // ── Move to record step ──
  const handleReadyToRecord = useCallback(() => {
    setStep("record");
    setError(null);
    reset();
  }, [reset]);

  // ── Analyze recording ──
  const handleAnalyze = useCallback(async () => {
    if (!audioBlob || !sentence) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const data = await predictAudio(audioBlob);
      setTranscript(data.transcript || "");
      setLanguage(data.language);
      setConfidence(data.confidence);

      const acc = computeAccuracy(sentence.japanese, data.transcript);
      setAccuracy(acc);
      setCharDiffs(diffChars(sentence.japanese, data.transcript));
      setStep("result");
    } catch {
      setError("Không thể kết nối tới Voice AI server.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [audioBlob, sentence]);

  // ── Navigation ──
  const handleNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % shadowingSentences.length);
    setStep("listen");
    setError(null);
    reset();
    setCharDiffs([]);
  }, [reset]);

  const handlePrev = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + shadowingSentences.length) % shadowingSentences.length);
    setStep("listen");
    setError(null);
    reset();
    setCharDiffs([]);
  }, [reset]);

  const handleRetry = useCallback(() => {
    setStep("listen");
    setError(null);
    reset();
    setCharDiffs([]);
  }, [reset]);

  const handlePlayback = useCallback(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  }, [audioUrl]);

  const langInfo = language ? LANGUAGE_MAP[language] : null;
  const isCorrectLang = language === "ja";

  const stepLabel = useMemo(() => {
    switch (step) {
      case "listen":
        return "Bước 1: Nghe mẫu";
      case "record":
        return "Bước 2: Lặp lại";
      case "result":
        return "Kết quả";
    }
  }, [step]);

  if (!sentence) return null;

  return (
    <Stack spacing={3} className="mx-auto max-w-2xl">
      <Typography variant="h4" fontWeight={700}>
        🔊 Shadowing
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Nghe câu mẫu → Lặp lại → AI chấm điểm độ chính xác từng ký tự.
      </Typography>

      {/* ===== STEP INDICATOR ===== */}
      <Stack direction="row" alignItems="center" spacing={1}>
        {(["listen", "record", "result"] as ShadowStep[]).map((s, idx) => (
          <Box key={s} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
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
                bgcolor:
                  step === s
                    ? "var(--app-primary)"
                    : idx < ["listen", "record", "result"].indexOf(step)
                      ? "var(--app-success)"
                      : "var(--app-surface-2)",
                color:
                  step === s || idx < ["listen", "record", "result"].indexOf(step)
                    ? "#fff"
                    : "var(--app-muted)",
                transition: "all 200ms",
              }}
            >
              {idx + 1}
            </Box>
            {idx < 2 && (
              <Box
                sx={{
                  width: 40,
                  height: 2,
                  bgcolor:
                    idx < ["listen", "record", "result"].indexOf(step)
                      ? "var(--app-success)"
                      : "var(--app-border)",
                  borderRadius: 1,
                }}
              />
            )}
          </Box>
        ))}
        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
          {stepLabel}
        </Typography>
      </Stack>

      {/* ===== SENTENCE CARD ===== */}
      <Box className="app-card rounded-2xl p-6" sx={{ textAlign: "center" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Chip label={sentence.level} size="small" sx={{ fontWeight: 700, fontSize: "0.75rem" }} />
          <Typography variant="caption" color="text.secondary">
            {currentIdx + 1} / {shadowingSentences.length}
          </Typography>
        </Stack>

        <Typography
          variant="h5"
          fontWeight={600}
          sx={{ mb: 1, fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.7 }}
        >
          {sentence.japanese}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {sentence.romaji}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {sentence.meaning}
        </Typography>

        {/* Speak button */}
        <Box sx={{ mt: 2 }}>
          <Tooltip title="Nghe phát âm mẫu">
            <IconButton
              onClick={handleSpeak}
              disabled={isSpeaking}
              sx={{
                bgcolor: "var(--app-primary-soft)",
                color: "var(--app-primary)",
                "&:hover": { bgcolor: "var(--app-primary)", color: "#fff" },
              }}
            >
              <VolumeUpIcon />
            </IconButton>
          </Tooltip>
          {isSpeaking && (
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
              🔊 Đang phát...
            </Typography>
          )}
        </Box>
      </Box>

      {/* ===== STEP: LISTEN ===== */}
      {step === "listen" && (
        <Stack alignItems="center" spacing={2}>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Nhấn 🔊 để nghe câu mẫu, sau đó nhấn nút bên dưới khi sẵn sàng lặp lại.
          </Typography>
          <Button
            variant="contained"
            endIcon={<NavigateNextIcon />}
            onClick={handleReadyToRecord}
            sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600, px: 4 }}
          >
            Sẵn sàng lặp lại
          </Button>
        </Stack>
      )}

      {/* ===== STEP: RECORD ===== */}
      {step === "record" && (
        <Stack alignItems="center" spacing={2}>
          <VoiceRecorderButton
            isRecording={isRecording}
            onStart={startRecording}
            onStop={stopRecording}
            disabled={isAnalyzing}
          />
          <Typography variant="caption" color="text.secondary">
            {isRecording
              ? "🔴 Đang thu âm... Nhấn để dừng"
              : audioBlob
                ? "✅ Đã thu âm xong"
                : "Nhấn micro và lặp lại câu mẫu"}
          </Typography>

          {audioBlob && !isAnalyzing && (
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="contained"
                onClick={handleAnalyze}
                startIcon={isAnalyzing ? <CircularProgress size={16} /> : undefined}
                sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600 }}
              >
                🧠 So sánh
              </Button>
              <Button
                variant="outlined"
                onClick={handlePlayback}
                startIcon={<PlayArrowIcon />}
                sx={{ borderRadius: 3, textTransform: "none" }}
              >
                Nghe lại
              </Button>
            </Stack>
          )}

          {isAnalyzing && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <CircularProgress size={18} />
              <Typography variant="body2" color="text.secondary">
                Đang phân tích...
              </Typography>
            </Stack>
          )}
        </Stack>
      )}

      {/* ===== ERROR ===== */}
      {error && (
        <Box className="state-error">
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}

      {/* ===== STEP: RESULT ===== */}
      {step === "result" && (
        <Box className="app-card rounded-2xl p-5">
          <Stack spacing={2.5}>
            {/* Language check */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
              {isCorrectLang ? (
                <CheckCircleIcon sx={{ color: "var(--app-success)" }} />
              ) : (
                <ErrorIcon sx={{ color: "var(--app-danger)" }} />
              )}
              <Typography variant="body1" fontWeight={600}>
                {isCorrectLang
                  ? "✅ Ngôn ngữ đúng: Tiếng Nhật"
                  : `❌ Phát hiện: ${langInfo?.flag ?? ""} ${langInfo?.label ?? language.toUpperCase()}`}
              </Typography>
              <Chip
                label={`${(confidence * 100).toFixed(1)}%`}
                size="small"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  bgcolor: langInfo?.color ?? "var(--app-primary)",
                  color: "#fff",
                }}
              />
            </Stack>

            {/* Accuracy score */}
            <Box>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                <Typography variant="body2" fontWeight={600}>
                  Độ chính xác Shadowing
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{
                    color:
                      accuracy >= 80
                        ? "var(--app-success)"
                        : accuracy >= 50
                          ? "var(--app-warning)"
                          : "var(--app-danger)",
                  }}
                >
                  {accuracy}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={accuracy}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "var(--app-surface-2)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    background:
                      accuracy >= 80
                        ? "var(--app-success)"
                        : accuracy >= 50
                          ? "var(--app-warning)"
                          : "var(--app-danger)",
                  },
                }}
              />
            </Box>

            {/* Character diff */}
            <Box>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                📝 So sánh ký tự:
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
                {charDiffs.map((d, idx) => (
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

            {/* AI transcript */}
            <Box>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                🎤 AI nghe được:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "var(--app-surface-2)",
                  fontFamily: "'Noto Sans JP', sans-serif",
                  lineHeight: 1.8,
                }}
              >
                {transcript || "(Không nghe rõ)"}
              </Typography>
            </Box>

            {/* Actions */}
            <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap" useFlexGap>
              <Button
                variant="outlined"
                startIcon={<ReplayIcon />}
                onClick={handleRetry}
                sx={{ borderRadius: 3, textTransform: "none" }}
              >
                Thử lại
              </Button>
              <Button
                variant="outlined"
                onClick={handlePlayback}
                startIcon={<PlayArrowIcon />}
                sx={{ borderRadius: 3, textTransform: "none" }}
              >
                Nghe lại
              </Button>
              <Button
                variant="contained"
                endIcon={<NavigateNextIcon />}
                onClick={handleNext}
                sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600 }}
              >
                Câu tiếp
              </Button>
            </Stack>
          </Stack>
        </Box>
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

      {/* Hidden audio */}
      <audio ref={audioRef} hidden />
    </Stack>
  );
}
