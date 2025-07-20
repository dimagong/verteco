"use server";

import axios from "axios";

const API_URL = "http://localhost:4000/notes";

export async function fetchNotes() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function createNote(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");
  await axios.post(API_URL, { title, content });
}

export async function updateNote(formData: FormData) {
  const id = formData.get("id");
  const title = formData.get("title");
  const content = formData.get("content");
  await axios.put(`${API_URL}/${id}`, { title, content });
}

export async function deleteNote(formData: FormData) {
  const id = formData.get("id");
  await axios.delete(`${API_URL}/${id}`);
}
