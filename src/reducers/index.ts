import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  user: userReducer,
  chats: chatReducer,
  admin: adminReducer,
  
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
