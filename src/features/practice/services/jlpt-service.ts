import { z } from "zod";

import { getBaseUrl } from "@/lib/env";
import { fetchJson } from "@/lib/fetcher";

import {
  JlptAttemptAnswer,
  JlptAttemptResultSchema,
  JlptExamDetailSchema,
  JlptPracticeQuestionResponseSchema,
  JlptStartAttemptResponseSchema,
} from "../types/jlpt-schema";

export const getJlptPracticeQuestions = async (
  level: string,
  sectionType: string,
  limit: number = 10,
) => {
  const url = new URL(`${getBaseUrl()}/api/v1/jlpt/practice`);
  url.searchParams.append("level", level);
  url.searchParams.append("sectionType", sectionType);
  url.searchParams.append("limit", limit.toString());

  const response = await fetchJson<unknown>(url.toString(), {
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z.array(JlptPracticeQuestionResponseSchema),
  });

  return apiResponseSchema.parse(response).data;
};

export const getJlptExamDetail = async (examId: number) => {
  const url = new URL(`${getBaseUrl()}/api/v1/jlpt/exams/${examId}`);
  const response = await fetchJson<unknown>(url.toString(), {
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: JlptExamDetailSchema,
  });

  return apiResponseSchema.parse(response).data;
};

export const startJlptAttempt = async (examId: number, token?: string) => {
  const url = new URL(`${getBaseUrl()}/api/v1/jlpt/exams/${examId}/attempts`);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetchJson<unknown>(url.toString(), {
    method: "POST",
    headers,
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: JlptStartAttemptResponseSchema,
  });

  return apiResponseSchema.parse(response).data;
};

export const getJlptAttemptSession = async (attemptId: number, token?: string) => {
  const url = new URL(`${getBaseUrl()}/api/v1/jlpt/attempts/${attemptId}`);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetchJson<unknown>(url.toString(), {
    headers,
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: JlptStartAttemptResponseSchema,
  });

  return apiResponseSchema.parse(response).data;
};

export const saveJlptAnswers = async (
  attemptId: number,
  answers: JlptAttemptAnswer[],
  token?: string,
) => {
  const url = new URL(`${getBaseUrl()}/api/v1/jlpt/attempts/${attemptId}/answers`);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetchJson<unknown>(url.toString(), {
    method: "PATCH",
    headers,
    body: JSON.stringify({ answers }),
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z.object({
      attemptId: z.number(),
      savedCount: z.number(),
    }),
  });

  return apiResponseSchema.parse(response).data;
};

export const submitJlptAttempt = async (attemptId: number, token?: string) => {
  const url = new URL(`${getBaseUrl()}/api/v1/jlpt/attempts/${attemptId}/submit`);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetchJson<unknown>(url.toString(), {
    method: "POST",
    headers,
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    success: z.boolean(),
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
  const url = new URL(`${getBaseUrl()}/api/v1/jlpt/attempts/${attemptId}/result`);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetchJson<unknown>(url.toString(), {
    headers,
    cache: "no-store",
  });

  const apiResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: JlptAttemptResultSchema,
  });

  return apiResponseSchema.parse(response).data;
};
