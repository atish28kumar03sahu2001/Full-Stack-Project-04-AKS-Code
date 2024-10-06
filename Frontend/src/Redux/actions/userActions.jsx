//frontend/src/Redux/actions/userActions.js
import axios from "axios";
import { USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from "../constants/userConstants";

// Async signup action
export const signupUser = (formData) => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNUP_REQUEST });
        
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const { data } = await axios.post("http://localhost:8081/api/auth/signup", formData, config);

        dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
        
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Async signin action
export const signinUser = (formData) => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await axios.post("http://localhost:8081/api/auth/signin", formData, config);
        const userDetails = response.data.user;
        localStorage.setItem("userInfo", JSON.stringify(userDetails));
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: userDetails });
        return userDetails;

    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        return null;
    }
};

// Update user profile
export const updateUserProfile = (formData, id) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const { data } = await axios.patch(`http://localhost:8081/api/user/${id}`, formData, config);

        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};