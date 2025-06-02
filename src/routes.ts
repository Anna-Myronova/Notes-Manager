import { Router } from "express";
import { getNotes, createNote, deleteNoteById, editNote, getNoteById } from "./notes/controllers/noteController";
import { login, register } from "./notes/controllers/authController";
import { deleteUserById, getUserById } from "./notes/controllers/userController";
import { authMiddleware } from "./middlewareAuth";

const router = Router();

router.get("/notes", authMiddleware, getNotes);
router.post("/notes", authMiddleware, createNote);
router.delete("/notes/:id", authMiddleware, deleteNoteById);
router.patch("/notes/:id", authMiddleware, editNote);
router.get("/notes/:id", authMiddleware, getNoteById);

router.post("/register", register);
router.delete("/user/:id", deleteUserById);
router.get("/user/:id", getUserById);
router.post("/login", login);

export default router;