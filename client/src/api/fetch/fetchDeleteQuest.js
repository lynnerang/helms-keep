import { host } from '../utilities';

export const fetchDeleteQuest = id => {
	const url = `${host}quests/${id}`;
	const init = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	};
	return fetch(url, init).then(response => {
		if (!response.ok) {
			throw Error('Failed to delete quest');
		} else {
			return response;
		}
	});
};
