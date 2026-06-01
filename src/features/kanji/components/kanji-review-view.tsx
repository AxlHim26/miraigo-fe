"use client";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";

import { getCurrentKanjiCluster } from "@/core/data/kanji-map";
import KanjiDetailDialog from "@/features/kanji/components/kanji-detail-dialog";
import type { KanjiInfo, KanjiListResponse, KanjiSummary } from "@/features/kanji/types/kanji-info";
import { getMeaningText } from "@/features/kanji/utils/meaning";
import EmptyState from "@/shared/components/ui/empty-state";
import SectionCard from "@/shared/components/ui/section-card";
import StatCard from "@/shared/components/ui/stat-card";
import { cn } from "@/shared/utils/cn";

type ReviewStateId = "urgent" | "steady" | "light";

type ReviewItem = KanjiSummary & {
  reviewState: ReviewStateId;
};

const REVIEW_FETCH_SIZE = 30;

const REVIEW_GROUPS: Array<{
  id: ReviewStateId;
  label: string;
  description: string;
  limit: number;
  chipClassName: string;
}> = [
  {
    id: "urgent",
    label: "Cần ôn ngay",
    description: "Nên xem lại trước khi học tiếp chặng này.",
    limit: 6,
    chipClassName:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-300",
  },
  {
    id: "steady",
    label: "Ôn trước khi học tiếp",
    description: "Giữ nhịp ghi nhớ để không bị quên nghĩa.",
    limit: 5,
    chipClassName:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-300",
  },
  {
    id: "light",
    label: "Lướt lại cuối buổi",
    description: "Chỉ cần nhắc lại nhanh để giữ phản xạ.",
    limit: 4,
    chipClassName:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-300",
  },
];

function buildReviewQueue(
  items: KanjiSummary[],
  progress: number,
  kanjiCount: number,
): ReviewItem[] {
  const learnedEstimate = Math.max(12, Math.round((kanjiCount * progress) / 100));
  const baseItems = items.slice(0, Math.min(items.length, learnedEstimate));

  return REVIEW_GROUPS.flatMap((group, groupIndex) =>
    baseItems
      .filter((_, index) => index % REVIEW_GROUPS.length === groupIndex)
      .slice(0, group.limit)
      .map((item) => ({ ...item, reviewState: group.id })),
  );
}

