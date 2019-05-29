import { host, mockQuest, mockTask } from '../../utilities';
import { fetchDeleteQuest } from '../fetchDeleteQuest';

describe('fetchDeleteQuest', () => {
	window.fetch = jest.fn().mockImplementation(() => {
		return Promise.resolve({
			ok: true,
			json: () => Promise.resolve('Quest succesfully deleted')
		});
	});

<<<<<<< HEAD
  it("should call fetch with the correct params", () => {
  const url = `${host}quests/1234`;
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
=======
	it('should call fetch with the correct params', () => {
		const url = `${host}/quests/1234`;
		const options = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		};
>>>>>>> master

		fetchDeleteQuest(1234);
		expect(fetch).toHaveBeenCalledWith(url, options);
	});

<<<<<<< HEAD
  it("should return a success message", async () => {
    const response = await fetchDeleteNote(1234);
    const result = await response.json();
    expect(result).toEqual('Note succesfully deleted');
  });
=======
	it('should return the updated quest', async () => {
		const result = await fetchDeleteQuest(1234);
		expect(result).toEqual('Quest succesfully deleted');
	});
>>>>>>> master

	it('should throw an error if fetch fails', async () => {
		window.fetch = jest.fn().mockImplementation(() => {
			return Promise.resolve({ ok: false });
		});

		try {
			await fetchDeleteQuest(1234);
		} catch (error) {
			expect(error.message).toEqual('Failed to delete quest');
		}
	});
});
