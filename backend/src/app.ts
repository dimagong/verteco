import express from "express";
import cors from "cors";
import { Sequelize } from "sequelize";
import { initNoteModel, Note } from "./models/note";

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

initNoteModel(sequelize);

sequelize.sync();


app.get("/notes", async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({ title, content, createdAt: new Date() });
  res.json(note);
});

app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const note = await Note.findByPk(id);
  if (!note) return res.status(404).json({ error: "Not found" });
  note.title = title;
  note.content = content;
  await note.save();
  res.json(note);
});

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const note = await Note.findByPk(id);
  if (!note) return res.status(404).json({ error: "Not found" });
  await note.destroy();
  res.json({ success: true });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
