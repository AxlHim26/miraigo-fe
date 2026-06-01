"use client";

import DownloadIcon from "@mui/icons-material/Download";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getVocabularyCommunity } from "@/features/vocabulary/services/vocabulary-service";
import {
  createVocabularySet,
  createVocabularyWord,
  getVocabularySet,
  getVocabularyWords,
} from "@/features/vocabulary/services/vocabulary-service";
import EmptyState from "@/shared/components/ui/empty-state";

export default function VocabularyCommunityView() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["vocabulary", "community"],
    queryFn: getVocabularyCommunity,
  });

  const cloneMutation = useMutation({
    mutationFn: async (sourceSetId: string) => {
      // 1. Fetch the source set details and words
      const sourceSet = await getVocabularySet(sourceSetId);
      const sourceWords = await getVocabularyWords(sourceSetId);

      // 2. Create a new personal set
      const newSet = await createVocabularySet({
        title: `${sourceSet.title} (Clone)`,
        description: sourceSet.description,
        level: sourceSet.level,
        isCommunity: false, // Explicitly private
      });

      // 3. Clone all words to the new set
      if (sourceWords && sourceWords.length > 0) {
        for (const word of sourceWords) {
          await createVocabularyWord(newSet.id, {
            japanese: word.japanese,
            reading: word.reading,
            meaning: word.meaning,
            example: word.example,
            exampleMeaning: word.exampleMeaning,
          });
        }
      }
      return newSet;
    },
    onSuccess: (newSet) => {
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] });
      router.push(`/vocabulary/${newSet.id}`);
    },
  });

  if (isLoading) return <Typography>Đang tải thư viện cộng đồng...</Typography>;
  if (isError) return <Typography>Lỗi khi tải thư viện cộng đồng</Typography>;

  return (
    <Stack spacing={4} className="mx-auto max-w-5xl pb-10">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={700}>
          Thư viện Cộng đồng
        </Typography>
        <Button variant="outlined" onClick={() => router.push("/vocabulary")}>
          Thư viện của tôi
        </Button>
      </Stack>

      {!data || data.length === 0 ? (
        <EmptyState
          icon={<FolderSharedIcon />}
          title="Thư viện trống"
          description="Chưa có bộ từ vựng nào được chia sẻ với cộng đồng."
        />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 3,
          }}
        >
          {data.map((set) => (
            <Box
              key={set.id}
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: "var(--app-surface)",
                border: "1px solid var(--app-border)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="subtitle1" fontWeight={700} noWrap>
                  {set.title}
                </Typography>
                {set.level && (
                  <Chip label={set.level} size="small" color="primary" variant="outlined" />
                )}
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                {set.description || "Không có mô tả"}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: "auto" }}
              >
                <Typography variant="caption" color="text.secondary">
                  {set.wordCount} từ vựng
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={() => cloneMutation.mutate(set.id)}
                  disabled={cloneMutation.isPending}
                >
                  Clone
                </Button>
              </Stack>
            </Box>
          ))}
        </Box>
      )}
    </Stack>
  );
}
