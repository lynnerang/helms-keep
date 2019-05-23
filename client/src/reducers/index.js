import { combineReducers } from 'redux';
import { questsReducer } from './questsReducer';
import { userReducer } from './userReducer';
import { popupReducer } from './popupReducer';

const rootReducer = combineReducers({
	quests: questsReducer,
	user: userReducer,
	popup: popupReducer
});

export default rootReducer;
