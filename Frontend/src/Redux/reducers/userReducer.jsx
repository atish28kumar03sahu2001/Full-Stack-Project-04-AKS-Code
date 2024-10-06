//frontend/src/Redux/reducers/userReducer.jsx
import { USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from "../constants/userConstants";

const initialState = {
    loading: false,
    success: false,
    error: null,
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
};

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { ...state, loading: true };

        case USER_SIGNUP_SUCCESS:
            return { ...state, loading: false, success: true, error: null };

        case USER_SIGNUP_FAIL:
            return { ...state, loading: false, error: action.payload };

        case USER_SIGNIN_REQUEST: 
            return { ...state, loading: true };

        case USER_SIGNIN_SUCCESS: 
            return { ...state, loading: false, success: true, userInfo: action.payload };

        case USER_SIGNIN_FAIL: 
            return { ...state, loading: false, error: action.payload };

        case USER_UPDATE_REQUEST:
            return { ...state, loading: true };
        
        case USER_UPDATE_SUCCESS:
            return { ...state, loading: false, success: true, userInfo: action.payload, error: null };
        
        case USER_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
