import { Router } from "express";
import { getNotes, createNote, deleteNoteById, editNote, getNoteById } from "./notes/controllers/noteController";

const router = Router();

router.get("/notes", getNotes);
router.post("/notes", createNote);
router.delete("/notes/:id", deleteNoteById);
router.patch("/notes/:id", editNote);
router.get("/notes/:id", getNoteById);

export default router;