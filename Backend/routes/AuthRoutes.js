//backend/routes/AuthRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import {SignupHandler, SigninHandler, UpdateUserHandler} from '../controller/Auth.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
}).single('userimage');

router
    .post('/signup',authMiddleware, upload, SignupHandler)
    .post('/signin',authMiddleware, SigninHandler)
    .patch('/:id',upload, UpdateUserHandler)
export const Authentication = router;