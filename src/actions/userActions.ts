import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import { UserActionTypes, UserActions } from './types';
import { updateUserPassword, updateProfile } from '../services/api-user-service';

export const updateUserProfile = (userData: FormData) => async (dispatch: Dispatch<UserActions>, getState: () => RootState): Promise<void> => {
    try {
      dispatch({ type: UserActionTypes.UPDATE_USER_PROFILE_REQUEST });
  
      const { data } = await updateProfile(userData);
      dispatch({ type: UserActionTypes.UPDATE_USER_PROFILE_SUCCESS, payload: data });
  
      dispatch({ type: UserActionTypes.LOGIN_USER_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.UPDATE_USER_PROFILE_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
      return Promise.reject(error);
    }
  };

  export const updatePassword = (userPassword: FormData) => async (dispatch: Dispatch<UserActions>, getState: () => RootState): Promise<void> => {
    try {
      dispatch({ type: UserActionTypes.UPDATE_USER_PASSWORD_REQUEST });
  
      const { data } = await updateUserPassword(userPassword);
      dispatch({ type: UserActionTypes.UPDATE_USER_PASSWORD_SUCCESS, payload: data });
  
      dispatch({ type: UserActionTypes.LOGIN_USER_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.UPDATE_USER_PASSWORD_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
      return Promise.reject(error);
    }
  };