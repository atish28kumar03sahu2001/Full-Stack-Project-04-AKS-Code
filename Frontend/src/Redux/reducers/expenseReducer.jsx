//frontend/src/Redux/reducers/expenseReducer.jsx
import { ADD_EXPENSE_REQUEST, ADD_EXPENSE_SUCCESS, ADD_EXPENSE_FAILURE, FETCH_EXPENSES_REQUEST, FETCH_EXPENSES_SUCCESS, FETCH_EXPENSES_FAILURE, DELETE_EXPENSE_REQUEST, DELETE_EXPENSE_SUCCESS, DELETE_EXPENSE_FAILURE, UPDATE_EXPENSE_REQUEST, UPDATE_EXPENSE_SUCCESS, UPDATE_EXPENSE_FAILURE, } from "../constants/expenseConstants";

const initialState = {
  loading: false,
  expenseData: null,
  expenses: [],
  error: null,
};

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE_REQUEST:
      return { ...state, loading: true };
    case ADD_EXPENSE_SUCCESS:
      return { ...state, loading: false, expenseData: action.payload };
    case ADD_EXPENSE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_EXPENSES_REQUEST:
      return { ...state, loading: true };
    case FETCH_EXPENSES_SUCCESS:
      return { ...state, loading: false, expenses: action.payload };
    case FETCH_EXPENSES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_EXPENSE_REQUEST:
      return { ...state, loading: true };
    case DELETE_EXPENSE_SUCCESS:
      return { ...state, loading: false, expenses: state.expenses.filter((expense) => expense._id !== action.payload),};
    case DELETE_EXPENSE_FAILURE:
      return { ...state, loading: false, error: action.payload };
      case UPDATE_EXPENSE_REQUEST:
        return { ...state, loading: true };
      case UPDATE_EXPENSE_SUCCESS:
        return {
          loading: false,
          expenses: state.expenses.map((expense) =>
            expense._id === action.payload._id ? action.payload : expense
          ),
        };
      case UPDATE_EXPENSE_FAILURE:
        return { loading: false, error: action.payload };
    default:
      return state;
  }
};
