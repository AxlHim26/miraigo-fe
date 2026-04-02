import { z } from "zod";

import { getBaseUrl } from "@/lib/env";
import { fetchJson } from "@/lib/fetcher";

import { JlptPracticeQuestionResponseSchema } from "../types/jlpt-schema";

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

  // Create a schema that wraps the data array in ApiResponse format
  const apiResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z.array(JlptPracticeQuestionResponseSchema),
  });

  return apiResponseSchema.parse(response).data;
};
