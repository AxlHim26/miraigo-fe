"use client";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback, useRef, useState } from "react";

import { predictAudioStream } from "@/features/practice/services/voice-ai.service";
import type { VoiceStreamEvent } from "@/features/practice/types/voice-ai.types";
import { LANGUAGE_MAP } from "@/features/practice/types/voice-ai.types";

interface TranscriptChunk {
  id: number;
  text: string;
  language: string;
}

export default function PracticeTranscribeView() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState("");
  const [chunks, setChunks] = useState<TranscriptChunk[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const processFile = useCallback(async (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setIsProcessing(true);
    setProgress(0);
    setChunks([]);
    setIsDone(false);
    setError(null);
    setStatusMsg("🔄 Đang gửi file...");

    try {
      let chunkId = 0;
      await predictAudioStream(file, (event: VoiceStreamEvent) => {
        if (event.message) setStatusMsg(event.message);
        if (event.progress !== undefined) setProgress(event.progress);

        if (event.step === "chunk_done" && event.text) {
          chunkId++;
          setChunks((prev) => [
            ...prev,
            { id: chunkId, text: event.text!, language: event.language ?? "??" },
          ]);
          // Auto-scroll
          setTimeout(() => {
            scrollRef.current?.scrollTo({
              top: scrollRef.current.scrollHeight,
              behavior: "smooth",
            });
          }, 50);
        }

        if (event.step === "done") {
          setIsDone(true);
          setProgress(100);
        }

        if (event.step === "error") {
          setError(event.message ?? "Unknown error");
        }
      });
    } catch {
      setError("Không thể kết nối tới Voice AI server.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
      }
    },
    [processFile],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        if (file) processFile(file);
      }
    },
    [processFile],
  );

  const handleCopy = useCallback(() => {
    const fullText = chunks.map((c) => `[${c.language.toUpperCase()}] ${c.text}`).join("\n");
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [chunks]);

  // Language stats
  const langStats = chunks.reduce(
    (acc, c) => {
      acc[c.language] = (acc[c.language] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <Stack spacing={3} className="mx-auto max-w-2xl">
      <Typography variant="h4" fontWeight={700}>
        📝 Gỡ Băng AI
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Upload file audio → AI tự động nhận diện ngôn ngữ từng đoạn và gỡ băng văn bản.
      </Typography>

      {/* ===== DROP ZONE ===== */}
      <Box
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className="app-card cursor-pointer rounded-2xl p-8 text-center transition-all"
        sx={{
          borderStyle: "dashed",
          borderWidth: 2,
          borderColor: isDragOver ? "var(--app-primary)" : "var(--app-border)",
          bgcolor: isDragOver ? "var(--app-primary-soft)" : undefined,
          "&:hover": {
            borderColor: "var(--app-primary)",
            bgcolor: "var(--app-primary-soft)",
          },
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 40, color: "var(--app-muted)", mb: 1 }} />
        <Typography variant="body1" fontWeight={500}>
          Kéo thả file audio vào đây hoặc{" "}
          <span style={{ color: "var(--app-primary)", textDecoration: "underline" }}>
            chọn file
          </span>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          .wav, .mp3, .webm, .ogg, .m4a
        </Typography>
        <input ref={inputRef} type="file" accept="audio/*" hidden onChange={handleFileInput} />
      </Box>

      {/* ===== FILE INFO ===== */}
      {fileName && (
        <Box
          sx={{
            px: 2,
            py: 1,
            borderRadius: 2,
            bgcolor: "var(--app-primary-soft)",
            fontSize: "0.85rem",
          }}
        >
          📁 {fileName} ({(fileSize / 1024).toFixed(1)} KB)
        </Box>
      )}

      {/* ===== PROGRESS ===== */}
      {isProcessing && (
        <Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: "var(--app-surface-2)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                background: "linear-gradient(90deg, var(--app-primary), var(--app-primary-hover))",
              },
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5, display: "block", textAlign: "right" }}
          >
            {progress}%
          </Typography>
        </Box>
      )}

      {/* ===== STATUS ===== */}
      {statusMsg && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {statusMsg}
        </Typography>
      )}

      {/* ===== ERROR ===== */}
      {error && (
        <Box className="state-error">
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}

      {/* ===== TRANSCRIPT ===== */}
      {chunks.length > 0 && (
        <Box className="app-card rounded-2xl p-4">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="body1" fontWeight={600}>
              📝 Transcript
            </Typography>
            <Button
              size="small"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
              sx={{ textTransform: "none", fontSize: "0.8rem" }}
            >
              {copied ? "Đã copy ✓" : "Copy"}
            </Button>
          </Stack>

          <Box
            ref={scrollRef}
            sx={{
              maxHeight: 400,
              overflowY: "auto",
              p: 2,
              borderRadius: 2,
              bgcolor: "var(--app-surface-2)",
            }}
            className="no-scrollbar"
          >
            <Stack spacing={1.5}>
              {chunks.map((chunk) => {
                const lang = LANGUAGE_MAP[chunk.language];
                return (
                  <Box key={chunk.id} sx={{ lineHeight: 1.7 }}>
                    <Chip
                      label={chunk.language.toUpperCase()}
                      size="small"
                      sx={{
                        mr: 1,
                        height: 20,
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        bgcolor: lang?.color ?? "var(--app-muted)",
                        color: "#fff",
                      }}
                    />
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                    >
                      {chunk.text}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Box>

          {/* ===== STATS ===== */}
          {isDone && (
            <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap" useFlexGap>
              {Object.entries(langStats).map(([lang, count]) => {
                const info = LANGUAGE_MAP[lang];
                const pct = Math.round((count / chunks.length) * 100);
                return (
                  <Chip
                    key={lang}
                    label={`${info?.flag ?? ""} ${lang.toUpperCase()} ${pct}%`}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                  />
                );
              })}
              <Chip
                label={`${chunks.length} đoạn`}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.75rem" }}
              />
            </Stack>
          )}
        </Box>
      )}
    </Stack>
  );
}
