import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        userAuth: AuthReducer,
    },
});

export default store;
