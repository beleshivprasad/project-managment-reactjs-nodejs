import axios from "axios";
import * as yup from "yup";
import { userConstants } from "../constants/userConstants";

const validation = async (email, password) => {
  const yupObject = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required().min(8),
  });

  return yupObject
    .validate({ email, password }, { abortEarly: true })
    .then((res) => {
      return false;
    })
    .catch(({ errors }) => {
      return errors[0];
    });
};

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await validation(email, password);
    if (res) {
      dispatch({
        type: userConstants.USER_LOGIN_FAILED,
        payload: { error: res },
      });

      setTimeout(() => {
        dispatch({
          type: userConstants.SET_ERROR,
          payload: { error: "" },
        });
      }, 3000);
    } else {
      dispatch({ type: userConstants.USER_LOGIN_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);

      const { userData, errors } = data;

      if (errors.length !== 0) {
        errors.forEach((item) => {
          dispatch({
            type: userConstants.SET_ERROR,
            payload: { error: item.msg },
          });
        });

        setTimeout(() => {
          dispatch({
            type: userConstants.SET_ERROR,
            payload: { error: "" },
          });
        }, 3000);
      } else {
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        dispatch({
          type: userConstants.USER_LOGIN_SUCCESS,
          payload: {
            userInfo: data,
            token: data.token,
          },
        });
      }
    }
  } catch (error) {
    dispatch({
      type: userConstants.USER_LOGIN_FAILED,
      payload: { error: error.response.data.message, loading: false },
    });
  }
};

export const register =
  (fname, lname, email, gender, password, confirmPassword) =>
  async (dispatch) => {
    try {
      dispatch({ type: userConstants.USER_REGISTER_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/user/register",
        {
          fname,
          lname,
          gender,
          email,
          password,
        },
        config
      );
      const { userData, errors } = data;
      console.log(data);

      if (errors.length !== 0) {
        dispatch({
          type: userConstants.SET_ERROR,
          payload: { error: `${errors[0].param} ${errors[0].msg}` },
        });

        setTimeout(() => {
          dispatch({
            type: userConstants.SET_ERROR,
            payload: { error: "" },
          });
        }, 3000);
      } else {
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        dispatch({
          type: userConstants.USER_LOGIN_SUCCESS,
          payload: {
            userInfo: data,
            token: data.token,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: userConstants.SET_ERROR,
        payload: { error: error.response.data.message },
      });
      dispatch({
        type: userConstants.SET_LOADING,
        payload: false,
      });
      setInterval(() => {
        dispatch({
          type: userConstants.SET_ERROR,
          payload: { error: error.response.data.message },
        });
      }, 2000);
    }
  };
