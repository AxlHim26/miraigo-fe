import json
from pathlib import Path

NAMES = ["処", "凧", "凩", "凪", "凰", "凱", "凵", "凶", "凹", "出", "函", "凾", "刀", "刂", "刃"]

EN_TO_VI = {
    "deal with, treat": "xử lý, đối xử",
    "virgin, maiden": "trinh nữ, thiếu nữ",
    "prescription": "đơn thuốc",
    "treat [v.t.]": "điều trị, xử lý",
    "punish": "trừng phạt",
    "execute": "xử tử",
    "dispose of, deal with, punish": "xử lý, giải quyết, trừng phạt",
    "process, deal with": "xử lý, giải quyết",
    "deal with, cope": "đối phó, ứng phó",
    "handle carefully, use discretion": "xử lý thận trọng, liệu nghi",
    "table": "bàn",
    "dispose, manage, deal with, sentence, condemn, act, behave, place": "xử trí, quản lý, giải quyết, kết án, lên án, hành động, cư xử, nơi chốn",
    "execution": "sự xử tử",
    "just, but": "vừa đúng lúc, nhưng",
    "kite, (kokuji)": "diều, chữ quốc tự",
    "kite": "diều",
    "kite flying": "thả diều",
    "wintry wind, (kokuji)": "gió mùa đông, chữ quốc tự",
    "cold wintry wind": "gió lạnh mùa đông",
    "lull, calm, (kokuji)": "lặng gió, yên ả, chữ quốc tự",
    "calm (at sea), lull": "biển lặng, lúc yên gió",
    "evening calm": "lặng gió buổi chiều",
    "to become calm (of the wind, sea, etc.), to die down": "trở nên yên lặng, dịu xuống",
    "female phoenix bird": "phượng cái",
    "huang (female Chinese firebird)": "hoàng, chim lửa cái trong truyền thuyết Trung Hoa",
    "victory song": "khúc khải hoàn",
    "victory song, victory": "khúc khải hoàn, chiến thắng",
    "open box enclosure, open box radical (no. 17)": "bộ hộp mở, bộ khảm số 17",
    "kanji \"box\" radical (radical 17)": "bộ 'hộp' trong kanji, bộ số 17",
    "container, open mouth": "đồ chứa, miệng mở",
    "villain, evil, bad luck, disaster": "hung ác, xấu xa, xui rủi, tai họa",
    "bad luck, ill fortune, misfortune": "xui rủi, vận rủi, bất hạnh",
    "atrocious, heinous, fiendish, brutal, vicious": "tàn ác, ghê tởm, hung bạo, dã man, độc ác",
    "terrible luck, very bad luck": "vận xui khủng khiếp, cực kỳ xui",
    "concave, hollow, sunken": "lõm, rỗng, trũng xuống",
    "costal fovea": "hõm sườn",
    "exit, leave, go out, come out, put out, protrude": "ra, rời đi, đi ra, xuất hiện, đưa ra, nhô ra",
    "go out, put out": "đi ra, đưa ra",
    "birth place, alma mater": "quê quán, trường mẹ",
    "publisher": "nhà xuất bản",
    "attend": "tham dự",
    "depart": "khởi hành",
    "export": "xuất khẩu",
    "go out": "đi ra ngoài",
    "receipts and expenditure": "thu chi",
    "come out [v.i.]": "đi ra, xuất hiện",
    "put out, send [v.t.]": "đưa ra, gửi đi",
    "drawer": "ngăn kéo",
    "container, open box": "hộp chứa, hộp mở",
    "cashbook": "sổ thu chi",
    "to go, to come": "đi, đến",
    "box (archaic)": "hộp, nghĩa cổ",
    "box and cover": "hộp và nắp",
    "drain with an oblong cross-section": "cống có tiết diện hình chữ nhật",
    "(cardboard) box manufacture": "sản xuất hộp carton",
    "sutra box": "hộp đựng kinh",
    "Hakodate (city in Hokkaido)": "Hakodate, thành phố ở Hokkaido",
    "box": "hộp",
    "sword": "kiếm",
    "swords": "các thanh kiếm",
    "sword blade": "lưỡi kiếm",
    "famous sword, excellent sword": "thanh kiếm nổi tiếng, kiếm quý",
    "short sword, dagger, dirk": "đoản kiếm, dao găm",
    "Japanese sword": "kiếm Nhật",
    "sword, blade": "kiếm, lưỡi dao",
    "small knife, short sword": "dao nhỏ, đoản kiếm",
    "knife, sword": "dao, kiếm",
    "sword, saber, knife": "kiếm, đao, dao",
    "sword, dagger, knife, bayonet": "kiếm, dao găm, dao, lưỡi lê",
    "(small) knife, short sword, small sword": "dao nhỏ, đoản kiếm, kiếm nhỏ",
    "having exhausted every available means, having broken one's sword and exhausted one's arrows": "đã dùng hết mọi cách, cạn sạch phương kế",
    "sword, blade, single stroke": "kiếm, lưỡi kiếm, một nhát chém",
    "razor": "dao cạo",
    "Occam's razor, Ockham's razor": "dao cạo Occam",
    "knife, standing sword radical (no. 18)": "bộ đao đứng, bộ số 18",
    "blade, sword, edge": "lưỡi dao, kiếm, cạnh sắc",
    "bloodshed": "đổ máu",
    "steel, sword steel, sword": "thép, thép làm kiếm, kiếm",
    "double-edged (e.g. sword blade), double-beveled (e.g. kitchen knife), double-edged blade": "hai lưỡi, vát hai bên, lưỡi dao hai cạnh",
    "die blade, cutting die": "dao khuôn cắt",
    "to cross swords (with)": "giao đấu, so tài với",
    "Demon Slayer: Kimetsu no Yaiba (manga, anime)": "Thanh Gươm Diệt Quỷ: Kimetsu no Yaiba",
    "gleaming sword": "thanh kiếm sáng loáng",
}

