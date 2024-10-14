//frontend/src/Redux/actions/PaymentActions.jsx
import axios from 'axios';
import { ADD_PAYMENT_PLAN } from '../constants/PaymentConstants';
export const addPaymentPlan = (plan, userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(`http://localhost:8081/api/payment/${userId}`, { plan });
            console.log('Payment Plan updated : ', response.data);
            
            const updatedUser = response.data.updatedUser;
            console.log('Payment Plan updated : ', updatedUser);
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
            dispatch({
                type: ADD_PAYMENT_PLAN,
                payload: response.data,
            });
        } catch (error) {
            console.error('Error adding payment plan:', error);
        }
    };
};