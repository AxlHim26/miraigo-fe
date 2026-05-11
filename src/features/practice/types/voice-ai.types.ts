export interface VoicePredictResponse {
  language: string;
  confidence: number;
  transcript: string;
}

export interface VoiceStreamEvent {
  step: "convert" | "transcribing" | "chunk_done" | "done" | "error";
  message?: string;
  chunk?: number;
  total?: number;
  progress?: number;
  language?: string;
  confidence?: number;
  text?: string;
  transcript?: string;
  duration?: number;
}

export interface PronunciationResult {
  language: string;
  confidence: number;
  transcript: string;
  isCorrectLanguage: boolean;
  matchedWords: string[];
  unmatchedWords: string[];
  score: number;
}

export const LANGUAGE_MAP: Record<string, { label: string; flag: string; color: string }> = {
  vi: { label: "Vietnamese", flag: "🇻🇳", color: "#eab308" },
  ja: { label: "Japanese", flag: "🇯🇵", color: "#ef4444" },
  en: { label: "English", flag: "🇬🇧", color: "#3b82f6" },
  ko: { label: "Korean", flag: "🇰🇷", color: "#22c55e" },
  zh: { label: "Chinese", flag: "🇨🇳", color: "#f97316" },
};
