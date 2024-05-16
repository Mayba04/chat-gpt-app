import axios from 'axios';
import { Dispatch } from 'redux';
import { ChatActionTypes, ChatActions } from './types';

export const fetchUserChats = (userId: number) => {
  return async (dispatch: Dispatch<ChatActions>) => {
    dispatch({ type: ChatActionTypes.FETCH_USER_CHATS_REQUEST });
    try {
      const response = await axios.get(`https://localhost:7004/api/Chat/user/${userId}/chats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch({ type: ChatActionTypes.FETCH_USER_CHATS_SUCCESS, payload: response.data });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching messages:', error);
        dispatch({ type: ChatActionTypes.FETCH_USER_CHATS_FAILURE, payload: error.message });
      }
    }
  };
};

export const deleteUserChat = (chatId: number) => {
  return async (dispatch: Dispatch<ChatActions>, getState: () => any) => {
    try {
      await axios.delete(`https://localhost:7004/api/Chat/${chatId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch({ type: ChatActionTypes.DELETE_USER_CHAT, payload: chatId });

      const { user } = getState();
      if (user.user) {
        dispatch(fetchUserChats(user.user.Id) as any);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };
};

export const sendNewMessage = (messageData: { userId: number, prompt: string }) => {
  return async (dispatch: Dispatch<ChatActions>) => {
    try {
      const response = await axios.post(`https://localhost:7004/api/Chat/send`, messageData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch({ type: ChatActionTypes.SEND_MESSAGE_SUCCESS, payload: response.data });
      dispatch(fetchUserChats(messageData.userId) as any);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error sending message:', error);
        dispatch({ type: ChatActionTypes.SEND_MESSAGE_FAILURE, payload: error.message });
      } else {
        console.error('Unexpected error:', error);
        dispatch({ type: ChatActionTypes.SEND_MESSAGE_FAILURE, payload: 'Unexpected error' });
      }
    }
  };
};

export const continueChat = (messageData: { chatSessionId: number, prompt: string }) => {
  return async (dispatch: Dispatch<ChatActions>, getState: () => any) => {
    try {
      console.log("continueChat: Continuing chat", messageData);
      const response = await axios.post(`https://localhost:7004/api/Chat/continue`, messageData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("continueChat: Response received", response.data);

      const botResponse = response.data.response; 

      dispatch({ type: ChatActionTypes.SEND_MESSAGE_SUCCESS, payload: { content: botResponse, role: "bot", id: Date.now() } });

      const { user } = getState();
      if (user.user) {
        dispatch(fetchUserChats(user.user.Id) as any);
      }
    } catch (error) {
      console.error('Error continuing chat:', error);
      dispatch({ type: ChatActionTypes.SEND_MESSAGE_FAILURE, payload: 'Unexpected error' });
    }
  };
};


export const fetchMessages = (sessionId: number) => {
  return async (dispatch: Dispatch<ChatActions>) => {
    try {
      const response = await axios.get(`https://localhost:7004/api/Message/session/${sessionId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch({ type: ChatActionTypes.FETCH_MESSAGES_SUCCESS, payload: response.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching messages:', error);
        dispatch({ type: ChatActionTypes.FETCH_MESSAGES_FAILURE, payload: error.message });
      } else {
        console.error('Unexpected error:', error);
        dispatch({ type: ChatActionTypes.FETCH_MESSAGES_FAILURE, payload: 'Unexpected error' });
      }
    }
  };
};

export const selectChat = (chat: any) => {
  return {
    type: ChatActionTypes.SELECT_CHAT,
    payload: chat,
  };
};
