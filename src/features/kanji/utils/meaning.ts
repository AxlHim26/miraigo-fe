type MeaningRecord = Record<string, string | null | undefined>;

export const getMeaningText = (
  meaning: string | MeaningRecord | null | undefined,
  lang: "vi" | "en" = "vi",
) => {
  if (!meaning) {
    return "";
  }

  if (typeof meaning === "string") {
    return meaning;
  }

  if (lang === "vi") {
    return meaning["vi"] || meaning["vietnamese"] || meaning["en"] || meaning["english"] || "";
  }

  return meaning["en"] || meaning["english"] || meaning["vi"] || meaning["vietnamese"] || "";
};
