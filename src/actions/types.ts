export enum UserActionTypes {
  START_REQUEST = 'START_REQUEST',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  LOGOUT_USER = 'LOGOUT_USER',
  FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS',
  RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
  SET_ROLE = 'SET_ROLE',
  UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST',
  UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS',
  UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE',
  
  UPDATE_USER_PASSWORD_SUCCESS = 'UPDATE_USER_PASSWORD_SUCCESS',
  UPDATE_USER_PASSWORD_FAILURE = 'UPDATE_USER_PASSWORD_FAILURE',
  UPDATE_USER_PASSWORD_REQUEST = 'UPDATE_USER_PASSWORD_REQUEST',
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

interface SetRoleAction {
  type: UserActionTypes.SET_ROLE;
  payload: string;
}

interface UpdateUserProfileRequestAction {
  type: typeof UserActionTypes.UPDATE_USER_PROFILE_REQUEST;
}

interface UpdateUserProfileSuccessAction {
  type: typeof UserActionTypes.UPDATE_USER_PROFILE_SUCCESS;
  payload: any; 
}

interface UpdateUserProfileFailureAction {
  type: typeof UserActionTypes.UPDATE_USER_PROFILE_FAILURE;
  payload: string;
}


interface UpdateUserPasswordRequestAction {
  type: typeof UserActionTypes.UPDATE_USER_PASSWORD_REQUEST;
}

interface UpdateUserPasswordSuccessAction {
  type: typeof UserActionTypes.UPDATE_USER_PASSWORD_SUCCESS;
  payload: any; 
}

interface UpdateUserPasswordFailureAction {
  type: typeof UserActionTypes.UPDATE_USER_PASSWORD_FAILURE;
  payload: string;
}


export type UserActions =
  | StartRequestAction
  | LoginUserSuccessAction
  | LoginUserErrorAction
  | ServerErrorAction
  | LogoutUserAction
  | ForgotPasswordSuccessAction
  | ResetPasswordSuccessAction
  | SetRoleAction
  | UpdateUserProfileRequestAction
  | UpdateUserProfileSuccessAction
  | UpdateUserProfileFailureAction
  | UpdateUserPasswordRequestAction
  | UpdateUserPasswordSuccessAction
  | UpdateUserPasswordFailureAction;
//chat
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
    ADD_MESSAGE = 'ADD_MESSAGE',
    CLEAR_MESSAGES = 'CLEAR_MESSAGES', 
    FETCH_ADMIN_COMMENT_SUCCESS = 'FETCH_ADMIN_COMMENT_SUCCESS',
    FETCH_ADMIN_COMMENT_FAILURE = 'FETCH_ADMIN_COMMENT_FAILURE',
    CLEAR_MESSAGES_AND_COMMENTS = 'CLEAR_MESSAGES_AND_COMMENTS',
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
  
  interface AddMessageAction {
    type: ChatActionTypes.ADD_MESSAGE;
    payload: any;
  }
  
  interface ClearMessagesAction {
    type: ChatActionTypes.CLEAR_MESSAGES;
  }

  interface FetchAdminCommentSuccessAction {
    type: ChatActionTypes.FETCH_ADMIN_COMMENT_SUCCESS;
    payload: { messageId: number; comments: any[] };
  }
  
  interface FetchAdminCommentFailureAction {
    type: ChatActionTypes.FETCH_ADMIN_COMMENT_FAILURE;
    payload: string;
  }

  
  interface ClearMessagesAndComments {
    type :ChatActionTypes.CLEAR_MESSAGES_AND_COMMENTS;
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
    | AddMessageAction
    | ClearMessagesAction
    | FetchAdminCommentSuccessAction
    | FetchAdminCommentFailureAction
    | ClearMessagesAndComments;
  // Admin
  export enum AdminActionTypes {
    FETCH_PENDING_VERIFICATION_SESSIONS_REQUEST = 'FETCH_PENDING_VERIFICATION_SESSIONS_REQUEST',
    FETCH_PENDING_VERIFICATION_SESSIONS_SUCCESS = 'FETCH_PENDING_VERIFICATION_SESSIONS_SUCCESS',
    FETCH_PENDING_VERIFICATION_SESSIONS_FAILURE = 'FETCH_PENDING_VERIFICATION_SESSIONS_FAILURE',
    FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_REQUEST = 'FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_REQUEST',
    FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_SUCCESS = 'FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_SUCCESS',
    FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_FAILURE = 'FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_FAILURE',
    ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS',
    ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE',
    UPDATE_ADMIN_COMMENT_SUCCESS = 'UPDATE_ADMIN_COMMENT_SUCCESS',
    UPDATE_ADMIN_COMMENT_FAILURE = 'UPDATE_ADMIN_COMMENT_FAILURE',
    DELETE_ADMIN_COMMENT_SUCCESS = 'DELETE_ADMIN_COMMENT_SUCCESS',
    DELETE_ADMIN_COMMENT_FAILURE = 'DELETE_ADMIN_COMMENT_FAILURE',
  }
  
  interface FetchPendingVerificationSessionsRequestAction {
    type: AdminActionTypes.FETCH_PENDING_VERIFICATION_SESSIONS_REQUEST;
  }

  interface FetchPendingVerificationSessionsSuccessAction {
    type: AdminActionTypes.FETCH_PENDING_VERIFICATION_SESSIONS_SUCCESS;
    payload: any[];
  }

  interface FetchPendingVerificationSessionsFailureAction {
    type: AdminActionTypes.FETCH_PENDING_VERIFICATION_SESSIONS_FAILURE;
    payload: string;
  }

  interface FetchVerifiedSessionsWithCommentsRequestAction {
    type: AdminActionTypes.FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_REQUEST;
  }

  interface FetchVerifiedSessionsWithCommentsSuccessAction {
    type: AdminActionTypes.FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_SUCCESS;
    payload: any[];
  }

  interface FetchVerifiedSessionsWithCommentsFailureAction {
    type: AdminActionTypes.FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_FAILURE;
    payload: string;
  }

  interface AddCommentSuccessAction {
    type: AdminActionTypes.ADD_COMMENT_SUCCESS;
  }
  
  interface AddCommentFailureAction {
    type: AdminActionTypes.ADD_COMMENT_FAILURE;
    payload: string;
  }

  interface UpdateAdminCommentSuccessAction {
    type: AdminActionTypes.UPDATE_ADMIN_COMMENT_SUCCESS;
    payload: any;
  }

  interface UpdateAdminCommentFailureAction {
      type: AdminActionTypes.UPDATE_ADMIN_COMMENT_FAILURE;
      payload: string;
  }

  interface DeleteAdminCommentSuccessAction {
      type: AdminActionTypes.DELETE_ADMIN_COMMENT_SUCCESS;
      payload: number;
  }

  interface DeleteAdminCommentFailureAction {
      type: AdminActionTypes.DELETE_ADMIN_COMMENT_FAILURE;
      payload: string;
  }

  export type AdminActions =
    | FetchPendingVerificationSessionsRequestAction
    | FetchPendingVerificationSessionsSuccessAction
    | FetchPendingVerificationSessionsFailureAction
    | FetchVerifiedSessionsWithCommentsRequestAction
    | FetchVerifiedSessionsWithCommentsSuccessAction
    | FetchVerifiedSessionsWithCommentsFailureAction
    | AddCommentSuccessAction
    | AddCommentFailureAction
    | UpdateAdminCommentSuccessAction
    | UpdateAdminCommentFailureAction
    | DeleteAdminCommentSuccessAction
    | DeleteAdminCommentFailureAction;
  

  