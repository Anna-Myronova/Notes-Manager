import request from "supertest";
import app from "../../app";
import { pool } from "../../db";

let token: string = "";

beforeEach(async () => {
  const { rows } = await pool.query("SELECT current_database()");
  console.log("Currently connected to DB:", rows[0].current_database);
  await pool.query("TRUNCATE TABLE users, notes RESTART IDENTITY CASCADE");

  const response = await request(app)
    .post("/api/register")
    .send({ email: "test@example.com", password: "testpassword" });

  token = response.body.token;

  const noteResponse = await request(app)
    .post("/api/notes")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "New note" });
});

afterAll(async () => {
  await pool.end();
});

describe("GET /api/notes", () => {
  it("should shows all notes when authenticated", async () => {
    const response = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].title).toBe("New note");

    console.log(response);
  });

  it("should fail without authentication", async () => {
    const response = await request(app).get("/api/notes");

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/unauthorized/i);
  });
});
