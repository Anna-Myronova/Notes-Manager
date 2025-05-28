import db from "../../db.js";
import { User } from './../../types/typeUser.js'

export const createUser = async (email: string, hashedPassword: string): Promise<User> => {
  const result = await db.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, hashedPassword]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<User> => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
}