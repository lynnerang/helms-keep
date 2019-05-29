export const userReducer = (state = { exp: 0, level: 0 }, action) => {
  switch (action.type) {
    case "ADD_EXP":
      return { ...action.user, exp: action.user };
    case "ADD_LVL":
      return { ...action.user, level: action.user };
    default:
      return state;
  }
};
