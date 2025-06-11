import { getUserByEmail } from "../../notes/models/userModel";
import { pool } from "../../db";

jest.mock("../../db");

describe("getUserById (unit test)", () => {
  it("returns user", async () => {
    const mockUser = {
      userEmail: "user1@gmail.com",
    };

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUser] });

    const result = await getUserByEmail("user1@gmail.com");

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE email = $1",
      ["user1@gmail.com"]
    );

    expect(result).toEqual(mockUser);
  });
});
