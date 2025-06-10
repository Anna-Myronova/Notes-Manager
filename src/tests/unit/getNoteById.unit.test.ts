import { getAll, getNoteById } from "../../notes/models/noteModel";
import { pool } from "../../db";

jest.mock("../../db");

describe("getAll (unit test)", () => {
  it("returns all notes for a user", async () => {
    const mockNote = {
      id: 1,
      userId: 123,
    };

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockNote] });

    const result = await getNoteById(1, 123);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM notes WHERE id = $1 AND user_id = $2",
      [1, 123]
    );

    expect(result).toEqual(mockNote);
  });
});
