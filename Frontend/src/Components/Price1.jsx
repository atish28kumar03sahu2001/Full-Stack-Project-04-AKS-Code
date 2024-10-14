//frontend/src/Components/Price1.jsx
import React from "react";
import "../Styles/Price1.css";
import { TbSortDescendingLetters, TbSortAscendingLetters } from "react-icons/tb";
export const Price1 = ({ totalAmount, HandleSortAscending, HandleSortDescending }) => {
    return (
        <>
            <div className="PRICE_DIV_D_BOX">
                <p className="PRICE_DIV_TOTAL">Total Expense Amount: {totalAmount.toFixed(2)} ₹</p>
                <div className="PRICE_DIV_D_SORT">
                    <button onClick={HandleSortDescending} className="SORT_BTN"><TbSortDescendingLetters size={20} color="white" /></button>
                    <button onClick={HandleSortAscending} className="SORT_BTN"><TbSortAscendingLetters size={20} color="white" /></button>
                </div>
            </div>
        </>
    );
}