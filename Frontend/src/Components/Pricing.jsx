//frontend/src/Components/Pricing.jsx
import React from "react";
import '../Styles/Pricing.css';
import { useDispatch } from "react-redux";
import { addPaymentPlan } from "../Redux/actions/PaymentActions";
import { useNavigate } from "react-router-dom";
export const Pricing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userId = userInfo?._id;
    const handlePlanSelection = (selectedPlan) => {
        dispatch(addPaymentPlan(selectedPlan, userId));
        navigate(`/user/${userId}/expense`);
    };
    return (
        <>
            <div className="PRC_HD1_H1"><h1 className="PRC_H1">Pricing Section</h1></div>
            <div className="PRC_DIV_D_LST">
                <div className="PRC_DIV_D_BOX">
                    <p className="PRICE_P">₹100<span className="PRICE_SP">/month</span></p>
                    <p className="PRICE_HD">Basic Plan</p>
                    <p className="PRC_P">1. Total Expense Amount</p>
                    <p className="PRC_P">2. Ordering Expense List</p>
                    <button className="PRC_BTN" onClick={()=>handlePlanSelection("Basic Plan")}>Get Basic Plan</button>
                </div>
                <div className="PRC_DIV_D_BOX">
                    <p className="PRICE_P">₹500<span className="PRICE_SP">/month</span></p>
                    <p className="PRICE_HD">Ideal Plan</p>
                    <p className="PRC_P">1. Basic Plan</p>
                    <p className="PRC_P">+</p>
                    <p className="PRC_P">2. Filter With Expense List</p>
                    <p className="PRC_P">3. Filter With Total Amount</p>
                    <p className="PRC_P">4. Filter With Ordering Expense List</p>
                    <button className="PRC_BTN" onClick={()=>handlePlanSelection("Ideal Plan")}>Get Ideal Plan</button>
                </div>
                <div className="PRC_DIV_D_BOX">
                    <p className="PRICE_P">₹1000<span className="PRICE_SP">/month</span></p>
                    <p className="PRICE_HD">Premium Plan</p>
                    <p className="PRC_P">1. Basic Plan</p>
                    <p className="PRC_P">+</p>
                    <p className="PRC_P">2. Ideal Plan</p>
                    <p className="PRC_P">+</p>
                    <p className="PRC_P">3. Document Creation Of Expense Data</p>
                    <p className="PRC_P">4. Chart Feature Of Expense Data</p>
                    <button className="PRC_BTN" onClick={()=>handlePlanSelection("Premium Plan")}>Get Premium Plan</button>
                </div>
            </div>
        </>
    );
}