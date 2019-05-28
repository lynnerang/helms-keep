import { popupReducer } from "../popupReducer";
import { showPopup } from '../../actions/index'

describe('popupReducer', () => {
  it('should return state on default', () => {
    const expected = {};
    const result = popupReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return the popup object', () => {
    const expected = { bool: true, id: 1, type: "delete" };
    const result = popupReducer(undefined, showPopup(true, 1, 'delete'));
    expect(result).toEqual(expected);
  })
});