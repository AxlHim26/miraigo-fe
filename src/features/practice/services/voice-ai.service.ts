import type {
  VoicePredictResponse,
  VoiceStreamEvent,
} from "@/features/practice/types/voice-ai.types";

const API_URL = process.env["NEXT_PUBLIC_VOICE_API_URL"] || "http://localhost:8000";

export async function predictAudio(audioBlob: Blob): Promise<VoicePredictResponse> {
  const formData = new FormData();
  formData.append("audio", audioBlob, "record.webm");

  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Voice AI server error: ${res.status}`);
  }

  return res.json();
}

export async function predictAudioStream(
  audioBlob: Blob,
  onEvent: (event: VoiceStreamEvent) => void,
): Promise<void> {
  const formData = new FormData();
  formData.append("audio", audioBlob, "upload.webm");

  const res = await fetch(`${API_URL}/predict-stream`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Voice AI server error: ${res.status}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No readable stream");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      try {
        const data: VoiceStreamEvent = JSON.parse(line.slice(6));
        onEvent(data);
      } catch {
        // Skip malformed SSE lines
      }
    }
  }
}
