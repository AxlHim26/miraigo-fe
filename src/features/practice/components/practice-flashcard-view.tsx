"use client";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RefreshIcon from "@mui/icons-material/Refresh";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useCallback, useMemo, useState } from "react";

import { type FlashcardWord, flashcardWords } from "@/features/practice/data/flashcard-data";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function PracticeFlashcardView() {
  const [deck, setDeck] = useState<FlashcardWord[]>(() => [...flashcardWords]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [unknown, setUnknown] = useState<Set<number>>(new Set());
  const [isSpeaking, setIsSpeaking] = useState(false);

  const card = deck[currentIdx];
  const total = deck.length;
  const reviewed = known.size + unknown.size;
  const progress = total > 0 ? Math.round((reviewed / total) * 100) : 0;

  // ── TTS ──
  const handleSpeak = useCallback(() => {
    if (!card) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(card.japanese);
    utterance.lang = "ja-JP";
    utterance.rate = 0.8;
    const voices = synth.getVoices();
    const jaVoice = voices.find((v) => v.lang.startsWith("ja"));
    if (jaVoice) utterance.voice = jaVoice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synth.speak(utterance);
  }, [card]);

  // ── Flip ──
  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // ── Mark known/unknown ──
  const handleKnown = useCallback(() => {
    if (!card) return;
    setKnown((prev) => new Set(prev).add(card.id));
    setUnknown((prev) => {
      const next = new Set(prev);
      next.delete(card.id);
      return next;
    });
    setIsFlipped(false);
    setCurrentIdx((prev) => Math.min(prev + 1, total - 1));
  }, [card, total]);

  const handleUnknown = useCallback(() => {
    if (!card) return;
    setUnknown((prev) => new Set(prev).add(card.id));
    setKnown((prev) => {
      const next = new Set(prev);
      next.delete(card.id);
      return next;
    });
    setIsFlipped(false);
    setCurrentIdx((prev) => Math.min(prev + 1, total - 1));
  }, [card, total]);

  // ── Navigation ──
  const handleNext = useCallback(() => {
    setCurrentIdx((prev) => Math.min(prev + 1, total - 1));
    setIsFlipped(false);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIdx((prev) => Math.max(prev - 1, 0));
    setIsFlipped(false);
  }, []);

  // ── Shuffle ──
  const handleShuffle = useCallback(() => {
    const shuffled = [...flashcardWords];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }
    setDeck(shuffled);
    setCurrentIdx(0);
    setIsFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
  }, []);

  // ── Reset ──
  const handleReset = useCallback(() => {
    setDeck([...flashcardWords]);
    setCurrentIdx(0);
    setIsFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
  }, []);

  // ── Review unknown only ──
  const handleReviewUnknown = useCallback(() => {
    const unknownCards = flashcardWords.filter((w) => unknown.has(w.id));
    if (unknownCards.length === 0) return;
    setDeck(unknownCards);
    setCurrentIdx(0);
    setIsFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
  }, [unknown]);

  const isComplete = reviewed === total && total > 0;

  // Level color
  const levelColor = useMemo(() => {
    if (!card) return "var(--app-primary)";
    switch (card.level) {
      case "N5":
        return "#22c55e";
      case "N4":
        return "#3b82f6";
      case "N3":
        return "#f97316";
      default:
        return "var(--app-primary)";
    }
  }, [card]);

  if (!card) return null;

  return (
    <Stack spacing={3} className="mx-auto max-w-2xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <div>
          <Typography variant="h4" fontWeight={700}>
            Flashcard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lật thẻ để học từ vựng. Đánh dấu đã biết hoặc chưa biết.
          </Typography>
        </div>
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Xáo trộn">
            <IconButton size="small" onClick={handleShuffle}>
              <ShuffleIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Làm lại">
            <IconButton size="small" onClick={handleReset}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      {/* ===== PROGRESS BAR ===== */}
      <Box>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            {currentIdx + 1} / {total}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography variant="caption" sx={{ color: "var(--app-success)" }}>
              ✓ {known.size}
            </Typography>
            <Typography variant="caption" sx={{ color: "var(--app-danger)" }}>
              ✗ {unknown.size}
            </Typography>
          </Stack>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: "var(--app-surface-2)",
            "& .MuiLinearProgress-bar": {
              borderRadius: 3,
              background: "linear-gradient(90deg, var(--app-primary), var(--app-success))",
            },
          }}
        />
      </Box>

      {/* ===== FLASHCARD ===== */}
      {!isComplete ? (
        <>
          <Box
            onClick={handleFlip}
            sx={{
              perspective: 1000,
              cursor: "pointer",
              minHeight: 280,
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                minHeight: 280,
                transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
              }}
            >
              {/* FRONT */}
              <Box
                className="app-card"
                sx={{
                  position: "absolute",
                  width: "100%",
                  minHeight: 280,
                  borderRadius: 4,
                  backfaceVisibility: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 4,
                  borderTop: `4px solid ${levelColor}`,
                }}
              >
                <Chip
                  label={card.level}
                  size="small"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    bgcolor: levelColor,
                    color: "#fff",
                    fontSize: "0.7rem",
                  }}
                />
                <Typography
                  variant="h3"
                  fontWeight={700}
                  sx={{ fontFamily: "'Noto Sans JP', sans-serif", mb: 1 }}
                >
                  {card.japanese}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                >
                  {card.reading}
                </Typography>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak();
                  }}
                  disabled={isSpeaking}
                  sx={{ mt: 2 }}
                >
                  <VolumeUpIcon />
                </IconButton>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                  Nhấn để lật thẻ
                </Typography>
              </Box>

              {/* BACK */}
              <Box
                className="app-card"
                sx={{
                  position: "absolute",
                  width: "100%",
                  minHeight: 280,
                  borderRadius: 4,
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 4,
                  borderTop: `4px solid ${levelColor}`,
                }}
              >
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                  {card.meaning}
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "var(--app-surface-2)",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 400,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "'Noto Sans JP', sans-serif", mb: 0.5, fontWeight: 500 }}
                  >
                    {card.example}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.exampleMeaning}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                  Nhấn để lật lại
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ===== ACTION BUTTONS ===== */}
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              color="error"
              startIcon={<CloseIcon />}
              onClick={handleUnknown}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                borderWidth: 2,
                "&:hover": { borderWidth: 2 },
              }}
            >
              Chưa biết
            </Button>
            <Button
              variant="outlined"
              color="success"
              startIcon={<CheckCircleOutlineIcon />}
              onClick={handleKnown}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                borderWidth: 2,
                "&:hover": { borderWidth: 2 },
              }}
            >
              Đã biết
            </Button>
          </Stack>

          {/* ===== NAV ===== */}
          <Stack direction="row" justifyContent="center" spacing={1}>
            <IconButton onClick={handlePrev} disabled={currentIdx === 0} size="small">
              <SkipPreviousIcon />
            </IconButton>
            <IconButton onClick={handleNext} disabled={currentIdx === total - 1} size="small">
              <SkipNextIcon />
            </IconButton>
          </Stack>
        </>
      ) : (
        /* ===== COMPLETION SCREEN ===== */
        <Box className="app-card rounded-2xl p-8" sx={{ textAlign: "center" }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            🎉
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            Hoàn thành!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Bạn đã xem qua tất cả {total} thẻ.
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 3 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontWeight={700} sx={{ color: "var(--app-success)" }}>
                {known.size}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Đã biết
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontWeight={700} sx={{ color: "var(--app-danger)" }}>
                {unknown.size}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Chưa biết
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap" useFlexGap>
            {unknown.size > 0 && (
              <Button
                variant="contained"
                onClick={handleReviewUnknown}
                endIcon={<NavigateNextIcon />}
                sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600 }}
              >
                Ôn lại từ chưa biết ({unknown.size})
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleReset}
              sx={{ borderRadius: 3, textTransform: "none" }}
            >
              Làm lại tất cả
            </Button>
            <Button
              variant="outlined"
              startIcon={<ShuffleIcon />}
              onClick={handleShuffle}
              sx={{ borderRadius: 3, textTransform: "none" }}
            >
              Xáo trộn
            </Button>
          </Stack>
        </Box>
      )}

      {/* Keyboard hint */}
      <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ opacity: 0.6 }}>
        Mẹo: Nhấn vào thẻ để lật
      </Typography>
    </Stack>
  );
}
