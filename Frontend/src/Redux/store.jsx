//frontend/src/Redux/store.jsx
import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./reducers/userReducer";
import { expenseReducer } from "./reducers/expenseReducer";
import { paymentReducer } from "./reducers/PaymentReducer";

const store = configureStore({
    reducer: {
        userAuth: AuthReducer,
        expense: expenseReducer,
        payment: paymentReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: false,
        }),
});

export default store;
