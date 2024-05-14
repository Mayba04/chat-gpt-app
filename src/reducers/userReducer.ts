import { UserActions, UserActionTypes } from '../actions/types';

export interface UserState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action: UserActions): UserState => {
  console.log("Reducer action received:", action);
  switch (action.type) {
    case UserActionTypes.START_REQUEST:
      return { ...state, loading: true };
    case UserActionTypes.LOGIN_USER_SUCCESS:
      console.log("Login User Success Action:", action.payload);
      return { ...state, loading: false, user: action.payload.decodedToken, error: null };
    case UserActionTypes.LOGIN_USER_ERROR:
    case UserActionTypes.SERVER_ERROR:
      console.log("Login/User Error Action:", action.payload);
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.LOGOUT_USER:
      return { ...state, user: null };
    case UserActionTypes.FORGOT_PASSWORD_SUCCESS:
    case UserActionTypes.RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};

export default userReducer;
