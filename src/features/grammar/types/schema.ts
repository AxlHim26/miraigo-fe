import { z } from "zod";

export const grammarExampleSchema = z.object({
  japanese: z.string(),
  reading: z.string().optional(),
  vietnamese: z.string(),
});

export const grammarLevelSchema = z.object({
  id: z.string(),
  level: z.enum(["N5", "N4", "N3", "N2", "N1"]),
  title: z.string(),
  lessonCount: z.number(),
  grammarCount: z.number(),
  source: z.string(),
});

export const grammarPointSchema = z.object({
  id: z.string(),
  levelId: z.string(),
  title: z.string(),
  meaning: z.string(),
  structure: z.string(),
  lesson: z.number(),
  examples: z.array(grammarExampleSchema),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const grammarStatsSchema = z.object({
  levelCount: z.number(),
  lessonCount: z.number(),
  grammarCount: z.number(),
});

export const grammarLevelsResponseSchema = z.object({
  data: z.array(grammarLevelSchema),
});

export const grammarStatsResponseSchema = z.object({
  data: grammarStatsSchema,
});

export const grammarPointsResponseSchema = z.object({
  data: z.array(grammarPointSchema),
});
