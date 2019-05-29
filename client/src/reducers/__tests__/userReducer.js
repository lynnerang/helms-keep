import { userReducer } from "../userReducer";
import * as actions from '../../actions';

describe('userReducer', () => {
  let state;

  beforeEach(() => {
    state = { exp: 0, lvl: 1, nextLvl: 100, name: 'Jacob' };
  });

  it('should return default state', () => {
    const result = userReducer(undefined, {});
    expect(result).toEqual(state);
  });

  it('should return state with updated experience', () => {
    const expected = Object.assign(state, { exp: 25 })
    const result = userReducer(undefined, actions.addExp(25));
    expect(result).toEqual(expected);
  });

  it('should return state with updated lvl', () => {
    const expected = Object.assign(state, { lvl: 2 })
    const result = userReducer(undefined, actions.addLvl(2));
    expect(result).toEqual(expected);
  });

  it('should return state with updated nextLvl', () => {
    const expected = Object.assign(state, { nextLvl: 200 })
    const result = userReducer(undefined, actions.addNextLvl(200));
    expect(result).toEqual(expected);
  });
});