const DEFAULT_OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const buildOpenRouterChatCompletionsUrl = (rawBaseUrl?: string) => {
  const fallback =
    rawBaseUrl && rawBaseUrl.trim().length > 0 ? rawBaseUrl : DEFAULT_OPENROUTER_BASE_URL;
  const normalizedBase = trimTrailingSlash(fallback.trim());
  return `${normalizedBase}/chat/completions`;
};

export const buildOpenRouterAudioTranscriptionsUrl = (rawBaseUrl?: string) => {
  const fallback =
    rawBaseUrl && rawBaseUrl.trim().length > 0 ? rawBaseUrl : DEFAULT_OPENROUTER_BASE_URL;
  const normalizedBase = trimTrailingSlash(fallback.trim());
  return `${normalizedBase}/audio/transcriptions`;
};
