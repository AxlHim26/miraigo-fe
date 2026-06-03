import type { GrammarPoint } from "@/features/grammar/types/grammar";

/** Mimikara Oboeru N2 */
export const n2GrammarPoints: GrammarPoint[] = [
  // ── Chương 1: Điều kiện ───────────────────────────────
  {
    id: "n2-01",
    levelId: "n2-mimikara",
    title: "〜としたら / 〜とすれば",
    meaning: "Nếu giả sử ... thì ... (điều kiện giả định chủ quan)",
    structure: "Plain + としたら / とすれば",
    lesson: 1,
    tags: ["điều kiện", "giả định", "chủ quan"],
    notes: "Khác「〜たら」「〜ば」: nhấn mạnh đây là giả thuyết do người nói đặt ra.",
    examples: [
      {
        japanese: "宝くじが当たったとしたら、何をしますか。",
        reading: "たからくじがあたったとしたら、なにをしますか。",
        vietnamese: "Giả sử trúng xổ số thì bạn sẽ làm gì?",
      },
      {
        japanese: "今の若者の立場とすれば、就職は難しい問題だ。",
        reading: "いまのわかもののたちばとすれば、しゅうしょくはむずかしいもんだいだ。",
        vietnamese: "Từ góc nhìn của người trẻ ngày nay thì việc làm là vấn đề khó khăn.",
      },
    ],
  },
  {
    id: "n2-02",
    levelId: "n2-mimikara",
    title: "〜さえ〜ば",
    meaning: "Chỉ cần ... là ... / Miễn là ...",
    structure: "N + さえ + V ば / Adj ければ",
    lesson: 1,
    tags: ["điều kiện tối thiểu", "chỉ cần"],
    examples: [
      {
        japanese: "健康でさえあれば、何でもできます。",
        reading: "けんこうでさえあれば、なんでもできます。",
        vietnamese: "Chỉ cần có sức khỏe là làm được gì cũng được.",
      },
      {
        japanese: "お金さえあれば問題ない。",
        reading: "おかねさえあればもんだいない。",
        vietnamese: "Chỉ cần có tiền là không có vấn đề gì.",
      },
    ],
  },

  // ── Chương 2: Đánh giá ───────────────────────────────
  {
    id: "n2-03",
    levelId: "n2-mimikara",
    title: "〜にしては",
    meaning: "Xét theo ... thì (kết quả tương phản với kỳ vọng từ điều kiện đó)",
    structure: "N / V (plain) + にしては",
    lesson: 2,
    tags: ["đánh giá", "tương phản", "kỳ vọng"],
    notes: 'Hàm ý: "Với tư cách là X, kết quả này (tốt hơn / tệ hơn) so với mong đợi".',
    examples: [
      {
        japanese: "初めて作ったにしては、おいしいですね。",
        reading: "はじめてつくったにしては、おいしいですね。",
        vietnamese: "Xét là lần đầu làm thì ngon đấy nhỉ.",
      },
      {
        japanese: "10年日本に住んでいるにしては、日本語があまり上手じゃない。",
        reading: "じゅうねんにほんにすんでいるにしては、にほんごがあまりじょうずじゃない。",
        vietnamese: "Xét theo 10 năm sống ở Nhật thì tiếng Nhật không được lắm.",
      },
    ],
  },
  {
    id: "n2-04",
    levelId: "n2-mimikara",
    title: "〜わりに(は)",
    meaning: "So với ... thì / Không như người ta nghĩ về ...",
    structure: "N の / Plain + わりに(は)",
    lesson: 2,
    tags: ["so sánh", "không đúng kỳ vọng", "đánh giá"],
    examples: [
      {
        japanese: "値段のわりには品質がいい。",
        reading: "ねだんのわりにはひんしつがいい。",
        vietnamese: "So với giá cả thì chất lượng tốt đấy.",
      },
      {
        japanese: "練習しているわりに上達が遅い。",
        reading: "れんしゅうしているわりにじょうたつがおそい。",
        vietnamese: "So với mức độ luyện tập thì tiến bộ khá chậm.",
      },
    ],
  },

  // ── Chương 3: Bổ sung / Nhấn mạnh ───────────────────
  {
    id: "n2-05",
    levelId: "n2-mimikara",
    title: "〜ばかりか〜も",
    meaning: "Không những ... mà còn ...",
    structure: "N / Plain + ばかりか + N / V + も",
    lesson: 3,
    tags: ["bổ sung", "nhấn mạnh", "không những"],
    notes: "Mạnh hơn「〜だけでなく」, thường dùng trong văn viết.",
    examples: [
      {
        japanese: "彼は日本語ばかりか英語も中国語も話せる。",
        reading: "かれはにほんごばかりかえいごもちゅうごくごもはなせる。",
        vietnamese: "Anh ấy không những biết tiếng Nhật mà còn nói được tiếng Anh và tiếng Trung.",
      },
      {
        japanese: "その失敗は時間ばかりかお金も無駄にしました。",
        reading: "そのしっぱいはじかんばかりかおかねもむだにしました。",
        vietnamese: "Sự thất bại đó không những lãng phí thời gian mà còn lãng phí cả tiền bạc.",
      },
    ],
  },
  {
    id: "n2-06",
    levelId: "n2-mimikara",
    title: "〜はもちろん〜も",
    meaning: "... thì đương nhiên rồi, mà ... cũng ...",
    structure: "N + はもちろん + N / V + も",
    lesson: 3,
    tags: ["đương nhiên", "bổ sung", "tất nhiên"],
    examples: [
      {
        japanese: "彼女は日本語はもちろん、英語も話せます。",
        reading: "かのじょはにほんごはもちろん、えいごもはなせます。",
        vietnamese: "Cô ấy dĩ nhiên nói được tiếng Nhật, mà còn nói được cả tiếng Anh nữa.",
      },
      {
        japanese: "土日はもちろん、平日も忙しい。",
        reading: "どにちはもちろん、へいじつもいそがしい。",
        vietnamese: "Cuối tuần thì đương nhiên rồi, ngày thường cũng bận.",
      },
    ],
  },

  // ── Chương 4: Suy luận / Kết luận ─────────────────────
  {
    id: "n2-07",
    levelId: "n2-mimikara",
    title: "〜わけだ",
    meaning: "Tức là / Điều đó có nghĩa là ... (giải thích hợp logic)",
    structure: "Plain + わけだ",
    lesson: 4,
    tags: ["giải thích", "suy luận", "kết luận"],
    notes: "Dùng khi người nói đưa ra kết luận logic từ thông tin đã biết.",
    examples: [
      {
        japanese: "毎日練習しているわけだから、うまくなるのは当然だ。",
        reading: "まいにちれんしゅうしているわけだから、うまくなるのはとうぜんだ。",
        vietnamese: "Vì luyện tập mỗi ngày nên việc giỏi lên là đương nhiên rồi.",
      },
      {
        japanese: "10年間日本語を勉強したわけだから、ペラペラなはずだ。",
        reading: "じゅうねんかんにほんごをべんきょうしたわけだから、ペラペラなはずだ。",
        vietnamese: "Học tiếng Nhật 10 năm thì đáng lẽ phải nói thành thạo chứ.",
      },
    ],
  },
  {
    id: "n2-08",
    levelId: "n2-mimikara",
    title: "〜わけではない / 〜わけがない",
    meaning: "Không có nghĩa là ... / Không thể nào ...",
    structure: "Plain + わけではない / わけがない",
    lesson: 4,
    tags: ["phủ nhận", "không nhất thiết", "không thể"],
    notes:
      "「わけではない」: phủ nhận nhẹ (không phải vậy). 「わけがない」: phủ nhận mạnh (không thể).",
    examples: [
      {
        japanese: "嫌いなわけではないが、あまり食べない。",
        reading: "きらいなわけではないが、あまりたべない。",
        vietnamese: "Không phải là tôi ghét, nhưng tôi không ăn nhiều lắm.",
      },
      {
        japanese: "彼が嘘をつくわけがない。絶対に信頼できる人だ。",
        reading: "かれがうそをつくわけがない。ぜったいにしんらいできるひとだ。",
        vietnamese: "Không thể nào anh ấy nói dối. Đó là người hoàn toàn đáng tin cậy.",
      },
    ],
  },

  // ── Chương 5: Bất chấp ────────────────────────────────
  {
    id: "n2-09",
    levelId: "n2-mimikara",
    title: "〜にもかかわらず",
    meaning: "Mặc dù / Bất chấp ... (văn viết, trang trọng)",
    structure: "N / Plain + にもかかわらず",
    lesson: 5,
    tags: ["nhượng bộ", "bất chấp", "trang trọng"],
    notes: "Trang trọng hơn「〜のに」. Thường dùng trong văn viết hoặc bài phát biểu.",
    examples: [
      {
        japanese: "悪天候にもかかわらず、大会は予定通り行われた。",
        reading: "あくてんこうにもかかわらず、たいかいはよていどおりおこなわれた。",
        vietnamese: "Mặc dù thời tiết xấu, cuộc thi vẫn diễn ra đúng kế hoạch.",
      },
      {
        japanese: "反対意見にもかかわらず、計画は実行された。",
        reading: "はんたいいけんにもかかわらず、けいかくはじっこうされた。",
        vietnamese: "Bất chấp sự phản đối, kế hoạch vẫn được thực hiện.",
      },
    ],
  },
  {
    id: "n2-10",
    levelId: "n2-mimikara",
    title: "〜ものの",
    meaning: "Tuy rằng ... nhưng ... (thừa nhận điều A nhưng B vẫn xảy ra)",
    structure: "Plain + ものの",
    lesson: 5,
    tags: ["nhượng bộ", "tuy rằng", "văn viết"],
    examples: [
      {
        japanese: "留学したものの、日本語が思ったより上達しなかった。",
        reading: "りゅうがくしたものの、にほんごがおもったよりじょうたつしなかった。",
        vietnamese: "Tuy đã du học nhưng tiếng Nhật không tiến bộ như mong đợi.",
      },
      {
        japanese: "謝ったものの、まだ怒っているようだ。",
        reading: "あやまったものの、まだおこっているようだ。",
        vietnamese: "Tuy đã xin lỗi nhưng có vẻ còn giận.",
      },
    ],
  },

  // ── Chương 6: Trạng thái ──────────────────────────────
  {
    id: "n2-11",
    levelId: "n2-mimikara",
    title: "〜まま",
    meaning: "Để nguyên trạng thái (không thay đổi dù nên thay đổi)",
    structure: "V た形 + まま / V ない形 + まま / N + のまま",
    lesson: 6,
    tags: ["trạng thái", "nguyên vẹn"],
    examples: [
      {
        japanese: "コートを着たまま、家に入った。",
        reading: "コートをきたまま、いえにはいった。",
        vietnamese: "Tôi đi vào nhà mà vẫn còn mặc áo khoác.",
      },
      {
        japanese: "問題を解決しないまま、会議が終わった。",
        reading: "もんだいをかいけつしないまま、かいぎがおわった。",
        vietnamese: "Cuộc họp kết thúc mà vẫn chưa giải quyết được vấn đề.",
      },
    ],
  },
  {
    id: "n2-12",
    levelId: "n2-mimikara",
    title: "〜ことになっている",
    meaning: "Được quy định / Theo như thỏa thuận / Được lên lịch là ...",
    structure: "V (từ điển / phủ định) + ことになっている",
    lesson: 6,
    tags: ["quy định", "thỏa thuận", "lịch trình"],
    examples: [
      {
        japanese: "会社では残業代が出ることになっています。",
        reading: "かいしゃではざんぎょうだいがでることになっています。",
        vietnamese: "Theo quy định công ty, làm thêm giờ sẽ được trả thêm lương.",
      },
      {
        japanese: "明日の朝10時に集合することになっています。",
        reading: "あしたのあさじゅうじにしゅうごうすることになっています。",
        vietnamese: "Chúng tôi đã hẹn tập hợp lúc 10 giờ sáng mai.",
      },
    ],
  },

  // ── Chương 7: Hạn chế / Phạm vi ──────────────────────
  {
    id: "n2-13",
    levelId: "n2-mimikara",
    title: "〜をはじめ(として)",
    meaning: "Bắt đầu từ / Bao gồm ... (ví dụ tiêu biểu đầu tiên)",
    structure: "N + をはじめ(として) + N など",
    lesson: 7,
    tags: ["liệt kê", "ví dụ", "bao gồm"],
    examples: [
      {
        japanese: "東京をはじめ、大阪や名古屋などの大都市に人口が集中しています。",
        reading:
          "とうきょうをはじめ、おおさかやなごやなどのだいとしにじんこうがしゅうちゅうしています。",
        vietnamese:
          "Dân số tập trung ở các thành phố lớn, đứng đầu là Tokyo, tiếp theo là Osaka, Nagoya...",
      },
    ],
  },
  {
    id: "n2-14",
    levelId: "n2-mimikara",
    title: "〜に限らず",
    meaning: "Không chỉ giới hạn ở ... / Không riêng gì ...",
    structure: "N + に限らず",
    lesson: 7,
    tags: ["phạm vi", "mở rộng", "không giới hạn"],
    examples: [
      {
        japanese: "若者に限らず、お年寄りもスマートフォンを使っています。",
        reading: "わかものにかぎらず、おとしよりもスマートフォンをつかっています。",
        vietnamese: "Không chỉ người trẻ, người cao tuổi cũng dùng điện thoại thông minh.",
      },
      {
        japanese: "日本に限らず、世界中で環境問題が深刻です。",
        reading: "にほんにかぎらず、せかいじゅうでかんきょうもんだいがしんこくです。",
        vietnamese: "Không chỉ Nhật Bản mà vấn đề môi trường nghiêm trọng trên toàn thế giới.",
      },
    ],
  },

  // ── Chương 8: Mức độ ──────────────────────────────────
  {
    id: "n2-15",
    levelId: "n2-mimikara",
    title: "〜ほど〜はない",
    meaning: "Không có gì bằng ... / ... nhất",
    structure: "N + ほど + い Adj (phủ định) / N はない",
    lesson: 8,
    tags: ["so sánh", "mức độ cao nhất", "không bằng"],
    examples: [
      {
        japanese: "健康ほど大切なものはない。",
        reading: "けんこうほどたいせつなものはない。",
        vietnamese: "Không có gì quý hơn sức khỏe.",
      },
      {
        japanese: "彼女ほど優秀な社員はいない。",
        reading: "かのじょほどゆうしゅうなしゃいんはいない。",
        vietnamese: "Không có nhân viên nào xuất sắc bằng cô ấy.",
      },
    ],
  },
  {
    id: "n2-16",
    levelId: "n2-mimikara",
    title: "〜てたまらない",
    meaning: "... quá / Cực kỳ ... (cảm giác mãnh liệt không kìm được)",
    structure: "V て形 / い Adj くて / な Adj で + たまらない",
    lesson: 8,
    tags: ["cảm xúc mãnh liệt", "không chịu được"],
    examples: [
      {
        japanese: "眠くてたまりません。",
        reading: "ねむくてたまりません。",
        vietnamese: "Buồn ngủ quá chịu không được.",
      },
      {
        japanese: "彼女のことが心配でたまらない。",
        reading: "かのじょのことがしんぱいでたまらない。",
        vietnamese: "Tôi lo lắng cho cô ấy quá.",
      },
    ],
  },

  // ── Chương 9: Thụ động / Tương tác ───────────────────
  {
    id: "n2-17",
    levelId: "n2-mimikara",
    title: "〜によって (phương pháp / nguyên nhân / tác nhân)",
    meaning: "Tùy theo / Bằng cách / Do (chỉ phương pháp, nguyên nhân hoặc tác nhân bị động)",
    structure: "N + によって",
    lesson: 9,
    tags: ["phương pháp", "nguyên nhân", "tác nhân"],
    notes: "「によって」đa nghĩa: ① phương pháp; ② tác nhân (bị động); ③ tùy theo; ④ nguyên nhân.",
    examples: [
      {
        japanese: "結果は努力によって変わります。",
        reading: "けっかはどりょくによってかわります。",
        vietnamese: "Kết quả thay đổi tùy theo nỗ lực.",
      },
      {
        japanese: "この橋は明治時代に建てられたものによって設計された。",
        reading: "このはしはめいじじだいにたてられたものによってせっけいされた。",
        vietnamese: "Cây cầu này được thiết kế bởi người từ thời Minh Trị.",
      },
      {
        japanese: "人によって意見が違います。",
        reading: "ひとによっていけんがちがいます。",
        vietnamese: "Ý kiến khác nhau tùy theo người.",
      },
    ],
  },
  {
    id: "n2-18",
    levelId: "n2-mimikara",
    title: "〜に応じて",
    meaning: "Tùy theo / Phù hợp với ...",
    structure: "N + に応じて / に応じた + N",
    lesson: 9,
    tags: ["tương ứng", "tùy theo", "phù hợp"],
    examples: [
      {
        japanese: "収入に応じて税金が決まります。",
        reading: "しゅうにゅうにおうじてぜいきんがきまります。",
        vietnamese: "Thuế được xác định tùy theo thu nhập.",
      },
      {
        japanese: "状況に応じた対応が必要です。",
        reading: "じょうきょうにおうじたたいおうがひつようです。",
        vietnamese: "Cần có cách ứng xử phù hợp với tình huống.",
      },
    ],
  },
];
