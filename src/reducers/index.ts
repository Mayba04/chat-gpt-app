import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  user: userReducer,
  chats: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
