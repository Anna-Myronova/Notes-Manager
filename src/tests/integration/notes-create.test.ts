import request from "supertest";
import app from "../../app";
import { pool } from "../../db";

let token: string = "";

beforeEach(async () => {
  const { rows } = await pool.query("SELECT current_database()");
  console.log("Currently connected to DB:", rows[0].current_database);
  await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

  const response = await request(app)
    .post("/api/register")
    .send({ email: "test@example.com", password: "testpassword" });

  token = response.body.token;
});

afterAll(async () => {
  await pool.end();
});

describe("POST /api/notes", () => {
  it("should create a note when authenticated", async () => {
    const response = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Note for test",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Note for test");
  });
  it("should fail without authentication", async () => {
    const response = await request(app)
      .post("/api/notes")
      .send({ title: "This should fail" });

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/unauthorized/i);
  });
});
