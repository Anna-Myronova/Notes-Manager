import db from "../../db.js";
import { Note } from "../../typeNote.js";

export const getAll = async (): Promise<Note[]> => {
  const result = await db.query("SELECT * FROM notes ORDER BY created_at DESC");
  return result.rows;
};

export const create = async (title: string): Promise<Note[]> => {
  const result = await db.query('INSERT INTO notes (title) VALUES ($1) RETURNING *', [title]);
  return result.rows[0];
}