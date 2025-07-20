"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface DeleteModalProps {
  openDelete: boolean;
  onClose: () => void;
  selectedTitle: string;
  setOpenDelete: () => void;
  handleDelete: (e: React.FormEvent) => void;
  isPending: boolean;
}

export const DeleteModal = ({
  openDelete,
  onClose,
  selectedTitle,
  setOpenDelete,
  handleDelete,
  isPending,
}: DeleteModalProps) => {
  return (
    <Dialog open={openDelete} onClose={onClose}>
      <DialogTitle>Delete Note</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the note "{selectedTitle}"?
      </DialogContent>
      <DialogActions>
        <Button onClick={setOpenDelete}>Cancel</Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={isPending}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
