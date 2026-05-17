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
  correctOptionKey: z.string().nullable().optional(),
  options: z.array(JlptQuestionOptionSchema),
});

export const JlptSectionSchema = z.object({
  id: z.number(),
  sectionType: z.string(),
  title: z.string(),
  sectionOrder: z.number(),
  durationMinutes: z.number(),
  questions: z.array(JlptPracticeQuestionResponseSchema),
});

export const JlptExamAssetSchema = z.object({
  id: z.number(),
  assetType: z.string(),
  sourcePath: z.string(),
  extractedTextPath: z.string().nullable().optional(),
  quality: z.string().nullable().optional(),
});

export const JlptExamDetailSchema = z.object({
  id: z.number(),
  code: z.string(),
  title: z.string(),
  level: z.string(),
  examYear: z.number(),
  examMonth: z.number(),
  totalDurationMinutes: z.number(),
  assets: z.array(JlptExamAssetSchema).optional(),
  sections: z.array(JlptSectionSchema),
});

export const JlptAttemptAnswerSchema = z.object({
  questionId: z.number(),
  selectedOptionKey: z.string().nullable(),
});

export const JlptSectionAttemptSchema = z.object({
  sectionId: z.number(),
  sectionStatus: z.string(),
  startedAt: z.string().nullable().optional(),
  submittedAt: z.string().nullable().optional(),
  expiresAt: z.string().nullable().optional(),
  remainingSeconds: z.number(),
});

export const JlptStartAttemptResponseSchema = z.object({
  attemptId: z.number(),
  examId: z.number(),
  status: z.string(),
  startedAt: z.string(),
  totalDurationMinutes: z.number(),
  remainingSeconds: z.number(),
  sectionAttempts: z.array(JlptSectionAttemptSchema).optional(),
  answers: z.array(JlptAttemptAnswerSchema),
});

export type JlptPracticeQuestion = z.infer<typeof JlptPracticeQuestionResponseSchema>;
export type JlptSection = z.infer<typeof JlptSectionSchema>;
export type JlptExamDetail = z.infer<typeof JlptExamDetailSchema>;
export type JlptAttemptAnswer = z.infer<typeof JlptAttemptAnswerSchema>;
export type JlptSectionAttempt = z.infer<typeof JlptSectionAttemptSchema>;
export type JlptStartAttemptResponse = z.infer<typeof JlptStartAttemptResponseSchema>;

export const JlptAttemptResultQuestionSchema = z.object({
  questionId: z.number(),
  questionNumber: z.number().nullable().optional(),
  prompt: z.string(),
  passageText: z.string().nullable().optional(),
  audioUrl: z.string().nullable().optional(),
  explanation: z.string().nullable().optional(),
  selectedOptionKey: z.string().nullable().optional(),
  correctOptionKey: z.string(),
  correct: z.boolean(),
  options: z.array(JlptQuestionOptionSchema),
});

export const JlptAttemptSectionResultSchema = z.object({
  sectionId: z.number(),
  sectionType: z.string(),
  title: z.string(),
  rawScore: z.number(),
  rawMaxScore: z.number(),
  scaledScore: z.number(),
  scaledMaxScore: z.number(),
  questions: z.array(JlptAttemptResultQuestionSchema),
});

export const JlptAttemptResultSchema = z.object({
  attemptId: z.number(),
  examId: z.number(),
  examCode: z.string(),
  examTitle: z.string(),
  level: z.string(),
  totalScaledScore: z.number(),
  passed: z.boolean(),
  sections: z.array(JlptAttemptSectionResultSchema),
});

export type JlptAttemptResultQuestion = z.infer<typeof JlptAttemptResultQuestionSchema>;
export type JlptAttemptSectionResult = z.infer<typeof JlptAttemptSectionResultSchema>;
export type JlptAttemptResult = z.infer<typeof JlptAttemptResultSchema>;
