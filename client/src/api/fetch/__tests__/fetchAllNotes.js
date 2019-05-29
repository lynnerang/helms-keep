import { host, mockQuest } from '../../utilities';
import { fetchAllQuests } from '../fetchAllQuests';

describe('fetchAllQuests', () => {
	window.fetch = jest.fn().mockImplementation(() => {
		return Promise.resolve({
			ok: true,
			json: () => Promise.resolve([ mockQuest, mockQuest ])
		});
	});

<<<<<<< HEAD
  it("should call fetch with the correct params", () => {
    const url = `${host}quests`;
=======
	it('should call fetch with the correct params', () => {
		const url = `${host}/quests`;
>>>>>>> master

		fetchAllQuests();
		expect(fetch).toHaveBeenCalledWith(url);
	});

	it('should return an array of quests', async () => {
		const result = await fetchAllQuests();
		expect(result).toEqual([ mockQuest, mockQuest ]);
	});

	it('should throw an error if fetch fails', async () => {
		window.fetch = jest.fn().mockImplementation(() => {
			return Promise.resolve({ ok: false });
		});

<<<<<<< HEAD
    try {
      await fetchAllNotes();
    } catch (error) {
      expect(error.message).toEqual("Failed to get quests");
    }
  });
=======
		try {
			await fetchAllQuests();
		} catch (error) {
			expect(error.message).toEqual('Failed to get quests');
		}
	});
>>>>>>> master
});
