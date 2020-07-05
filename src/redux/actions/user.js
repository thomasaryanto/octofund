import Axios from "axios";
import { API_URL } from "../../constants/API";
import Cookie from "universal-cookie";

const cookieObj = new Cookie();

export const loginHandler = (userData) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/users/login`, userData)
      .then((res) => {
        dispatch({
          type: "ON_LOGIN_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        dispatch({
          type: "ON_LOGIN_FAIL",
          payload: errorMessage,
        });
      });
  };
};

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users/${userData.id}`)
      .then((res) => {
        dispatch({
          type: "ON_LOGIN_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        dispatch({
          type: "ON_LOGIN_FAIL",
          payload: errorMessage,
        });
      });
  };
};

export const logoutHandler = () => {
  cookieObj.remove("authData", { path: "/" });
  return {
    type: "ON_LOGOUT_SUCCESS",
  };
};

export const registerHandler = (userData) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/users/login`, userData)
      .then((res) => {
        dispatch({
          type: "ON_LOGIN_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        const errorMessage = err.response
          ? err.response.data.errors.join("\n")
          : err.message;
        dispatch({
          type: "ON_LOGIN_FAIL",
          payload: errorMessage,
        });
      });

    Axios.get(`${API_URL}/users`, {
      params: {
        username: userData.username,
      },
    })
      .then((res) => {
        if (res.data.length > 0) {
          dispatch({
            type: "ON_REGISTER_FAIL",
            payload: "Username sudah digunakan",
          });

          dispatch({
            type: "ON_LOADING",
            payload: false,
          });
        } else {
          Axios.post(`${API_URL}/users`, { ...userData, role: "user" })
            .then((res) => {
              dispatch({
                type: "ON_LOGIN_SUCCESS",
                payload: res.data,
              });
            })
            .catch((err) => {
              dispatch({
                type: "ON_LOGIN_FAIL",
                payload: "Terjadi kesalahan jaringan.",
              });
            });
        }
      })
      .catch((err) => {
        dispatch({
          type: "ON_LOGIN_FAIL",
          payload: "Terjadi kesalahan jaringan.",
        });
      });
  };
};

export const cookieChecker = () => {
  return {
    type: "COOKIE_CHECK",
  };
};
