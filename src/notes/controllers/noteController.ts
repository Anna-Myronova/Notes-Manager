import { error, log } from "console";
import * as NoteModel from "../models/noteModel.js";
import { Request, Response } from "express";

export const getNotes = async (req: Request, res: Response) => {
  const notes = await NoteModel.getAll(req.user?.id!);
  res.json(notes);
};

export const createNote = async (req: Request, res: Response) => {
  const { title } = req.body;
  const note = await NoteModel.create(title, req.user?.id!);
  res.json(note);
};

export const deleteNoteById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: "ID is not correct" });
    return;
  }

  const deletedNote = await NoteModel.deleteNote(id, req.user?.id!);

  if (!deletedNote) {
    res.status(404).json({ error: "Note is not found" });
    return;
  }
  res.json({ message: "Note is deleted" });
};

export const editNote = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title } = req.body;

  if (isNaN(id)) {
    res.status(400).json({ error: "ID is not correct" });
    return;
  }

  const editedNote = await NoteModel.edit(id, title, req.user?.id!);

  if (!editedNote) {
    res.status(404).json({ error: "Note is not found" });
    return;
  }
  res.json(editedNote);
};

export const getNoteById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: "ID is not correct" });
    return;
  }

  const note = await NoteModel.getNoteById(id, req.user?.id!);

  if (!note) {
    res.status(404).json({ error: "Note is not found" });
    return;
  }
  res.json(note);
};
