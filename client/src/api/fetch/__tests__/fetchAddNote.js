import { host, mockQuest, mockTask } from '../../utilities';
import { fetchAddQuest } from '../fetchAddQuest';

<<<<<<< HEAD
describe("fetchAddNote", () => {
  global.Date.now = jest.fn().mockImplementation(() => 1)
  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockNote)
    });
  });

  it("should call fetch with the correct params", () => {
    const url = `${host}/notes`;
    const body = { id: Date.now(), title: 'My First Quest', tasks: [mockTask, mockTask] };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    };
=======
describe('fetchAddQuest', () => {
	window.fetch = jest.fn().mockImplementation(() => {
		return Promise.resolve({
			ok: true,
			json: () => Promise.resolve(mockQuest)
		});
	});

	it('should call fetch with the correct params', () => {
		const url = `${host}/quests`;
		const body = { id: new Date(), title: 'My First Quest', tasks: [ mockTask, mockTask ] };
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		};
>>>>>>> master

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
