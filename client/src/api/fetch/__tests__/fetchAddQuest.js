import { host, mockQuest, mockTask } from '../../utilities';
import { fetchAddQuest } from '../fetchAddQuest';
import shortid from "shortid";

jest.mock("shortid");

describe('fetchAddQuest', () => {
	shortid.generate.mockImplementation(() => 1);
	window.fetch = jest.fn().mockImplementation(() => {
		return Promise.resolve({
			ok: true,
			json: () => Promise.resolve(mockQuest)
		});
	});

	it('should call fetch with the correct params', () => {
		const url = `${host}quests`;
		const body = { id: 1, color: 'green', title: 'My First Quest', challenges: [ mockTask, mockTask ] };
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		};

		fetchAddQuest('My First Quest', [ mockTask, mockTask ]);
		expect(fetch).toHaveBeenCalledWith(url, options);
	});

	it('should return the updated quest', async () => {
		const result = await fetchAddQuest([ mockTask, mockTask ]);
		expect(result).toEqual(mockQuest);
	});

	it('should throw an error if fetch fails', async () => {
		window.fetch = jest.fn().mockImplementation(() => {
			return Promise.resolve({ ok: false });
		});

		try {
			await fetchAddQuest(mockQuest);
		} catch (error) {
			expect(error.message).toEqual('Failed to add quest');
		}
	});
});
