import request from "supertest";
import app from "../../app";
import { pool } from "../../dbTest";

beforeEach(async () => {
  await pool.query("DELETE FROM users");
});

afterAll(async () => {
  await pool.end();
});

describe("POST /api/register", () => {
  it("should register a new user", async () => {
    const response = await request(app)
    .post("/api/register")
    .send({
      email: "test@example.com",
      password: "testpassword",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("newUser");
    expect(response.body.newUser).toHaveProperty("id");
    expect(response.body.newUser.email).toBe("test@example.com");
  });
});
