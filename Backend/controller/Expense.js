//backend/controller/Expense.js
import { Users } from "../model/index.js";
import mongoose from 'mongoose';
export const addExpense = async (req, res) => {
    const { userId, expenseid, expensename, expenseabout, expenseprice, expensedate, expenseoption } = req.body;
    try {
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newExpense = {
            expenseid,
            expensename,
            expenseabout,
            expenseprice,
            expensedate,
            expenseoption
        };
        user.expense.push(newExpense);
        await user.save();

        res.status(201).json({ message: "Expense added successfully", expense: newExpense });
    } catch (error) {
        res.status(500).json({ message: "Error adding expense", error: error.message });
    }
}

export const getExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Users.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const expenses = user.expense;
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching expenses", error: error.message });
    }
}

export const deleteExpense = async (req, res) => {
    const { expenseId } = req.params;  
    const { userId } = req.body; 

    try {
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const expenseIndex = user.expense.findIndex(exp => exp._id.equals(new mongoose.Types.ObjectId(expenseId)));

        if (expenseIndex === -1) {
            return res.status(404).json({ message: "Expense not found" });
        }
        user.expense.splice(expenseIndex, 1);

        await user.save()
            .then(() => {
                res.status(200).json({ message: "Expense deleted successfully" });
            })
            .catch(saveError => {
                res.status(500).json({ message: "Failed to save user document", error: saveError.message });
            });

    } catch (error) {
        res.status(500).json({ message: "Error deleting expense", error: error.message });
    }
};


export const updateExpense = async (req, res) => {
    const { expenseId } = req.params;
    const { userId, expenseid, expensename, expenseabout, expenseprice, expensedate, expenseoption } = req.body;

    try {
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const expense = user.expense.find(exp => exp._id.equals(new mongoose.Types.ObjectId(expenseId)));

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        if(expenseid) expense.expenseid = expenseid;
        if (expensename) expense.expensename = expensename;
        if (expenseabout) expense.expenseabout = expenseabout;
        if (expenseprice) expense.expenseprice = expenseprice;
        if (expensedate) expense.expensedate = expensedate;
        if (expenseoption) expense.expenseoption = expenseoption;

        await user.save()
            .then(() => {
                res.status(200).json({ message: "Expense updated successfully", expense });
            })
            .catch(saveError => {
                res.status(500).json({ message: "Failed to save user document", error: saveError.message });
            });

    } catch (error) {
        res.status(500).json({ message: "Error updating expense", error: error.message });
    }
};