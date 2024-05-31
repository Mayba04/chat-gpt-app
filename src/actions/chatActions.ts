import axios, { AxiosResponse } from 'axios';
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
export const sendNewMessage = (prompt: string) => {
  return async (dispatch: Dispatch<ChatActions>, getState: () => any) => {
    try {
      const userId = getState().user.user.Id;
      console.log(1);
      console.log("sendNewMessage: Sending message", { userId, prompt });

      const response: AxiosResponse<any, any> = await axios.post(
        //`https://localhost:7004/api/Chat/send`, //3.5 GPT
         `https://localhost:7004/api/Chat/ask`,
        JSON.stringify(prompt),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const { response: responseData } = response.data;
      const [chatSessionStr, chatIdStr, messageStr] = responseData.split(',').map((item: string) => item.trim());
      const chatSessionId = parseInt(chatSessionStr.split(':')[1].trim());
      const chatId = chatIdStr.split(':')[1].trim();
      const message = messageStr.split(':')[1].trim();
      console.log("response",  response.data)
      console.log("ChatSession:", chatSessionId);
      console.log("Chat ID:", chatId);
      console.log("Message:", message);

      dispatch({ type: ChatActionTypes.SEND_MESSAGE_SUCCESS, payload: response.data });
      dispatch(fetchUserChats(userId) as any);
      dispatch(selectChat({ id: chatSessionId, name: chatId }) as any); 
      dispatch(fetchMessages(chatSessionId) as any);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error sending message:', error.response?.data);
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
      console.log(2);
      console.log("continueChat: Continuing chat", messageData);
      const response = await axios.post(
        // `https://localhost:7004/api/Chat/continue`, 
        `https://localhost:7004/api/Chat/continue/ask`, 
        messageData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("continueChat: Response received", response.data);

      let botResponse = response.data.response;
      if (botResponse.startsWith("Message: ")) {
        botResponse = botResponse.slice(9);
      }

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

export const clearMessages = () => ({
  type: ChatActionTypes.CLEAR_MESSAGES,
});


export const fetchAdminComment = (messageId: number) => {
  return async (dispatch: Dispatch<ChatActions>) => {
    try {
      const response = await axios.get(`https://localhost:7004/api/AdminComment/${messageId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch({ type: ChatActionTypes.FETCH_ADMIN_COMMENT_SUCCESS, payload: { messageId, comments: response.data } });
    } catch (error) {
      console.error('Error fetching admin comment:', error);
    }
  };
};

export const clearMessagesAndComments = (): ChatActions => ({
  type: ChatActionTypes.CLEAR_MESSAGES_AND_COMMENTS,
});