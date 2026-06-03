import type { GrammarPoint } from "@/features/grammar/types/grammar";

/** Mimikara Oboeru N1 */
export const n1GrammarPoints: GrammarPoint[] = [
  // ── Chương 1: Không kiểm soát được ───────────────────
  {
    id: "n1-01",
    levelId: "n1-mimikara",
    title: "〜ずにはいられない",
    meaning: "Không thể không ... / Buộc phải ... (không thể kìm lại được)",
    structure: "V ず形 (ない → ず) + にはいられない",
    lesson: 1,
    tags: ["không kiểm soát", "cảm xúc", "buộc phải"],
    notes: "Nhấn mạnh hành động xảy ra tự nhiên, không thể cưỡng lại. Cả người nói và người khác.",
    examples: [
      {
        japanese: "この映画を見ると、笑わずにはいられない。",
        reading: "このえいがをみると、わらわずにはいられない。",
        vietnamese: "Xem bộ phim này không thể không cười được.",
      },
      {
        japanese: "あの子を見ると、抱きしめずにはいられない。",
        reading: "あのこをみると、だきしめずにはいられない。",
        vietnamese: "Nhìn thấy đứa trẻ đó không thể không ôm vào lòng.",
      },
    ],
  },
  {
    id: "n1-02",
    levelId: "n1-mimikara",
    title: "〜てやまない",
    meaning: "Luôn luôn ... / Không ngừng ... (cảm xúc hay ý chí lâu dài)",
    structure: "V て形 + やまない",
    lesson: 1,
    tags: ["liên tục", "cảm xúc lâu dài", "trang trọng"],
    notes: "Thường dùng với 「願う」「愛する」「望む」. Trang trọng, hay xuất hiện trong văn viết.",
    examples: [
      {
        japanese: "皆様のご健勝をお祈りしてやみません。",
        reading: "みなさまのごけんしょうをおいのりしてやみません。",
        vietnamese: "Tôi luôn cầu mong cho mọi người được sức khỏe dồi dào.",
      },
      {
        japanese: "子供の幸せを願ってやまない。",
        reading: "こどものしあわせをねがってやまない。",
        vietnamese: "Tôi không ngừng mong muốn hạnh phúc cho con.",
      },
    ],
  },

  // ── Chương 2: Bất chấp / Dù sao ──────────────────────
  {
    id: "n1-03",
    levelId: "n1-mimikara",
    title: "〜ようが〜まいが",
    meaning: "Dù ... hay không ... (bất kể điều kiện nào, kết quả vẫn vậy)",
    structure: "V ます + ようが + V ます + まいが",
    lesson: 2,
    tags: ["nhượng bộ", "bất kể", "dù sao"],
    examples: [
      {
        japanese: "雨が降ろうが降るまいが、試合は決行する。",
        reading: "あめがふろうがふるまいが、しあいはけっこうする。",
        vietnamese: "Dù trời có mưa hay không, trận đấu vẫn cứ diễn ra.",
      },
      {
        japanese: "誰が賛成しようがしまいが、この計画は進める。",
        reading: "だれがさんせいしようがしまいが、このけいかくはすすめる。",
        vietnamese: "Dù có ai đồng ý hay không, kế hoạch này vẫn tiến hành.",
      },
    ],
  },
  {
    id: "n1-04",
    levelId: "n1-mimikara",
    title: "〜にしろ〜にしろ / 〜にせよ〜にせよ",
    meaning: "Dù là ... hay là ... (trong cả hai trường hợp)",
    structure: "N1 / Plain + にしろ + N2 / Plain + にしろ",
    lesson: 2,
    tags: ["nhượng bộ", "dù là", "hai trường hợp"],
    examples: [
      {
        japanese: "賛成にしろ反対にしろ、意見を言ってください。",
        reading: "さんせいにしろはんたいにしろ、いけんをいってください。",
        vietnamese: "Dù là đồng ý hay phản đối, hãy nói ý kiến của bạn.",
      },
      {
        japanese: "成功にせよ失敗にせよ、全力を尽くすことが大切だ。",
        reading: "せいこうにせよしっぱいにせよ、ぜんりょくをつくすことがたいせつだ。",
        vietnamese: "Dù thành công hay thất bại, điều quan trọng là cố hết sức.",
      },
    ],
  },

  // ── Chương 3: Hoàn cảnh đặc biệt ────────────────────
  {
    id: "n1-05",
    levelId: "n1-mimikara",
    title: "〜とあって",
    meaning: "Vì lý do đặc biệt là ... / Bởi hoàn cảnh là ...",
    structure: "N / Plain + とあって",
    lesson: 3,
    tags: ["lý do", "hoàn cảnh đặc biệt", "hệ quả tự nhiên"],
    notes: "Diễn tả hoàn cảnh đặc biệt dẫn đến kết quả tự nhiên. Thường dùng trong báo chí.",
    examples: [
      {
        japanese: "三連休とあって、観光地はどこも大混雑だ。",
        reading: "さんれんきゅうとあって、かんこうちはどこもだいこんざつだ。",
        vietnamese: "Vì là kỳ nghỉ 3 ngày liên tiếp nên các điểm du lịch đều đông nghịt.",
      },
      {
        japanese: "人気アーティストのコンサートとあって、チケットは即日完売した。",
        reading: "にんきアーティストのコンサートとあって、チケットはそくじつかんばいした。",
        vietnamese: "Vì là concert của nghệ sĩ nổi tiếng nên vé bán hết ngay trong ngày.",
      },
    ],
  },
  {
    id: "n1-06",
    levelId: "n1-mimikara",
    title: "〜とあれば",
    meaning: "Nếu vì lý do ... thì (sẵn sàng làm gì đó)",
    structure: "N / Plain + とあれば",
    lesson: 3,
    tags: ["điều kiện", "sẵn sàng", "lý do"],
    examples: [
      {
        japanese: "君のためとあれば、何でもする。",
        reading: "きみのためとあれば、なんでもする。",
        vietnamese: "Nếu vì bạn thì tôi sẵn sàng làm bất cứ điều gì.",
      },
      {
        japanese: "必要とあれば、いつでも手伝います。",
        reading: "ひつようとあれば、いつでもてつだいます。",
        vietnamese: "Nếu cần thì tôi sẵn sàng giúp bất cứ lúc nào.",
      },
    ],
  },

  // ── Chương 4: Đánh giá kết quả ──────────────────────
  {
    id: "n1-07",
    levelId: "n1-mimikara",
    title: "〜だけのことはある",
    meaning: "Thật đáng / Xứng đáng với ... (kết quả tương xứng với điều kiện)",
    structure: "N / Plain + だけのことはある",
    lesson: 4,
    tags: ["đánh giá", "xứng đáng", "tương xứng"],
    examples: [
      {
        japanese: "さすがプロだけのことはある。素晴らしい演技だった。",
        reading: "さすがプロだけのことはある。すばらしいえんぎだった。",
        vietnamese: "Quả đúng là dân chuyên nghiệp. Màn biểu diễn tuyệt vời.",
      },
      {
        japanese: "10年修業しただけのことはある、腕前が全然違う。",
        reading: "じゅうねんしゅぎょうしただけのことはある、うでまえがぜんぜんちがう。",
        vietnamese: "10 năm tu luyện quả không uổng, tay nghề khác hẳn.",
      },
    ],
  },
  {
    id: "n1-08",
    levelId: "n1-mimikara",
    title: "〜ものがある",
    meaning: "Có cái gì đó ... / Không thể phủ nhận rằng ...",
    structure: "Plain + ものがある",
    lesson: 4,
    tags: ["cảm nhận", "không thể phủ nhận", "chủ quan"],
    examples: [
      {
        japanese: "彼の演奏には感動させられるものがある。",
        reading: "かれのえんそうにはかんどうさせられるものがある。",
        vietnamese: "Trong cách chơi nhạc của anh ấy có điều gì đó khiến người ta cảm động.",
      },
      {
        japanese: "確かに、彼の言葉には説得力があるものがある。",
        reading: "たしかに、かれのことばにはせっとくりょくがあるものがある。",
        vietnamese: "Đúng là, trong lời nói của anh ấy có sức thuyết phục nhất định.",
      },
    ],
  },

  // ── Chương 5: Cấm đoán / Quy phạm ──────────────────
  {
    id: "n1-09",
    levelId: "n1-mimikara",
    title: "〜べからず / 〜べからざる",
    meaning: "Không được ... / Điều không thể ... (cổ ngữ, trang trọng)",
    structure: "V (từ điển) + べからず / べからざる + N",
    lesson: 5,
    tags: ["cấm đoán", "trang trọng", "cổ ngữ", "quy tắc"],
    notes: "Là dạng cổ của「〜てはいけない」. Thường thấy trên bảng hiệu, văn bản pháp luật.",
    examples: [
      {
        japanese: "芝生に入るべからず。",
        reading: "しばふにはいるべからず。",
        vietnamese: "Không được bước vào thảm cỏ.",
      },
      {
        japanese: "これは知らざるべからざる事実だ。",
        reading: "これはしらざるべからざるじじつだ。",
        vietnamese: "Đây là sự thật không thể không biết.",
      },
    ],
  },
  {
    id: "n1-10",
    levelId: "n1-mimikara",
    title: "〜まじき",
    meaning: "Không nên / Không xứng với ... (phán xét đạo đức, hành vi)",
    structure: "V (từ điển) + まじき + N",
    lesson: 5,
    tags: ["đạo đức", "không nên", "phán xét", "trang trọng"],
    notes: "Thường đứng trước danh từ chỉ người. Nhấn mạnh vi phạm đạo đức nghề nghiệp.",
    examples: [
      {
        japanese: "それは教師にあるまじき行為だ。",
        reading: "それはきょうしにあるまじきこういだ。",
        vietnamese: "Đó là hành vi không xứng với tư cách giáo viên.",
      },
      {
        japanese: "医師にあるまじき発言だ。",
        reading: "いしにあるまじきはつげんだ。",
        vietnamese: "Đó là phát ngôn không xứng với một bác sĩ.",
      },
    ],
  },

  // ── Chương 6: Thời gian / Ngay lập tức ──────────────
  {
    id: "n1-11",
    levelId: "n1-mimikara",
    title: "〜そばから",
    meaning: "Ngay khi vừa xong ... thì lại ... (lặp đi lặp lại, không thay đổi được)",
    structure: "V (từ điển / た形) + そばから",
    lesson: 6,
    tags: ["thời gian", "lặp lại", "ngay lập tức", "thất vọng"],
    notes: "Mang hàm ý thất vọng: dù làm rồi nhưng ngay lập tức lại quay về trạng thái ban đầu.",
    examples: [
      {
        japanese: "掃除するそばから子供が散らかす。",
        reading: "そうじするそばからこどもがちらかす。",
        vietnamese: "Vừa dọn xong thì bọn trẻ lại làm bừa ngay.",
      },
      {
        japanese: "覚えたそばから忘れてしまう。",
        reading: "おぼえたそばからわすれてしまう。",
        vietnamese: "Vừa nhớ được xong là lại quên ngay.",
      },
    ],
  },
  {
    id: "n1-12",
    levelId: "n1-mimikara",
    title: "〜が早いか",
    meaning: "Ngay khi / Vừa ... là ... (hành động 2 xảy ra cực nhanh sau hành động 1)",
    structure: "V (từ điển / た形) + が早いか",
    lesson: 6,
    tags: ["thời gian", "tức thì", "phản xạ"],
    notes: "Văn viết, trang trọng. Hành động 2 xảy ra tức thì, không chần chừ.",
    examples: [
      {
        japanese: "ベルが鳴るが早いか、生徒たちは教室を飛び出した。",
        reading: "ベルがなるがはやいか、せいとたちはきょうしつをとびだした。",
        vietnamese: "Vừa nghe chuông reo là học sinh đã ùa ra khỏi lớp ngay.",
      },
      {
        japanese: "彼は椅子に座るが早いか、眠ってしまった。",
        reading: "かれはいすにすわるがはやいか、ねむってしまった。",
        vietnamese: "Anh ấy vừa ngồi xuống ghế là đã ngủ ngay.",
      },
    ],
  },

  // ── Chương 7: Nhân quả / Hệ quả ─────────────────────
  {
    id: "n1-13",
    levelId: "n1-mimikara",
    title: "〜ゆえに / 〜ゆえの",
    meaning: "Vì vậy / Do đó / Vì lý do đó (văn viết, trang trọng)",
    structure: "N / Plain + ゆえに / ゆえの + N",
    lesson: 7,
    tags: ["nguyên nhân", "kết quả", "trang trọng", "văn viết"],
    notes: "Là dạng cổ, tương đương「〜だから」nhưng trang trọng hơn nhiều.",
    examples: [
      {
        japanese: "経験不足ゆえに、このような失敗をしてしまった。",
        reading: "けいけんぶそくゆえに、このようなしっぱいをしてしまった。",
        vietnamese: "Do thiếu kinh nghiệm nên đã phạm phải sai lầm như vậy.",
      },
      {
        japanese: "若さゆえの過ちだった。",
        reading: "わかさゆえのあやまちだった。",
        vietnamese: "Đó là sai lầm của tuổi trẻ.",
      },
    ],
  },
  {
    id: "n1-14",
    levelId: "n1-mimikara",
    title: "〜とともに",
    meaning: "Cùng với / Đồng thời / Khi ... thì ... (đồng biến)",
    structure: "N / V (từ điển) + とともに",
    lesson: 7,
    tags: ["đồng thời", "cùng với", "đồng biến"],
    examples: [
      {
        japanese: "時代の変化とともに、生活スタイルも変わってきた。",
        reading: "じだいのへんかとともに、せいかつスタイルもかわってきた。",
        vietnamese: "Cùng với sự thay đổi của thời đại, phong cách sống cũng thay đổi.",
      },
      {
        japanese: "グローバル化とともに、英語の重要性が増している。",
        reading: "グローバルかとともに、えいごのじゅうようせいがましている。",
        vietnamese: "Cùng với toàn cầu hóa, tầm quan trọng của tiếng Anh ngày càng tăng.",
      },
    ],
  },

  // ── Chương 8: Nhấn mạnh ──────────────────────────────
  {
    id: "n1-15",
    levelId: "n1-mimikara",
    title: "〜ことか",
    meaning: "Biết bao / Thật là ... lắm! (nhấn mạnh cảm xúc mạnh)",
    structure: "疑問詞 + V / Adj + ことか",
    lesson: 8,
    tags: ["nhấn mạnh", "cảm xúc", "thán từ"],
    notes: "Thường đi với「どれほど」「どんなに」「何度」. Bày tỏ cảm xúc rất mạnh.",
    examples: [
      {
        japanese: "あなたに会いたいと、どれほど思ったことか。",
        reading: "あなたにあいたいと、どれほどおもったことか。",
        vietnamese: "Biết bao nhiêu lần tôi đã nghĩ đến việc muốn gặp bạn.",
      },
      {
        japanese: "何度失敗したことか。でも諦めなかった。",
        reading: "なんどしっぱいしたことか。でもあきらめなかった。",
        vietnamese: "Tôi đã thất bại biết bao nhiêu lần. Nhưng không từ bỏ.",
      },
    ],
  },
];
