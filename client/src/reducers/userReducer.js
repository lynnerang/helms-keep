export const userReducer = (
  state = { exp: 0, lvl: 1, nextLvl: 100, name: 'Jacob' },
  action
) => {
  switch (action.type) {
    case "ADD_EXP":
      return { ...state, exp: action.payload.exp };
    case "ADD_LVL":
      return { ...state, lvl: action.payload.lvl };
    case "ADD_NEXT_LVL":
      return { ...state, nextLvl: action.payload.lvl };
    default:
      return state;
  }
};
