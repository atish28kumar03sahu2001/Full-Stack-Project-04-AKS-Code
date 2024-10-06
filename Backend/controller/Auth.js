//backend/controller/Auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users } from '../model/index.js';

export const SignupHandler = async (req, res) => {
    try {
        const { username, useremail, password } = req.body;
        const userimage = req.file;

        const existingUser = await Users.findOne({ useremail });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists. Please sign in." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new Users({
            username,
            useremail,
            password: hashedPassword,
            userimage: userimage ? userimage.buffer : null,
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        newUser.usertoken = token;

        await newUser.save();

        res.status(201).json({ user: newUser, token });
   } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Something went wrong during signup." });
   } 
}

export const SigninHandler = async (req, res) => {
    try {
        const { username, useremail, password } = req.body;

        const existingUser = await Users.findOne({ useremail });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found. Please sign up first." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
          return res.status(400).json({ message: "Invalid credentials. Please try again." });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET,);

        const { password: _, ...userDetails } = existingUser.toObject();
        userDetails.token = token;

        return res.status(200).json({ user: userDetails, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong during signin." });
    }
}

export const UpdateUserHandler = async (req, res) => {
    try {
        const { username, useremail, password } = req.body;
        const userId = req.params.id;

        const updates = {};
        if (req.file) {
            updates.userimage = req.file.buffer;
        }
        if (username) {
            updates.username = username;
        }
        if (useremail) {
            updates.useremail = useremail;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            updates.password = hashedPassword;
        }

        const updatedUser = await Users.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}