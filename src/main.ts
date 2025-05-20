import express from "express";
import routes from "./routes";
import pool from "./db";

const app = express();
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

async function checkConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Підключено до PostgreSQL. Час сервера:", res.rows[0].now);
    app.listen(PORT, () => {
      console.log(`
The server is working on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

checkConnection();

export default app;