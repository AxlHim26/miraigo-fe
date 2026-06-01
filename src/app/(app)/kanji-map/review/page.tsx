import FlagIcon from "@mui/icons-material/Flag";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import Link from "next/link";

import EmptyState from "@/shared/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Hán tự | Cần ôn tập",
  description: "Khu ôn tập Hán tự đang được MiraiGo hoàn thiện",
};

export default function KanjiReviewPage() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Cần ôn tập
      </Typography>
      <EmptyState
        icon={<FlagIcon />}
        title="Đang phát triển"
        description="MiraiGo đang hoàn thiện khu ôn tập Hán tự để bạn có thể xem lại chữ theo đúng lộ trình học."
        action={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/kanji-map"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Về lộ trình
            </Link>
            <Link
              href="/kanji-map/lookup"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] px-4 py-2 text-sm font-semibold text-[var(--app-fg)] transition hover:border-blue-300 hover:text-blue-600"
            >
              Mở tra cứu
            </Link>
          </div>
        }
      />
    </Stack>
  );
}
