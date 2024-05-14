import { Dispatch } from "redux";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode";

// Імпорт сервісів
import { login, logout, forgotPassword, resetPassword } from "../services/api-user-service";
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
        toast.error(data.Message || "Login failed");
      } else {
        toast.success("Login successful!");
        const { token } = data;
        console.log("Отримано токен", token);

        localStorage.setItem('AccessToken', token);
        authUser(token, dispatch);
      }
    } catch (ex) {
      console.log("Помилка при запиті на логін", ex);
      dispatch({ type: UserActionTypes.SERVER_ERROR, payload: "Unknown error!" });
    }
  };
};

// Аутентифікація користувача
export const authUser = (token: string, dispatch: Dispatch<UserActions>) => {
  try {
    const decodedToken = jwtDecode<any>(token);
    console.log("Декодований токен", decodedToken);

    dispatch({ type: UserActionTypes.LOGIN_USER_SUCCESS, payload: { message: "Login successful!", decodedToken } });
  } catch (ex) {
    console.log("Помилка при декодуванні токену", ex);
    dispatch({ type: UserActionTypes.LOGIN_USER_ERROR, payload: "Invalid token!" });
  }
};

// Інші дії...

export const logoutUser = (id: string) => {
  return async (dispatch: Dispatch<UserActions>): Promise<void> => {
    const { data } = await logout(id);
    if (data.success) {
      localStorage.removeItem('AccessToken');
      localStorage.removeItem('RefreshToken');
      dispatch({ type: UserActionTypes.LOGOUT_USER });
    }
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
