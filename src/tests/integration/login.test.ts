import request from "supertest";
import app from "../../app";
import { pool } from "../../db";
import * as userModel from "../../notes/models/userModel";
import bcrypt from "bcrypt";

beforeEach(async () => {
  const { rows } = await pool.query('SELECT current_database()');
  console.log("Currently connected to DB:", rows[0].current_database);
  await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
});

afterAll(async () => {
  await pool.end();
});

describe("POST /api/login", () => {
  it("should return token if login is successful", async () => {
    const email = "test@example.com";
    const password = "testpassword";

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(email, hashedPassword);

    const response = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com", password: "testpassword" });

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should fail if password is wrong", async () => {
    const email = "test@example.com";
    const password = "testpassword";
    const wrongPassword = "wrongpassword";

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(email, hashedPassword); 
    
    const response = await request(app).post("/api/login").send({ email: "test@example.com", password: "wrongpassword"});

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/not correct/i)
  });
});
