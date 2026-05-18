export interface ListeningQuestion {
  id: number;
  level: "N5" | "N4" | "N3";
  japanese: string;
  speakText: string;
  meaning: string;
  /** Wrong answer choices (Vietnamese) */
  distractors: [string, string, string];
}

export const listeningQuestions: ListeningQuestion[] = [
  // ── N5 ─────────────────────────────────
  {
    id: 1,
    level: "N5",
    japanese: "おはようございます。",
    speakText: "おはようございます",
    meaning: "Chào buổi sáng.",
    distractors: ["Chào buổi tối.", "Tạm biệt.", "Cảm ơn."],
  },
  {
    id: 2,
    level: "N5",
    japanese: "これはいくらですか？",
    speakText: "これはいくらですか",
    meaning: "Cái này bao nhiêu tiền?",
    distractors: ["Cái này là gì?", "Cái này ở đâu?", "Cái này của ai?"],
  },
  {
    id: 3,
    level: "N5",
    japanese: "すみません、トイレはどこですか？",
    speakText: "すみません、トイレはどこですか",
    meaning: "Xin lỗi, nhà vệ sinh ở đâu?",
    distractors: ["Xin lỗi, ga tàu ở đâu?", "Xin lỗi, mấy giờ rồi?", "Xin lỗi, tên bạn là gì?"],
  },
  {
    id: 4,
    level: "N5",
    japanese: "にほんごをべんきょうしています。",
    speakText: "にほんごをべんきょうしています",
    meaning: "Tôi đang học tiếng Nhật.",
    distractors: ["Tôi đang làm việc.", "Tôi đang đọc sách.", "Tôi đang ăn cơm."],
  },
  {
    id: 5,
    level: "N5",
    japanese: "わたしはベトナムじんです。",
    speakText: "わたしはベトナム人です",
    meaning: "Tôi là người Việt Nam.",
    distractors: ["Tôi là người Nhật.", "Tôi là sinh viên.", "Tôi là giáo viên."],
  },
  // ── N4 ─────────────────────────────────
  {
    id: 6,
    level: "N4",
    japanese: "もうすこしゆっくりはなしてください。",
    speakText: "もう少しゆっくり話してください",
    meaning: "Xin hãy nói chậm hơn một chút.",
    distractors: ["Xin hãy nói to hơn.", "Xin hãy viết ra giấy.", "Xin hãy nói lại lần nữa."],
  },
  {
    id: 7,
    level: "N4",
    japanese: "えきまでどうやっていきますか？",
    speakText: "駅までどうやって行きますか",
    meaning: "Đi đến ga bằng cách nào?",
    distractors: ["Ga ở đâu?", "Ga mở cửa lúc mấy giờ?", "Bến xe buýt ở đâu?"],
  },
  {
    id: 8,
    level: "N4",
    japanese: "しゅくだいをわすれてしまいました。",
    speakText: "宿題を忘れてしまいました",
    meaning: "Tôi đã lỡ quên bài tập rồi.",
    distractors: ["Tôi đã làm xong bài tập.", "Tôi đã nộp bài tập.", "Tôi đã mượn bài tập."],
  },
  {
    id: 9,
    level: "N4",
    japanese: "あしたはてんきがいいらしいです。",
    speakText: "明日は天気がいいらしいです",
    meaning: "Nghe nói ngày mai thời tiết đẹp.",
    distractors: ["Hôm nay trời mưa.", "Ngày mai sẽ lạnh.", "Tuần sau có bão."],
  },
  // ── N3 ─────────────────────────────────
  {
    id: 10,
    level: "N3",
    japanese: "日本語を勉強するために、東京に来ました。",
    speakText: "日本語を勉強するために、東京に来ました",
    meaning: "Tôi đến Tokyo để học tiếng Nhật.",
    distractors: [
      "Tôi đến Tokyo để du lịch.",
      "Tôi đến Osaka để học.",
      "Tôi đến Tokyo để làm việc.",
    ],
  },
  {
    id: 11,
    level: "N3",
    japanese: "天気予報によると、明日は雨が降るそうです。",
    speakText: "天気予報によると、明日は雨が降るそうです",
    meaning: "Theo dự báo thời tiết, ngày mai sẽ mưa.",
    distractors: [
      "Theo tin tức, ngày mai sẽ nóng.",
      "Theo bạn tôi, ngày mai sẽ đẹp.",
      "Theo dự báo, tuần sau sẽ tuyết.",
    ],
  },
  {
    id: 12,
    level: "N3",
    japanese: "この映画は見れば見るほどおもしろいです。",
    speakText: "この映画は見れば見るほど面白いです",
    meaning: "Phim này càng xem càng thấy hay.",
    distractors: ["Phim này rất buồn chán.", "Phim này khá dài.", "Phim này rất nổi tiếng."],
  },
];
