import { host } from '../utilities';

export const fetchEditQuest = quest => {
	const url = `${host}quests/${quest.id}`;
	const options = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(quest)
	};
	return fetch(url, options).then(response => {
		if (!response.ok) {
			throw Error('Failed to edit quest');
		} else {
			return response.json();
		}
	});
};