VI_TO_EN = {
    "treatment (of a person), dealing with": "treatment (of a person), dealing with",
    "everywhere, all over the place, here and there, at every turn": "everywhere, all over the place, here and there, at every turn",
    "one place, the same place, one person, together": "one place, the same place, one person, together",
    "place, spot, scene, site, address, district, area, locality, one's house, point, aspect, side, facet, passage (in text), part, space, room, thing, matter, whereupon, as a result, about to, on the verge of, was just doing, was in the process of doing, have just done, just finished doing, approximately, around, about": "place, spot, scene, site, address, district, area, locality, one's house, point, aspect, side, facet, passage (in text), part, space, room, thing, matter, whereupon, as a result, about to, on the verge of, was just doing, was in the process of doing, have just done, just finished doing, approximately, around, about",
    "here and there, in places": "here and there, in places",
    "backfire (of a spell, curse, etc.)": "backfire (of a spell, curse, etc.)",
    "Chinese firebird, Chinese phoenix": "Chinese firebird, Chinese phoenix",
    "large bird, peng (giant bird said to transform from a fish), fenghuang (Chinese phoenix)": "large bird, peng (giant bird said to transform from a fish), fenghuang (Chinese phoenix)",
    "triumphant return, returning in triumph": "triumphant return, returning in triumph",
    "ringleader, main culprit, main cause, source": "ringleader, main culprit, main cause, source",
    "unevenness, bumpiness, roughness, ruggedness, imbalance, inequality, unevenness, disparity": "unevenness, bumpiness, roughness, ruggedness, imbalance, inequality, disparity",
    "to cave in, to become depressed, to sink": "to cave in, to become depressed, to sink",
    "to be dented, to be indented, to yield, to give, to sink, to collapse, to cave in, to be beaten, to be overwhelmed, to yield, to give in, to give up, to be disheartened, to feel down, to feel depressed, to suffer a loss, to lose": "to be dented, to be indented, to yield, to give, to sink, to collapse, to cave in, to be beaten, to be overwhelmed, to give in, to give up, to be disheartened, to feel down, to feel depressed, to suffer a loss, to lose",
    "developmental irregularities, developmental disorder, neurodiversity": "developmental irregularities, developmental disorder, neurodiversity",
    "hole, hollow, pothole (road, pavement, etc.)": "hole, hollow, pothole (road, pavement, etc.)",
    "coming out, emerging, being born into (a certain family), being a native of (a particular place)": "coming out, emerging, being born into (a certain family), being a native of (a particular place)",
    "appearance (in a film, play, TV show, etc.), performance": "appearance (in a film, play, TV show, etc.), performance",
    "producing (people) in great numbers, appearing one after the other": "producing (people) in great numbers, appearing one after the other",
    "annual expenditure": "annual expenditure",
    "receipts and expenditure (disbursements)": "receipts and expenditure (disbursements)",
    "to leave, to exit, to go out, to come out, to get out, to leave (on a journey), to depart, to start out, to set out, to move forward, to come to, to get to, to lead to, to reach, to appear, to come out, to emerge, to surface, to come forth, to turn up, to be found, to be detected, to be discovered, to be exposed, to show, to be exhibited, to be on display, to appear (in print), to be published, to be announced, to be issued, to be listed, to come out, to attend, to participate, to take part, to enter (an event), to play in, to perform, to be stated, to be expressed, to come up, to be brought up, to be raised, to sell, to exceed, to go over, to stick out, to protrude, to break out, to occur, to start, to originate, to be produced, to come from, to be derived from, to be given, to get, to receive, to be offered, to be provided, to be presented, to be submitted, to be handed in, to be turned in, to be paid, to answer (phone, door, etc.), to get, to assume (an attitude), to act, to behave, to pick up (speed, etc.), to gain, to flow (e.g. tears), to run, to bleed, to graduate, to ejaculate, to cum": "to leave, to exit, to go out, to come out, to get out, to leave (on a journey), to depart, to start out, to set out, to move forward, to come to, to get to, to lead to, to reach, to appear, to emerge, to surface, to come forth, to turn up, to be found, to be detected, to be discovered, to be exposed, to show, to be exhibited, to be on display, to appear (in print), to be published, to be announced, to be issued, to be listed, to attend, to participate, to take part, to enter (an event), to play in, to perform, to be stated, to be expressed, to come up, to be brought up, to be raised, to sell, to exceed, to go over, to stick out, to protrude, to break out, to occur, to start, to originate, to be produced, to come from, to be derived from, to be given, to get, to receive, to be offered, to be provided, to be presented, to be submitted, to be handed in, to be turned in, to be paid, to answer (phone, door, etc.), to assume (an attitude), to act, to behave, to pick up (speed, etc.), to gain, to flow (e.g. tears), to run, to bleed, to graduate, to ejaculate, to cum",
    "the nail that sticks out gets hammered down, people that stick out too much get punished, tall trees catch much wind, people that excel at something become disliked": "the nail that sticks out gets hammered down, people that stick out too much get punished, tall trees catch much wind, people that excel at something become disliked",
    "to take out, to get out, to put out, to reveal, to show, to submit (e.g. thesis), to turn in, to publish, to make public, to send (e.g. letter), to produce (a sound), to start (fire), to serve (food), ... out (e.g. to jump out, to carry out), to begin ..., to start to ..., to burst into ...": "to take out, to get out, to put out, to reveal, to show, to submit (e.g. thesis), to turn in, to publish, to make public, to send (e.g. letter), to produce (a sound), to start (fire), to serve (food), ... out (e.g. to jump out, to carry out), to begin ..., to start to ..., to burst into ...",
    "being exceptionally stingy": "being exceptionally stingy",
    "box, case, chest, package, pack, crate, car (of a train, etc.), shamisen case, shamisen, public building, community building, man who carries a geisha's shamisen, receptacle for human waste, feces (faeces), counter for boxes (or boxed objects)": "box, case, chest, package, pack, crate, car (of a train, etc.), shamisen case, shamisen, public building, community building, man who carries a geisha's shamisen, receptacle for human waste, feces (faeces), counter for boxes (or boxed objects)",
    "to put in, to let in, to take in, to bring in, to insert, to install (e.g. software), to set (a jewel, etc.), to ink in (e.g. tattoo), to admit, to accept, to employ, to hire, to accept, to comply, to grant, to adopt (a policy, etc.), to take (advice, etc.), to listen to, to pay attention to, to include, to pay (one's rent, etc.), to cast (a vote), to make (tea, coffee, etc.), to turn on (a switch, etc.), to send (a fax), to call": "to put in, to let in, to take in, to bring in, to insert, to install (e.g. software), to set (a jewel, etc.), to ink in (e.g. tattoo), to admit, to accept, to employ, to hire, to comply, to grant, to adopt (a policy, etc.), to take (advice, etc.), to listen to, to pay attention to, to include, to pay (one's rent, etc.), to cast (a vote), to make (tea, coffee, etc.), to turn on (a switch, etc.), to send (a fax), to call",
    "sword (esp. Japanese single-edged), katana, scalpel, chisel, burin, graver, knife money (knife-shaped commodity money used in ancient China)": "sword (esp. Japanese single-edged), katana, scalpel, chisel, burin, graver, knife money (knife-shaped commodity money used in ancient China)",
    "(Japanese) long sword, large sword, guandao, Chinese glaive": "(Japanese) long sword, large sword, guandao, Chinese glaive",
    "attacking one opponent then immediately attacking another": "attacking one opponent then immediately attacking another",
    "edge (of a knife or sword), blade, prong (of an electrical plug)": "edge (of a knife or sword), blade, prong (of an electrical plug)",
    "blade, sword, forged blade, wavy pattern on forged blades, sharpness, unhulled rice": "blade, sword, forged blade, wavy pattern on forged blades, sharpness, unhulled rice",
}

