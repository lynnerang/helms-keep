import { host, mockQuest } from '../../utilities';
import { fetchEditQuest } from '../fetchEditQuest';

describe('fetchEditQuest', () => {
	window.fetch = jest.fn().mockImplementation(() => {
		return Promise.resolve({
			ok: true,
			json: () => Promise.resolve(mockQuest)
		});
	});

<<<<<<< HEAD
  it('should call fetch with the correct params', () => {
    const url = `${host}quests/${mockNote.id}`;
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockNote)
    }
=======
	it('should call fetch with the correct params', () => {
		const url = `${host}/quests/${mockQuest.id}`;
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(mockQuest)
		};
>>>>>>> master

		fetchEditQuest(mockQuest);
		expect(fetch).toHaveBeenCalledWith(url, options);
	});

	it('should return the updated quest', async () => {
		const result = await fetchEditQuest(mockQuest);
		expect(result).toEqual(mockQuest);
	});

	it('should throw an error if fetch fails', async () => {
		window.fetch = jest.fn().mockImplementation(() => {
			return Promise.resolve({ ok: false });
		});

		try {
			await fetchEditQuest(mockQuest);
		} catch (error) {
			expect(error.message).toEqual('Failed to edit quest');
		}
	});
});
