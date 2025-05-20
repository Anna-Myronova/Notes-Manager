import * as NoteModel from '../models/noteModel.js';
import { Request, Response } from 'express';

export const getNotes = async (req: Request, res: Response) => {
  const notes = await NoteModel.getAll();
  res.json(notes);
};

export const createNote = async (req: Request, res: Response) => {
   const { title } = req.body;
  const note = await NoteModel.create(title);
  res.json(note);
}