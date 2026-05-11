"use client";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback, useRef, useState } from "react";

import VoiceRecorderButton from "@/features/practice/components/voice-recorder-button";
import { pronunciationSentences } from "@/features/practice/data/pronunciation-data";
import { useVoiceRecorder } from "@/features/practice/hooks/use-voice-recorder";
import { predictAudio } from "@/features/practice/services/voice-ai.service";
import type { PronunciationResult } from "@/features/practice/types/voice-ai.types";
import { LANGUAGE_MAP } from "@/features/practice/types/voice-ai.types";

function computeScore(
  expected: string,
  actual: string,
): { score: number; matched: string[]; unmatched: string[] } {
  // Normalize: lowercase, strip punctuation (keep kana/kanji/letters)
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[、。？！?!.,\s]+/g, " ")
      .trim();

  const expectedTokens = norm(expected).split(" ").filter(Boolean);
  const actualTokens = norm(actual).split(" ").filter(Boolean);
  const actualSet = new Set(actualTokens);

  const matched: string[] = [];
  const unmatched: string[] = [];

  for (const t of expectedTokens) {
    if (actualSet.has(t)) {
      matched.push(t);
    } else {
      unmatched.push(t);
    }
  }

  const score =
    expectedTokens.length > 0 ? Math.round((matched.length / expectedTokens.length) * 100) : 0;

  return { score, matched, unmatched };
}

export default function PracticePronunciationView() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { isRecording, audioBlob, audioUrl, startRecording, stopRecording, reset } =
    useVoiceRecorder({ autoStopMs: 15_000 });

  const sentence = pronunciationSentences[currentIdx];

  const handleAnalyze = useCallback(async () => {
    if (!audioBlob || !sentence) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const data = await predictAudio(audioBlob);
      const isCorrectLang = data.language === "ja";
      const { score, matched, unmatched } = computeScore(sentence.japanese, data.transcript);

      setResult({
        language: data.language,
        confidence: data.confidence,
        transcript: data.transcript,
        isCorrectLanguage: isCorrectLang,
        matchedWords: matched,
        unmatchedWords: unmatched,
        score,
      });
    } catch {
      setError("Không thể kết nối tới Voice AI server. Hãy kiểm tra server đang chạy.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [audioBlob, sentence]);

  const handleNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % pronunciationSentences.length);
    setResult(null);
    setError(null);
    reset();
  }, [reset]);

  const handlePlayback = useCallback(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  }, [audioUrl]);

  const langInfo = result ? LANGUAGE_MAP[result.language] : null;

  if (!sentence) return null;

  return (
    <Stack spacing={3} className="mx-auto max-w-2xl">
      <Typography variant="h4" fontWeight={700}>
        🎙️ Luyện Phát Âm
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Đọc câu tiếng Nhật bên dưới, hệ thống AI sẽ nhận diện ngôn ngữ và chấm điểm phát âm của bạn.
      </Typography>

      {/* ===== SENTENCE CARD ===== */}
      <Box className="app-card rounded-2xl p-6" sx={{ textAlign: "center" }}>
        <Chip
          label={sentence.level}
          size="small"
          sx={{
            mb: 1.5,
            fontWeight: 700,
            fontSize: "0.75rem",
          }}
        />
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

        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
          Câu {currentIdx + 1} / {pronunciationSentences.length}
        </Typography>
      </Box>

      {/* ===== RECORDER ===== */}
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
              : "Nhấn micro để bắt đầu"}
        </Typography>
      </Stack>

      {/* ===== ACTION BUTTONS ===== */}
      {audioBlob && !result && (
        <Stack direction="row" spacing={1.5} justifyContent="center">
          <Button
            variant="contained"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            startIcon={isAnalyzing ? <CircularProgress size={16} /> : undefined}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {isAnalyzing ? "Đang phân tích..." : "🧠 Phân tích"}
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

      {/* ===== ERROR ===== */}
      {error && (
        <Box className="state-error">
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}

      {/* ===== RESULT ===== */}
      {result && (
        <Box className="app-card rounded-2xl p-5">
          <Stack spacing={2.5}>
            {/* Language detection */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
              {result.isCorrectLanguage ? (
                <CheckCircleIcon sx={{ color: "var(--app-success)" }} />
              ) : (
                <ErrorIcon sx={{ color: "var(--app-danger)" }} />
              )}
              <Typography variant="body1" fontWeight={600}>
                {result.isCorrectLanguage
                  ? "Ngôn ngữ đúng: Tiếng Nhật"
                  : `Ngôn ngữ phát hiện: ${langInfo?.flag ?? ""} ${langInfo?.label ?? result.language.toUpperCase()}`}
              </Typography>
              <Chip
                label={`${(result.confidence * 100).toFixed(1)}%`}
                size="small"
                sx={{
                  fontWeight: 700,
                  bgcolor: langInfo?.color ?? "var(--app-primary)",
                  color: "#fff",
                  fontSize: "0.7rem",
                }}
              />
            </Stack>

            {/* Score */}
            <Box>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                <Typography variant="body2" fontWeight={600}>
                  Điểm phát âm
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{
                    color:
                      result.score >= 70
                        ? "var(--app-success)"
                        : result.score >= 40
                          ? "var(--app-warning)"
                          : "var(--app-danger)",
                  }}
                >
                  {result.score}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={result.score}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "var(--app-surface-2)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    background:
                      result.score >= 70
                        ? "var(--app-success)"
                        : result.score >= 40
                          ? "var(--app-warning)"
                          : "var(--app-danger)",
                  },
                }}
              />
            </Box>

            {/* Transcript */}
            <Box>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                📝 AI nghe được:
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
                {result.transcript || "(Không nghe được nội dung)"}
              </Typography>
            </Box>

            {/* Actions */}
            <Stack direction="row" spacing={1.5} justifyContent="center">
              <Button
                variant="contained"
                endIcon={<NavigateNextIcon />}
                onClick={handleNext}
                sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600 }}
              >
                Câu tiếp theo
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
          </Stack>
        </Box>
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef} hidden />
    </Stack>
  );
}
