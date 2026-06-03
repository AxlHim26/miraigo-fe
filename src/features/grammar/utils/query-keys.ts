import type { GrammarFilter, GrammarLevel, GrammarPoint } from "@/features/grammar/types/grammar";

export const grammarQueryKeys = {
  stats: () => ["grammar", "stats"] as const,
  levels: () => ["grammar", "levels"] as const,
  points: (levelId?: string) => ["grammar", "points", levelId ?? "all"] as const,
  search: (filter: GrammarFilter) => ["grammar", "search", filter] as const,
  level: (levelId: GrammarLevel["id"]) => ["grammar", "level", levelId] as const,
  point: (pointId: GrammarPoint["id"]) => ["grammar", "point", pointId] as const,
};
