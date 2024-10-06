//backend/model/index.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userimage: {type: Buffer},
    username: {type: String},
    useremail: {type: String},
    password: {type: String},
    usertoken: {type: String},
})
export const Users = mongoose.model('Users',UserSchema);