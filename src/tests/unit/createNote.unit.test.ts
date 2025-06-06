import { create } from "../../notes/models/noteModel";
import { pool } from "../../../src/db";

jest.mock("../../../src/db");

describe("createaNote (unit test)", () => {
  it("creates a note and returns it", async () => {
    const mockNote = {
      title: "test createNote",
      userId: 123,
    };

    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockNote] });

    const result = await create("test createNote", 123);

    expect(pool.query).toHaveBeenCalledWith("INSERT INTO notes (title, user_id) VALUES ($1, $2) RETURNING *",
      ["test createNote", 123]);

      expect(result).toEqual(mockNote);
  });
});