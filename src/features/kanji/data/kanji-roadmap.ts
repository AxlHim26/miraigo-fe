import type { KanjiCluster } from "@/features/kanji/types/kanji";

export type OrbitPlacement = "top" | "right" | "bottom" | "left";
export type LabelPlacement = "top" | "right" | "bottom" | "left";

export type KanjiRoadmapPalette = {
  solid: string;
  soft: string;
  line: string;
  shell: string;
};

export type KanjiRoadmapDay = {
  id: string;
  day: number;
  focus: string;
  note: string;
  kanji: string[];
};

export type KanjiRoadmapLevel = {
  id: string;
  level: KanjiCluster["level"];
  title: string;
  description: string;
  kanjiCount: number;
  progress: number;
  totalDays: number;
  currentDay: number;
  palette: KanjiRoadmapPalette;
  days: KanjiRoadmapDay[];
};

export type RoadmapNodeLayout = {
  x: number;
  y: number;
  orbitPlacement: OrbitPlacement;
  labelPlacement: LabelPlacement;
};

export const ROADMAP_KANJI_PER_DAY = 10;

export const roadmapLevelOrder = ["n5", "n4", "n3", "n2", "n1"] as const;

const buildDays = (
  levelId: string,
  entries: Array<{ focus: string; note: string; kanji: string[] }>,
): KanjiRoadmapDay[] =>
  entries.map((entry, index) => ({
    ...entry,
    id: `${levelId}-day-${index + 1}`,
    day: index + 1,
  }));

export const roadmapNodeLayout: RoadmapNodeLayout[] = [
  { x: 84, y: 10, orbitPlacement: "left", labelPlacement: "left" },
  { x: 63, y: 22, orbitPlacement: "left", labelPlacement: "right" },
  { x: 77, y: 35, orbitPlacement: "left", labelPlacement: "left" },
  { x: 47, y: 47, orbitPlacement: "right", labelPlacement: "right" },
  { x: 69, y: 60, orbitPlacement: "left", labelPlacement: "left" },
  { x: 85, y: 72, orbitPlacement: "left", labelPlacement: "left" },
  { x: 57, y: 83, orbitPlacement: "top", labelPlacement: "right" },
  { x: 29, y: 91, orbitPlacement: "top", labelPlacement: "right" },
];

export const defaultKanjiRoadmapLevelId = "n5";

