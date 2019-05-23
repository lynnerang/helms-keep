export const popupReducer = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_POPUP':
      return action.payload.bool;
    default: return state;
  }
}