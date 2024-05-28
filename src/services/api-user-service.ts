import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const API_URL = "https://localhost:7004/api";
export const login = async (user: any) => {
  return await axios.post(`${API_URL}/Auth/login`, user);
};

export const logout = async (id: string) => {
  return await axios.post(`${API_URL}/Auth/logout`, { id });
};

export const forgotPassword = async (email: string) => {
  return await axios.post(`${API_URL}/Auth/forgot-password`, { email });
};

export const resetPassword = async (data: any) => {
  return await axios.post(`${API_URL}/Auth/reset-password`, data);
};

export const fetchPendingVerificationSessions = async () => {
  return await axios.get(`${API_URL}/Chat/pending-verification-sessions`, getAuthHeaders());
};
export const updateAdminCommentAPI = async (comment: any) => {
  return await axios.put(`${API_URL}/admin/comments/${comment.id}`, comment, getAuthHeaders());
};

export const deleteAdminCommentAPI = async (commentId: number) => {
  console.log(commentId);
  return await axios.delete(`${API_URL}/admincomment/${commentId}`, getAuthHeaders());
};


export const fetchVerifiedSessionsWithCommentsAPI = async () => {
  return await axios.get(`${API_URL}/Chat/chat-sessions-with-admin-comments`, getAuthHeaders());
};