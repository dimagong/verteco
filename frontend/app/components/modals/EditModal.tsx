"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { TextField } from "@mui/material";
interface EditModalProps {
  openEdit: boolean;
  onClose: () => void;
  handleEdit: (e: React.FormEvent) => void;
  setOpenEdit: (open: boolean) => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  content: string;
  isPending: boolean;
}

export const EditModal = ({
  openEdit,
  onClose,
  handleEdit,
  title,
  content,
  onChangeTitle,
  onChangeContent,
  setOpenEdit,
  isPending,
}: EditModalProps) => {
  return (
    <Dialog open={openEdit} onClose={onClose}>
      <form onSubmit={handleEdit}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={onChangeTitle}
            required
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            value={content}
            onChange={onChangeContent}
            required
            multiline
            minRows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
