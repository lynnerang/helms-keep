
import { combineReducers } from "redux";
import { questsReducer } from "./questsReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  quests: questsReducer,
  user: userReducer
});

export default rootReducer;
