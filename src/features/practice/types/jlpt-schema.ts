import { z } from "zod";

export const JlptQuestionOptionSchema = z.object({
  key: z.string(),
  text: z.string(),
});

export const JlptPracticeQuestionResponseSchema = z.object({
  id: z.number(),
  partNumber: z.number().nullable().optional(),
  questionNumber: z.number().nullable().optional(),
  prompt: z.string(),
  passageText: z.string().nullable().optional(),
  audioUrl: z.string().nullable().optional(),
  explanation: z.string().nullable().optional(),
  correctOptionKey: z.string().optional(),
  options: z.array(JlptQuestionOptionSchema),
});

export type JlptPracticeQuestion = z.infer<typeof JlptPracticeQuestionResponseSchema>;
