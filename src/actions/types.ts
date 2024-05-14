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
