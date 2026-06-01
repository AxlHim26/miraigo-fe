#!/usr/bin/env bash
#
# Chạy Codex CLI liên tục để Việt hoá meaning trong data/kanji/*.json
# Mỗi vòng xử lý đúng 1 lô file và ghi tên file đã xử lý vào data/kanji-processed.txt
#
# Yêu cầu:
#   1. Đã cài Codex CLI
#   2. Đã đăng nhập Codex CLI: codex login
#
# Chạy:
#   cd miraigo-fe && bash scripts/translate-kanji-via-codex-cli.sh
#
# Tuỳ chọn env:
#   CODEX_KANJI_BATCH=15
#   CODEX_KANJI_MAX_ROUNDS=500
#   CODEX_KANJI_MODEL=gpt-5.4-mini
#   CODEX_REASONING_EFFORT=low
#

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PROCESSED_FILE="data/kanji-processed.txt"
BATCH_SIZE="${CODEX_KANJI_BATCH:-15}"
MAX_ROUNDS="${CODEX_KANJI_MAX_ROUNDS:-500}"
AGENT_MODEL="${CODEX_KANJI_MODEL:-}"
REASONING_EFFORT="${CODEX_REASONING_EFFORT:-low}"
CODEX_CMD="${CODEX_BIN:-}"

if [ -z "$CODEX_CMD" ]; then
  if command -v codex >/dev/null 2>&1; then
    CODEX_CMD="$(command -v codex)"
  else
    for candidate in \
      "$HOME/.vscode/extensions"/openai.chatgpt-*/bin/*/codex \
      "$HOME/.cursor/extensions"/openai.chatgpt-*/bin/*/codex
    do
      if [ -x "$candidate" ]; then
        CODEX_CMD="$candidate"
        break
      fi
    done
  fi
fi

if [ -z "$CODEX_CMD" ]; then
  echo "Codex CLI chưa có trong PATH hoặc các thư mục cài đặt quen thuộc."
  echo "Bạn có thể chỉ định trực tiếp bằng:"
  echo "  CODEX_BIN=/duong/dan/toi/codex npm run translate:kanji:codex-cli"
  exit 1
fi

touch "$PROCESSED_FILE"

PROMPT="Trong thư mục data/kanji/ có rất nhiều file .json. Nhiệm vụ:

1. Đọc file data/kanji-processed.txt (mỗi dòng là tên file đã xử lý, ví dụ: 一.json).
2. Liệt kê tất cả file .json trong data/kanji/ (chỉ tên file).
3. Chọn đúng $BATCH_SIZE file CHƯA có trong data/kanji-processed.txt, ưu tiên file tên ngắn trước .
4. Với mỗi file đã chọn:
   - Mở file JSON.
   - Mọi chỗ meaning phải ở dạng song ngữ Anh-Việt.
   - Nếu meaning đang là chuỗi, chuyển thành object có đúng hai key: \"en\" và \"vi\".
   - Nếu meaning đang là object, giữ nguyên dữ liệu đang có và bổ sung cho đủ cả \"en\" lẫn \"vi\".
   - Ưu tiên giữ nguyên bản tiếng Anh nếu đã có; chỉ dịch sang tiếng Việt phần còn thiếu.
   - Chỉ chỉnh các field meaning; không đổi field khác, không đổi thứ tự cấu trúc nếu không cần.
   - Thêm mẹo nhớ chữ hán đó bằng tiếng Việt vào một field mới \"mnemonic_vi\" nếu chưa có ví dụ chữ nhất sẽ có Gợi ý cách nhớ: 1 一 bước sang ngang
   - Ghi lại file theo đúng format JSON đang có.
5. Append đúng $BATCH_SIZE tên file vừa xử lý vào cuối data/kanji-processed.txt, mỗi dòng một tên file.

Chỉ làm đúng $BATCH_SIZE file trong một lần chạy.
Kết thúc bằng một dòng ngắn theo mẫu:
Da xu ly: [file1.json, file2.json, ...]"

for ((i=1; i<=MAX_ROUNDS; i++)); do
  echo "=== Codex CLI round $i/$MAX_ROUNDS ==="

  CMD=(
    "$CODEX_CMD"
    exec
    --full-auto
    --sandbox workspace-write
    --cd "$ROOT"
    --skip-git-repo-check
    -c "model_reasoning_effort=\"$REASONING_EFFORT\""
  )

  if [ -n "$AGENT_MODEL" ]; then
    CMD+=(--model "$AGENT_MODEL")
  fi

  OUTPUT_FILE="$(mktemp)"
  LOG_FILE="$(mktemp)"

  set +e
  "${CMD[@]}" -o "$OUTPUT_FILE" "$PROMPT" >"$LOG_FILE" 2>&1
  EXIT_CODE=$?
  set -e

  if [ "$EXIT_CODE" -ne 0 ]; then
    echo "Codex CLI dừng ở round $i với exit code $EXIT_CODE."
    echo ""
    tail -n 80 "$LOG_FILE"
    rm -f "$OUTPUT_FILE" "$LOG_FILE"
    echo ""
    echo "Nếu chưa đăng nhập, chạy: codex login"
    exit "$EXIT_CODE"
  fi

  if [ -s "$OUTPUT_FILE" ]; then
    cat "$OUTPUT_FILE"
    echo ""
  else
    echo "(không có output cuối cùng từ Codex)"
    echo "Codex CLI dừng ở round $i với exit code $EXIT_CODE."
  fi

  rm -f "$OUTPUT_FILE" "$LOG_FILE"

  sleep 2
done

echo "Đã chạy đủ $MAX_ROUNDS rounds."
