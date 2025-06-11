import { getUserById } from "../../notes/models/userModel";
import { pool } from "../../db";

jest.mock("../../db");

describe("getUserById (unit test)", () => {
  it("returns user", async () => {
    const mockUser = {
      userId: 123,
    };

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUser] });

    const result = await getUserById(123);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE id = $1",
      [123]
    );

    expect(result).toEqual(mockUser);
  });
});
