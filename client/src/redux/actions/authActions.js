import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { UserActionTypes } from "../types";
import { toast } from "react-toastify";

export const registerUser = (userData, text, callback) => (dispatch) => {
  axios
    .post("/api/v1/applicants", userData, {
      params: {
        type: text,
      },
    })
    .then((res) => {
      callback();
      setTimeout(
        () =>
          toast.success("Registered Successfully 😄", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }),
        300
      );
    })
    .catch((err) => {
      callback();
      setTimeout(
        () =>
          toast.error(err.response.data.message + " 🤥", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }),
        300
      );
    });
};

// Login - get user token
export const loginUser = (userData, type, callback) => (dispatch) => {
  axios
    .post("/api/v1/applicants/login", userData, {
      params: {
        type: type,
      },
    })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data

      const decoded = jwt_decode(token);

      dispatch(setCurrentUserId(decoded.id));
      dispatch(setCurrentUserType(type));
      callback();
      setTimeout(() => {
        toast.success("Logged In Successfully! 😄", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => (window.location.pathname = "/profile"), 1000);
      }, 3500);
    })
    .catch((err) => {
      toast.error(err.response.data.message + " 🙁", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      callback();
    });
};

// Set logged in user
export const setCurrentUserId = (data) => {
  return {
    type: UserActionTypes.SET_CURRENT_USER_ID,
    payload: data,
  };
};

export const setCurrentUserType = (data) => {
  return {
    type: UserActionTypes.SET_CURRENT_USER_TYPE,
    payload: data,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUserId(null));
  dispatch(setCurrentUserType(null));
};
