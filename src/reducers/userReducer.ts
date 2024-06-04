import { UserActions, UserActionTypes } from '../actions/types';

export interface UserState {
  user: any;
  role: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  role: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.START_REQUEST:
      return { ...state, loading: true };
    case UserActionTypes.LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload.decodedToken, error: null };
    case UserActionTypes.LOGIN_USER_ERROR:
    case UserActionTypes.SERVER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.LOGOUT_USER:
      return initialState;
    case UserActionTypes.FORGOT_PASSWORD_SUCCESS:
    case UserActionTypes.RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, error: null };
    case UserActionTypes.SET_ROLE:
      return { ...state, role: action.payload, loading: false, error: null };
    case UserActionTypes.UPDATE_USER_PROFILE_REQUEST:
      return { ...state, loading: true };
    case UserActionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case UserActionTypes.UPDATE_USER_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.UPDATE_USER_PASSWORD_SUCCESS:
        return { ...state, loading: false, user: action.payload };
    case UserActionTypes.UPDATE_USER_PROFILE_FAILURE:
    case UserActionTypes.UPDATE_USER_PASSWORD_FAILURE:
        return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
