import { AdminActions, AdminActionTypes } from '../actions/types';

const initialState = {
    pendingVerificationSessions: [],
    verifiedSessionsWithComments: [],
    currentSession: null,
    loading: false,
    error: null,
    adminComment: null,
};


const adminReducer = (state = initialState, action: AdminActions) => {
    switch (action.type) {
        case AdminActionTypes.FETCH_PENDING_VERIFICATION_SESSIONS_REQUEST:
        case AdminActionTypes.FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_REQUEST:
            return { ...state, loading: true, error: null };

        case AdminActionTypes.FETCH_PENDING_VERIFICATION_SESSIONS_SUCCESS:
            return { ...state, loading: false, pendingVerificationSessions: action.payload };

        case AdminActionTypes.FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_SUCCESS:
            return { ...state, loading: false, verifiedSessionsWithComments: action.payload };

        case AdminActionTypes.FETCH_PENDING_VERIFICATION_SESSIONS_FAILURE:
        case AdminActionTypes.FETCH_VERIFIED_WITH_COMMENTS_SESSIONS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case AdminActionTypes.ADD_COMMENT_SUCCESS:
        case AdminActionTypes.UPDATE_ADMIN_COMMENT_SUCCESS:
        case AdminActionTypes.DELETE_ADMIN_COMMENT_SUCCESS:
            return { ...state, loading: false, error: null };

        case AdminActionTypes.ADD_COMMENT_FAILURE:
        case AdminActionTypes.UPDATE_ADMIN_COMMENT_FAILURE:
        case AdminActionTypes.DELETE_ADMIN_COMMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default adminReducer;