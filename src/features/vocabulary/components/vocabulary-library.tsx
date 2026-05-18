"use client";

import AddIcon from "@mui/icons-material/Add";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { getVocabularyLibrary } from "@/features/vocabulary/services/vocabulary-service";
import EmptyState from "@/shared/components/ui/empty-state";

import VocabularySetBuilder from "./vocabulary-set-builder";

export default function VocabularyLibrary() {
  const router = useRouter();
  const [builderOpen, setBuilderOpen] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["vocabulary"], // simplified queryKey since getVocabularyLibrary fetches all sets
    queryFn: getVocabularyLibrary,
  });

  const handleAddSet = () => {
    setBuilderOpen(true);
  };

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600}>
          Bộ từ của bạn
        </Typography>
        <EmptyState
          icon={<FolderOffIcon />}
          title="Đang tải thư viện..."
          description="Vui lòng chờ trong giây lát."
        />
      </Stack>
    );
  }

  if (isError) {
    return (
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600}>
          Bộ từ của bạn
        </Typography>
        <EmptyState
          icon={<FolderOffIcon />}
          title="Không thể tải thư viện"
          description="Vui lòng thử lại sau."
        />
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Bộ từ của bạn
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddSet}>
          Tạo bộ từ mới
        </Button>
      </Stack>

      {!data || data.sets.length === 0 ? (
        <EmptyState
          icon={<FolderOffIcon />}
          title="Chưa có nội dung nào"
          description="Tạo bộ từ mới để bắt đầu học."
        />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 2,
          }}
        >
          {data.sets.map((set) => (
            <Box
              key={set.id}
              onClick={() => router.push(`/vocabulary/${set.id}`)}
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: "var(--app-surface)",
                border: "1px solid var(--app-border)",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "var(--app-primary)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transform: "translateY(-2px)",
                },
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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {set.wordCount} từ vựng
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      <VocabularySetBuilder open={builderOpen} onClose={() => setBuilderOpen(false)} />
    </Stack>
  );
}
