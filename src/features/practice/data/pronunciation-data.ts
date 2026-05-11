export interface PronunciationSentence {
  id: number;
  level: "N5" | "N4" | "N3";
  japanese: string;
  romaji: string;
  meaning: string;
}

export const pronunciationSentences: PronunciationSentence[] = [
  // N5
  {
    id: 1,
    level: "N5",
    japanese: "すみません、トイレはどこですか？",
    romaji: "Sumimasen, toire wa doko desu ka?",
    meaning: "Xin lỗi, nhà vệ sinh ở đâu ạ?",
  },
  {
    id: 2,
    level: "N5",
    japanese: "これはいくらですか？",
    romaji: "Kore wa ikura desu ka?",
    meaning: "Cái này bao nhiêu tiền?",
  },
  {
    id: 3,
    level: "N5",
    japanese: "わたしはベトナムじんです。",
    romaji: "Watashi wa Betonamu-jin desu.",
    meaning: "Tôi là người Việt Nam.",
  },
  {
    id: 4,
    level: "N5",
    japanese: "にほんごをべんきょうしています。",
    romaji: "Nihongo o benkyō shite imasu.",
    meaning: "Tôi đang học tiếng Nhật.",
  },
  // N4
  {
    id: 5,
    level: "N4",
    japanese: "あしたはてんきがいいらしいです。",
    romaji: "Ashita wa tenki ga ii rashii desu.",
    meaning: "Nghe nói ngày mai thời tiết đẹp.",
  },
  {
    id: 6,
    level: "N4",
    japanese: "えきまでどうやっていきますか？",
    romaji: "Eki made dō yatte ikimasu ka?",
    meaning: "Đi đến ga bằng cách nào?",
  },
  {
    id: 7,
    level: "N4",
    japanese: "しゅくだいをわすれてしまいました。",
    romaji: "Shukudai o wasurete shimaimashita.",
    meaning: "Tôi đã lỡ quên bài tập rồi.",
  },
  {
    id: 8,
    level: "N4",
    japanese: "もうすこしゆっくりはなしてください。",
    romaji: "Mō sukoshi yukkuri hanashite kudasai.",
    meaning: "Xin hãy nói chậm hơn một chút.",
  },
  // N3
  {
    id: 9,
    level: "N3",
    japanese: "日本語を勉強するために、東京に来ました。",
    romaji: "Nihongo o benkyō suru tame ni, Tōkyō ni kimashita.",
    meaning: "Tôi đến Tokyo để học tiếng Nhật.",
  },
  {
    id: 10,
    level: "N3",
    japanese: "この映画は見れば見るほどおもしろいです。",
    romaji: "Kono eiga wa mireba miru hodo omoshiroi desu.",
    meaning: "Phim này càng xem càng thấy hay.",
  },
  {
    id: 11,
    level: "N3",
    japanese: "天気予報によると、明日は雨が降るそうです。",
    romaji: "Tenki yohō ni yoru to, ashita wa ame ga furu sō desu.",
    meaning: "Theo dự báo thời tiết, ngày mai sẽ mưa.",
  },
  {
    id: 12,
    level: "N3",
    japanese: "日本の文化に興味があります。",
    romaji: "Nihon no bunka ni kyōmi ga arimasu.",
    meaning: "Tôi có hứng thú với văn hóa Nhật Bản.",
  },
];
