import { z } from "zod";

export const vocabularySetSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  level: z.enum(["N5", "N4", "N3", "N2", "N1"]).optional(),
  wordCount: z.number(),
  updatedAt: z.string(),
  isCommunity: z.boolean().optional(),
  isNew: z.boolean().optional(),
});

export const vocabularyWordSchema = z.object({
  id: z.string(),
  japanese: z.string(),
  reading: z.string(),
  meaning: z.string(),
  example: z.string().optional(),
  exampleMeaning: z.string().optional(),
});

export const createSetSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tên bộ từ"),
  description: z.string().optional(),
  level: z.enum(["N5", "N4", "N3", "N2", "N1"]).optional(),
  isCommunity: z.boolean().optional(),
});

export const createWordSchema = z.object({
  japanese: z.string().min(1, "Vui lòng nhập từ vựng"),
  reading: z.string().min(1, "Vui lòng nhập cách đọc"),
  meaning: z.string().min(1, "Vui lòng nhập nghĩa"),
  example: z.string().optional(),
  exampleMeaning: z.string().optional(),
});

export const vocabularyLibrarySchema = z.object({
  sets: z.array(vocabularySetSchema),
  limit: z.number(),
});

export const vocabularyLibraryResponseSchema = z.object({
  data: vocabularyLibrarySchema,
});

export const vocabularyCommunityResponseSchema = z.object({
  data: z.array(vocabularySetSchema),
});

export const vocabularySetDetailResponseSchema = z.object({
  data: vocabularySetSchema,
});

export const vocabularyWordsResponseSchema = z.object({
  data: z.array(vocabularyWordSchema),
});

export const vocabularyWordDetailResponseSchema = z.object({
  data: vocabularyWordSchema,
});
