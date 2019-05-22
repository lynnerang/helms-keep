import { host, mockNote, mockTask } from "../../utilities";
import { fetchAddNote } from "../fetchAddNote";

describe("fetchAddNote", () => {
  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockNote)
    });
  });

  it("should call fetch with the correct params", () => {
    const url = `${host}/notes`;
    const body = { id: new Date(), title: 'My First Quest', tasks: [mockTask, mockTask] };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    };

    fetchAddNote('My First Quest', [mockTask, mockTask]);
    expect(fetch).toHaveBeenCalledWith(url, options);
  });

  it("should return the updated note", async () => {
    const result = await fetchAddNote([mockTask, mockTask]);
    expect(result).toEqual(mockNote);
  });

  it("should throw an error if fetch fails", async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false });
    });

    try {
      await fetchAddNote(mockNote);
    } catch (error) {
      expect(error.message).toEqual("Failed to add note");
    }
  });
});
