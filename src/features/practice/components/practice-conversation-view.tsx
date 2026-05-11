"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useRef, useState } from "react";

import VoiceRecorderButton from "@/features/practice/components/voice-recorder-button";
import { useVoiceRecorder } from "@/features/practice/hooks/use-voice-recorder";
import { predictAudio } from "@/features/practice/services/voice-ai.service";
import { LANGUAGE_MAP } from "@/features/practice/types/voice-ai.types";

interface ChatBubble {
  id: number;
  language: string;
  confidence: number;
  transcript: string;
  audioUrl: string | null;
  timestamp: Date;
}

export default function PracticeConversationView() {
  const [bubbles, setBubbles] = useState<ChatBubble[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const idRef = useRef(0);

  const { isRecording, audioBlob, audioUrl, startRecording, stopRecording, reset } =
    useVoiceRecorder({ autoStopMs: 10_000 });

  // Auto-analyze when recording stops
  useEffect(() => {
    if (!audioBlob || isRecording) return;

    const analyze = async () => {
      setIsAnalyzing(true);
      setError(null);

      try {
        const data = await predictAudio(audioBlob);
        idRef.current += 1;
        setBubbles((prev) => [
          ...prev,
          {
            id: idRef.current,
            language: data.language,
            confidence: data.confidence,
            transcript: data.transcript || "(Không nghe rõ)",
            audioUrl: audioUrl,
            timestamp: new Date(),
          },
        ]);
      } catch {
        setError("Không thể kết nối tới Voice AI server.");
      } finally {
        setIsAnalyzing(false);
        reset();
      }
    };

    analyze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBlob]);

  // Auto-scroll on new bubble
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [bubbles.length]);

  const handlePlayback = useCallback((url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
    }
  }, []);

  const handleClear = useCallback(() => {
    setBubbles([]);
    setError(null);
  }, []);

  const statusText = isRecording
    ? "🔴 Đang thu âm..."
    : isAnalyzing
      ? "🧠 Đang phân tích..."
      : "Nhấn micro để nói";

  return (
    <Stack className="mx-auto flex h-full max-w-2xl flex-col">
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2, flexShrink: 0 }}
      >
        <div>
          <Typography variant="h4" fontWeight={700}>
            🗣️ Hội Thoại Realtime
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Nói tiếng Nhật — AI nhận diện ngôn ngữ và gỡ băng tức thì.
          </Typography>
        </div>
        {bubbles.length > 0 && (
          <Button
            size="small"
            startIcon={<DeleteOutlineIcon />}
            onClick={handleClear}
            sx={{ textTransform: "none", color: "var(--app-muted)" }}
          >
            Xoá
          </Button>
        )}
      </Stack>

      {/* Chat area */}
      <Box
        ref={scrollRef}
        className="no-scrollbar"
        sx={{
          flex: 1,
          overflowY: "auto",
          minHeight: 300,
          maxHeight: "calc(100vh - 340px)",
          p: 2,
          borderRadius: 3,
          bgcolor: "var(--app-surface-2)",
          border: "1px solid var(--app-border)",
        }}
      >
        {bubbles.length === 0 && !isAnalyzing && (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%", minHeight: 200, opacity: 0.5 }}
          >
            <Typography variant="body1" sx={{ fontSize: "2.5rem", mb: 1 }}>
              🎤
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Nhấn micro bên dưới để bắt đầu cuộc hội thoại.
              <br />
              Mỗi lần nói, AI sẽ nhận diện ngôn ngữ và gỡ băng văn bản.
            </Typography>
          </Stack>
        )}

        <Stack spacing={2}>
          {bubbles.map((bubble) => {
            const lang = LANGUAGE_MAP[bubble.language];
            return (
              <Box
                key={bubble.id}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  animation: "fadeSlideUp 0.3s ease-out",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "85%",
                    borderRadius: "16px 16px 4px 16px",
                    bgcolor: "var(--app-card)",
                    border: "1px solid var(--app-border)",
                    p: 2,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Language badge */}
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Chip
                      label={`${lang?.flag ?? "🌐"} ${lang?.label ?? bubble.language.toUpperCase()}`}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        height: 22,
                        bgcolor: lang?.color ?? "var(--app-muted)",
                        color: "#fff",
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {(bubble.confidence * 100).toFixed(1)}%
                    </Typography>
                    {bubble.audioUrl && (
                      <IconButton
                        size="small"
                        onClick={() => handlePlayback(bubble.audioUrl!)}
                        sx={{ p: 0.3 }}
                        aria-label="Nghe lại"
                      >
                        <PlayArrowIcon sx={{ fontSize: 16, color: "var(--app-muted)" }} />
                      </IconButton>
                    )}
                  </Stack>

                  {/* Transcript */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'Noto Sans JP', sans-serif",
                      lineHeight: 1.7,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {bubble.transcript}
                  </Typography>

                  {/* Timestamp */}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 0.5, textAlign: "right", fontSize: "0.65rem" }}
                  >
                    {bubble.timestamp.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </Typography>
                </Box>
              </Box>
            );
          })}

          {/* Analyzing indicator */}
          {isAnalyzing && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box
                sx={{
                  borderRadius: "16px 16px 4px 16px",
                  bgcolor: "var(--app-card)",
                  border: "1px solid var(--app-border)",
                  px: 3,
                  py: 1.5,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircularProgress size={16} />
                  <Typography variant="body2" color="text.secondary">
                    Đang phân tích...
                  </Typography>
                </Stack>
              </Box>
            </Box>
          )}
        </Stack>
      </Box>

      {/* Error */}
      {error && (
        <Box className="state-error" sx={{ mt: 1.5 }}>
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}

      {/* Bottom mic bar */}
      <Stack alignItems="center" spacing={1} sx={{ mt: 2, flexShrink: 0 }}>
        <VoiceRecorderButton
          isRecording={isRecording}
          onStart={startRecording}
          onStop={stopRecording}
          disabled={isAnalyzing}
          size="medium"
        />
        <Typography variant="caption" color="text.secondary">
          {statusText}
        </Typography>
      </Stack>

      {/* Hidden audio */}
      <audio ref={audioRef} hidden />

      {/* Inline animation keyframes */}
      <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Stack>
  );
}
