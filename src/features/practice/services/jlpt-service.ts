import { z } from "zod";

import { api } from "@/lib/api-client";

import {
  JlptAttemptAnswer,
  JlptAttemptResultSchema,
  JlptExamDetailSchema,
  JlptPracticeQuestionResponseSchema,
  JlptSectionAttemptSchema,
  JlptStartAttemptResponseSchema,
} from "../types/jlpt-schema";

const authConfig = (token?: string) => {
  if (!token) {
    return undefined;
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getPublishedExams = async () => {
  const response = await api.get<unknown>("/api/v1/jlpt/exams");

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: z.array(
      z.object({
        id: z.number(),
        code: z.string(),
        title: z.string(),
        level: z.string(),
        examYear: z.number(),
        examMonth: z.number(),
        totalDurationMinutes: z.number(),
      }),
    ),
  });

  return apiResponseSchema.parse(response.data).data;
};

export const getJlptPracticeQuestions = async (
  level: string,
  sectionType: string,
  limit: number = 10,
) => {
  const response = await api.get<unknown>("/api/v1/jlpt/practice", {
    params: {
      level,
      sectionType,
      limit,
    },
  });

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: z.array(JlptPracticeQuestionResponseSchema),
  });

  return apiResponseSchema.parse(response.data).data;
};

export const getJlptExamDetail = async (examId: number) => {
  const response = await api.get<unknown>(`/api/v1/jlpt/exams/${examId}`);

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: JlptExamDetailSchema,
  });

  return apiResponseSchema.parse(response.data).data;
};

export const startJlptAttempt = async (examId: number, token?: string) => {
  const response = await api.post<unknown>(
    `/api/v1/jlpt/exams/${examId}/attempts`,
    undefined,
    authConfig(token),
  );

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: JlptStartAttemptResponseSchema,
  });

  return apiResponseSchema.parse(response.data).data;
};

export const getJlptAttemptSession = async (attemptId: number, token?: string) => {
  const response = await api.get<unknown>(`/api/v1/jlpt/attempts/${attemptId}`, authConfig(token));

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: JlptStartAttemptResponseSchema,
  });

  return apiResponseSchema.parse(response.data).data;
};

export const startJlptSectionAttempt = async (
  attemptId: number,
  sectionId: number,
  token?: string,
) => {
  const response = await api.post<unknown>(
    `/api/v1/jlpt/attempts/${attemptId}/sections/${sectionId}/start`,
    undefined,
    authConfig(token),
  );

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: JlptSectionAttemptSchema,
  });

  return apiResponseSchema.parse(response.data).data;
};

export const submitJlptSectionAttempt = async (
  attemptId: number,
  sectionId: number,
  token?: string,
) => {
  const response = await api.post<unknown>(
    `/api/v1/jlpt/attempts/${attemptId}/sections/${sectionId}/submit`,
    undefined,
    authConfig(token),
  );

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: JlptSectionAttemptSchema,
  });

  return apiResponseSchema.parse(response.data).data;
};

export const saveJlptAnswers = async (
  attemptId: number,
  answers: JlptAttemptAnswer[],
  token?: string,
) => {
  const response = await api.patch<unknown>(
    `/api/v1/jlpt/attempts/${attemptId}/answers`,
    { answers },
    authConfig(token),
  );

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: z.object({
      attemptId: z.number(),
      savedCount: z.number(),
    }),
  });

  return apiResponseSchema.parse(response.data).data;
};

export const submitJlptAttempt = async (attemptId: number, token?: string) => {
  const response = await api.post<unknown>(
    `/api/v1/jlpt/attempts/${attemptId}/submit`,
    undefined,
    authConfig(token),
  );

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: z.object({
      attemptId: z.number(),
      status: z.string(),
      totalScaledScore: z.number().nullable().optional(),
      passed: z.boolean().nullable().optional(),
    }),
  });

  return apiResponseSchema.parse(response.data).data;
};

export const getJlptAttemptResult = async (attemptId: number, token?: string) => {
  const response = await api.get<unknown>(
    `/api/v1/jlpt/attempts/${attemptId}/result`,
    authConfig(token),
  );

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: JlptAttemptResultSchema,
  });

  return apiResponseSchema.parse(response.data).data;
};

export const evaluatePlacementTest = async (
  answers: { questionId: number; selectedOptionKey: string }[],
  token?: string,
) => {
  const response = await api.post<unknown>(
    "/api/v1/jlpt/placement",
    { answers },
    authConfig(token),
  );

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: z.string(),
  });

  return apiResponseSchema.parse(response.data).data;
};

export const getJlptAttemptHistory = async (token?: string) => {
  const response = await api.get<unknown>("/api/v1/jlpt/attempts/history", authConfig(token));

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: z.array(
      z.object({
        attemptId: z.number(),
        examId: z.number(),
        examCode: z.string(),
        examTitle: z.string(),
        level: z.string(),
        status: z.string(),
        totalScaledScore: z.number().nullable().optional(),
        passed: z.boolean().nullable().optional(),
        startedAt: z.string(),
        submittedAt: z.string().nullable().optional(),
      }),
    ),
  });

  return apiResponseSchema.parse(response.data).data;
};

export const importCommunityExam = async (examData: unknown, token?: string) => {
  const response = await api.post<unknown>(
    "/api/v1/jlpt/community-exams/import",
    examData,
    authConfig(token),
  );

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: z
      .object({
        examId: z.number(),
        importedSections: z.number(),
        importedQuestions: z.number(),
      })
      .optional(),
  });

  return apiResponseSchema.parse(response.data);
};
