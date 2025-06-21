import { error } from 'console';
import request from "supertest";
import app from "../../app";
import { pool } from "../../db";

let token: string = "";
let createdNoteId: number = 0;

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

  createdNoteId = noteResponse.body.id;
});

afterAll(async () => {
  await pool.end();
});

describe("PATCH /api/notes/:id", () => {
  it("should show a note when authenticated", async () => {
    const response = await request(app)
      .patch(`/api/notes/${createdNoteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Edited note" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(createdNoteId);
    expect(response.body.title).toBe("Edited note");

    console.log(response);
  });

  it("should fail without authentication", async () => {
    const response = await request(app).patch(`/api/notes/${createdNoteId}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/unauthorized/i);
  });

  it("should fail if id doesn't exist", async () => {
    const response = await request(app)
      .patch(`/api/notes/${createdNoteId + 1}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Edited note" });

    expect(response.status).toBe(404);
    expect(response.body.error).toMatch(/not found/i);
  });
});
