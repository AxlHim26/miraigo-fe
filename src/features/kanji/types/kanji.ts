export type KanjiCluster = {
  id: string;
  title: string;
  description: string;
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  kanjiCount: number;
  progress: number;
};

export type KanjiRoadmapDay = {
  id: string;
  day: number;
  focus: string;
  note: string;
  kanji: string[];
  position: {
    x: number;
    y: number;
  };
  orbit: {
    startAngle: number;
    endAngle: number;
    radius: number;
  };
};

export type KanjiRoadmapLevel = {
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  title: string;
  subtitle: string;
  pace: string;
  completion: number;
  currentDay: number;
  accent: string;
  days: KanjiRoadmapDay[];
};
