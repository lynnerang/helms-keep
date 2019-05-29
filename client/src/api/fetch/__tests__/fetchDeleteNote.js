import { host, mockQuest, mockTask } from '../../utilities';
import { fetchDeleteQuest } from '../fetchDeleteQuest';

describe('fetchDeleteQuest', () => {
	window.fetch = jest.fn().mockImplementation(() => {
		return Promise.resolve({
			ok: true,
			json: () => Promise.resolve('Quest succesfully deleted')
		});
	});

	it('should call fetch with the correct params', () => {
		const url = `${host}/quests/1234`;
		const options = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		};

		fetchDeleteQuest(1234);
		expect(fetch).toHaveBeenCalledWith(url, options);
	});

	it('should return the updated quest', async () => {
		const result = await fetchDeleteQuest(1234);
		expect(result).toEqual('Quest succesfully deleted');
	});

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
