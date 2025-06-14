import { deleteUser } from "../../notes/models/userModel";
import { pool } from "../../db";

jest.mock("../../db");

describe("", () => {
  it("", async () => {
    const mockUser = {
      userId: 123,
    };

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUser] });

    const result = await deleteUser(123);

    expect(pool.query).toHaveBeenCalledWith('DELETE FROM users WHERE id = $1 RETURNING *', [123]);

    expect(result).toEqual(mockUser);
  })
})