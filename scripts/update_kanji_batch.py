import json
from pathlib import Path


SELECTED = [
    "山",
    "川",
    "月",
    "水",
    "火",
    "金",
    "土",
    "女",
    "男",
    "口",
    "目",
    "耳",
    "車",
    "学",
    "先",
]

MNEMONICS = {
    "山": "Ba nét nhô lên như ba đỉnh núi liền nhau.",
    "川": "Ba dòng thẳng song song như dòng sông đang chảy.",
    "月": "Nhìn như vầng trăng khuyết treo bên trời.",
    "水": "Nét giữa là dòng chính, hai nét bên là nước bắn ra.",
    "火": "Hai chấm hai bên như tia lửa bắn khỏi ngọn lửa.",
    "金": "Có vàng, kim loại và tiền đều gom dưới chữ kim.",
    "土": "Một nét ngang đặt trên nền đất thành chữ thổ.",
    "女": "Dáng người phụ nữ quỳ ngồi với hai tay khép lại.",
    "男": "Ruộng 田 cộng sức 力, hình ảnh người đàn ông lao động ngoài đồng.",
    "口": "Một khung vuông như cái miệng đang mở ra.",
    "目": "Giống hình con mắt với tròng mắt ở giữa.",
    "耳": "Các nét xếp như vành tai và phần tai trong.",
    "車": "Nhìn như bánh xe và trục xe từ trên xuống.",
    "学": "Mái trường ở trên, đứa trẻ ở dưới, gợi hình đi học.",
    "先": "Bàn chân đi trước người khác nên mang nghĩa phía trước.",
}

VI_TRANSLATIONS = {
    "(feeling of) indebtedness, feeling obliged": "cảm giác mắc nợ, cảm thấy có bổn phận",
    "Friday": "thứ Sáu",
    "a fine": "tiền phạt",
    "amount of money": "số tiền",
    "arrowroot (Maranta arundinacea)": "cây dong riềng (arrowroot)",
    "attention, giving one's attention, focusing": "sự chú ý, tập trung để ý",
    "blond hair": "tóc vàng",
    "boy, eldest son": "con trai, trưởng nam",
    "boy, man, male": "con trai, đàn ông, nam giới",
    "boy, son, baby boy, young man": "bé trai, con trai, con trai nhỏ, thanh niên",
    "cash": "tiền mặt",
    "deposit in a bank": "tiền gửi ngân hàng",
    "destination": "điểm đến",
    "dirty money": "tiền bẩn",
    "ear": "tai",
    "eldest son": "trưởng nam",
    "external ear, concha": "tai ngoài, vành tai",
    "eye": "mắt",
    "eye, item": "mắt, hạng mục",
    "eyelid": "mí mắt",
    "eyes and ears, seeing and hearing, one's attention, one's interest": "tai mắt, sự nhìn nghe, sự chú ý, mối quan tâm",
    "gold (colour, color)": "màu vàng kim",
    "gold colored": "màu vàng kim",
    "goldfish": "cá vàng",
    "hardware": "đồ kim khí",
    "heard for the first time": "nghe lần đầu",
    "lonely heart, male virgin, loser, geek": "kẻ cô đơn, trai tân, người thất bại, mọt sách",
    "male": "nam, nam giới",
    "male student": "nam sinh",
    "male, manly, brave, heroic, larger (of the two), greater, man, husband": "nam giới, nam tính, dũng cảm, anh hùng, lớn hơn trong hai bên, lớn hơn, đàn ông, chồng",
    "man": "đàn ông",
    "man born in a year with the same Chinese zodiac sign as the current year": "người đàn ông sinh vào năm cùng con giáp với năm hiện tại",
    "married man": "người đàn ông đã kết hôn",
    "masculine noun, son, baron, man, male": "danh từ giống đực, con trai, nam tước, đàn ông, nam giới",
    "men and women, man and woman, both sexes, both genders": "nam nữ, đàn ông và phụ nữ, cả hai giới",
    "metal": "kim loại",
    "metal, gold, mineral": "kim loại, vàng, khoáng vật",
    "metal, gold, money": "kim loại, vàng, tiền",
    "money": "tiền",
    "money collection": "việc thu tiền",
    "money, metal": "tiền, kim loại",
    "objective, target": "mục tiêu, đích nhắm",
    "otolaryngology": "tai mũi họng",
    "pay attention, take note": "chú ý, ghi nhớ",
    "rice paddy": "ruộng lúa",
    "scan, look over": "đảo mắt xem, xem lướt",
    "scholarship": "học bổng",
    "second son": "con trai thứ",
    "serious": "nghiêm túc",
    "shame, disgrace": "nỗi hổ thẹn, sự ô nhục",
    "skilled male lover": "người tình nam lão luyện",
    "small change": "tiền lẻ",
    "son": "con trai",
    "third page": "trang thứ ba",
    "turmeric (Curcuma domestica)": "nghệ (Curcuma domestica)",
    "useless": "vô ích",
    "witnessing, observing, sighting": "chứng kiến, quan sát, nhìn thấy",
}


def normalize_meaning(value):
    if isinstance(value, str):
        vi = VI_TRANSLATIONS.get(value, value)
        return {"en": value, "vi": vi}
    if isinstance(value, dict):
        new_value = dict(value)
        if "en" not in new_value:
            if "english" in new_value:
                new_value["en"] = new_value["english"]
            elif "vi" in new_value:
                new_value["en"] = new_value["vi"]
        if "vi" not in new_value:
            source = new_value.get("en") or new_value.get("english")
            if source is not None:
                new_value["vi"] = VI_TRANSLATIONS.get(source, source)
        return new_value
    return value


def walk(node):
    if isinstance(node, dict):
        for key, value in list(node.items()):
            if key == "meaning":
                node[key] = normalize_meaning(value)
            else:
                walk(value)
    elif isinstance(node, list):
        for item in node:
            walk(item)


def insert_top_level_fields(data, jlpt, mnemonic):
    result = {}
    inserted = False
    for key, value in data.items():
        result[key] = value
        if key == "jishoData":
            result["jlpt"] = jlpt
            result["mnemonic_vi"] = mnemonic
            inserted = True
    if not inserted:
        result["jlpt"] = jlpt
        result["mnemonic_vi"] = mnemonic
    return result


def main():
    root = Path("data/kanji")
    processed_path = Path("data/kanji-processed.txt")
    processed_names = [f"{char}.json" for char in SELECTED]

    for char in SELECTED:
        path = root / f"{char}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        walk(data)
        jlpt = data.get("jishoData", {}).get("jlptLevel")
        data = insert_top_level_fields(data, jlpt, MNEMONICS[char])
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    with processed_path.open("a", encoding="utf-8") as fh:
        if processed_path.stat().st_size > 0:
            fh.write("\n")
        fh.write("\n".join(processed_names))


if __name__ == "__main__":
    main()
