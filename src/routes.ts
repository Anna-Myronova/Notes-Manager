import { Router } from "express";
import { getNotes, createNote, deleteNoteById, editNote, getNoteById } from "./notes/controllers/noteController";
import { login, register } from "./notes/controllers/authController";
import { deleteUserById, getUserById } from "./notes/controllers/userController";

const router = Router();

router.get("/notes", getNotes);
router.post("/notes", createNote);
router.delete("/notes/:id", deleteNoteById);
router.patch("/notes/:id", editNote);
router.get("/notes/:id", getNoteById);

router.post("/register", register);
router.delete("/user/:id", deleteUserById);
router.get("/user/:id", getUserById);
router.post("/login", login);

export default router;