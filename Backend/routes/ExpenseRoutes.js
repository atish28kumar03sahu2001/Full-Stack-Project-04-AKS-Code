//backend/routes/ExpenseRoutes.js
import express from "express";
import { addExpense, getExpense, deleteExpense, updateExpense } from "../controller/Expense.js";

const router = express.Router();

router
    .post('/', addExpense)
    .get('/:id', getExpense)
    .delete('/:expenseId', deleteExpense)
    .patch('/:expenseId', updateExpense)

export const ExpenseRoutes = router;