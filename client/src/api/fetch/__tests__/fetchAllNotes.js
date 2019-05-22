import { host, mockNote } from "../../utilities";
import { fetchAllNotes } from "../fetchAllNotes";

describe("fetchAllNotes", () => {
  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([mockNote, mockNote])
    });
  });

  it("should call fetch with the correct params", () => {
    const url = `${host}/notes`;

    fetchAllNotes();
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it("should return an array of notes", async () => {
    const result = await fetchAllNotes();
    expect(result).toEqual([mockNote, mockNote]);
  });

  it("should throw an error if fetch fails", async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false });
    });

    try {
      await fetchAllNotes();
    } catch (error) {
      expect(error.message).toEqual("Failed to get notes");
    }
  });
});
