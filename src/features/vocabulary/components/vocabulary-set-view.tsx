"use client";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StyleIcon from "@mui/icons-material/Style";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { z } from "zod";

import {
  deleteVocabularySet,
  deleteVocabularyWord,
  getVocabularySet,
  getVocabularyWords,
} from "@/features/vocabulary/services/vocabulary-service";
import type { vocabularyWordSchema } from "@/features/vocabulary/types/schema";
import EmptyState from "@/shared/components/ui/empty-state";

import VocabularySetBuilder from "./vocabulary-set-builder";
import VocabularyWordBuilder from "./vocabulary-word-builder";

type Word = z.infer<typeof vocabularyWordSchema>;

interface VocabularySetViewProps {
  setId: string;
}

export default function VocabularySetView({ setId }: VocabularySetViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [wordBuilderOpen, setWordBuilderOpen] = useState(false);
  const [setBuilderOpen, setSetBuilderOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<Word | undefined>(undefined);

  const { data: set, isLoading: isLoadingSet } = useQuery({
    queryKey: ["vocabulary", "sets", setId],
    queryFn: () => getVocabularySet(setId),
  });

  const { data: words, isLoading: isLoadingWords } = useQuery({
    queryKey: ["vocabulary", "words", setId],
    queryFn: () => getVocabularyWords(setId),
  });

  const deleteWordMutation = useMutation({
    mutationFn: (wordId: string) => deleteVocabularyWord(setId, wordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vocabulary", "words", setId] });
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] });
    },
  });

  const deleteSetMutation = useMutation({
    mutationFn: () => deleteVocabularySet(setId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] });
      router.push("/vocabulary");
    },
  });

  const handleEditWord = (word: Word) => {
    setEditingWord(word);
    setWordBuilderOpen(true);
  };

  const handleAddWord = () => {
    setEditingWord(undefined);
    setWordBuilderOpen(true);
  };

  if (isLoadingSet || isLoadingWords) return <Typography>Đang tải...</Typography>;
  if (!set) return <EmptyState icon={<StyleIcon />} title="Không tìm thấy bộ từ" />;

  return (
    <Stack spacing={4} className="mx-auto max-w-5xl pb-10">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/vocabulary")}
        sx={{ alignSelf: "flex-start", textTransform: "none", color: "text.secondary" }}
      >
        Trở lại Thư viện
      </Button>

      {/* Hero Section */}
      <Paper elevation={0} className="app-card rounded-3xl p-6">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={3}
        >
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="h4" fontWeight={700}>
                {set.title}
              </Typography>
              {set.level && (
                <Chip label={set.level} size="small" color="primary" sx={{ fontWeight: 600 }} />
              )}
              {set.isCommunity && (
                <Chip label="Cộng đồng" size="small" color="success" variant="outlined" />
              )}
            </Stack>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {set.description || "Không có mô tả"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Số từ: {set.wordCount} • Cập nhật:{" "}
              {new Date(set.updatedAt).toLocaleDateString("vi-VN")}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            {!set.isCommunity && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setSetBuilderOpen(true)}
                >
                  Sửa
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteSetMutation.mutate()}
                >
                  Xoá
                </Button>
              </>
            )}
            <Button
              variant="contained"
              startIcon={<StyleIcon />}
              onClick={() => router.push(`/practice/flashcard?setId=${setId}`)}
              disabled={words?.length === 0}
            >
              Học Flashcard
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Words List */}
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={700}>
            Danh sách từ vựng
          </Typography>
          {!set.isCommunity && (
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddWord}>
              Thêm từ
            </Button>
          )}
        </Stack>

        {!words || words.length === 0 ? (
          <EmptyState
            icon={<StyleIcon />}
            title="Chưa có từ vựng nào"
            description="Bấm thêm từ để bắt đầu xây dựng bộ từ này."
          />
        ) : (
          <TableContainer
            component={Paper}
            elevation={0}
            className="app-card border border-[var(--app-border)]"
          >
            <Table>
              <TableHead>
                <TableRow sx={{ "& th": { fontWeight: 700, color: "text.secondary" } }}>
                  <TableCell>Tiếng Nhật</TableCell>
                  <TableCell>Cách đọc</TableCell>
                  <TableCell>Nghĩa</TableCell>
                  <TableCell>Ví dụ</TableCell>
                  {!set.isCommunity && <TableCell align="right">Thao tác</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {words.map((word) => (
                  <TableRow
                    key={word.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Typography fontWeight={600} fontFamily="'Noto Sans JP', sans-serif">
                        {word.japanese}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontFamily="'Noto Sans JP', sans-serif">
                        {word.reading}
                      </Typography>
                    </TableCell>
                    <TableCell>{word.meaning}</TableCell>
                    <TableCell>
                      {word.example ? (
                        <Box>
                          <Typography variant="body2" fontFamily="'Noto Sans JP', sans-serif">
                            {word.example}
                          </Typography>
                          {word.exampleMeaning && (
                            <Typography variant="caption" color="text.secondary">
                              {word.exampleMeaning}
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    {!set.isCommunity && (
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => handleEditWord(word)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => deleteWordMutation.mutate(word.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Modals */}
      <VocabularyWordBuilder
        open={wordBuilderOpen}
        onClose={() => setWordBuilderOpen(false)}
        setId={setId}
        {...(editingWord ? { initialData: editingWord } : {})}
      />
      <VocabularySetBuilder
        open={setBuilderOpen}
        onClose={() => setSetBuilderOpen(false)}
        initialData={set}
      />
    </Stack>
  );
}
