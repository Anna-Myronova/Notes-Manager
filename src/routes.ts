import { Router } from "express";
import { getNotes, createNote, deleteNoteById, editNote, getNoteById } from "./notes/controllers/noteController";
import { register } from "./notes/controllers/auth" ;

const router = Router();

router.get("/notes", getNotes);
router.post("/notes", createNote);
router.delete("/notes/:id", deleteNoteById);
router.patch("/notes/:id", editNote);
router.get("/notes/:id", getNoteById);
router.post("/register", register);

export default router;