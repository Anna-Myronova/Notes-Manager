import { getAll } from "../../notes/models/noteModel";
import { pool } from "../../db";

jest.mock("../../db");

describe("getAll (unit test)", () => {
  it("returns all notes for a user", async () => {
    const mockNotes = [
      { id: 1, title: "Note 1", userId: 123 },
      { id: 2, title: "Note 2", userId: 123 },
    ];

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockNotes });

    const result = await getAll(123);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM notes WHERE user_id = $1",
      [123]
    );

    expect(result).toEqual(mockNotes);
  });
});