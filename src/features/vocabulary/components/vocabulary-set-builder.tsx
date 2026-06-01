"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { z } from "zod";

import {
  createVocabularySet,
  updateVocabularySet,
} from "@/features/vocabulary/services/vocabulary-service";
import type { createSetSchema } from "@/features/vocabulary/types/schema";

type VocabularySetData = z.infer<typeof createSetSchema>;

interface VocabularySetBuilderProps {
  open: boolean;
  onClose: () => void;
  initialData?: VocabularySetData & { id: string };
}

export default function VocabularySetBuilder({
  open,
  onClose,
  initialData,
}: VocabularySetBuilderProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<VocabularySetData>({
    title: "",
    description: "",
    level: "N5",
    isCommunity: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description || "",
        level: initialData.level || "N5",
        isCommunity: initialData.isCommunity || false,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        level: "N5",
        isCommunity: false,
      });
    }
  }, [initialData, open]);

  const createMutation = useMutation({
    mutationFn: createVocabularySet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: VocabularySetData) => updateVocabularySet(initialData!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] });
      onClose();
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (initialData) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initialData ? "Chỉnh sửa bộ từ" : "Tạo bộ từ mới"}</DialogTitle>
        <DialogContent dividers className="flex flex-col gap-4">
          <TextField
            autoFocus
            label="Tên bộ từ"
            fullWidth
            required
            value={formData.title}
            onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
          />
          <TextField
            label="Mô tả"
            fullWidth
            multiline
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
          />
          <FormControl fullWidth>
            <InputLabel>Trình độ</InputLabel>
            <Select
              value={formData.level}
              label="Trình độ"
              onChange={(e) =>
                setFormData((p) => ({ ...p, level: e.target.value as VocabularySetData["level"] }))
              }
            >
              <MenuItem value="N5">N5</MenuItem>
              <MenuItem value="N4">N4</MenuItem>
              <MenuItem value="N3">N3</MenuItem>
              <MenuItem value="N2">N2</MenuItem>
              <MenuItem value="N1">N1</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={formData.isCommunity ?? false}
                onChange={(e) => setFormData((p) => ({ ...p, isCommunity: e.target.checked }))}
              />
            }
            label="Chia sẻ với cộng đồng"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isPending}>
            Hủy
          </Button>
          <Button type="submit" variant="contained" disabled={isPending || !formData.title.trim()}>
            {isPending ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
