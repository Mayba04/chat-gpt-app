import { Dispatch } from "redux";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode";
import { message } from 'antd';
// Імпорт сервісів
import { login, forgotPassword, resetPassword, register } from "../services/api-user-service";
import { UserActionTypes, UserActions } from "../actions/types";

// Вхід користувача
export const loginUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>): Promise<void> => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      console.log("Запит на логін відправлено", user);

      const { data } = await login(user);
      console.log("Отримана відповідь від сервера", data);

      if (!data.token) {
        dispatch({ type: UserActionTypes.LOGIN_USER_ERROR, payload: data.Message || "Login failed" });
        message.error(data.Message || "Login failed");
        return Promise.reject(new Error(data.Message || "Login failed"));
      } else {
        message.success("Login successful!");
        const { token } = data; // Отримуємо токен з даних
        console.log("Отримано токен", token);
        localStorage.setItem('token', token); 
        localStorage.setItem('AccessToken', token);
        authUser(token, dispatch);
      }
    } catch (ex: any) {
      console.log("Помилка при запиті на логін", ex);
      const errorMessage = ex.response?.data || ex.message || "Unknown error!";
      dispatch({ type: UserActionTypes.SERVER_ERROR, payload: errorMessage });
      message.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
  };
};

//authUser
export const authUser = (token: string, dispatch: Dispatch<UserActions>) => {
  try {
    const decodedToken = jwtDecode<any>(token);
    console.log("Декодований токен", decodedToken);

    // Отримання ролі з декодованого токену
    const roles = decodedToken.role || decodedToken.roles;
    localStorage.setItem('role', roles);

    dispatch({ type: UserActionTypes.LOGIN_USER_SUCCESS, payload: { message: "Login successful!", decodedToken } });
    dispatch({ type: UserActionTypes.SET_ROLE, payload: roles });
  } catch (ex) {
    console.log("Помилка при декодуванні токену", ex);
    dispatch({ type: UserActionTypes.LOGIN_USER_ERROR, payload: "Invalid token!" });
    message.error("Invalid token!");
  }
};
export const logoutUser = () => {
  return (dispatch: Dispatch<UserActions>) => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    localStorage.clear();
    dispatch({ type: UserActionTypes.LOGOUT_USER });
    toast.success('Successfully logged out');
  };
};

// Забування пароля
export const forgotPasswordA = (email: string) => {
  return async (dispatch: Dispatch<UserActions>): Promise<void> => {
    try {
      await forgotPassword(email);
      dispatch({ type: UserActionTypes.FORGOT_PASSWORD_SUCCESS, payload: { message: "Email sent" } });
    } catch (ex) {
      dispatch({ type: UserActionTypes.SERVER_ERROR, payload: "Unknown error!" });
    }
  };
};

// Скидання пароля
export const resetPasswordA = (data: any) => {
  return async (dispatch: Dispatch<UserActions>): Promise<void> => {
    try {
      await resetPassword(data);
      dispatch({ type: UserActionTypes.RESET_PASSWORD_SUCCESS, payload: { message: "Password reset" } });
    } catch (ex) {
      dispatch({ type: UserActionTypes.SERVER_ERROR, payload: "Unknown error!" });
    }
  };
};

// Реєстрація користувача
export const registerUser = (user: FormData) => {
  return async (dispatch: Dispatch<UserActions>): Promise<any> => {
    try {
      dispatch({ type: UserActionTypes.REGISTER_USER_START_REQUEST });
      const { data } = await register(user);
      dispatch({ type: UserActionTypes.REGISTER_USER_SUCCESS, payload: data });
      message.success("Registration successful! Сheck your mail");
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Registration failed!";
      dispatch({ type: UserActionTypes.REGISTER_USER_ERROR, payload: errorMessage });
      message.error(errorMessage);
      throw new Error(errorMessage);
    }
  };
};