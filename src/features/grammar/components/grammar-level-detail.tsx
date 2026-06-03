"use client";

import ArticleIcon from "@mui/icons-material/Article";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useShallow } from "zustand/react/shallow";

import { getGrammarPoints } from "@/features/grammar/services/grammar-service";
import { useGrammarStore } from "@/features/grammar/stores/grammar-store";
import { grammarQueryKeys } from "@/features/grammar/utils/query-keys";
import EmptyState from "@/shared/components/ui/empty-state";

const GrammarPointSkeleton = () => (
  <Paper
    elevation={0}
    className="flex items-center justify-between rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-4"
  >
    <div className="space-y-2">
      <div className="h-4 w-44 rounded-full bg-slate-100" />
      <div className="h-3 w-24 rounded-full bg-slate-100" />
    </div>
    <div className="h-6 w-16 rounded-full bg-slate-100" />
  </Paper>
);

type GrammarLevelDetailProps = {
  levelId: string;
};

export default function GrammarLevelDetail({ levelId }: GrammarLevelDetailProps) {
  const { selectedPointId, setSelectedPointId } = useGrammarStore(
    useShallow((state) => ({
      selectedPointId: state.selectedPointId,
      setSelectedPointId: state.setSelectedPointId,
    })),
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: grammarQueryKeys.points(levelId),
    queryFn: () => getGrammarPoints(levelId),
  });

  React.useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }
    const hasSelectedPoint = data.some((point) => point.id === selectedPointId);
    if (hasSelectedPoint) {
      return;
    }

    const first = data[0];
    if (first) {
      setSelectedPointId(first.id);
    }
  }, [data, selectedPointId, setSelectedPointId]);

  const selected = data?.find((point) => point.id === selectedPointId) ?? null;

  return (
    <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
      {/* ── Danh sách ngữ pháp ── */}
      <Stack spacing={2} className="w-full lg:max-w-[420px]">
        <Typography variant="h6" fontWeight={600}>
          Danh sách ngữ pháp
        </Typography>
        {isLoading || !data
          ? Array.from({ length: 4 }).map((_, index) => <GrammarPointSkeleton key={index} />)
          : data.map((point) => (
              <Paper
                key={point.id}
                elevation={0}
                onClick={() => setSelectedPointId(point.id)}
                className={`cursor-pointer rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-4 transition hover:border-blue-200 hover:shadow-sm dark:hover:border-[var(--app-active-border)] ${
                  selectedPointId === point.id
                    ? "border-blue-300 bg-blue-50/60 dark:border-[var(--app-active-border)] dark:bg-[var(--app-active-bg)]"
                    : ""
                }`}
              >
                <Stack spacing={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {point.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {point.meaning}
                  </Typography>
                  <Chip size="small" label={`Bài ${point.lesson}`} className="w-fit" />
                </Stack>
              </Paper>
            ))}
        {isError && (
          <Typography variant="body2" color="text.secondary">
            Không thể tải danh sách ngữ pháp.
          </Typography>
        )}
      </Stack>

      {/* ── Chi tiết ngữ pháp ── */}
      <Paper
        elevation={0}
        className="flex-1 rounded-3xl border border-[var(--app-border)] bg-[var(--app-card)] p-6"
      >
        {!selected ? (
          <EmptyState
            icon={<ArticleIcon />}
            title="Chọn một mẫu ngữ pháp"
            description="Chọn bên trái để xem chi tiết, cấu trúc và ví dụ."
          />
        ) : (
          <Stack spacing={3}>
            {/* Tiêu đề */}
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {selected.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="mt-1">
                {selected.meaning}
              </Typography>
              {selected.tags && selected.tags.length > 0 && (
                <Stack direction="row" flexWrap="wrap" gap={0.5} className="mt-2">
                  {selected.tags.map((tag) => (
                    <Chip key={tag} size="small" label={tag} variant="outlined" />
                  ))}
                </Stack>
              )}
            </Box>

            {/* Cấu trúc */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" className="mb-1">
                Cấu trúc
              </Typography>
              <Paper
                elevation={0}
                className="rounded-2xl border border-[var(--app-border)] bg-slate-50 px-4 py-3 font-mono text-sm font-semibold dark:bg-[#1A2231]"
              >
                {selected.structure}
              </Paper>
            </Box>

            {/* Ghi chú */}
            {selected.notes && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" className="mb-1">
                  Ghi chú
                </Typography>
                <Paper
                  elevation={0}
                  className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300"
                >
                  {selected.notes}
                </Paper>
              </Box>
            )}

            {/* Ví dụ */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" className="mb-1">
                Ví dụ
              </Typography>
              <Stack spacing={2}>
                {selected.examples.map((example, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    className="rounded-2xl border border-[var(--app-border)] bg-slate-50 px-4 py-3 dark:bg-[#1A2231]"
                  >
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      className="text-slate-800 dark:text-slate-100"
                    >
                      {example.japanese}
                    </Typography>
                    {example.reading && (
                      <Typography variant="caption" color="text.secondary" className="block">
                        {example.reading}
                      </Typography>
                    )}
                    <Typography variant="body2" className="mt-1 text-slate-500 dark:text-slate-400">
                      {example.vietnamese}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Stack>
        )}
      </Paper>
    </Stack>
  );
}
