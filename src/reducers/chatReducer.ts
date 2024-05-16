// chatReducer.ts

import { ChatActionTypes, ChatActions } from '../actions/types';

interface ChatState {
  chats: any[];
  loading: boolean;
  error: string | null;
  selectedChat: any | null;
  messages: any[];
}

const initialState: ChatState = {
  chats: [],
  loading: false,
  error: null,
  selectedChat: null,
  messages: [],
};

export const chatReducer = (state = initialState, action: ChatActions): ChatState => {
  switch (action.type) {
    case ChatActionTypes.FETCH_USER_CHATS_REQUEST:
      return { ...state, loading: true, error: null };
    case ChatActionTypes.FETCH_USER_CHATS_SUCCESS:
      return { ...state, loading: false, chats: action.payload };
    case ChatActionTypes.FETCH_USER_CHATS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ChatActionTypes.DELETE_USER_CHAT:
      return { ...state, chats: state.chats.filter(chat => chat.id !== action.payload) };
    case ChatActionTypes.SEND_MESSAGE_SUCCESS:
      return { ...state, messages: [...state.messages, action.payload], loading: false };
    case ChatActionTypes.SEND_MESSAGE_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case ChatActionTypes.SELECT_CHAT:
      return { ...state, selectedChat: action.payload };
    case ChatActionTypes.FETCH_MESSAGES_SUCCESS:
      return { ...state, messages: action.payload };
    case ChatActionTypes.FETCH_MESSAGES_FAILURE:
      return { ...state, error: action.payload };
    case ChatActionTypes.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

export default chatReducer;
