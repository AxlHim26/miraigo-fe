"use client";

import { useCallback, useRef, useState } from "react";

interface UseVoiceRecorderOptions {
  autoStopMs?: number;
}

interface UseVoiceRecorderReturn {
  isRecording: boolean;
  audioBlob: Blob | null;
  audioUrl: string | null;
  duration: number;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  reset: () => void;
}

export function useVoiceRecorder(options: UseVoiceRecorderOptions = {}): UseVoiceRecorderReturn {
  const { autoStopMs = 10_000 } = options;

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef(0);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    recorderRef.current = null;
  }, []);

  const stopRecording = useCallback(() => {
    if (recorderRef.current?.state !== "inactive") {
      recorderRef.current?.stop();
    }
    setIsRecording(false);
    setDuration(Math.round((Date.now() - startTimeRef.current) / 1000));
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    // Clean previous session
    cleanup();
    setAudioBlob(null);
    setAudioUrl(null);
    setDuration(0);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    const recorder = new MediaRecorder(stream);
    recorderRef.current = recorder;
    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      setAudioBlob(blob);
      setAudioUrl(URL.createObjectURL(blob));
      cleanup();
    };

    recorder.start();
    startTimeRef.current = Date.now();
    setIsRecording(true);

    // Auto-stop
    timerRef.current = setTimeout(() => {
      stopRecording();
    }, autoStopMs);
  }, [autoStopMs, cleanup, stopRecording]);

  const reset = useCallback(() => {
    cleanup();
    setIsRecording(false);
    setAudioBlob(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setDuration(0);
  }, [audioUrl, cleanup]);

  return {
    isRecording,
    audioBlob,
    audioUrl,
    duration,
    startRecording,
    stopRecording,
    reset,
  };
}
