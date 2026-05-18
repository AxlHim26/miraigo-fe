import { z } from "zod";

import { ensureAccessToken } from "@/lib/api-client";
import { getBackendApiUrl } from "@/lib/env";
import { fetchJson } from "@/lib/fetcher";

const resolveToken = async (token?: string) => {
  if (token) return token;
  if (typeof window !== "undefined") {
    return (await ensureAccessToken()) || undefined;
  }
  return undefined;
};

import {
  JlptAttemptAnswer,
  JlptAttemptResultSchema,
  JlptExamDetailSchema,
  JlptPracticeQuestionResponseSchema,
  JlptSectionAttemptSchema,
  JlptStartAttemptResponseSchema,
} from "../types/jlpt-schema";

export const getPublishedExams = async () => {
  const url = `${getBackendApiUrl()}/api/v1/jlpt/exams`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const resolvedToken = await resolveToken();
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const response = await fetchJson<unknown>(url, {
    headers,
    cache: "no-store",
  });

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

  return apiResponseSchema.parse(response).data;
};

export const getJlptPracticeQuestions = async (
  level: string,
  sectionType: string,
  limit: number = 10,
) => {
  const url = `${getBackendApiUrl()}/api/v1/jlpt/practice?level=${level}&sectionType=${sectionType}&limit=${limit}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const resolvedToken = await resolveToken();
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const response = await fetchJson<unknown>(url, {
    headers,
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: z.array(JlptPracticeQuestionResponseSchema),
  });

  return apiResponseSchema.parse(response).data;
};

export const getJlptExamDetail = async (examId: number) => {
  const url = `${getBackendApiUrl()}/api/v1/jlpt/exams/${examId}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const resolvedToken = await resolveToken();
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const response = await fetchJson<unknown>(url, {
    headers,
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: JlptExamDetailSchema,
  });

  try {
    return apiResponseSchema.parse(response).data;
  } catch (error) {
    console.error("Zod parsing error in getJlptExamDetail:", error);
    throw error;
  }
};

export const startJlptAttempt = async (examId: number, token?: string) => {
  const url = `${getBackendApiUrl()}/api/v1/jlpt/exams/${examId}/attempts`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const resolvedToken = await resolveToken(token);
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const response = await fetchJson<unknown>(url, {
    method: "POST",
    headers,
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: JlptStartAttemptResponseSchema,
  });

  return apiResponseSchema.parse(response).data;
};

export const getJlptAttemptSession = async (attemptId: number, token?: string) => {
  const url = `${getBackendApiUrl()}/api/v1/jlpt/attempts/${attemptId}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const resolvedToken = await resolveToken(token);
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const response = await fetchJson<unknown>(url, {
    headers,
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: JlptStartAttemptResponseSchema,
  });

  return apiResponseSchema.parse(response).data;
};

export const startJlptSectionAttempt = async (
  attemptId: number,
  sectionId: number,
  token?: string,
) => {
  const url = `${getBackendApiUrl()}/api/v1/jlpt/attempts/${attemptId}/sections/${sectionId}/start`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const resolvedToken = await resolveToken(token);
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const response = await fetchJson<unknown>(url, {
    method: "POST",
    headers,
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: JlptSectionAttemptSchema,
  });

  return apiResponseSchema.parse(response).data;
};

export const submitJlptSectionAttempt = async (
  attemptId: number,
  sectionId: number,
  token?: string,
) => {
  const url = `${getBackendApiUrl()}/api/v1/jlpt/attempts/${attemptId}/sections/${sectionId}/submit`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const resolvedToken = await resolveToken(token);
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const response = await fetchJson<unknown>(url, {
    method: "POST",
    headers,
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: JlptSectionAttemptSchema,
  });

  return apiResponseSchema.parse(response).data;
};

export const saveJlptAnswers = async (
  attemptId: number,
  answers: JlptAttemptAnswer[],
  token?: string,
) => {
  const url = `${getBackendApiUrl()}/api/v1/jlpt/attempts/${attemptId}/answers`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const resolvedToken = await resolveToken(token);
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const response = await fetchJson<unknown>(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ answers }),
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: z.object({
      attemptId: z.number(),
      savedCount: z.number(),
    }),
  });

  return apiResponseSchema.parse(response).data;
};

export const submitJlptAttempt = async (attemptId: number, token?: string) => {
  const url = `${getBackendApiUrl()}/api/v1/jlpt/attempts/${attemptId}/submit`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const resolvedToken = await resolveToken(token);
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const response = await fetchJson<unknown>(url, {
    method: "POST",
    headers,
    cache: "no-store",
  });

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

  return apiResponseSchema.parse(response).data;
};

export const getJlptAttemptResult = async (attemptId: number, token?: string) => {
  const url = `${getBackendApiUrl()}/api/v1/jlpt/attempts/${attemptId}/result`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const resolvedToken = await resolveToken(token);
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const response = await fetchJson<unknown>(url, {
    headers,
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: JlptAttemptResultSchema,
  });

  return apiResponseSchema.parse(response).data;
};

export const evaluatePlacementTest = async (
  answers: { questionId: number; selectedOptionKey: string }[],
  token?: string,
) => {
  const url = `${getBackendApiUrl()}/api/v1/jlpt/placement`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const resolvedToken = await resolveToken(token);
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const response = await fetchJson<unknown>(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ answers }),
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    status: z.number(),
    message: z.string().optional(),
    data: z.string(),
  });

  return apiResponseSchema.parse(response).data;
};

export const getJlptAttemptHistory = async (token?: string) => {
  const url = `${getBackendApiUrl()}/api/v1/jlpt/attempts/history`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const resolvedToken = await resolveToken(token);
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const response = await fetchJson<unknown>(url, {
    headers,
    cache: "no-store",
  });

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

  return apiResponseSchema.parse(response).data;
};

export const importCommunityExam = async (examData: unknown, token?: string) => {
  const url = `${getBackendApiUrl()}/api/v1/jlpt/community-exams/import`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const resolvedToken = await resolveToken(token);
  if (resolvedToken) {
    headers["Authorization"] = `Bearer ${resolvedToken}`;
  }

  const response = await fetchJson<unknown>(url, {
    method: "POST",
    headers,
    body: JSON.stringify(examData),
    cache: "no-store",
  });

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

  return apiResponseSchema.parse(response);
};
