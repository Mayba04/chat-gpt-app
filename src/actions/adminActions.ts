// adminActions.ts
import { Dispatch } from 'redux';
import { AdminActionTypes, AdminActions } from './types';
import { fetchPendingVerificationSessions } from '../services/api-user-service';  // Імпортувати сервіс
import axios from 'axios';
export const fetchPendingVerificationSessionsAction = () => {
  return async (dispatch: Dispatch<AdminActions>) => {
    dispatch({ type: AdminActionTypes.FETCH_PENDING_VERIFICATION_SESSIONS_REQUEST });

    try {
      const { data } = await fetchPendingVerificationSessions();
      dispatch({ type: AdminActionTypes.FETCH_PENDING_VERIFICATION_SESSIONS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: AdminActionTypes.FETCH_PENDING_VERIFICATION_SESSIONS_FAILURE,
        payload: 'Error fetching pending verification sessions'
      });
    }
  };
};

export const addAdminComment = (commentDTO: any) => {
  return async (dispatch: Dispatch<AdminActions>) => {
    try {
      await axios.post('https://localhost:7004/api/AdminComment', commentDTO, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch({ type: AdminActionTypes.ADD_COMMENT_SUCCESS });
    } catch (error) {
      console.error('Error adding comment:', error);
      dispatch({ type: AdminActionTypes.ADD_COMMENT_FAILURE, payload: 'Error adding comment: ', error });
    }
  };
};
