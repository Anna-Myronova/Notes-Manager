import { pool } from "../../db";
import { deleteNote } from "../../notes/models/noteModel";

jest.mock("../../db");

describe("delete Note (unit test)", () => {
  it("deletes note and returns it", async () => {
    const mockDeletedNote = {
      id: 1,
      userId: 123,
    };

    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [mockDeletedNote],
    });

    const result = await deleteNote(1, 123);

    expect(pool.query).toHaveBeenCalledWith(
      "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *",
      [1, 123]
    );

    expect(result).toEqual(mockDeletedNote);
  });
});
