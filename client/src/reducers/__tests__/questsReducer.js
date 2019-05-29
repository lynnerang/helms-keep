import { questsReducer } from "../questsReducer";
import { mockQuest, mockTask } from '../../api/utilities';
import * as actions from '../../actions';

describe('questReducer', () => {
  let mockState, mockQuest2;

  beforeEach(() => {
    mockState = [mockQuest, mockQuest2];
    mockQuest2 = {
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
    const expected = [ ...mockState, mockQuest2];
    const result = questsReducer(mockState, actions.addQuest(mockQuest2));
    expect(result).toEqual(expected);
  });

  it('should return an array of quests with the correct quest replaced', () => {
    const mockNewNote = Object.assign(mockQuest2, { title: 'Edited Quest'});
    const expected = [mockQuest, mockNewNote];
    const result = questsReducer(mockState, actions.editQuest(mockNewNote));
    expect(result).toEqual(expected);
  });

  it('should return an array of quests with the correct quest deleted', () => {
    const expected = [mockQuest];
    const result = questsReducer(mockState, actions.deleteQuest('Z9'));
    expect(result).toEqual(expected);
  });
});