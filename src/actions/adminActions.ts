// adminActions.ts
import { Dispatch } from 'redux';
import { AdminActionTypes, AdminActions } from './types';
import { fetchPendingVerificationSessions, updateAdminCommentAPI, deleteAdminCommentAPI, fetchVerifiedSessionsWithCommentsAPI } from '../services/api-user-service';  // Імпортувати сервіс
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

export const updateAdminComment = (comment: any) => async (dispatch: any) => {
  try {
      const { data } = await updateAdminCommentAPI(comment);
      dispatch({ type: AdminActionTypes.UPDATE_ADMIN_COMMENT_SUCCESS, payload: data });
  } catch (error) {
      dispatch({ type: AdminActionTypes.UPDATE_ADMIN_COMMENT_FAILURE, payload: error });
  }
};

export const deleteAdminComment = (commentId: number) => async (dispatch: any) => {
  try {
    await deleteAdminCommentAPI(commentId);
    dispatch({ type: AdminActionTypes.DELETE_ADMIN_COMMENT_SUCCESS, payload: commentId });
  } catch (error) {
    console.error('Error deleting comment:', error);
    dispatch({ type: AdminActionTypes.DELETE_ADMIN_COMMENT_FAILURE, payload: error });
  }
};


export const fetchVerifiedSessionsWithComments = () => {
  return async (dispatch: Dispatch<AdminActions>) => {
    dispatch({ type: AdminActionTypes.FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_REQUEST });

    try {
      const { data } = await fetchVerifiedSessionsWithCommentsAPI();
      dispatch({ type: AdminActionTypes.FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: AdminActionTypes.FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_FAILURE,
        payload: 'Error fetching verified sessions with comments'
      });
    }
  };
};


