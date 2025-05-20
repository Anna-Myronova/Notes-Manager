import { Pool } from "pg";
import "dotenv/config";

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function checkConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
      console.log("Підключено до PostgreSQL. Час сервера:", res.rows[0].now);
    } catch (err) {
    console.error("Помилка підключення до БД:", err);
  }
}

checkConnection();

export default pool;