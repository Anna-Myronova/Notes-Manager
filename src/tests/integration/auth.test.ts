import request from "supertest";
import app from "../../app";
import { pool } from "../../db";

beforeEach(async () => {
  const { rows } = await pool.query("SELECT current_database()");
  console.log("🔍 Currently connected to DB:", rows[0].current_database);
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
    
  console.log(response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("newUser");
    expect(response.body.newUser).toHaveProperty("id");
    expect(response.body.newUser.email).toBe("test@example.com");
  });
});
