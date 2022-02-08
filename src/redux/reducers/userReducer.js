import { userConstants } from "../constants/userConstants";

export const userLoginReducer = (
  state = {
    token: localStorage.getItem("token"),
    userInfo: JSON.parse(localStorage.getItem("userInfo")),
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case userConstants.USER_LOGIN_REQUEST:
      return { ...state, loading: true, error: "" };
    case userConstants.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: payload.userInfo,
        token: payload.token,
      };
    case userConstants.USER_LOGIN_FAILED:
      return { ...state, loading: false, error: payload.error };
    case userConstants.USER_LOGOUT:
      return {};
    case userConstants.SET_LOADING:
      return { ...state, loading: payload };
    case userConstants.SET_ERROR:
      return { ...state, error: payload.error };
    case userConstants.SET_SUCCESS:
      return { ...state, success: payload.success };
    default:
      return {};
  }
};
