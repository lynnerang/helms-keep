export const popupReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_POPUP':
      return { ...action.payload };
    default: 
      return state;
  }
}