export const kanjiRoadmapLevels: [KanjiRoadmapLevel, ...KanjiRoadmapLevel[]] = [
  {
    id: "n5",
    level: "N5",
    title: "Nền tảng nhập môn",
    description:
      "Đi từ những chữ cơ bản nhất để bạn đọc được lịch học, biển báo và mẫu câu đời sống.",
    kanjiCount: 80,
    progress: 35,
    totalDays: 8,
    currentDay: 3,
    palette: {
      solid: "#2563eb",
      soft: "#dbeafe",
      line: "#7cb7ff",
      shell: "#eef6ff",
    },
    days: buildDays("n5", [
      {
        focus: "Số đếm và trục thời gian",
        note: "Mở đầu với nhóm chữ nhìn thấy mỗi ngày.",
        kanji: ["日", "一", "国", "人", "年", "大", "十", "二", "本", "中"],
      },
      {
        focus: "Chuyển động cơ bản",
        note: "Các động tác, thời điểm và hướng đi quen thuộc.",
        kanji: ["長", "出", "三", "時", "行", "見", "月", "後", "前", "生"],
      },
      {
        focus: "Không gian và trường lớp",
        note: "Checkpoint đang học của N5.",
        kanji: ["五", "間", "上", "東", "四", "今", "金", "九", "入", "学"],
      },
      {
        focus: "Vật dụng và cảm giác",
        note: "Nhóm chữ dễ gặp trong giao tiếp hằng ngày.",
        kanji: ["高", "円", "子", "外", "八", "六", "下", "来", "気", "小"],
      },
      {
        focus: "Gia đình và phương hướng",
        note: "Bắt đầu ghép câu đơn giản với ngữ cảnh thật.",
        kanji: ["七", "山", "話", "女", "北", "午", "百", "書", "先", "名"],
      },
      {
        focus: "Thiên nhiên và trường học",
        note: "Các chữ giúp đọc bảng biểu, thời khóa biểu và địa danh.",
        kanji: ["川", "千", "水", "半", "男", "西", "電", "校", "語", "土"],
      },
      {
        focus: "Sinh hoạt thường ngày",
        note: "Chuẩn bị cho các đoạn văn ngắn và mẫu hội thoại cơ bản.",
        kanji: ["木", "聞", "食", "車", "何", "南", "万", "毎", "白", "天"],
      },
      {
        focus: "Vòng tổng ôn N5",
        note: "Nốt cuối để khóa nhóm kanji nền tảng.",
        kanji: ["母", "火", "右", "読", "友", "左", "休", "父", "雨", "会"],
      },
    ]),
  },
  {
    id: "n4",
    level: "N4",
    title: "Mở rộng nhịp đọc",
    description:
      "Tăng dần số chữ ghép và những khái niệm thường gặp trong lớp học, công việc và thành phố.",
    kanjiCount: 170,
    progress: 20,
    totalDays: 8,
    currentDay: 2,
    palette: {
      solid: "#0f766e",
      soft: "#d9f6f0",
      line: "#4abcae",
      shell: "#eefcf8",
    },
    days: buildDays("n4", [
      {
        focus: "Con người và tổ chức",
        note: "Làm quen với chữ dùng trong công ty và tập thể.",
        kanji: ["会", "同", "事", "自", "社", "発", "者", "地", "業", "方"],
      },
      {
        focus: "Hành động và trạng thái",
        note: "Checkpoint đang học của N4.",
        kanji: ["新", "場", "員", "立", "開", "手", "力", "問", "代", "明"],
      },
      {
        focus: "Lý do và chủ đề",
        note: "Các chữ hay xuất hiện trong đoạn văn ngắn.",
        kanji: ["動", "京", "目", "通", "言", "理", "体", "田", "主", "題"],
      },
      {
        focus: "Ý định và mức độ",
        note: "Dùng để nâng phản xạ đọc và nói tự nhiên hơn.",
        kanji: ["意", "不", "作", "用", "度", "強", "公", "持", "野", "以"],
      },
      {
        focus: "Gia đình và xã hội",
        note: "Đọc hiểu tốt hơn các đoạn nói về đời sống.",
        kanji: ["思", "家", "世", "多", "正", "安", "院", "心", "界", "教"],
      },
      {
        focus: "Kiến thức và trao đổi",
        note: "Bổ sung nhóm chữ dùng trong học tập, mua bán và giao tiếp.",
        kanji: ["文", "重", "近", "考", "画", "海", "売", "知", "道", "集"],
      },
      {
        focus: "Sản phẩm và thói quen",
        note: "Tăng độ quen mặt với chữ ghép ở trình độ sơ trung cấp.",
        kanji: ["別", "物", "使", "品", "計", "死", "特", "私", "始", "朝"],
      },
      {
        focus: "Chặng hoàn tất N4",
        note: "Khóa lại nhóm kanji hay gặp trước khi lên N3.",
        kanji: ["運", "終", "台", "広", "住", "無", "真", "有", "口", "少"],
      },
    ]),
  },
  {
    id: "n3",
    level: "N3",
    title: "Tăng tốc ngữ cảnh",
    description:
      "Các cụm chữ bắt đầu gắn nhiều hơn với bài đọc, thông tin xã hội và tình huống thực tế.",
    kanjiCount: 250,
    progress: 12,
    totalDays: 8,
    currentDay: 2,
    palette: {
      solid: "#c0841a",
      soft: "#fff2d3",
      line: "#efc367",
      shell: "#fff9ef",
    },
    days: buildDays("n3", [
      {
        focus: "Cảm nhận và quyết định",
        note: "Những chữ mở đầu cho bài đọc dài hơn.",
        kanji: ["感", "想", "化", "級", "期", "実", "関", "決", "取", "受"],
      },
      {
        focus: "Lựa chọn và thay đổi",
        note: "Checkpoint đang học của N3.",
        kanji: ["信", "相", "最", "選", "変", "経", "務", "引", "和", "投"],
      },
      {
        focus: "Điều phối và giao tiếp",
        note: "Tăng độ mượt khi đọc email, thông báo và ghi chú.",
        kanji: ["調", "整", "配", "式", "準", "勝", "負", "向", "客", "談"],
      },
      {
        focus: "Tiến trình và kết nối",
        note: "Nhóm chữ quen mặt trong báo cáo ngắn và bài nghe.",
        kanji: ["苦", "助", "続", "進", "伝", "落", "商", "連", "法", "成"],
      },
      {
        focus: "Phân tích và kết quả",
        note: "Dùng để làm rõ logic của câu và đoạn văn.",
        kanji: ["必", "由", "活", "試", "察", "置", "達", "基", "流", "果"],
      },
      {
        focus: "Giới hạn và bối cảnh",
        note: "Mở rộng vốn chữ cho bài đọc mang tính thông tin.",
        kanji: ["在", "能", "際", "増", "減", "支", "限", "況", "製", "案"],
      },
      {
        focus: "Quản lý và số liệu",
        note: "Làm quen với giọng văn chuyên nghiệp hơn.",
        kanji: ["任", "営", "断", "件", "接", "報", "済", "統", "値", "策"],
      },
      {
        focus: "Khóa nền trung cấp",
        note: "Nhóm cuối để nối sang vùng chữ N2.",
        kanji: ["査", "福", "提", "領", "論", "態", "解", "復", "質", "認"],
      },
    ]),
  },
  {
    id: "n2",
    level: "N2",
    title: "Chiều sâu học thuật",
    description:
      "Tập trung vào chữ xuất hiện trong tài liệu, tranh luận, phân tích và nội dung nặng thông tin.",
    kanjiCount: 370,
    progress: 4,
    totalDays: 8,
    currentDay: 1,
    palette: {
      solid: "#d46b49",
      soft: "#ffe4db",
      line: "#f39a7b",
      shell: "#fff7f3",
    },
    days: buildDays("n2", [
      {
        focus: "Trách nhiệm và lý lẽ",
        note: "Checkpoint đang học của N2.",
        kanji: ["責", "任", "義", "務", "権", "益", "証", "拠", "裁", "判"],
      },
      {
        focus: "Thiết lập và cấu trúc",
        note: "Các chữ hay gặp trong bài báo và tài liệu chuyên đề.",
        kanji: ["導", "入", "維", "持", "編", "集", "構", "築", "資", "源"],
      },
      {
        focus: "Xu hướng và con số",
        note: "Đọc được văn bản phân tích và thống kê.",
        kanji: ["傾", "向", "含", "率", "額", "総", "密", "測", "層", "域"],
      },
      {
        focus: "Chiến lược và thảo luận",
        note: "Nâng khả năng hiểu tranh luận và quan điểm.",
        kanji: ["略", "策", "革", "援", "護", "講", "演", "討", "論", "稿"],
      },
      {
        focus: "Xuất bản và phê bình",
        note: "Tăng tốc đọc hiểu nội dung mang tính học thuật.",
        kanji: ["著", "編", "訳", "刊", "刷", "冊", "批", "評", "載", "覧"],
      },
      {
        focus: "Áp lực và thích ứng",
        note: "Làm quen với nhóm chữ có sắc thái trừu tượng hơn.",
        kanji: ["臨", "応", "態", "勢", "圧", "縮", "拡", "張", "承", "認"],
      },
      {
        focus: "Thị trường và biến động",
        note: "Đọc văn bản kinh tế, dữ liệu và thông tin xã hội tốt hơn.",
        kanji: ["既", "存", "銘", "柄", "需", "給", "損", "益", "株", "券"],
      },
      {
        focus: "Giả thuyết và kiểm chứng",
        note: "Chốt nền đọc hiểu nâng cao trước khi sang N1.",
        kanji: ["誤", "差", "限", "界", "仮", "説", "検", "証", "観", "測"],
      },
    ]),
  },
  {
    id: "n1",
    level: "N1",
    title: "Mật độ cao cấp",
    description:
      "Thiết kế cho bài đọc dày ý, sắc thái tinh tế và các từ ngữ mang tính xã hội, học thuật, trừu tượng.",
    kanjiCount: 620,
    progress: 0,
    totalDays: 8,
    currentDay: 1,
    palette: {
      solid: "#475569",
      soft: "#e6edf5",
      line: "#93a5b8",
      shell: "#f6f9fc",
    },
    days: buildDays("n1", [
      {
        focus: "Sắc thái và khái quát",
        note: "Mở đầu vùng chữ N1 bằng những khái niệm dày nghĩa.",
        kanji: ["曖", "昧", "顕", "著", "抑", "揚", "遂", "行", "概", "括"],
      },
      {
        focus: "Tích lũy và bền vững",
        note: "Nhóm chữ hay gặp trong văn phân tích chuyên sâu.",
        kanji: ["蓄", "積", "逸", "脱", "脆", "弱", "堅", "牢", "循", "環"],
      },
      {
        focus: "Xung đột và cân nhắc",
        note: "Tăng độ nhạy với sắc thái đánh giá và tâm lý.",
        kanji: ["侮", "辱", "憂", "慮", "妥", "協", "懸", "念", "顧", "慕"],
      },
      {
        focus: "Sai lệch và hiệu chỉnh",
        note: "Đọc được những đoạn bàn về chính sách và lý luận.",
        kanji: ["媒", "介", "該", "当", "是", "正", "乖", "離", "偏", "狭"],
      },
      {
        focus: "Biến động và hệ quả",
        note: "Những chữ thường đi cùng chủ đề xã hội và kinh tế.",
        kanji: ["膨", "張", "抑", "制", "紛", "糾", "遷", "移", "弊", "害"],
      },
      {
        focus: "Nhịp độ và kế thừa",
        note: "Mở rộng khả năng đọc câu dài nhiều vế.",
        kanji: ["頻", "繁", "緩", "和", "遮", "断", "継", "承", "漠", "然"],
      },
      {
        focus: "Độ tinh vi của từ vựng",
        note: "Các chữ có tần suất thấp hơn nhưng độ nhận diện cao.",
        kanji: ["諸", "刃", "緻", "密", "躍", "進", "潤", "沢", "顎", "膜"],
      },
      {
        focus: "Khóa chặng N1",
        note: "Vùng chữ mô phỏng dành cho bài đọc có mật độ rất dày.",
        kanji: ["朽", "化", "罷", "免", "擁", "護", "謙", "虚", "秩", "序"],
      },
    ]),
  },
];

export const createRoadmapDays = (
  levelId: string,
  level: KanjiCluster["level"],
  kanjiList: string[],
) => {
  const total = kanjiList.length;

  return Array.from({ length: Math.ceil(total / ROADMAP_KANJI_PER_DAY) }, (_, index) => {
    const start = index * ROADMAP_KANJI_PER_DAY;
    const end = Math.min(start + ROADMAP_KANJI_PER_DAY, total);

    return {
      id: `${levelId}-day-${index + 1}`,
      day: index + 1,
      focus: `Chặng ${String(index + 1).padStart(2, "0")}`,
      note: `Từ chữ ${start + 1} đến ${end} trong ${total} chữ JLPT ${level}.`,
      kanji: kanjiList.slice(start, end),
    };
  });
};

export const deriveCurrentDay = (totalDays: number, progress: number) => {
  if (totalDays <= 1) {
    return 1;
  }

  if (progress >= 100) {
    return totalDays;
  }

  const completedDays = Math.floor((progress / 100) * totalDays);
  return Math.min(totalDays, completedDays + 1);
};
