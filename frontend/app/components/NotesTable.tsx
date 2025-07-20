"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { createNote, updateNote, deleteNote } from "../actions/noteActions";
import styles from "../page.module.css";
import { CreateModal } from "./modals/CreateModal";
import axios from "axios";
import { EditModal } from "./modals/EditModal";
import { DeleteModal } from "./modals/DeleteModal";

type NoteTableType = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

const API_URL = "http://localhost:4000/notes";

export default function NoteTable() {
  const [notes, setNotes] = useState<NoteTableType[]>([]);
  const [isPending, startTransition] = useTransition();

  // Modal state
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<NoteTableType | null>(null);

  const fetchNotes = async () => {
    const res = await axios.get(API_URL);
    setNotes(res.data);
  };

  const handleOpenCreate = () => {
    setTitle("");
    setContent("");
    setOpenCreate(true);
  };

  const handleOpenEdit = (note: NoteTableType) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setOpenEdit(true);
    fetchNotes();
  };

  const handleOpenDelete = (note: NoteTableType) => {
    setSelectedNote(note);
    setOpenDelete(true);
    fetchNotes();
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    startTransition(() => {
      createNote(formData);
      setOpenCreate(false);
      fetchNotes();
    });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNote) return;
    const formData = new FormData();
    formData.append("id", selectedNote.id.toString());
    formData.append("title", title);
    formData.append("content", content);
    startTransition(() => {
      updateNote(formData);
      setOpenEdit(false);
      setSelectedNote(null);
    });
  };

  const handleDelete = () => {
    if (!selectedNote) return;
    const formData = new FormData();
    formData.append("id", selectedNote.id.toString());
    startTransition(() => {
      deleteNote(formData);
      setOpenDelete(false);
      setSelectedNote(null);
    });
  };

  useEffect(() => {
    fetchNotes();
  }, [notes]);

  return (
    <div className={styles.main}>
      <h1>Notes</h1>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleOpenCreate}
        sx={{ mb: 2 }}
      >
        Create Note
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note.id}>
                <TableCell>{note.title}</TableCell>
                <TableCell>{note.content}</TableCell>
                <TableCell>{note.createdAt}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenEdit(note)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleOpenDelete(note)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        setOpenCreate={setOpenCreate}
        handleCreate={handleCreate}
        openCreate={openCreate}
        title={title}
        content={content}
        onChangeTitle={(e) => setTitle(e.target.value)}
        onChangeContent={(e) => setContent(e.target.value)}
        isPending={isPending}
      />
      <EditModal
        openEdit={openEdit}
        onClose={() => setOpenEdit(false)}
        handleEdit={handleEdit}
        setOpenEdit={() => setOpenEdit(false)}
        onChangeTitle={(e) => setTitle(e.target.value)}
        onChangeContent={(e) => setContent(e.target.value)}
        isPending={isPending}
        title={title}
        content={content}
      />

      <DeleteModal
        openDelete={openDelete}
        onClose={() => setOpenDelete(false)}
        selectedTitle={selectedNote?.title ?? ""}
        setOpenDelete={() => setOpenDelete(false)}
        handleDelete={handleDelete}
        isPending={isPending}
      />
    </div>
  );
}
