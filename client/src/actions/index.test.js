import * as actions from './index';
import { mockNote } from '../api/utilities';

describe('Action Creators', () => {
  it('should return a STORE_QUESTS action', () => {
    const result = actions.storeQuests([mockNote, mockNote]);
    const expected = {
      type: 'STORE_QUESTS',
      payload: {
        quests: [mockNote, mockNote]
      }
    }

    expect(result).toEqual(expected);
  });

  it('should return an ADD_QUEST action', () => {
    const result = actions.addQuest(mockNote);
    const expected = {
      type: 'ADD_QUEST',
      payload: {
        quest: mockNote
      }
    }
    expect(result).toEqual(expected);
  });

  it('should return an EDIT_QUEST action', () => {
    const result = actions.editQuest(mockNote);
    const expected = {
      type: 'EDIT_QUEST',
      payload: {
        quest: mockNote
      }
    }
    expect(result).toEqual(expected);
  });

  it('should return a DELETE_QUEST action', () => {
    const result = actions.deleteQuest(1);
    const expected = {
      type: "DELETE_QUEST",
      payload: {
        id: 1
      }
    }
    expect(result).toEqual(expected);
  });

  it('should return a SHOW_POPUP action', () => {
    const result = actions.showPopup(true, 1, 'delete');
    const expected = {
      type: "SHOW_POPUP",
      payload: {
        bool: true,
        id: 1,
        type: 'delete'
      }
    }
    expect(result).toEqual(expected);
  });
});