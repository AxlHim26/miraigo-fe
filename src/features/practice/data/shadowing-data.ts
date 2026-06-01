export interface ShadowingSentence {
  id: number;
  level: "N5" | "N4" | "N3";
  japanese: string;
  romaji: string;
  meaning: string;
  /** Text for Web Speech API (cleaned, no punctuation quirks) */
  speakText: string;
}

export const shadowingSentences: ShadowingSentence[] = [
  // ── N5 ─────────────────────────────────
  {
    id: 1,
    level: "N5",
    japanese: "おはようございます。",
    romaji: "Ohayō gozaimasu.",
    meaning: "Chào buổi sáng.",
    speakText: "おはようございます",
  },
  {
    id: 2,
    level: "N5",
    japanese: "すみません、トイレはどこですか？",
    romaji: "Sumimasen, toire wa doko desu ka?",
    meaning: "Xin lỗi, nhà vệ sinh ở đâu ạ?",
    speakText: "すみません、トイレはどこですか",
  },
  {
    id: 3,
    level: "N5",
    japanese: "これはいくらですか？",
    romaji: "Kore wa ikura desu ka?",
    meaning: "Cái này bao nhiêu tiền?",
    speakText: "これはいくらですか",
  },
  {
    id: 4,
    level: "N5",
    japanese: "にほんごをべんきょうしています。",
    romaji: "Nihongo o benkyō shite imasu.",
    meaning: "Tôi đang học tiếng Nhật.",
    speakText: "にほんごをべんきょうしています",
  },
  // ── N4 ─────────────────────────────────
  {
    id: 5,
    level: "N4",
    japanese: "もうすこしゆっくりはなしてください。",
    romaji: "Mō sukoshi yukkuri hanashite kudasai.",
    meaning: "Xin hãy nói chậm hơn một chút.",
    speakText: "もう少しゆっくり話してください",
  },
  {
    id: 6,
    level: "N4",
    japanese: "えきまでどうやっていきますか？",
    romaji: "Eki made dō yatte ikimasu ka?",
    meaning: "Đi đến ga bằng cách nào?",
    speakText: "駅までどうやって行きますか",
  },
  {
    id: 7,
    level: "N4",
    japanese: "しゅくだいをわすれてしまいました。",
    romaji: "Shukudai o wasurete shimaimashita.",
    meaning: "Tôi đã lỡ quên bài tập rồi.",
    speakText: "宿題を忘れてしまいました",
  },
  {
    id: 8,
    level: "N4",
    japanese: "あしたはてんきがいいらしいです。",
    romaji: "Ashita wa tenki ga ii rashii desu.",
    meaning: "Nghe nói ngày mai thời tiết đẹp.",
    speakText: "明日は天気がいいらしいです",
  },
  // ── N3 ─────────────────────────────────
  {
    id: 9,
    level: "N3",
    japanese: "日本語を勉強するために、東京に来ました。",
    romaji: "Nihongo o benkyō suru tame ni, Tōkyō ni kimashita.",
    meaning: "Tôi đến Tokyo để học tiếng Nhật.",
    speakText: "日本語を勉強するために、東京に来ました",
  },
  {
    id: 10,
    level: "N3",
    japanese: "天気予報によると、明日は雨が降るそうです。",
    romaji: "Tenki yohō ni yoru to, ashita wa ame ga furu sō desu.",
    meaning: "Theo dự báo thời tiết, ngày mai sẽ mưa.",
    speakText: "天気予報によると、明日は雨が降るそうです",
  },
  {
    id: 11,
    level: "N3",
    japanese: "日本の文化に興味があります。",
    romaji: "Nihon no bunka ni kyōmi ga arimasu.",
    meaning: "Tôi có hứng thú với văn hóa Nhật Bản.",
    speakText: "日本の文化に興味があります",
  },
  {
    id: 12,
    level: "N3",
    japanese: "この映画は見れば見るほどおもしろいです。",
    romaji: "Kono eiga wa mireba miru hodo omoshiroi desu.",
    meaning: "Phim này càng xem càng thấy hay.",
    speakText: "この映画は見れば見るほど面白いです",
  },
];
