import axios from 'axios';

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
