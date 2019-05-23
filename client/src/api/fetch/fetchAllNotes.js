import { host } from '../utilities';

export const fetchAllNotes = () => {
  return fetch(`${host}quests`)
    .then(response => {
      if (!response.ok) {
        throw Error('Failed to get quests')
      } else {
        return response.json();
      }
    })
}