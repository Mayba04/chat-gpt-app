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
  console.log("Update API Comment:", comment); // Додаємо лог для перевірки даних перед відправкою
  return await axios.put(`${API_URL}/admincomment`, comment, getAuthHeaders());
};

export const deleteAdminCommentAPI = async (commentId: number) => {
  console.log(commentId);
  return await axios.delete(`${API_URL}/admincomment/${commentId}`, getAuthHeaders());
};


export const fetchVerifiedSessionsWithCommentsAPI = async () => {
  return await axios.get(`${API_URL}/Chat/chat-sessions-with-admin-comments`, getAuthHeaders());
};

export const updateProfile = async (userData: FormData) => {
  return await axios.put(`${API_URL}/user/update`, userData, getAuthHeaders());
};


export const updateUserPassword = async (userPassword: FormData) => {
  return await axios.put(`${API_URL}/user/updatepassword`, userPassword, getAuthHeaders());
};

export const register = async (user: any) => {
  return await axios.post(`${API_URL}/Auth/register`, user);
};