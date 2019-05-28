import { questsReducer } from "../questsReducer";
import { mockNote, mockTask } from '../../api/utilities';
import * as actions from '../../actions';

describe('questReducer', () => {
  let mockState, mockNote2;

  beforeEach(() => {
    mockState = [mockNote, mockNote2];
    mockNote2 = {
      id: 'Z9',
      title: 'Quest to Test',
      challenges: [mockTask]
    }
  });

  it('should return default state', () => {
    const expected = [];
    const result = questsReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return an array of existing quests with the new quest added', () => {
    const expected = [ ...mockState, mockNote2];
    const result = questsReducer(mockState, actions.addQuest(mockNote2));
    expect(result).toEqual(expected);
  });

  it('should return an array of quests with the correct quest replaced', () => {
    const mockNewNote = Object.assign(mockNote2, { title: 'Edited Quest'});
    const expected = [mockNote, mockNewNote];
    const result = questsReducer(mockState, actions.editQuest(mockNewNote));
    expect(result).toEqual(expected);
  });

  it('should return an array of quests with the correct quest deleted', () => {
    const expected = [mockNote];
    const result = questsReducer(mockState, actions.deleteQuest('Z9'));
    expect(result).toEqual(expected);
  });
});