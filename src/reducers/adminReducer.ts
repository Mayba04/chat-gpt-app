import { AdminActions, AdminActionTypes } from '../actions/types';

const initialState = {
    pendingVerificationSessions: [],
    currentSession: null,
    loading: false,
    error: null,
    adminComment: null,
};

const adminReducer = (state = initialState, action: AdminActions) => {
    switch (action.type) {
        
        case AdminActionTypes.FETCH_PENDING_VERIFICATION_SESSIONS_REQUEST:
            return { ...state, loading: true, error: null };
        case AdminActionTypes.FETCH_PENDING_VERIFICATION_SESSIONS_SUCCESS:
            return { ...state, loading: false, pendingVerificationSessions: action.payload };
        case AdminActionTypes.FETCH_PENDING_VERIFICATION_SESSIONS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default adminReducer;