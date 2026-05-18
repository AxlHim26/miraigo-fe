"use client";

import ExploreIcon from "@mui/icons-material/Explore";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getVocabularyLibrary } from "@/features/vocabulary/services/vocabulary-service";

export default function VocabularyHero() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["vocabulary"],
    queryFn: getVocabularyLibrary,
  });

  const setCount = data?.sets?.length || 0;

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        className="overflow-hidden rounded-3xl border border-[var(--app-border)]"
      >
        <div className="h-48 w-full bg-[url('https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
      </Paper>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)]">
            <MenuBookIcon />
          </div>
          <div>
            <Typography variant="h5" fontWeight={700}>
              Thư viện của tôi
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {setCount} bộ từ
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outlined"
            startIcon={<ExploreIcon />}
            onClick={() => router.push("/vocabulary/community")}
          >
            Khám phá Cộng đồng
          </Button>
        </div>
      </div>
    </Stack>
  );
}