export default function KanjiReviewView() {
  const currentCluster = React.useMemo(() => getCurrentKanjiCluster(), []);
  const currentLevel = currentCluster?.level.toLowerCase() ?? "n5";
  const currentLevelNumber = currentCluster?.level.replace("N", "") ?? "5";
  const currentLevelHref = `/kanji-map/${currentLevel}`;

  const [data, setData] = React.useState<KanjiListResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [lang, setLang] = React.useState<"vi" | "en">("vi");
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [kanjiDetail, setKanjiDetail] = React.useState<KanjiInfo | null>(null);
  const [detailLoading, setDetailLoading] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetch(`/api/kanji/jlpt/${currentLevelNumber}?page=1&size=${REVIEW_FETCH_SIZE}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Không tải được danh sách Hán tự cần ôn.");
        }
        return res.json();
      })
      .then((json: KanjiListResponse) => {
        if (active) {
          setData(json);
        }
      })
      .catch((err: Error) => {
        if (active) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [currentLevelNumber]);

  const reviewQueue = React.useMemo(
    () =>
      buildReviewQueue(
        data?.items ?? [],
        currentCluster?.progress ?? 0,
        currentCluster?.kanjiCount ?? data?.items.length ?? 0,
      ),
    [currentCluster?.kanjiCount, currentCluster?.progress, data?.items],
  );

  const selectedSummary = selectedIndex !== null ? (reviewQueue[selectedIndex] ?? null) : null;
  const urgentCount = reviewQueue.filter((item) => item.reviewState === "urgent").length;
  const learnedEstimate = currentCluster
    ? Math.round((currentCluster.kanjiCount * currentCluster.progress) / 100)
    : reviewQueue.length;
  const canGoPrev = selectedIndex !== null && selectedIndex > 0;
  const canGoNext = selectedIndex !== null && selectedIndex < reviewQueue.length - 1;

  const openDetail = React.useCallback((kanji: KanjiSummary, index: number) => {
    setSelectedIndex(index);
    setDetailLoading(true);

    fetch(`/api/kanji/${encodeURIComponent(kanji.kanji)}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Không tìm thấy dữ liệu chi tiết.");
        }
        return res.json();
      })
      .then((json: KanjiInfo) => setKanjiDetail(json))
      .catch(() => setKanjiDetail(null))
      .finally(() => setDetailLoading(false));
  }, []);

  const closeDetail = React.useCallback(() => {
    setSelectedIndex(null);
    setKanjiDetail(null);
  }, []);

  const navigateDetail = React.useCallback(
    (direction: -1 | 1) => {
      if (selectedIndex === null) {
        return;
      }

      const nextIndex = selectedIndex + direction;
      if (nextIndex < 0 || nextIndex >= reviewQueue.length) {
        return;
      }

      const nextKanji = reviewQueue[nextIndex];
      if (!nextKanji) {
        return;
      }

      openDetail(nextKanji, nextIndex);
    },
    [openDetail, reviewQueue, selectedIndex],
  );

  return (
    <Stack spacing={4}>
      <Paper
        elevation={0}
        className="overflow-hidden rounded-[28px] border border-[var(--app-border)] bg-[linear-gradient(145deg,rgba(238,245,255,0.94),rgba(255,255,255,0.98))] p-6 dark:bg-[linear-gradient(145deg,rgba(20,25,36,0.98),rgba(26,32,48,0.96))] sm:p-8"
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_auto] lg:items-center">
          <div className="space-y-4">
            <div className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
              Cần Ôn Tập
            </div>
            <div className="space-y-2">
              <Typography variant="h4" fontWeight={700}>
                Ôn lại {currentCluster?.title ?? "chặng hiện tại"} trước khi học tiếp
              </Typography>
              <Typography variant="body1" color="text.secondary" className="max-w-2xl">
                MiraiGo gom sẵn những chữ bạn nên nhìn lại trong chặng đang học để việc ôn bớt rối
                và không bị ngập bởi cả kho Hán tự.
              </Typography>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={currentLevelHref}
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Quay lại chặng đang học
              </Link>
              <Link
                href="/kanji-map/lookup"
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] px-5 py-3 text-sm font-semibold text-[var(--app-fg)] transition hover:border-blue-300 hover:text-blue-600"
              >
                Tra cứu nhanh
              </Link>
            </div>
          </div>

          <Tooltip title={lang === "vi" ? "Chuyển sang tiếng Anh" : "Chuyển sang tiếng Việt"}>
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === "vi" ? "en" : "vi"))}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] text-sm font-bold text-[var(--app-fg)] transition hover:border-blue-300 hover:text-blue-600"
            >
              {lang.toUpperCase()}
            </button>
          </Tooltip>
        </div>
      </Paper>

      <div className="grid gap-4 lg:grid-cols-3">
        <StatCard
          icon={<HistoryRoundedIcon fontSize="small" />}
          label="Gợi ý ôn hôm nay"
          value={reviewQueue.length}
          tone="primary"
        />
        <StatCard
          icon={<MenuBookRoundedIcon fontSize="small" />}
          label="Đã đi qua trong chặng này"
          value={learnedEstimate}
          tone="neutral"
        />
        <StatCard
          icon={<CheckCircleOutlineRoundedIcon fontSize="small" />}
          label="Cần ôn ngay"
          value={urgentCount}
          tone="neutral"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        <Stack spacing={2.5}>
          <div>
            <Typography variant="h6" fontWeight={700}>
              Danh sách nên ôn hôm nay
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ưu tiên các thẻ gắn nhãn <strong>Cần ôn ngay</strong> trước, sau đó mới lướt lại phần
              còn lại.
            </Typography>
          </div>

          {loading ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`review-skeleton-${index}`}
                  className="h-48 animate-pulse rounded-3xl border border-[var(--app-border)] bg-[var(--app-card)]"
                />
              ))}
            </div>
          ) : error ? (
            <EmptyState
              icon={<HistoryRoundedIcon fontSize="small" />}
              title="Chưa tải được danh sách ôn tập"
              description={error}
              action={
                <Link
                  href="/kanji-map/lookup"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Mở tra cứu
                </Link>
              }
            />
          ) : reviewQueue.length === 0 ? (
            <EmptyState
              icon={<CheckCircleOutlineRoundedIcon fontSize="small" />}
              title="Hiện chưa có chữ nào cần ôn"
              description="Khi bạn đi qua thêm một chặng, MiraiGo sẽ gom những chữ nên xem lại tại đây."
              action={
                <Link
                  href={currentLevelHref}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Tiếp tục học chặng hiện tại
                </Link>
              }
            />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {reviewQueue.map((item, index) => {
                const group = REVIEW_GROUPS.find((entry) => entry.id === item.reviewState);
                return (
                  <button
                    key={`${item.kanji}-${item.index}`}
                    type="button"
                    onClick={() => openDetail(item, index)}
                    className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-card)] p-5 text-left transition hover:-translate-y-[1px] hover:border-blue-300 hover:shadow-[0_20px_40px_-30px_rgba(59,130,246,0.45)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                          group?.chipClassName,
                        )}
                      >
                        {group?.label ?? "Ôn lại"}
                      </span>
                      <span className="text-[11px] font-semibold text-[var(--app-muted)]">
                        {item.jlptLevel}
                      </span>
                    </div>

                    <div className="mt-5 text-center">
                      <div className="text-5xl font-bold leading-none text-[var(--app-fg)]">
                        {item.kanji}
                      </div>
                      {item.hanViet?.[0] ? (
                        <div className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                          {item.hanViet[0]}
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="line-clamp-2 text-sm leading-6 text-[var(--app-fg)]">
                        {getMeaningText(item.meaning, lang) || getMeaningText(item.meaning, "en")}
                      </p>
                      <p className="text-xs text-[var(--app-muted)]">{group?.description}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-[var(--app-muted)]">
                      <span>{item.onyomi.split("、")[0] || "Chưa có âm On"}</span>
                      <span>#{item.index}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </Stack>

        <Stack spacing={2.5}>
          <div>
            <Typography variant="h6" fontWeight={700}>
              Đi tiếp thế nào?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Khi ôn xong, bạn có thể quay lại lộ trình để học tiếp hoặc mở tra cứu nếu bí một chữ.
            </Typography>
          </div>

          <Link href={currentLevelHref} className="block">
            <SectionCard
              title="Tiếp tục chặng hiện tại"
              description="Mở lại đúng bộ Hán tự đang học để đi tiếp theo tiến độ."
            />
          </Link>

          <Link href="/kanji-map" className="block">
            <SectionCard
              title="Xem lại toàn bộ lộ trình"
              description="Nhìn nhanh tiến độ các chặng JLPT và chọn lại mốc bạn muốn tập trung."
            />
          </Link>

          <Link href="/kanji-map/lookup" className="block">
            <SectionCard
              title="Tra cứu khi bí"
              description="Tìm nhanh nghĩa, nét viết và ví dụ nếu cần kiểm tra lại ngay."
            />
          </Link>
        </Stack>
      </div>

      <KanjiDetailDialog
        open={selectedIndex !== null}
        kanjiInfo={kanjiDetail}
        kanjiSummary={selectedSummary}
        loading={detailLoading}
        onClose={closeDetail}
        lang={lang}
        onUpdateKanjiInfo={(newInfo) => setKanjiDetail(newInfo)}
        {...(canGoPrev ? { onPrev: () => navigateDetail(-1) } : {})}
        {...(canGoNext ? { onNext: () => navigateDetail(1) } : {})}
      />
    </Stack>
  );
}
