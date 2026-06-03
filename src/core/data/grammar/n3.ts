import type { GrammarPoint } from "@/features/grammar/types/grammar";

/** Mimikara Oboeru N3 */
export const n3GrammarPoints: GrammarPoint[] = [
  // ── Chương 1: Phỏng đoán ──────────────────────────────
  {
    id: "n3-01",
    levelId: "n3-mimikara",
    title: "〜に違いない",
    meaning: "Chắc chắn là ... (suy luận mạnh, người nói tự tin cao)",
    structure: "Plain + に違いない",
    lesson: 1,
    tags: ["phỏng đoán", "chắc chắn", "suy luận"],
    notes:
      "Mức độ chắc chắn cao hơn「〜だろう」, thấp hơn「〜はずだ」(dựa trên bằng chứng cụ thể).",
    examples: [
      {
        japanese: "あの人は外国人に違いない。",
        reading: "あのひとはがいこくじんにちがいない。",
        vietnamese: "Người đó chắc chắn là người nước ngoài.",
      },
      {
        japanese: "彼女は試験に合格したに違いない。",
        reading: "かのじょはしけんにごうかくしたにちがいない。",
        vietnamese: "Chắc chắn cô ấy đã đỗ kỳ thi rồi.",
      },
      {
        japanese: "こんなに高い車、彼が買ったに違いない。",
        reading: "こんなにたかいくるま、かれがかったにちがいない。",
        vietnamese: "Chiếc xe đắt như vậy, chắc chắn là anh ấy đã mua.",
      },
    ],
  },
  {
    id: "n3-02",
    levelId: "n3-mimikara",
    title: "〜かもしれない",
    meaning: "Có thể là ... (không chắc, xác suất thấp đến trung bình)",
    structure: "Plain + かもしれない",
    lesson: 1,
    tags: ["phỏng đoán", "không chắc"],
    examples: [
      {
        japanese: "明日は雨が降るかもしれません。",
        reading: "あしたはあめがふるかもしれません。",
        vietnamese: "Ngày mai có thể trời mưa.",
      },
      {
        japanese: "彼はもう帰ったかもしれない。",
        reading: "かれはもうかえったかもしれない。",
        vietnamese: "Có thể anh ấy đã về rồi.",
      },
      {
        japanese: "その噂は本当かもしれない。",
        reading: "そのうわさはほんとうかもしれない。",
        vietnamese: "Tin đồn đó có thể là thật.",
      },
    ],
  },
  {
    id: "n3-03",
    levelId: "n3-mimikara",
    title: "〜ようだ / 〜みたいだ",
    meaning: "Có vẻ như ... (suy luận từ quan sát trực tiếp)",
    structure: "Plain + ようだ　／　Plain + みたいだ",
    lesson: 1,
    tags: ["suy luận", "quan sát", "có vẻ"],
    notes: "「みたいだ」thông thường hơn「ようだ」. Cả hai dựa trên quan sát trực tiếp.",
    examples: [
      {
        japanese: "外が騒がしいようですね。何があったんでしょう。",
        reading: "そとがさわがしいようですね。なにがあったんでしょう。",
        vietnamese: "Bên ngoài có vẻ ồn ào nhỉ. Chuyện gì xảy ra vậy nhỉ?",
      },
      {
        japanese: "田中さんは風邪をひいたみたいです。",
        reading: "たなかさんはかぜをひいたみたいです。",
        vietnamese: "Có vẻ anh Tanaka bị cảm rồi.",
      },
    ],
  },
  {
    id: "n3-04",
    levelId: "n3-mimikara",
    title: "〜そうだ (trông có vẻ)",
    meaning: "Trông có vẻ ... (nhìn bề ngoài mà nhận xét)",
    structure: "V ます (bỏ ます) / い Adj (bỏ い) / な Adj + そうだ",
    lesson: 1,
    tags: ["bề ngoài", "nhìn vào", "suy luận"],
    notes: "Khác「〜そうだ (nghe nói)」: cái này dựa trên nhìn thấy bằng mắt.",
    examples: [
      {
        japanese: "このケーキ、おいしそうですね。",
        reading: "このケーキ、おいしそうですね。",
        vietnamese: "Cái bánh này trông có vẻ ngon nhỉ.",
      },
      {
        japanese: "空が暗くなって、雨が降りそうです。",
        reading: "そらがくらくなって、あめがふりそうです。",
        vietnamese: "Bầu trời tối dần, trông như sắp mưa rồi.",
      },
      {
        japanese: "彼は悲しそうな顔をしています。",
        reading: "かれはかなしそうなかおをしています。",
        vietnamese: "Anh ấy có vẻ mặt buồn.",
      },
    ],
  },

  // ── Chương 2: Nguyên nhân / Kết quả ──────────────────
  {
    id: "n3-05",
    levelId: "n3-mimikara",
    title: "〜ので",
    meaning: "Bởi vì ... nên ... (lý do khách quan, lịch sự)",
    structure: "Plain (N / な Adj + な) + ので",
    lesson: 2,
    tags: ["lý do", "nguyên nhân", "lịch sự"],
    notes: "Lịch sự và khách quan hơn「〜から」. Phổ biến trong văn viết và hội thoại trang trọng.",
    examples: [
      {
        japanese: "熱があるので、会社を休みます。",
        reading: "ねつがあるので、かいしゃをやすみます。",
        vietnamese: "Vì bị sốt nên tôi nghỉ làm.",
      },
      {
        japanese: "静かなので、この図書館が好きです。",
        reading: "しずかなので、このとしょかんがすきです。",
        vietnamese: "Vì yên tĩnh nên tôi thích thư viện này.",
      },
    ],
  },
  {
    id: "n3-06",
    levelId: "n3-mimikara",
    title: "〜ために (nguyên nhân)",
    meaning: "Do ... mà / Vì ... nên ... (nguyên nhân cho kết quả tiêu cực)",
    structure: "N の / V (từ điển) + ために",
    lesson: 2,
    tags: ["nguyên nhân", "tiêu cực", "kết quả"],
    notes: "「ために」chỉ nguyên nhân khách quan, thường cho kết quả tiêu cực hoặc trung tính.",
    examples: [
      {
        japanese: "事故のために、電車が遅れました。",
        reading: "じこのために、でんしゃがおくれました。",
        vietnamese: "Do tai nạn nên tàu điện bị trễ.",
      },
      {
        japanese: "台風のために、試合が中止になりました。",
        reading: "たいふうのために、しあいがちゅうしになりました。",
        vietnamese: "Do bão nên trận đấu bị hủy.",
      },
    ],
  },

  // ── Chương 3: Bổ sung ──────────────────────────────────
  {
    id: "n3-07",
    levelId: "n3-mimikara",
    title: "〜だけでなく〜も",
    meaning: "Không chỉ ... mà còn ...",
    structure: "N/V + だけでなく + N/V + も",
    lesson: 3,
    tags: ["bổ sung", "mở rộng"],
    examples: [
      {
        japanese: "彼は英語だけでなく、中国語も話せます。",
        reading: "かれはえいごだけでなく、ちゅうごくごもはなせます。",
        vietnamese: "Anh ấy không chỉ nói được tiếng Anh mà còn nói được tiếng Trung.",
      },
      {
        japanese: "料理が上手なだけでなく、優しい人です。",
        reading: "りょうりがじょうずなだけでなく、やさしいひとです。",
        vietnamese: "Không chỉ nấu ăn giỏi mà còn là người tốt bụng.",
      },
    ],
  },
  {
    id: "n3-08",
    levelId: "n3-mimikara",
    title: "〜し〜し (liệt kê lý do)",
    meaning: "Vừa ... lại vừa ... (liệt kê nhiều lý do hoặc đặc điểm)",
    structure: "Plain + し、Plain + し",
    lesson: 3,
    tags: ["liệt kê", "lý do", "nhiều yếu tố"],
    examples: [
      {
        japanese: "この町は安全だし、便利だし、住みやすいです。",
        reading: "このまちはあんぜんだし、べんりだし、すみやすいです。",
        vietnamese: "Thị trấn này vừa an toàn vừa tiện lợi, dễ sống lắm.",
      },
      {
        japanese: "雨が降っているし、寒いし、外に出たくありません。",
        reading: "あめがふっているし、さむいし、そとにでたくありません。",
        vietnamese: "Trời vừa mưa lại vừa lạnh, tôi không muốn ra ngoài.",
      },
    ],
  },

  // ── Chương 4: Giới hạn / Phạm vi ─────────────────────
  {
    id: "n3-09",
    levelId: "n3-mimikara",
    title: "〜だけ",
    meaning: "Chỉ ... / Chỉ vậy thôi (giới hạn trong phạm vi nhất định)",
    structure: "N/V + だけ",
    lesson: 4,
    tags: ["giới hạn", "chỉ"],
    notes: "Khác「〜しか (〜ない)」: 「だけ」trung tính; 「しか」nhấn mạnh ít ỏi, không đủ.",
    examples: [
      {
        japanese: "この問題は田中さんだけわかります。",
        reading: "このもんだいはたなかさんだけわかります。",
        vietnamese: "Chỉ có anh Tanaka mới hiểu bài toán này.",
      },
      {
        japanese: "一つだけ質問があります。",
        reading: "ひとつだけしつもんがあります。",
        vietnamese: "Tôi chỉ có một câu hỏi thôi.",
      },
    ],
  },
  {
    id: "n3-10",
    levelId: "n3-mimikara",
    title: "〜しか〜ない",
    meaning: "Chỉ có ... (nhấn mạnh ít ỏi, không đủ)",
    structure: "N/V + しか + phủ định",
    lesson: 4,
    tags: ["giới hạn", "ít ỏi", "phủ định"],
    examples: [
      {
        japanese: "財布に100円しか入っていません。",
        reading: "さいふに100えんしかはいっていません。",
        vietnamese: "Trong ví tôi chỉ còn 100 yên thôi.",
      },
      {
        japanese: "日本語しか話せません。",
        reading: "にほんごしかはなせません。",
        vietnamese: "Tôi chỉ nói được tiếng Nhật thôi.",
      },
    ],
  },

  // ── Chương 5: Tương phản / So sánh ───────────────────
  {
    id: "n3-11",
    levelId: "n3-mimikara",
    title: "〜一方で",
    meaning: "Trong khi đó / Mặt khác (tương phản hai trạng thái song song)",
    structure: "Plain + 一方で",
    lesson: 5,
    tags: ["tương phản", "song song", "mặt khác"],
    examples: [
      {
        japanese: "都市では人口が増加する一方で、農村では減少している。",
        reading: "としではじんこうがぞうかするいっぽうで、のうそんではげんしょうしている。",
        vietnamese: "Trong khi dân số ở đô thị tăng, ở nông thôn lại giảm.",
      },
      {
        japanese: "収入が増えた一方で、支出も増えた。",
        reading: "しゅうにゅうがふえたいっぽうで、ししゅつもふえた。",
        vietnamese: "Thu nhập tăng trong khi đó chi tiêu cũng tăng.",
      },
    ],
  },
  {
    id: "n3-12",
    levelId: "n3-mimikara",
    title: "〜に対して",
    meaning: "Đối với / Đối lập với (chỉ đối tượng hoặc tương phản)",
    structure: "N + に対して",
    lesson: 5,
    tags: ["đối tượng", "tương phản", "đối với"],
    examples: [
      {
        japanese: "先生の質問に対して、学生たちが答えた。",
        reading: "せんせいのしつもんにたいして、がくせいたちがこたえた。",
        vietnamese: "Học sinh trả lời câu hỏi của giáo viên.",
      },
      {
        japanese: "日本語が得意なのに対して、英語は苦手です。",
        reading: "にほんごがとくいなのにたいして、えいごはにがてです。",
        vietnamese: "Tôi giỏi tiếng Nhật trong khi lại yếu tiếng Anh.",
      },
    ],
  },

  // ── Chương 6: Thời gian ───────────────────────────────
  {
    id: "n3-13",
    levelId: "n3-mimikara",
    title: "〜うちに",
    meaning: "Trong khi ... / Tranh thủ lúc còn ...",
    structure: "V (từ điển / đang) / い Adj / な Adj な + うちに",
    lesson: 6,
    tags: ["thời gian", "tranh thủ", "trong khi"],
    examples: [
      {
        japanese: "若いうちに、いろいろな経験をしたほうがいいです。",
        reading: "わかいうちに、いろいろなけいけんをしたほうがいいです。",
        vietnamese: "Tranh thủ lúc còn trẻ hãy trải nghiệm nhiều thứ.",
      },
      {
        japanese: "熱いうちに食べてください。",
        reading: "あついうちにたべてください。",
        vietnamese: "Hãy ăn trong khi còn nóng nhé.",
      },
    ],
  },
  {
    id: "n3-14",
    levelId: "n3-mimikara",
    title: "〜ところです",
    meaning: "Đang sắp / Đang vừa / Vừa mới (chỉ thời điểm của hành động)",
    structure: "V (từ điển) + ところです　／　V て + ところです　／　V た + ところです",
    lesson: 6,
    tags: ["thời điểm", "vừa mới", "sắp"],
    notes: "「〜ところ」: sắp làm / đang làm / vừa xong. Thể khác nhau = thời điểm khác nhau.",
    examples: [
      {
        japanese: "今から出かけるところです。",
        reading: "いまからでかけるところです。",
        vietnamese: "Tôi sắp đi ra ngoài ngay bây giờ.",
      },
      {
        japanese: "ちょうど夕食を食べているところです。",
        reading: "ちょうどゆうしょくをたべているところです。",
        vietnamese: "Tôi đang ăn tối đúng lúc này.",
      },
      {
        japanese: "今、帰ったところです。",
        reading: "いま、かえったところです。",
        vietnamese: "Tôi vừa mới về nhà xong.",
      },
    ],
  },
  {
    id: "n3-15",
    levelId: "n3-mimikara",
    title: "〜ぶりに",
    meaning: "Sau (khoảng thời gian) mới ... lại",
    structure: "期間 + ぶりに + V",
    lesson: 6,
    tags: ["thời gian", "khoảng cách", "lần đầu sau lâu"],
    examples: [
      {
        japanese: "3年ぶりに故郷に帰りました。",
        reading: "さんねんぶりにこきょうにかえりました。",
        vietnamese: "Sau 3 năm tôi mới trở về quê hương.",
      },
      {
        japanese: "久しぶりに会いましたね。",
        reading: "ひさしぶりにあいましたね。",
        vietnamese: "Lâu rồi mới gặp nhau nhỉ.",
      },
    ],
  },

  // ── Chương 7: Cách thức / Trạng thái ─────────────────
  {
    id: "n3-16",
    levelId: "n3-mimikara",
    title: "〜まま",
    meaning: "Để nguyên trạng thái ... (không thay đổi)",
    structure: "V た形 / V ない形 + まま / N + のまま",
    lesson: 7,
    tags: ["trạng thái", "nguyên vẹn", "không đổi"],
    examples: [
      {
        japanese: "電気をつけたまま寝てしまいました。",
        reading: "でんきをつけたままねてしまいました。",
        vietnamese: "Tôi đã ngủ quên mà để đèn bật.",
      },
      {
        japanese: "靴を履いたまま上がらないでください。",
        reading: "くつをはいたままあがらないでください。",
        vietnamese: "Đừng đi lên mà vẫn đang mang giày nhé.",
      },
    ],
  },
  {
    id: "n3-17",
    levelId: "n3-mimikara",
    title: "〜っぽい",
    meaning: "Trông có vẻ ... / Hay ... (thường mang ý nghĩa không hoàn toàn tích cực)",
    structure: "N / V ます / い Adj (bỏ い) + っぽい",
    lesson: 7,
    tags: ["bề ngoài", "ấn tượng", "thông thường"],
    examples: [
      {
        japanese: "彼女は子供っぽいです。",
        reading: "かのじょはこどもっぽいです。",
        vietnamese: "Cô ấy trông có vẻ trẻ con.",
      },
      {
        japanese: "この映画は外国っぽい雰囲気があります。",
        reading: "このえいがはがいこくっぽいふんいきがあります。",
        vietnamese: "Bộ phim này có không khí trông như nước ngoài.",
      },
    ],
  },

  // ── Chương 8: Tự động / Bị động ─────────────────────
  {
    id: "n3-18",
    levelId: "n3-mimikara",
    title: "〜される (bị động)",
    meaning: "Bị làm ... / Được làm ... (câu bị động)",
    structure: "V (thể bị động)",
    lesson: 8,
    tags: ["bị động", "passive"],
    notes: "Bị động trực tiếp: chủ thể chịu tác động. Có thể dùng「に」để chỉ tác nhân.",
    examples: [
      {
        japanese: "財布を盗まれました。",
        reading: "さいふをぬすまれました。",
        vietnamese: "Tôi bị mất cắp ví.",
      },
      {
        japanese: "先生に褒められました。",
        reading: "せんせいにほめられました。",
        vietnamese: "Tôi được giáo viên khen.",
      },
      {
        japanese: "この小説は世界中で読まれています。",
        reading: "このしょうせつはせかいじゅうでよまれています。",
        vietnamese: "Tiểu thuyết này được đọc khắp thế giới.",
      },
    ],
  },
  {
    id: "n3-19",
    levelId: "n3-mimikara",
    title: "〜させる (sai khiến / để cho)",
    meaning: "Bắt / để cho / cho phép ai làm gì",
    structure: "V (thể sai khiến)",
    lesson: 9,
    tags: ["sai khiến", "để cho", "causative"],
    notes: "Câu sai khiến: nếu chủ thể bắt buộc → thường dùng「を」; nếu để cho → dùng「に」.",
    examples: [
      {
        japanese: "先生は学生に宿題をさせました。",
        reading: "せんせいはがくせいにしゅくだいをさせました。",
        vietnamese: "Giáo viên bắt học sinh làm bài tập.",
      },
      {
        japanese: "子供を自由に遊ばせてください。",
        reading: "こどもをじゆうにあそばせてください。",
        vietnamese: "Xin hãy để bọn trẻ tự do vui chơi.",
      },
    ],
  },
  {
    id: "n3-20",
    levelId: "n3-mimikara",
    title: "〜させていただく",
    meaning: "Cho phép tôi được ... (cầu xin lịch sự nhất)",
    structure: "V させて + いただく",
    lesson: 10,
    tags: ["kính ngữ", "lịch sự cao", "xin phép"],
    notes: "Rất lịch sự, hay dùng trong kinh doanh và tình huống trang trọng.",
    examples: [
      {
        japanese: "本日はお時間をいただきありがとうございます。では、発表させていただきます。",
        reading:
          "ほんじつはおじかんをいただきありがとうございます。では、はっぴょうさせていただきます。",
        vietnamese:
          "Cảm ơn quý vị đã dành thời gian hôm nay. Vậy, xin cho phép tôi được trình bày.",
      },
      {
        japanese: "確認させていただいてもよろしいでしょうか。",
        reading: "かくにんさせていただいてもよろしいでしょうか。",
        vietnamese: "Tôi có thể xác nhận lại không ạ?",
      },
    ],
  },
];
