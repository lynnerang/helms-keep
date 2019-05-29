import { userReducer } from "../userReducer";

describe('userReducer', () => {
  it('should return default state', () => {
    const state = { exp: 0, lvl: 1, nextLvl: 100, name: 'Jacob' };
    const result = userReducer(undefined, {});
    expect(result).toEqual(state);
  });
});