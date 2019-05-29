import { host } from '../utilities';
import shortid from 'shortid';

export const fetchAddQuest = (title, challenges) => {
	const url = `${host}quests`;
	const body = { id: shortid.generate(), title, challenges };
	console.log(body);
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	};
	return fetch(url, options).then(response => {
		if (!response.ok) {
			throw Error('Failed to add quest');
		} else {
			return response.json();
		}
	});
};
