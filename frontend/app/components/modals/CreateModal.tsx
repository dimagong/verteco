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
interface CreateModalProps {
  open: boolean;
  onClose: () => void;
  setOpenCreate: (open: boolean) => void;
  handleCreate: (e: React.FormEvent) => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openCreate: boolean;
  title: string;
  content: string;
  isPending: boolean;
}

export const CreateModal = ({
  open,
  onClose,
  setOpenCreate,
  handleCreate,
  openCreate,
  title,
  content,
  onChangeTitle,
  onChangeContent,
  isPending,
}: CreateModalProps) => {
  return (
    <Dialog open={openCreate} onClose={onClose}>
      <form onSubmit={handleCreate}>
        <DialogTitle>Create Note</DialogTitle>
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
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
