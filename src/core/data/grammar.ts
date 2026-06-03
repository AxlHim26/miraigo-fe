import { n1GrammarPoints } from "@/core/data/grammar/n1";
import { n2GrammarPoints } from "@/core/data/grammar/n2";
import { n3GrammarPoints } from "@/core/data/grammar/n3";
import { n4GrammarPoints } from "@/core/data/grammar/n4";
import { n5GrammarPoints } from "@/core/data/grammar/n5";
import type { GrammarLevel } from "@/features/grammar/types/grammar";

export { n1GrammarPoints, n2GrammarPoints, n3GrammarPoints, n4GrammarPoints, n5GrammarPoints };

export const grammarLevels: GrammarLevel[] = [
  {
    id: "n5-minna-1",
    level: "N5",
    title: "Ngữ pháp N5 - Minna I",
    lessonCount: 25,
    grammarCount: n5GrammarPoints.length,
    source: "Minna no Nihongo I",
  },
  {
    id: "n4-minna-2",
    level: "N4",
    title: "Ngữ pháp N4 - Minna II",
    lessonCount: 25,
    grammarCount: n4GrammarPoints.length,
    source: "Minna no Nihongo II",
  },
  {
    id: "n3-mimikara",
    level: "N3",
    title: "Ngữ pháp N3 - Mimikara",
    lessonCount: 10,
    grammarCount: n3GrammarPoints.length,
    source: "Mimikara Oboeru",
  },
  {
    id: "n2-mimikara",
    level: "N2",
    title: "Ngữ pháp N2 - Mimikara",
    lessonCount: 9,
    grammarCount: n2GrammarPoints.length,
    source: "Mimikara Oboeru",
  },
  {
    id: "n1-mimikara",
    level: "N1",
    title: "Ngữ pháp N1 - Mimikara",
    lessonCount: 15,
    grammarCount: n1GrammarPoints.length,
    source: "Mimikara Oboeru",
  },
];

export const grammarPoints = [
  ...n5GrammarPoints,
  ...n4GrammarPoints,
  ...n3GrammarPoints,
  ...n2GrammarPoints,
  ...n1GrammarPoints,
];