MNEMONICS = {
    "処": "Gợi ý cách nhớ: chữ 処 như người cầm gậy đứng bên chiếc bàn, gặp việc gì cũng phải xử lý cho ổn thỏa.",
    "凧": "Gợi ý cách nhớ: 几 như khung diều, thêm nét chỉ gió nâng lên thành chiếc diều bay.",
    "凩": "Gợi ý cách nhớ: gió lạnh thổi qua rừng cây, ghép vài nét thành 凩 để nhớ gió mùa đông.",
    "凪": "Gợi ý cách nhớ: gió đã dừng trên mặt biển nên mọi thứ lặng yên, đó là 凪.",
    "凰": "Gợi ý cách nhớ: chim hoàng cái đội vương miện bay lên, hình 凰 gợi một con phượng cao quý.",
    "凱": "Gợi ý cách nhớ: tiếng trống khải hoàn vang lên sau chiến thắng, đó là cảm giác của 凱.",
    "凵": "Gợi ý cách nhớ: 凵 giống một chiếc hộp mở miệng lên trên.",
    "凶": "Gợi ý cách nhớ: trong chiếc khung mở có dấu chéo báo điềm xấu, nên 凶 là hung.",
    "凹": "Gợi ý cách nhớ: hình chữ lõm xuống ở giữa nên 凹 nghĩa là lõm.",
    "出": "Gợi ý cách nhớ: hai ngọn núi chồng lên nhau nhô ra ngoài, nên 出 là đi ra.",
    "函": "Gợi ý cách nhớ: vật được bỏ vào chiếc hộp có nắp, nên 函 gợi nghĩa hộp đựng.",
    "凾": "Gợi ý cách nhớ: 凾 là dạng cũ của 函, nhìn như chiếc hộp đóng kín để chứa đồ.",
    "刀": "Gợi ý cách nhớ: 刀 chính là hình một lưỡi dao cong sắc.",
    "刂": "Gợi ý cách nhớ: 刂 là bộ đao đứng, trông như lưỡi dao dựng thẳng bên cạnh chữ khác.",
    "刃": "Gợi ý cách nhớ: thêm chấm đánh dấu chỗ sắc nhất của 刀, nên 刃 là lưỡi dao.",
}


def add_bilingual(value):
    if isinstance(value, str):
        return {"en": value, "vi": EN_TO_VI[value]}
    if isinstance(value, dict):
        result = dict(value)
        en = result.get("en")
        if not en and "english" in result:
            en = result["english"]
        if not en and "vi" in result:
            en = VI_TO_EN.get(result["vi"])
        if en:
            result.setdefault("en", en)
        vi = result.get("vi")
        if not vi and en:
            result["vi"] = EN_TO_VI[en]
        return result
    return value


def walk(node):
    if isinstance(node, dict):
        for key, value in list(node.items()):
            if key == "meaning":
                node[key] = add_bilingual(value)
            else:
                walk(value)
    elif isinstance(node, list):
        for item in node:
            walk(item)


for name in NAMES:
    path = Path("data/kanji") / f"{name}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    walk(data)
    jisho = data.get("jishoData")
    if isinstance(jisho, dict) and "jlptLevel" not in jisho:
        jisho["jlptLevel"] = None
    if "mnemonic_vi" not in data:
        data["mnemonic_vi"] = MNEMONICS[name]
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
