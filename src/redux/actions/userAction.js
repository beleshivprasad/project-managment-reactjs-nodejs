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

      const data = await axios.post(
        "/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log("data",data);
      // if (!data.token) {
      //   dispatch({
      //     type: userConstants.USER_LOGIN_FAILED,
      //     payload: "Login Failed",
      //   });
      // } else {
      //   localStorage.setItem("userInfo", JSON.stringify(data));
      //   localStorage.setItem("token", data.token);
      //   dispatch({
      //     type: userConstants.USER_LOGIN_SUCCESS,
      //     payload: {
      //       userInfo: data,
      //       token: data.token,
      //     },
      //   });
      // }
    }
  } catch (error) {
    console.log(JSON.stringify(error))
      dispatch({
      type: userConstants.USER_LOGIN_FAILED,
      payload: { error: error.response.data.message, loading: false },
    });
  }
};
