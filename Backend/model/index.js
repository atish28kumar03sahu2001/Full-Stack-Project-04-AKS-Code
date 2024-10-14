//backend/model/index.js
import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    expenseid: {type: String},
    expensename: {type: String},
    expenseabout: {type: String},
    expenseprice: {type: String},
    expensedate: {type: Date},
    expenseoption: {type: String},
})

const UserSchema = new mongoose.Schema({
    userimage: {type: Buffer},
    username: {type: String},
    useremail: {type: String},
    password: {type: String},
    usertoken: {type: String},
    userplan: {type: String},
    expense: [ExpenseSchema],
})
export const Users = mongoose.model('Users',UserSchema);