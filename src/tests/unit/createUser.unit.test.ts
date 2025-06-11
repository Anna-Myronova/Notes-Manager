import { createUser } from "../../notes/models/userModel";
import { pool } from "../../db";

jest.mock("../../db");

describe("createUser (unit test)", () => {
  it("creates user and returns it", async () => {
    const mockUser = {
      email: "user1@gmail.com",
      hashedPassword: "$2b$10$abcdefghijklmnopqrstuv",
    };

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUser] });

    const result = await createUser(
      "user1@gmail.com",
      "$2b$10$abcdefghijklmnopqrstuv"
    );

    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      ["user1@gmail.com", "$2b$10$abcdefghijklmnopqrstuv"]
    );

    expect(result).toEqual(mockUser);
  });
});
