import type { GrammarPoint } from "@/features/grammar/types/grammar";

/** Minna no Nihongo I — Bài 1-25 */
export const n5GrammarPoints: GrammarPoint[] = [
  // ── Bài 1 ──────────────────────────────────────────────
  {
    id: "n5-01",
    levelId: "n5-minna-1",
    title: "〜は〜です",
    meaning: "... là ... (câu danh từ khẳng định)",
    structure: "N1 + は + N2 + です",
    lesson: 1,
    tags: ["danh từ", "khẳng định", "cơ bản"],
    examples: [
      {
        japanese: "わたしはマリアです。",
        reading: "わたしはマリアです。",
        vietnamese: "Tôi là Maria.",
      },
      { japanese: "これは本です。", reading: "これはほんです。", vietnamese: "Đây là quyển sách." },
      {
        japanese: "田中さんは学生です。",
        reading: "たなかさんはがくせいです。",
        vietnamese: "Anh Tanaka là học sinh.",
      },
    ],
  },
  {
    id: "n5-02",
    levelId: "n5-minna-1",
    title: "〜は〜ではありません",
    meaning: "... không phải là ... (câu danh từ phủ định)",
    structure: "N1 + は + N2 + ではありません",
    lesson: 1,
    tags: ["danh từ", "phủ định"],
    notes: "「じゃありません」là dạng nói thông thường, ít trang trọng hơn.",
    examples: [
      {
        japanese: "わたしは先生ではありません。",
        reading: "わたしはせんせいではありません。",
        vietnamese: "Tôi không phải là giáo viên.",
      },
      {
        japanese: "これはざっしではありません。",
        reading: "これはざっしではありません。",
        vietnamese: "Đây không phải là tạp chí.",
      },
    ],
  },
  {
    id: "n5-03",
    levelId: "n5-minna-1",
    title: "〜は〜ですか",
    meaning: "... có phải là ... không? (câu hỏi danh từ)",
    structure: "N1 + は + N2 + ですか",
    lesson: 1,
    tags: ["câu hỏi", "danh từ"],
    examples: [
      {
        japanese: "あなたは学生ですか。",
        reading: "あなたはがくせいですか。",
        vietnamese: "Bạn có phải là học sinh không?",
      },
      {
        japanese: "田中さんは日本人ですか。",
        reading: "たなかさんはにほんじんですか。",
        vietnamese: "Anh Tanaka có phải là người Nhật không?",
      },
    ],
  },

  // ── Bài 2 ──────────────────────────────────────────────
  {
    id: "n5-04",
    levelId: "n5-minna-1",
    title: "これ・それ・あれ",
    meaning: "Đây / đó / kia (chỉ thị từ cho đồ vật)",
    structure: "これ／それ／あれ + は + N + です",
    lesson: 2,
    tags: ["chỉ thị từ", "đồ vật"],
    notes: "「これ」= gần người nói; 「それ」= gần người nghe; 「あれ」= xa cả hai.",
    examples: [
      {
        japanese: "これは時計です。",
        reading: "これはとけいです。",
        vietnamese: "Đây là đồng hồ.",
      },
      { japanese: "それは何ですか。", reading: "それはなんですか。", vietnamese: "Đó là gì vậy?" },
      {
        japanese: "あれはわたしの傘です。",
        reading: "あれはわたしのかさです。",
        vietnamese: "Kia là cái ô của tôi.",
      },
    ],
  },
  {
    id: "n5-05",
    levelId: "n5-minna-1",
    title: "N1 + の + N2 (sở hữu)",
    meaning: "Chỉ quan hệ sở hữu hoặc phụ thuộc giữa hai danh từ",
    structure: "N1 + の + N2",
    lesson: 2,
    tags: ["sở hữu", "liên kết"],
    examples: [
      {
        japanese: "これはわたしのかばんです。",
        reading: "これはわたしのかばんです。",
        vietnamese: "Đây là túi của tôi.",
      },
      {
        japanese: "田中さんの本はどれですか。",
        reading: "たなかさんのほんはどれですか。",
        vietnamese: "Quyển sách của anh Tanaka là quyển nào?",
      },
      {
        japanese: "日本語の本です。",
        reading: "にほんごのほんです。",
        vietnamese: "Đây là sách tiếng Nhật.",
      },
    ],
  },
  {
    id: "n5-06",
    levelId: "n5-minna-1",
    title: "〜も (cũng)",
    meaning: "Cũng — thay cho「は」khi muốn nói nội dung giống câu trước",
    structure: "N + も + Vị ngữ",
    lesson: 2,
    tags: ["trợ từ", "cũng", "bổ sung"],
    examples: [
      {
        japanese: "わたしも学生です。",
        reading: "わたしもがくせいです。",
        vietnamese: "Tôi cũng là học sinh.",
      },
      {
        japanese: "これも日本語の本ですか。",
        reading: "これもにほんごのほんですか。",
        vietnamese: "Cái này cũng là sách tiếng Nhật à?",
      },
    ],
  },

  // ── Bài 3 ──────────────────────────────────────────────
  {
    id: "n5-07",
    levelId: "n5-minna-1",
    title: "V ます (hiện tại / tương lai)",
    meaning: "Diễn tả hành động thói quen hoặc hành động sẽ xảy ra",
    structure: "V (thể ます)",
    lesson: 3,
    tags: ["động từ", "thể ます", "lịch sự"],
    notes: "Thể ます là thể lịch sự chuẩn dùng trong hội thoại trang trọng.",
    examples: [
      {
        japanese: "毎日日本語を勉強します。",
        reading: "まいにちにほんごをべんきょうします。",
        vietnamese: "Mỗi ngày tôi học tiếng Nhật.",
      },
      {
        japanese: "明日、東京へ行きます。",
        reading: "あした、とうきょうへいきます。",
        vietnamese: "Ngày mai tôi đi Tokyo.",
      },
      {
        japanese: "7時に起きます。",
        reading: "しちじにおきます。",
        vietnamese: "Tôi thức dậy lúc 7 giờ.",
      },
    ],
  },
  {
    id: "n5-08",
    levelId: "n5-minna-1",
    title: "V ません (phủ định hiện tại)",
    meaning: "Phủ định lịch sự ở thì hiện tại / tương lai",
    structure: "V ます → V ません",
    lesson: 3,
    tags: ["động từ", "phủ định", "lịch sự"],
    examples: [
      {
        japanese: "わたしはお酒を飲みません。",
        reading: "わたしはおさけをのみません。",
        vietnamese: "Tôi không uống rượu.",
      },
      {
        japanese: "今日は学校へ行きません。",
        reading: "きょうはがっこうへいきません。",
        vietnamese: "Hôm nay tôi không đi học.",
      },
    ],
  },
  {
    id: "n5-09",
    levelId: "n5-minna-1",
    title: "V ます か (câu hỏi động từ)",
    meaning: "Hỏi về hành động",
    structure: "V ます + か",
    lesson: 3,
    tags: ["động từ", "câu hỏi"],
    examples: [
      {
        japanese: "毎日テレビを見ますか。",
        reading: "まいにちテレビをみますか。",
        vietnamese: "Bạn có xem TV mỗi ngày không?",
      },
      {
        japanese: "朝ごはんを食べますか。",
        reading: "あさごはんをたべますか。",
        vietnamese: "Bạn có ăn sáng không?",
      },
    ],
  },
  {
    id: "n5-10",
    levelId: "n5-minna-1",
    title: "N を V (trợ từ を)",
    meaning: "Trợ từ chỉ tân ngữ trực tiếp của động từ",
    structure: "N + を + V (động từ ngoại động)",
    lesson: 3,
    tags: ["trợ từ", "tân ngữ"],
    examples: [
      { japanese: "テレビを見ます。", reading: "テレビをみます。", vietnamese: "Xem TV." },
      {
        japanese: "コーヒーを飲みます。",
        reading: "コーヒーをのみます。",
        vietnamese: "Uống cà phê.",
      },
      {
        japanese: "日本語を話します。",
        reading: "にほんごをはなします。",
        vietnamese: "Nói tiếng Nhật.",
      },
    ],
  },

  // ── Bài 4 ──────────────────────────────────────────────
  {
    id: "n5-11",
    levelId: "n5-minna-1",
    title: "V ました / V ませんでした (quá khứ)",
    meaning: "Khẳng định và phủ định ở thì quá khứ lịch sự",
    structure: "V ます → V ました　／　V ませんでした",
    lesson: 4,
    tags: ["quá khứ", "động từ", "lịch sự"],
    examples: [
      {
        japanese: "昨日、映画を見ました。",
        reading: "きのう、えいがをみました。",
        vietnamese: "Hôm qua tôi đã xem phim.",
      },
      {
        japanese: "先週、友達に会いました。",
        reading: "せんしゅう、ともだちにあいました。",
        vietnamese: "Tuần trước tôi đã gặp bạn.",
      },
      {
        japanese: "今朝、朝ごはんを食べませんでした。",
        reading: "けさ、あさごはんをたべませんでした。",
        vietnamese: "Sáng nay tôi đã không ăn sáng.",
      },
    ],
  },

  // ── Bài 5 ──────────────────────────────────────────────
  {
    id: "n5-12",
    levelId: "n5-minna-1",
    title: "V て いる (tiếp diễn / trạng thái)",
    meaning: "Hành động đang diễn ra hoặc trạng thái kết quả còn duy trì",
    structure: "V て形 + いる",
    lesson: 5,
    tags: ["tiếp diễn", "trạng thái", "động từ"],
    notes: "Dùng「〜ています」trong văn nói lịch sự.",
    examples: [
      {
        japanese: "今、本を読んでいます。",
        reading: "いま、ほんをよんでいます。",
        vietnamese: "Bây giờ tôi đang đọc sách.",
      },
      {
        japanese: "雨が降っています。",
        reading: "あめがふっています。",
        vietnamese: "Trời đang mưa.",
      },
      {
        japanese: "彼女は結婚しています。",
        reading: "かのじょはけっこんしています。",
        vietnamese: "Cô ấy đã kết hôn (và đang trong hôn nhân).",
      },
    ],
  },
  {
    id: "n5-13",
    levelId: "n5-minna-1",
    title: "N に N があります / います",
    meaning: "Ở N có N (vật / người tồn tại ở đâu đó)",
    structure: "場所 + に + N + があります／います",
    lesson: 5,
    tags: ["tồn tại", "vị trí", "あります", "います"],
    notes: "「あります」cho vật vô tri; 「います」cho người và động vật.",
    examples: [
      {
        japanese: "テーブルの上に本があります。",
        reading: "テーブルのうえにほんがあります。",
        vietnamese: "Trên bàn có quyển sách.",
      },
      {
        japanese: "教室に学生がいます。",
        reading: "きょうしつにがくせいがいます。",
        vietnamese: "Trong lớp có học sinh.",
      },
      {
        japanese: "冷蔵庫の中にジュースがあります。",
        reading: "れいぞうこのなかにジュースがあります。",
        vietnamese: "Trong tủ lạnh có nước ép.",
      },
    ],
  },

  // ── Bài 6 ──────────────────────────────────────────────
  {
    id: "n5-14",
    levelId: "n5-minna-1",
    title: "V て ください",
    meaning: "Vui lòng làm gì (yêu cầu lịch sự)",
    structure: "V て形 + ください",
    lesson: 6,
    tags: ["yêu cầu", "lịch sự"],
    examples: [
      {
        japanese: "ちょっと待ってください。",
        reading: "ちょっとまってください。",
        vietnamese: "Xin chờ một chút.",
      },
      {
        japanese: "ここに名前を書いてください。",
        reading: "ここになまえをかいてください。",
        vietnamese: "Vui lòng viết tên vào đây.",
      },
      {
        japanese: "もう一度言ってください。",
        reading: "もういちどいってください。",
        vietnamese: "Vui lòng nói lại một lần nữa.",
      },
    ],
  },
  {
    id: "n5-15",
    levelId: "n5-minna-1",
    title: "V ましょう / V ましょうか",
    meaning: "Cùng nhau làm gì / Tôi làm giúp được không?",
    structure: "V ます → V ましょう / V ましょうか",
    lesson: 6,
    tags: ["đề nghị", "rủ rê", "lịch sự"],
    notes: "「〜ましょう」là lời rủ rê; 「〜ましょうか」là đề nghị giúp đỡ.",
    examples: [
      {
        japanese: "一緒に昼ごはんを食べましょう。",
        reading: "いっしょにひるごはんをたべましょう。",
        vietnamese: "Cùng nhau ăn trưa nào!",
      },
      {
        japanese: "荷物を持ちましょうか。",
        reading: "にもつをもちましょうか。",
        vietnamese: "Tôi xách hành lý giúp nhé?",
      },
    ],
  },

  // ── Bài 7 ──────────────────────────────────────────────
  {
    id: "n5-16",
    levelId: "n5-minna-1",
    title: "い形容詞 + N / い形容詞 + です",
    meaning: "Tính từ đuôi い bổ nghĩa cho danh từ hoặc làm vị ngữ",
    structure: "い Adj + N　／　い Adj + です",
    lesson: 7,
    tags: ["tính từ", "い形容詞"],
    examples: [
      {
        japanese: "おいしい料理です。",
        reading: "おいしいりょうりです。",
        vietnamese: "Đây là món ăn ngon.",
      },
      {
        japanese: "今日は暑いです。",
        reading: "きょうはあついです。",
        vietnamese: "Hôm nay trời nóng.",
      },
      {
        japanese: "この本は難しいです。",
        reading: "このほんはむずかしいです。",
        vietnamese: "Quyển sách này khó.",
      },
    ],
  },
  {
    id: "n5-17",
    levelId: "n5-minna-1",
    title: "な形容詞 + N / な形容詞 + です",
    meaning: "Tính từ đuôi な bổ nghĩa cho danh từ hoặc làm vị ngữ",
    structure: "な Adj (な) + N　／　な Adj + です",
    lesson: 7,
    tags: ["tính từ", "な形容詞"],
    notes: "Khi đứng trước danh từ phải có「な」; khi làm vị ngữ không cần「な」.",
    examples: [
      {
        japanese: "静かな部屋です。",
        reading: "しずかなへやです。",
        vietnamese: "Đây là phòng yên tĩnh.",
      },
      {
        japanese: "彼女はきれいです。",
        reading: "かのじょはきれいです。",
        vietnamese: "Cô ấy xinh đẹp.",
      },
      {
        japanese: "日本語が好きです。",
        reading: "にほんごがすきです。",
        vietnamese: "Tôi thích tiếng Nhật.",
      },
    ],
  },

  // ── Bài 8 ──────────────────────────────────────────────
  {
    id: "n5-18",
    levelId: "n5-minna-1",
    title: "〜が、〜 (nhưng / tuy nhiên)",
    meaning: "Nối hai mệnh đề tương phản hoặc dẫn dắt",
    structure: "Câu 1 + が、Câu 2",
    lesson: 8,
    tags: ["liên kết", "tương phản"],
    examples: [
      {
        japanese: "日本語は難しいですが、おもしろいです。",
        reading: "にほんごはむずかしいですが、おもしろいです。",
        vietnamese: "Tiếng Nhật khó nhưng thú vị.",
      },
      {
        japanese: "行きたいですが、時間がありません。",
        reading: "いきたいですが、じかんがありません。",
        vietnamese: "Tôi muốn đi nhưng không có thời gian.",
      },
    ],
  },
  {
    id: "n5-19",
    levelId: "n5-minna-1",
    title: "どんな N が好きですか",
    meaning: "Bạn thích loại ... nào?",
    structure: "どんな + N + が + 好き／嫌い + ですか",
    lesson: 8,
    tags: ["câu hỏi", "sở thích"],
    examples: [
      {
        japanese: "どんな音楽が好きですか。",
        reading: "どんなおんがくがすきですか。",
        vietnamese: "Bạn thích thể loại nhạc nào?",
      },
      {
        japanese: "どんな食べ物が好きですか。",
        reading: "どんなたべものがすきですか。",
        vietnamese: "Bạn thích loại thức ăn nào?",
      },
    ],
  },

  // ── Bài 9 ──────────────────────────────────────────────
  {
    id: "n5-20",
    levelId: "n5-minna-1",
    title: "〜から (lý do)",
    meaning: "Vì / bởi vì — diễn đạt lý do đứng trước kết quả",
    structure: "Câu lý do (plain / ます) + から、Câu kết quả",
    lesson: 9,
    tags: ["lý do", "nguyên nhân"],
    notes: "「から」chủ quan hơn「ので」và thường dùng trong văn nói.",
    examples: [
      {
        japanese: "眠いから、早く寝ます。",
        reading: "ねむいから、はやくねます。",
        vietnamese: "Vì buồn ngủ nên tôi đi ngủ sớm.",
      },
      {
        japanese: "雨が降っているから、外に行きません。",
        reading: "あめがふっているから、そとにいきません。",
        vietnamese: "Vì trời mưa nên tôi không ra ngoài.",
      },
      {
        japanese: "お腹が痛いから、学校を休みます。",
        reading: "おなかがいたいから、がっこうをやすみます。",
        vietnamese: "Vì đau bụng nên tôi nghỉ học.",
      },
    ],
  },

  // ── Bài 10 ──────────────────────────────────────────────
  {
    id: "n5-21",
    levelId: "n5-minna-1",
    title: "V て V (liên tiếp, tuần tự)",
    meaning: "Nối các hành động xảy ra theo thứ tự",
    structure: "V1 て形 + V2 て形 + ... + V (cuối)",
    lesson: 10,
    tags: ["liên kết", "trình tự", "động từ"],
    examples: [
      {
        japanese: "シャワーを浴びて、朝ごはんを食べて、会社へ行きます。",
        reading: "シャワーをあびて、あさごはんをたべて、かいしゃへいきます。",
        vietnamese: "Tôi tắm, ăn sáng rồi đi làm.",
      },
      {
        japanese: "図書館へ行って、本を借りました。",
        reading: "としょかんへいって、ほんをかりました。",
        vietnamese: "Tôi đến thư viện và mượn sách.",
      },
    ],
  },

  // ── Bài 13 ──────────────────────────────────────────────
  {
    id: "n5-22",
    levelId: "n5-minna-1",
    title: "〜たいです",
    meaning: "Muốn làm gì (nguyện vọng của người nói)",
    structure: "V ます → V たいです",
    lesson: 13,
    tags: ["mong muốn", "nguyện vọng"],
    notes: "Chỉ dùng cho nguyện vọng bản thân. Đối tượng của「たい」dùng「が」hoặc「を」.",
    examples: [
      {
        japanese: "日本へ行きたいです。",
        reading: "にほんへいきたいです。",
        vietnamese: "Tôi muốn đi Nhật.",
      },
      {
        japanese: "日本語が上手になりたいです。",
        reading: "にほんごがじょうずになりたいです。",
        vietnamese: "Tôi muốn giỏi tiếng Nhật.",
      },
      {
        japanese: "何が食べたいですか。",
        reading: "なにがたべたいですか。",
        vietnamese: "Bạn muốn ăn gì?",
      },
    ],
  },

  // ── Bài 14 ──────────────────────────────────────────────
  {
    id: "n5-23",
    levelId: "n5-minna-1",
    title: "〜たり〜たりします",
    meaning: "Làm khi thì ... khi thì ... (liệt kê các hành động tiêu biểu)",
    structure: "V1 た形 + り + V2 た形 + り + します",
    lesson: 14,
    tags: ["liệt kê", "ví dụ", "động từ"],
    notes: "Dùng để liệt kê vài hành động tiêu biểu trong số nhiều hành động.",
    examples: [
      {
        japanese: "週末は映画を見たり、友達と話したりします。",
        reading: "しゅうまつはえいがをみたり、ともだちとはなしたりします。",
        vietnamese: "Cuối tuần tôi xem phim hoặc nói chuyện với bạn bè.",
      },
      {
        japanese: "旅行で写真を撮ったり、おみやげを買ったりしました。",
        reading: "りょこうでしゃしんをとったり、おみやげをかったりしました。",
        vietnamese: "Trong chuyến du lịch tôi chụp ảnh và mua quà lưu niệm.",
      },
    ],
  },

  // ── Bài 15 ──────────────────────────────────────────────
  {
    id: "n5-24",
    levelId: "n5-minna-1",
    title: "V て もいいです / V ないでください",
    meaning: "Được phép làm ... / Xin đừng làm ...",
    structure: "V て形 + もいいです　／　V ない形 + でください",
    lesson: 15,
    tags: ["cho phép", "cấm đoán", "lịch sự"],
    examples: [
      {
        japanese: "ここで写真を撮ってもいいですか。",
        reading: "ここでしゃしんをとってもいいですか。",
        vietnamese: "Tôi có thể chụp ảnh ở đây không?",
      },
      {
        japanese: "ここでタバコを吸わないでください。",
        reading: "ここでタバコをすわないでください。",
        vietnamese: "Xin đừng hút thuốc ở đây.",
      },
    ],
  },
  {
    id: "n5-25",
    levelId: "n5-minna-1",
    title: "V て はいけません",
    meaning: "Không được làm ... (cấm đoán mạnh)",
    structure: "V て形 + はいけません",
    lesson: 15,
    tags: ["cấm đoán", "quy tắc"],
    examples: [
      {
        japanese: "授業中に携帯を使ってはいけません。",
        reading: "じゅぎょうちゅうにけいたいをつかってはいけません。",
        vietnamese: "Không được dùng điện thoại trong giờ học.",
      },
      {
        japanese: "ここに入ってはいけません。",
        reading: "ここにはいってはいけません。",
        vietnamese: "Không được vào đây.",
      },
    ],
  },

  // ── Bài 17 ──────────────────────────────────────────────
  {
    id: "n5-26",
    levelId: "n5-minna-1",
    title: "〜なければなりません",
    meaning: "Phải làm gì (bắt buộc, nghĩa vụ)",
    structure: "V ない形 → V なければなりません",
    lesson: 17,
    tags: ["nghĩa vụ", "bắt buộc"],
    notes: "Dạng thông thường trong văn nói:「〜なきゃ」/「〜なければならない」",
    examples: [
      {
        japanese: "毎日薬を飲まなければなりません。",
        reading: "まいにちくすりをのまなければなりません。",
        vietnamese: "Tôi phải uống thuốc mỗi ngày.",
      },
      {
        japanese: "宿題をしなければなりません。",
        reading: "しゅくだいをしなければなりません。",
        vietnamese: "Tôi phải làm bài tập về nhà.",
      },
    ],
  },
  {
    id: "n5-27",
    levelId: "n5-minna-1",
    title: "〜なくてもいいです",
    meaning: "Không cần phải làm ... / Không làm cũng được",
    structure: "V ない形 → V なくてもいいです",
    lesson: 17,
    tags: ["cho phép", "không bắt buộc"],
    examples: [
      {
        japanese: "明日は来なくてもいいです。",
        reading: "あしたはこなくてもいいです。",
        vietnamese: "Ngày mai không cần đến cũng được.",
      },
      {
        japanese: "全部食べなくてもいいですよ。",
        reading: "ぜんぶたべなくてもいいですよ。",
        vietnamese: "Không cần ăn hết tất cả cũng được nhé.",
      },
    ],
  },

  // ── Bài 18 ──────────────────────────────────────────────
  {
    id: "n5-28",
    levelId: "n5-minna-1",
    title: "〜ことができます",
    meaning: "Có thể làm gì (khả năng)",
    structure: "V (thể từ điển) + ことができます",
    lesson: 18,
    tags: ["khả năng", "có thể"],
    examples: [
      {
        japanese: "私は泳ぐことができます。",
        reading: "わたしはおよぐことができます。",
        vietnamese: "Tôi có thể bơi.",
      },
      {
        japanese: "日本語で話すことができますか。",
        reading: "にほんごではなすことができますか。",
        vietnamese: "Bạn có thể nói chuyện bằng tiếng Nhật không?",
      },
    ],
  },

  // ── Bài 19 ──────────────────────────────────────────────
  {
    id: "n5-29",
    levelId: "n5-minna-1",
    title: "V た ことが あります",
    meaning: "Đã từng làm gì (kinh nghiệm)",
    structure: "V た形 + ことがあります",
    lesson: 19,
    tags: ["kinh nghiệm", "quá khứ"],
    examples: [
      {
        japanese: "富士山に登ったことがあります。",
        reading: "ふじさんにのぼったことがあります。",
        vietnamese: "Tôi đã từng leo núi Phú Sĩ.",
      },
      {
        japanese: "すしを食べたことがありますか。",
        reading: "すしをたべたことがありますか。",
        vietnamese: "Bạn đã từng ăn sushi chưa?",
      },
    ],
  },

  // ── Bài 21 ──────────────────────────────────────────────
  {
    id: "n5-30",
    levelId: "n5-minna-1",
    title: "V (thể từ điển) まえ に",
    meaning: "Trước khi làm gì",
    structure: "V (thể từ điển) + まえに、...",
    lesson: 21,
    tags: ["thời gian", "trước khi"],
    examples: [
      {
        japanese: "寝るまえに、歯を磨きます。",
        reading: "ねるまえに、はをみがきます。",
        vietnamese: "Trước khi đi ngủ, tôi đánh răng.",
      },
      {
        japanese: "食べるまえに、手を洗ってください。",
        reading: "たべるまえに、てをあらってください。",
        vietnamese: "Trước khi ăn, hãy rửa tay.",
      },
    ],
  },
  {
    id: "n5-31",
    levelId: "n5-minna-1",
    title: "V て から",
    meaning: "Sau khi làm gì xong rồi mới ...",
    structure: "V て形 + から、...",
    lesson: 21,
    tags: ["thời gian", "sau khi", "trình tự"],
    notes: "「〜てから」nhấn mạnh thứ tự: hành động 1 hoàn tất → hành động 2 bắt đầu.",
    examples: [
      {
        japanese: "宿題をしてから、テレビを見ます。",
        reading: "しゅくだいをしてから、テレビをみます。",
        vietnamese: "Làm bài tập xong rồi mới xem TV.",
      },
      {
        japanese: "シャワーを浴びてから、寝ます。",
        reading: "シャワーをあびてから、ねます。",
        vietnamese: "Tắm xong rồi mới ngủ.",
      },
    ],
  },

  // ── Bài 23 ──────────────────────────────────────────────
  {
    id: "n5-32",
    levelId: "n5-minna-1",
    title: "〜と思います",
    meaning: "Tôi nghĩ rằng ... (ý kiến cá nhân)",
    structure: "Plain (câu) + と思います",
    lesson: 23,
    tags: ["ý kiến", "suy nghĩ"],
    notes: "Vế trước dùng thể plain (thông thường). Dùng để nêu ý kiến lịch sự.",
    examples: [
      {
        japanese: "明日は雨だと思います。",
        reading: "あしたはあめだとおもいます。",
        vietnamese: "Tôi nghĩ ngày mai trời mưa.",
      },
      {
        japanese: "彼は来ないと思います。",
        reading: "かれはこないとおもいます。",
        vietnamese: "Tôi nghĩ anh ấy sẽ không đến.",
      },
    ],
  },
  {
    id: "n5-33",
    levelId: "n5-minna-1",
    title: "〜と言っています",
    meaning: "Nói rằng ... (thuật lại lời nói của người khác)",
    structure: "Plain (câu) + と言っています",
    lesson: 23,
    tags: ["trích dẫn", "thuật lại"],
    examples: [
      {
        japanese: "田中さんは明日来ると言っています。",
        reading: "たなかさんはあしたくるといっています。",
        vietnamese: "Anh Tanaka nói rằng ngày mai sẽ đến.",
      },
      {
        japanese: "先生は試験は難しくないと言っていました。",
        reading: "せんせいはしけんはむずかしくないといっていました。",
        vietnamese: "Thầy giáo nói rằng bài thi không khó.",
      },
    ],
  },

  // ── Bài 25 ──────────────────────────────────────────────
  {
    id: "n5-34",
    levelId: "n5-minna-1",
    title: "〜くなります / 〜になります",
    meaning: "Trở nên ... (biến đổi trạng thái)",
    structure: "い Adj く + なります　／　な Adj / N に + なります",
    lesson: 25,
    tags: ["biến đổi", "trạng thái"],
    examples: [
      {
        japanese: "春になると、暖かくなります。",
        reading: "はるになると、あたたかくなります。",
        vietnamese: "Khi đến mùa xuân, trời trở nên ấm áp.",
      },
      {
        japanese: "日本語が上手になりたいです。",
        reading: "にほんごがじょうずになりたいです。",
        vietnamese: "Tôi muốn giỏi tiếng Nhật hơn.",
      },
      {
        japanese: "有名になりました。",
        reading: "ゆうめいになりました。",
        vietnamese: "Đã trở nên nổi tiếng.",
      },
    ],
  },
];
