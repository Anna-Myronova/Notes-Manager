import { edit } from "../../notes/models/noteModel";
import { pool } from "../../../src/db";

jest.mock("../../../src/db");

describe("editNote (unit test)", () => {
  it("updates a note and returns it", async () => {
    const mockUpdatedNote = {
      id: 1,
      title: "Updated title",
      userId: 123,
    };

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockUpdatedNote] });

    const result = await edit(1, "Updated Title", 123);

    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE notes SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
      ["Updated Title", 1, 123]
    );

    expect(result).toEqual(mockUpdatedNote);
  });
});