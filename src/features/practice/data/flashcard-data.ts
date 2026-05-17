export interface FlashcardWord {
  id: number;
  level: "N5" | "N4" | "N3";
  japanese: string;
  reading: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
}

export const flashcardWords: FlashcardWord[] = [
  // ── N5 ─────────────────────────────────
  {
    id: 1,
    level: "N5",
    japanese: "食べる",
    reading: "たべる",
    meaning: "Ăn",
    example: "朝ごはんを食べます。",
    exampleMeaning: "Tôi ăn sáng.",
  },
  {
    id: 2,
    level: "N5",
    japanese: "飲む",
    reading: "のむ",
    meaning: "Uống",
    example: "水を飲みます。",
    exampleMeaning: "Tôi uống nước.",
  },
  {
    id: 3,
    level: "N5",
    japanese: "行く",
    reading: "いく",
    meaning: "Đi",
    example: "学校に行きます。",
    exampleMeaning: "Tôi đi đến trường.",
  },
  {
    id: 4,
    level: "N5",
    japanese: "来る",
    reading: "くる",
    meaning: "Đến",
    example: "友だちが来ます。",
    exampleMeaning: "Bạn tôi sẽ đến.",
  },
  {
    id: 5,
    level: "N5",
    japanese: "見る",
    reading: "みる",
    meaning: "Xem, nhìn",
    example: "テレビを見ます。",
    exampleMeaning: "Tôi xem TV.",
  },
  {
    id: 6,
    level: "N5",
    japanese: "書く",
    reading: "かく",
    meaning: "Viết",
    example: "手紙を書きます。",
    exampleMeaning: "Tôi viết thư.",
  },
  // ── N4 ─────────────────────────────────
  {
    id: 7,
    level: "N4",
    japanese: "届ける",
    reading: "とどける",
    meaning: "Giao, chuyển đến",
    example: "荷物を届けます。",
    exampleMeaning: "Tôi giao hàng.",
  },
  {
    id: 8,
    level: "N4",
    japanese: "届く",
    reading: "とどく",
    meaning: "Đến nơi, tới",
    example: "手紙が届きました。",
    exampleMeaning: "Thư đã đến.",
  },
  {
    id: 9,
    level: "N4",
    japanese: "込む",
    reading: "こむ",
    meaning: "Đông đúc",
    example: "電車が込んでいます。",
    exampleMeaning: "Tàu điện đang đông.",
  },
  {
    id: 10,
    level: "N4",
    japanese: "決める",
    reading: "きめる",
    meaning: "Quyết định",
    example: "旅行の日を決めました。",
    exampleMeaning: "Tôi đã quyết định ngày đi du lịch.",
  },
  // ── N3 ─────────────────────────────────
  {
    id: 11,
    level: "N3",
    japanese: "経験",
    reading: "けいけん",
    meaning: "Kinh nghiệm",
    example: "いい経験になりました。",
    exampleMeaning: "Đó là một kinh nghiệm tốt.",
  },
  {
    id: 12,
    level: "N3",
    japanese: "影響",
    reading: "えいきょう",
    meaning: "Ảnh hưởng",
    example: "天気が生活に影響します。",
    exampleMeaning: "Thời tiết ảnh hưởng đến cuộc sống.",
  },
  {
    id: 13,
    level: "N3",
    japanese: "比較",
    reading: "ひかく",
    meaning: "So sánh",
    example: "二つの商品を比較します。",
    exampleMeaning: "Tôi so sánh hai sản phẩm.",
  },
  {
    id: 14,
    level: "N3",
    japanese: "努力",
    reading: "どりょく",
    meaning: "Nỗ lực",
    example: "毎日努力しています。",
    exampleMeaning: "Tôi nỗ lực mỗi ngày.",
  },
  {
    id: 15,
    level: "N3",
    japanese: "予定",
    reading: "よてい",
    meaning: "Kế hoạch, dự định",
    example: "明日の予定は何ですか？",
    exampleMeaning: "Kế hoạch ngày mai là gì?",
  },
  {
    id: 16,
    level: "N3",
    japanese: "関係",
    reading: "かんけい",
    meaning: "Quan hệ, liên quan",
    example: "友だちとの関係が大切です。",
    exampleMeaning: "Mối quan hệ với bạn bè rất quan trọng.",
  },
];
