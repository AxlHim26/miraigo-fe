export type GrammarJlptLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export type GrammarLevel = {
  id: string;
  level: GrammarJlptLevel;
  title: string;
  lessonCount: number;
  grammarCount: number;
  source: string;
};

export type GrammarPoint = {
  id: string;
  levelId: string;
  title: string;
  meaning: string;
  structure: string;
  lesson: number;
  examples: GrammarExample[];
  notes?: string;
  tags?: string[];
};

export type GrammarExample = {
  japanese: string;
  reading?: string;
  vietnamese: string;
};

export type GrammarStats = {
  levelCount: number;
  lessonCount: number;
  grammarCount: number;
};

export type GrammarSearchResult = {
  point: GrammarPoint;
  level: GrammarLevel;
};

export type GrammarFilter = {
  levelId?: string;
  lesson?: number;
  tag?: string;
  query?: string;
};
