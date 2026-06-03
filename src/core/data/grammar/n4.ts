import type { GrammarPoint } from "@/features/grammar/types/grammar";

/** Minna no Nihongo II — Bài 26-50 */
export const n4GrammarPoints: GrammarPoint[] = [
  // ── Bài 26 ──────────────────────────────────────────────
  {
    id: "n4-01",
    levelId: "n4-minna-2",
    title: "〜ながら",
    meaning: "Vừa ... vừa ... (hai hành động đồng thời, cùng chủ thể)",
    structure: "V ます + ながら、V2",
    lesson: 26,
    tags: ["đồng thời", "song song"],
    notes: "V2 là hành động chính; V1 là hành động phụ diễn ra cùng lúc. Cùng chủ thể.",
    examples: [
      {
        japanese: "音楽を聞きながら、勉強します。",
        reading: "おんがくをきき ながら、べんきょうします。",
        vietnamese: "Vừa nghe nhạc vừa học bài.",
      },
      {
        japanese: "テレビを見ながら、ごはんを食べます。",
        reading: "テレビをみながら、ごはんをたべます。",
        vietnamese: "Vừa xem TV vừa ăn cơm.",
      },
      {
        japanese: "歩きながら、電話しないでください。",
        reading: "あるきながら、でんわしないでください。",
        vietnamese: "Xin đừng vừa đi vừa gọi điện.",
      },
    ],
  },
  {
    id: "n4-02",
    levelId: "n4-minna-2",
    title: "V て います (trạng thái nghề nghiệp / thói quen)",
    meaning: "Làm nghề / Đang sống theo thói quen",
    structure: "V て形 + います",
    lesson: 26,
    tags: ["nghề nghiệp", "thói quen", "trạng thái"],
    notes: "Ngoài tiếp diễn (bài 5), 〜ています còn chỉ nghề nghiệp / thói quen lâu dài.",
    examples: [
      {
        japanese: "銀行に勤めています。",
        reading: "ぎんこうにつとめています。",
        vietnamese: "Tôi đang làm việc tại ngân hàng.",
      },
      {
        japanese: "毎朝ジョギングをしています。",
        reading: "まいあさジョギングをしています。",
        vietnamese: "Mỗi sáng tôi đều đi chạy bộ.",
      },
    ],
  },

  // ── Bài 27 ──────────────────────────────────────────────
  {
    id: "n4-03",
    levelId: "n4-minna-2",
    title: "〜てみます",
    meaning: "Thử làm xem sao",
    structure: "V て形 + みます",
    lesson: 27,
    tags: ["thử", "thử nghiệm"],
    examples: [
      {
        japanese: "この料理を作ってみます。",
        reading: "このりょうりをつくってみます。",
        vietnamese: "Tôi sẽ thử nấu món ăn này xem.",
      },
      {
        japanese: "新しいレストランへ行ってみましょう。",
        reading: "あたらしいレストランへいってみましょう。",
        vietnamese: "Hãy cùng thử đến nhà hàng mới xem nào.",
      },
      {
        japanese: "着てみてもいいですか。",
        reading: "きてみてもいいですか。",
        vietnamese: "Tôi có thể thử mặc không?",
      },
    ],
  },
  {
    id: "n4-04",
    levelId: "n4-minna-2",
    title: "〜たら",
    meaning: "Nếu / Khi (điều kiện hoặc thời điểm hoàn thành)",
    structure: "V た形 + ら",
    lesson: 27,
    tags: ["điều kiện", "thời gian", "nếu"],
    notes: "Khác「〜ば」: 「〜たら」có thể dùng trong tình huống thực tế đã xảy ra.",
    examples: [
      {
        japanese: "宿題が終わったら、遊びましょう。",
        reading: "しゅくだいがおわったら、あそびましょう。",
        vietnamese: "Làm bài tập xong thì chơi nhé!",
      },
      {
        japanese: "日本へ行ったら、富士山を見たいです。",
        reading: "にほんへいったら、ふじさんをみたいです。",
        vietnamese: "Nếu đến Nhật, tôi muốn nhìn thấy núi Phú Sĩ.",
      },
      {
        japanese: "春になったら、花見をしましょう。",
        reading: "はるになったら、はなみをしましょう。",
        vietnamese: "Khi đến mùa xuân, hãy cùng đi ngắm hoa nhé.",
      },
    ],
  },

  // ── Bài 28 ──────────────────────────────────────────────
  {
    id: "n4-05",
    levelId: "n4-minna-2",
    title: "〜てしまいます",
    meaning: "Đã làm xong hoàn toàn / Lỡ làm mất (đôi khi hối tiếc)",
    structure: "V て形 + しまいます",
    lesson: 28,
    tags: ["hoàn tất", "hối tiếc"],
    notes: "Văn nói thông thường dùng「〜ちゃう / 〜じゃう」.",
    examples: [
      {
        japanese: "レポートを書いてしまいました。",
        reading: "レポートをかいてしまいました。",
        vietnamese: "Tôi đã viết xong báo cáo rồi.",
      },
      {
        japanese: "財布を忘れてしまいました。",
        reading: "さいふをわすれてしまいました。",
        vietnamese: "Tôi đã lỡ quên ví mất rồi.",
      },
      {
        japanese: "ケーキを全部食べてしまった。",
        reading: "ケーキをぜんぶたべてしまった。",
        vietnamese: "Tôi đã ăn hết cả cái bánh rồi.",
      },
    ],
  },
  {
    id: "n4-06",
    levelId: "n4-minna-2",
    title: "〜て / 〜で (phương tiện, nguyên nhân)",
    meaning: "Bằng ... / Do ... (chỉ phương tiện hoặc nguyên nhân)",
    structure: "N + で + V",
    lesson: 28,
    tags: ["phương tiện", "nguyên nhân", "trợ từ で"],
    examples: [
      {
        japanese: "電車で通勤します。",
        reading: "でんしゃでつうきんします。",
        vietnamese: "Tôi đi làm bằng tàu điện.",
      },
      {
        japanese: "風邪で学校を休みました。",
        reading: "かぜでがっこうをやすみました。",
        vietnamese: "Do bị cảm nên tôi nghỉ học.",
      },
      {
        japanese: "日本語で話しましょう。",
        reading: "にほんごではなしましょう。",
        vietnamese: "Hãy nói chuyện bằng tiếng Nhật nhé.",
      },
    ],
  },

  // ── Bài 29 ──────────────────────────────────────────────
  {
    id: "n4-07",
    levelId: "n4-minna-2",
    title: "〜ておきます",
    meaning: "Làm sẵn / chuẩn bị trước để dùng sau",
    structure: "V て形 + おきます",
    lesson: 29,
    tags: ["chuẩn bị", "sẵn sàng", "trước"],
    notes: "Văn nói thường rút gọn:「〜とく / 〜どく」",
    examples: [
      {
        japanese: "パーティーの前に料理を作っておきます。",
        reading: "パーティーのまえにりょうりをつくっておきます。",
        vietnamese: "Trước bữa tiệc, tôi sẽ nấu ăn sẵn.",
      },
      {
        japanese: "旅行のためにホテルを予約しておきました。",
        reading: "りょこうのためにホテルをよやくしておきました。",
        vietnamese: "Tôi đã đặt phòng khách sạn sẵn cho chuyến đi.",
      },
      {
        japanese: "電気を消しておいてください。",
        reading: "でんきをけしておいてください。",
        vietnamese: "Hãy tắt đèn đi nhé (để sẵn vậy).",
      },
    ],
  },
  {
    id: "n4-08",
    levelId: "n4-minna-2",
    title: "〜ことができます (có thể — N4 mở rộng)",
    meaning: "Có thể làm gì (khả năng)",
    structure: "V (từ điển) + ことができます",
    lesson: 29,
    tags: ["khả năng", "có thể"],
    examples: [
      {
        japanese: "日本語で手紙を書くことができます。",
        reading: "にほんごでてがみをかくことができます。",
        vietnamese: "Tôi có thể viết thư bằng tiếng Nhật.",
      },
      {
        japanese: "一人で料理することができますか。",
        reading: "ひとりでりょうりすることができますか。",
        vietnamese: "Bạn có thể tự nấu ăn một mình không?",
      },
    ],
  },

  // ── Bài 30 ──────────────────────────────────────────────
  {
    id: "n4-09",
    levelId: "n4-minna-2",
    title: "〜ていただけませんか",
    meaning: "Bạn có thể làm ơn ... không? (yêu cầu rất lịch sự)",
    structure: "V て形 + いただけませんか",
    lesson: 30,
    tags: ["yêu cầu", "lịch sự cao", "kính ngữ"],
    notes: "Lịch sự hơn「〜てください」rất nhiều, dùng với cấp trên hoặc người lạ.",
    examples: [
      {
        japanese: "もう一度説明していただけませんか。",
        reading: "もういちどせつめいしていただけませんか。",
        vietnamese: "Bạn có thể giải thích lại một lần nữa không ạ?",
      },
      {
        japanese: "資料を送っていただけませんか。",
        reading: "しりょうをおくっていただけませんか。",
        vietnamese: "Bạn có thể gửi tài liệu cho tôi không ạ?",
      },
    ],
  },

  // ── Bài 31 ──────────────────────────────────────────────
  {
    id: "n4-10",
    levelId: "n4-minna-2",
    title: "〜でしょう / 〜でしょうか",
    meaning: "Chắc là ... / ... phải không? (phỏng đoán nhẹ)",
    structure: "Plain + でしょう",
    lesson: 31,
    tags: ["phỏng đoán", "không chắc", "lịch sự"],
    examples: [
      {
        japanese: "明日は晴れるでしょう。",
        reading: "あしたははれるでしょう。",
        vietnamese: "Ngày mai chắc trời nắng.",
      },
      {
        japanese: "田中さんも来るでしょうか。",
        reading: "たなかさんもくるでしょうか。",
        vietnamese: "Anh Tanaka cũng đến chứ nhỉ?",
      },
    ],
  },
  {
    id: "n4-11",
    levelId: "n4-minna-2",
    title: "〜らしいです",
    meaning: "Nghe nói là ... / Có vẻ ... (thông tin gián tiếp)",
    structure: "Plain + らしいです",
    lesson: 32,
    tags: ["phỏng đoán", "gián tiếp", "nghe nói"],
    notes: "Dựa vào thông tin nghe được, không phải quan sát trực tiếp.",
    examples: [
      {
        japanese: "田中さんは来週結婚するらしいです。",
        reading: "たなかさんはらいしゅうけっこんするらしいです。",
        vietnamese: "Nghe nói tuần sau anh Tanaka kết hôn.",
      },
      {
        japanese: "あの店はとても高いらしいですよ。",
        reading: "あのみせはとてもたかいらしいですよ。",
        vietnamese: "Nghe nói quán đó rất đắt đó.",
      },
    ],
  },

  // ── Bài 33 ──────────────────────────────────────────────
  {
    id: "n4-12",
    levelId: "n4-minna-2",
    title: "〜ば〜ほど",
    meaning: "Càng ... càng ...",
    structure: "V / Adj ば形 + V / Adj ほど",
    lesson: 33,
    tags: ["so sánh", "tỉ lệ thuận"],
    examples: [
      {
        japanese: "練習すればするほど、上手になります。",
        reading: "れんしゅうすればするほど、じょうずになります。",
        vietnamese: "Càng luyện tập nhiều càng trở nên giỏi hơn.",
      },
      {
        japanese: "安ければ安いほどいいです。",
        reading: "やすければやすいほどいいです。",
        vietnamese: "Càng rẻ càng tốt.",
      },
    ],
  },

  // ── Bài 34 ──────────────────────────────────────────────
  {
    id: "n4-13",
    levelId: "n4-minna-2",
    title: "〜ように (mục đích / cầu mong)",
    meaning: "Để có thể ... / Cầu mong ...",
    structure: "V (từ điển / phủ định) + ように + V",
    lesson: 34,
    tags: ["mục đích", "cầu mong"],
    notes: "Khác「ために」: 「ように」dùng khi kết quả không hoàn toàn trong tầm kiểm soát.",
    examples: [
      {
        japanese: "忘れないようにメモします。",
        reading: "わすれないようにメモします。",
        vietnamese: "Tôi ghi chú lại để không quên.",
      },
      {
        japanese: "試験に合格できるように、毎日勉強しています。",
        reading: "しけんにごうかくできるように、まいにちべんきょうしています。",
        vietnamese: "Tôi học mỗi ngày để có thể đỗ kỳ thi.",
      },
      {
        japanese: "早く良くなりますようにお祈りしています。",
        reading: "はやくよくなりますようにおいのりしています。",
        vietnamese: "Tôi cầu mong bạn mau bình phục.",
      },
    ],
  },
  {
    id: "n4-14",
    levelId: "n4-minna-2",
    title: "〜ようになります",
    meaning: "Trở nên có thể ... (thay đổi từ không thể sang có thể)",
    structure: "V (từ điển / phủ định) + ようになります",
    lesson: 34,
    tags: ["thay đổi", "tiến bộ", "có thể"],
    examples: [
      {
        japanese: "日本語が話せるようになりました。",
        reading: "にほんごがはなせるようになりました。",
        vietnamese: "Tôi đã có thể nói được tiếng Nhật rồi.",
      },
      {
        japanese: "子どものとき、野菜が食べられませんでしたが、今は食べられるようになりました。",
        reading: "こどものとき、やさいがたべられませんでしたが、いまはたべられるようになりました。",
        vietnamese: "Hồi nhỏ tôi không ăn được rau, nhưng bây giờ đã ăn được rồi.",
      },
    ],
  },

  // ── Bài 35 ──────────────────────────────────────────────
  {
    id: "n4-15",
    levelId: "n4-minna-2",
    title: "〜ようにします",
    meaning: "Cố gắng để ... / Chú ý để ...",
    structure: "V (từ điển / phủ định) + ようにします",
    lesson: 35,
    tags: ["cố gắng", "thói quen mới"],
    examples: [
      {
        japanese: "毎日運動するようにしています。",
        reading: "まいにちうんどうするようにしています。",
        vietnamese: "Tôi đang cố gắng tập thể dục mỗi ngày.",
      },
      {
        japanese: "夜更かししないようにします。",
        reading: "よふかししないようにします。",
        vietnamese: "Tôi sẽ cố gắng không thức khuya.",
      },
    ],
  },

  // ── Bài 36 ──────────────────────────────────────────────
  {
    id: "n4-16",
    levelId: "n4-minna-2",
    title: "〜のに (mục đích khi dùng với danh từ chức năng)",
    meaning: "Để làm gì ... (thường đi với danh từ chỉ thứ cần dùng)",
    structure: "V (từ điển) + のに + N",
    lesson: 36,
    tags: ["mục đích", "công dụng"],
    examples: [
      {
        japanese: "料理をするのに、このナイフを使います。",
        reading: "りょうりをするのに、このナイフをつかいます。",
        vietnamese: "Tôi dùng con dao này để nấu ăn.",
      },
      {
        japanese: "日本語の勉強のに、この本はとても役に立ちます。",
        reading: "にほんごのべんきょうのに、このほんはとてもやくにたちます。",
        vietnamese: "Quyển sách này rất hữu ích để học tiếng Nhật.",
      },
    ],
  },
  {
    id: "n4-17",
    levelId: "n4-minna-2",
    title: "〜のに (mặc dù — kết nối tương phản)",
    meaning: "Mặc dù ... nhưng ... (kết quả trái ngược kỳ vọng, thường có hàm ý phàn nàn)",
    structure: "Plain + のに、Câu 2",
    lesson: 36,
    tags: ["tương phản", "phàn nàn", "bất ngờ"],
    notes: "Khác「〜が」「〜けど」: 「〜のに」mang cảm xúc tiêu cực (ngạc nhiên, phàn nàn).",
    examples: [
      {
        japanese: "一生懸命練習したのに、試合で負けてしまいました。",
        reading: "いっしょうけんめいれんしゅうしたのに、しあいでまけてしまいました。",
        vietnamese: "Mặc dù luyện tập chăm chỉ vậy mà vẫn thua trận.",
      },
      {
        japanese: "電話したのに、出なかった。",
        reading: "でんわしたのに、でなかった。",
        vietnamese: "Mặc dù đã gọi mà không bắt máy.",
      },
    ],
  },

  // ── Bài 37 ──────────────────────────────────────────────
  {
    id: "n4-18",
    levelId: "n4-minna-2",
    title: "〜はずです",
    meaning: "Đáng lẽ phải ... / Chắc chắn là ... (kỳ vọng hợp lý)",
    structure: "Plain + はずです",
    lesson: 37,
    tags: ["kỳ vọng", "phán đoán", "chắc chắn"],
    examples: [
      {
        japanese: "田中さんはもう家に帰っているはずです。",
        reading: "たなかさんはもういえにかえっているはずです。",
        vietnamese: "Anh Tanaka chắc đã về nhà rồi.",
      },
      {
        japanese: "今日は休みのはずですが、会社に来ています。",
        reading: "きょうはやすみのはずですが、かいしゃにきています。",
        vietnamese: "Hôm nay đáng lẽ là ngày nghỉ nhưng anh ấy vẫn đến công ty.",
      },
    ],
  },

  // ── Bài 40 ──────────────────────────────────────────────
  {
    id: "n4-19",
    levelId: "n4-minna-2",
    title: "〜ばよかった",
    meaning: "Giá mà ... thì tốt rồi (tiếc nuối về quá khứ)",
    structure: "V ば形 + よかった",
    lesson: 40,
    tags: ["tiếc nuối", "giả định", "quá khứ"],
    examples: [
      {
        japanese: "もっと早く寝ればよかった。",
        reading: "もっとはやくねればよかった。",
        vietnamese: "Giá mà tôi đi ngủ sớm hơn thì tốt rồi.",
      },
      {
        japanese: "もっと勉強すればよかったと思います。",
        reading: "もっとべんきょうすればよかったとおもいます。",
        vietnamese: "Tôi nghĩ giá mà học nhiều hơn thì tốt rồi.",
      },
    ],
  },

  // ── Bài 42 ──────────────────────────────────────────────
  {
    id: "n4-20",
    levelId: "n4-minna-2",
    title: "〜ても (dù / dù cho)",
    meaning: "Dù ... (cũng) ... — Dù điều kiện A xảy ra vẫn có kết quả B",
    structure: "V て形 + も / い Adj くても / な Adj でも",
    lesson: 42,
    tags: ["nhượng bộ", "dù vậy"],
    examples: [
      {
        japanese: "雨が降っても、試合は行います。",
        reading: "あめがふっても、しあいはおこないます。",
        vietnamese: "Dù trời mưa, trận đấu vẫn diễn ra.",
      },
      {
        japanese: "忙しくても、運動する時間を作ります。",
        reading: "いそがしくても、うんどうするじかんをつくります。",
        vietnamese: "Dù bận đến đâu, tôi vẫn dành thời gian tập thể dục.",
      },
    ],
  },
  {
    id: "n4-21",
    levelId: "n4-minna-2",
    title: "〜ば (điều kiện)",
    meaning: "Nếu ... thì ... (điều kiện giả định)",
    structure: "V ば形 / い Adj ければ / な Adj なら",
    lesson: 42,
    tags: ["điều kiện", "giả định", "nếu"],
    notes: "「〜ば」thường dùng trong điều kiện tích cực hoặc hướng dẫn. Không dùng cho quá khứ.",
    examples: [
      {
        japanese: "天気が良ければ、公園へ行きます。",
        reading: "てんきがよければ、こうえんへいきます。",
        vietnamese: "Nếu thời tiết đẹp thì tôi đi công viên.",
      },
      {
        japanese: "分からなければ、聞いてください。",
        reading: "わからなければ、きいてください。",
        vietnamese: "Nếu không hiểu thì hãy hỏi.",
      },
    ],
  },
];
