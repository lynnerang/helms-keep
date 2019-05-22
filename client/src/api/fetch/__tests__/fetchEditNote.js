import { host, mockNote } from '../../utilities';
import { fetchEditNote } from '../fetchEditNote'

describe('fetchEditNote', () => {
  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockNote)
    })
  });

  it('should call fetch with the correct params', () => {
    const url = `${host}/notes/${mockNote.id}`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockNote)
    }

    fetchEditNote(mockNote);
    expect(fetch).toHaveBeenCalledWith(url, options);
  });

  it('should return the updated note', async () => {
    const result = await fetchEditNote(mockNote);
    expect(result).toEqual(mockNote);
  });

  it('should throw an error if fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false })
    });

    try {
      await fetchEditNote(mockNote);
    } catch(error) {
      expect(error.message).toEqual('Failed to edit note')
    }
  });
});

