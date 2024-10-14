//frontend/src/Redux/actions/expenseActions.jsx
import axios from "axios";
import { ADD_EXPENSE_REQUEST, ADD_EXPENSE_SUCCESS, ADD_EXPENSE_FAILURE, FETCH_EXPENSES_REQUEST, FETCH_EXPENSES_SUCCESS, FETCH_EXPENSES_FAILURE, DELETE_EXPENSE_REQUEST, DELETE_EXPENSE_SUCCESS, DELETE_EXPENSE_FAILURE, UPDATE_EXPENSE_REQUEST, UPDATE_EXPENSE_SUCCESS, UPDATE_EXPENSE_FAILURE, } from "../constants/expenseConstants";

export const addExpense = (expenseData, userId) => async (dispatch) => {
  try {
    dispatch({ type: ADD_EXPENSE_REQUEST });
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`http://localhost:8081/api/expense`, { ...expenseData, userId }, config);

    dispatch({
      type: ADD_EXPENSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_EXPENSE_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const fetchExpenses = (userId) => async (dispatch) => {
  try {
      dispatch({ type: FETCH_EXPENSES_REQUEST });

      const { data } = await axios.get(`http://localhost:8081/api/expense/${userId}`);
      dispatch({
          type: FETCH_EXPENSES_SUCCESS,
          payload: data,
      });

      return data;
  } catch (error) {
      dispatch({
          type: FETCH_EXPENSES_FAILURE,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
  }
};

export const deleteExpense = (expenseId, userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EXPENSE_REQUEST });

    await axios.delete(`http://localhost:8081/api/expense/${expenseId}`, {
      data: { userId },
    });

    dispatch({
      type: DELETE_EXPENSE_SUCCESS,
      payload: expenseId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EXPENSE_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateExpense = (expenseId, expdata, userId) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EXPENSE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.patch(`http://localhost:8081/api/expense/${expenseId}`, { ...expdata, userId }, config);

    dispatch({
      type: UPDATE_EXPENSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EXPENSE_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};