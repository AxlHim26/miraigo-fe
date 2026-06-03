import {
  grammarLevelsResponseSchema,
  grammarPointsResponseSchema,
  grammarStatsResponseSchema,
} from "@/features/grammar/types/schema";
import { getBaseUrl } from "@/lib/env";
import { fetchJson } from "@/lib/fetcher";

export const getGrammarLevels = async () => {
  const response = await fetchJson<unknown>(`${getBaseUrl()}/api/grammar/levels`, {
    cache: "no-store",
  });
  return grammarLevelsResponseSchema.parse(response).data;
};

export const getGrammarStats = async () => {
  const response = await fetchJson<unknown>(`${getBaseUrl()}/api/grammar/stats`, {
    cache: "no-store",
  });
  return grammarStatsResponseSchema.parse(response).data;
};

export const getGrammarPoints = async (levelId?: string) => {
  const normalizedLevelId = levelId?.trim().toLowerCase();
  const qs = normalizedLevelId ? `?levelId=${encodeURIComponent(normalizedLevelId)}` : "";
  const response = await fetchJson<unknown>(`${getBaseUrl()}/api/grammar/points${qs}`, {
    cache: "no-store",
  });
  const points = grammarPointsResponseSchema.parse(response).data;

  if (!normalizedLevelId) {
    return points;
  }

  return points.filter((point) => point.levelId.toLowerCase() === normalizedLevelId);
};
