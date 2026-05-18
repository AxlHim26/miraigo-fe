import type { z } from "zod";

import type { createSetSchema, createWordSchema } from "@/features/vocabulary/types/schema";
import {
  vocabularyCommunityResponseSchema,
  vocabularyLibraryResponseSchema,
  vocabularySetDetailResponseSchema,
  vocabularyWordDetailResponseSchema,
  vocabularyWordsResponseSchema,
} from "@/features/vocabulary/types/schema";
import { getBaseUrl } from "@/lib/env";
import { fetchJson } from "@/lib/fetcher";

export const getVocabularyLibrary = async () => {
  const response = await fetchJson<unknown>(`${getBaseUrl()}/api/vocabulary/library`, {
    cache: "no-store",
  });
  return vocabularyLibraryResponseSchema.parse(response).data;
};

export const getVocabularyCommunity = async () => {
  const response = await fetchJson<unknown>(`${getBaseUrl()}/api/vocabulary/community`, {
    cache: "no-store",
  });
  return vocabularyCommunityResponseSchema.parse(response).data;
};

// --- Sets CRUD ---

export const createVocabularySet = async (data: z.infer<typeof createSetSchema>) => {
  const response = await fetchJson<unknown>(`${getBaseUrl()}/api/vocabulary/sets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return vocabularySetDetailResponseSchema.parse(response).data;
};

export const getVocabularySet = async (setId: string) => {
  const response = await fetchJson<unknown>(`${getBaseUrl()}/api/vocabulary/sets/${setId}`, {
    cache: "no-store",
  });
  return vocabularySetDetailResponseSchema.parse(response).data;
};

export const updateVocabularySet = async (
  setId: string,
  data: Partial<z.infer<typeof createSetSchema>>,
) => {
  const response = await fetchJson<unknown>(`${getBaseUrl()}/api/vocabulary/sets/${setId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return vocabularySetDetailResponseSchema.parse(response).data;
};

export const deleteVocabularySet = async (setId: string) => {
  await fetchJson<unknown>(`${getBaseUrl()}/api/vocabulary/sets/${setId}`, {
    method: "DELETE",
  });
  return true;
};

// --- Words CRUD ---

export const getVocabularyWords = async (setId: string) => {
  const response = await fetchJson<unknown>(`${getBaseUrl()}/api/vocabulary/sets/${setId}/words`, {
    cache: "no-store",
  });
  return vocabularyWordsResponseSchema.parse(response).data;
};

export const createVocabularyWord = async (
  setId: string,
  data: z.infer<typeof createWordSchema>,
) => {
  const response = await fetchJson<unknown>(`${getBaseUrl()}/api/vocabulary/sets/${setId}/words`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return vocabularyWordDetailResponseSchema.parse(response).data;
};

export const updateVocabularyWord = async (
  setId: string,
  wordId: string,
  data: Partial<z.infer<typeof createWordSchema>>,
) => {
  const response = await fetchJson<unknown>(
    `${getBaseUrl()}/api/vocabulary/sets/${setId}/words/${wordId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  return vocabularyWordDetailResponseSchema.parse(response).data;
};

export const deleteVocabularyWord = async (setId: string, wordId: string) => {
  await fetchJson<unknown>(`${getBaseUrl()}/api/vocabulary/sets/${setId}/words/${wordId}`, {
    method: "DELETE",
  });
  return true;
};
