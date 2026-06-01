"use client";

import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { z } from "zod";

import {
  createVocabularyWord,
  updateVocabularyWord,
} from "@/features/vocabulary/services/vocabulary-service";
import type { createWordSchema } from "@/features/vocabulary/types/schema";

type VocabularyWordData = z.infer<typeof createWordSchema>;

interface VocabularyWordBuilderProps {
  open: boolean;
  onClose: () => void;
  setId: string;
  initialData?: VocabularyWordData & { id: string };
}

export default function VocabularyWordBuilder({
  open,
  onClose,
  setId,
  initialData,
}: VocabularyWordBuilderProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<VocabularyWordData>({
    japanese: "",
    reading: "",
    meaning: "",
    example: "",
    exampleMeaning: "",
  });
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        japanese: initialData.japanese,
        reading: initialData.reading,
        meaning: initialData.meaning,
        example: initialData.example || "",
        exampleMeaning: initialData.exampleMeaning || "",
      });
    } else {
      setFormData({
        japanese: "",
        reading: "",
        meaning: "",
        example: "",
        exampleMeaning: "",
      });
    }
  }, [initialData, open]);

  const createMutation = useMutation({
    mutationFn: (data: VocabularyWordData) => createVocabularyWord(setId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vocabulary", "words", setId] });
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: VocabularyWordData) => updateVocabularyWord(setId, initialData!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vocabulary", "words", setId] });
      onClose();
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleAutoFill = async () => {
    if (!formData.japanese.trim()) return;

    setIsAutoFilling(true);
    try {
      const res = await fetch(`/api/jisho/vocab/${encodeURIComponent(formData.japanese.trim())}`);
      if (res.ok) {
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const item = data.items[0];
          setFormData((p) => ({
            ...p,
            reading: item.reading || p.reading,
            meaning: item.meaning || p.meaning,
          }));
        }
      }
    } catch (error) {
      console.error("Auto-fill failed", error);
    } finally {
      setIsAutoFilling(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.japanese.trim() || !formData.reading.trim() || !formData.meaning.trim()) return;

    if (initialData) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initialData ? "Chỉnh sửa từ vựng" : "Thêm từ vựng mới"}</DialogTitle>
        <DialogContent dividers className="flex flex-col gap-4">
          <TextField
            autoFocus
            label="Từ tiếng Nhật (Kanji/Kana)"
            fullWidth
            required
            value={formData.japanese}
            onChange={(e) => setFormData((p) => ({ ...p, japanese: e.target.value }))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Tự động điền qua Jisho">
                    <IconButton
                      onClick={handleAutoFill}
                      disabled={isAutoFilling || !formData.japanese.trim()}
                      color="primary"
                    >
                      {isAutoFilling ? <CircularProgress size={24} /> : <AutoFixHighIcon />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Cách đọc (Hiragana/Katakana)"
            fullWidth
            required
            value={formData.reading}
            onChange={(e) => setFormData((p) => ({ ...p, reading: e.target.value }))}
          />
          <TextField
            label="Nghĩa (Tiếng Việt)"
            fullWidth
            required
            value={formData.meaning}
            onChange={(e) => setFormData((p) => ({ ...p, meaning: e.target.value }))}
          />
          <TextField
            label="Câu ví dụ (Tiếng Nhật)"
            fullWidth
            multiline
            rows={2}
            value={formData.example}
            onChange={(e) => setFormData((p) => ({ ...p, example: e.target.value }))}
          />
          <TextField
            label="Nghĩa câu ví dụ"
            fullWidth
            multiline
            rows={2}
            value={formData.exampleMeaning}
            onChange={(e) => setFormData((p) => ({ ...p, exampleMeaning: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isPending}>
            Hủy
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={
              isPending ||
              !formData.japanese.trim() ||
              !formData.reading.trim() ||
              !formData.meaning.trim()
            }
          >
            {isPending ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
