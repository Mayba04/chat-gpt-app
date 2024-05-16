export enum UserActionTypes {
  START_REQUEST = 'START_REQUEST',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  LOGOUT_USER = 'LOGOUT_USER',
  FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS',
  RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
}

interface StartRequestAction {
  type: UserActionTypes.START_REQUEST;
}

interface LoginUserSuccessAction {
  type: UserActionTypes.LOGIN_USER_SUCCESS;
  payload: {
    decodedToken: any;
  };
}

interface LoginUserErrorAction {
  type: UserActionTypes.LOGIN_USER_ERROR;
  payload: string;
}

interface ServerErrorAction {
  type: UserActionTypes.SERVER_ERROR;
  payload: string;
}

interface LogoutUserAction {
  type: UserActionTypes.LOGOUT_USER;
}

interface ForgotPasswordSuccessAction {
  type: UserActionTypes.FORGOT_PASSWORD_SUCCESS;
}

interface ResetPasswordSuccessAction {
  type: UserActionTypes.RESET_PASSWORD_SUCCESS;
}

export type UserActions =
  | StartRequestAction
  | LoginUserSuccessAction
  | LoginUserErrorAction
  | ServerErrorAction
  | LogoutUserAction
  | ForgotPasswordSuccessAction
  | ResetPasswordSuccessAction;

  export enum ChatActionTypes {
    FETCH_USER_CHATS_REQUEST = 'FETCH_USER_CHATS_REQUEST',
    FETCH_USER_CHATS_SUCCESS = 'FETCH_USER_CHATS_SUCCESS',
    FETCH_USER_CHATS_FAILURE = 'FETCH_USER_CHATS_FAILURE',
    DELETE_USER_CHAT = 'DELETE_USER_CHAT',
    SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS',
    SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE',
    SELECT_CHAT = 'SELECT_CHAT',
    FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS',
    FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE',
    ADD_MESSAGE = 'ADD_MESSAGE'  
  }
  
  interface FetchUserChatsRequestAction {
    type: ChatActionTypes.FETCH_USER_CHATS_REQUEST;
  }
  
  interface FetchUserChatsSuccessAction {
    type: ChatActionTypes.FETCH_USER_CHATS_SUCCESS;
    payload: any[];
  }
  
  interface FetchUserChatsFailureAction {
    type: ChatActionTypes.FETCH_USER_CHATS_FAILURE;
    payload: string;
  }
  
  interface DeleteUserChatAction {
    type: ChatActionTypes.DELETE_USER_CHAT;
    payload: number;
  }
  
  interface SendMessageSuccessAction {
    type: ChatActionTypes.SEND_MESSAGE_SUCCESS;
    payload: any;
  }
  
  interface SendMessageFailureAction {
    type: ChatActionTypes.SEND_MESSAGE_FAILURE;
    payload: string;
  }
  
  interface SelectChatAction {
    type: ChatActionTypes.SELECT_CHAT;
    payload: any;
  }
  
  interface FetchMessagesSuccessAction {
    type: ChatActionTypes.FETCH_MESSAGES_SUCCESS;
    payload: any[];
  }
  
  interface FetchMessagesFailureAction {
    type: ChatActionTypes.FETCH_MESSAGES_FAILURE;
    payload: string;
  }
  
  interface AddMessageAction { // Доданий інтерфейс для ADD_MESSAGE
    type: ChatActionTypes.ADD_MESSAGE;
    payload: any;
  }
  
  export type ChatActions =
    | FetchUserChatsRequestAction
    | FetchUserChatsSuccessAction
    | FetchUserChatsFailureAction
    | DeleteUserChatAction
    | SendMessageSuccessAction
    | SendMessageFailureAction
    | SelectChatAction
    | FetchMessagesSuccessAction
    | FetchMessagesFailureAction
    | AddMessageAction; 
  

