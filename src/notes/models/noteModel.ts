import db from "../../db.js";
import { Note } from "../../types/typeNote.js";

export const getAll = async (userId: number): Promise<Note[]> => {
  const result = await db.query("SELECT * FROM notes WHERE user_id = $1", [userId]);
  return result.rows;
};

export const create = async (title: string, userId: number): Promise<Note> => {
  const result = await db.query(
    "INSERT INTO notes (title, user_id) VALUES ($1, $2) RETURNING *",
    [title, userId]
  );
  return result.rows[0];
};

export const deleteNote = async (id: number, userId: number) => {
  const result = await db.query("DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *", [
    id, userId
  ]);
  return result.rows[0];
};

export const edit = async (id: number, newTitle: string, userId: number) => {
  const result = await db.query(
    "UPDATE notes SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
    [newTitle, id, userId]
  );
  return result.rows[0];
};

export const getNoteById = async (id: number, userId: number) => {
  const result = await db.query("SELECT * FROM notes WHERE id = $1 AND user_id = $2", [id, userId]);
  return result.rows[0];
};