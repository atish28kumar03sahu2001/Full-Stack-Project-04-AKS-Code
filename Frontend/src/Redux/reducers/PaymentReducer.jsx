//frontend/src/Redux/reducers/PaymentReducer.jsx
import { ADD_PAYMENT_PLAN } from '../constants/PaymentConstants';
const initialState = {
    plan: null,
    userplan: null,
};

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PAYMENT_PLAN:
            return { ...state, plan: action.payload, userplan: action.payload.updatedUser.userplan };
        default:
            return state;
    }
};