import { host } from '../utilities';

export const fetchAllNotes = () => {
  return fetch(`${host}/notes`)
    .then(response => {
      if (!response.ok) {
        throw Error('Failed to get notes')
      } else {
        return response.json();
      }
    })
}