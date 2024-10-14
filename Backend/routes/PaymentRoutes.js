//backend/routes/PaymentRoutes.js
import express from "express";
import { PaymentPatch } from "../controller/Payment.js";


const router = express.Router();

router
    .patch('/:userId',PaymentPatch)

export const PaymentRoutes = router;