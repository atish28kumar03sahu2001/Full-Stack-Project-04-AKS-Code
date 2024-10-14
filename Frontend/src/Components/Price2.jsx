//frontend/src/Components/Price2.jsx
import React, { useState } from "react";
import "../Styles/Price2.css";
import "../Styles/Price1.css";
import { TbSortDescendingLetters, TbSortAscendingLetters } from "react-icons/tb";
export const Price2 = ({ totalAmount, HandleSortAscending, HandleSortDescending, numOfExpenses, numOfTypes, setSearchTerm, filteredTotal, onFilterByDate,}) => {

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const handleDateFilter = () => {
        if (fromDate && toDate) {
            onFilterByDate(fromDate, toDate);
        } else {
            alert("Please select both dates.");
        }
    };

    return (
        <>
            <div className="PRC2_DIV_D_BOX">
                <div className="PRC2_DIV_D1">
                    <div className="PRC2_DIV_D1_P">
                        <p className="PRC2_D1_P">Total Expense: </p>&nbsp;&nbsp;&nbsp;&nbsp;
                        <p className="PRC2_D1_P">{totalAmount.toFixed(2)} ₹</p>
                    </div>
                    <div className="PRC2_DIV_D1_BTN">
                        <button onClick={HandleSortDescending} className="SORT_BTN"><TbSortDescendingLetters size={20} color="white" /></button>
                        <button onClick={HandleSortAscending} className="SORT_BTN"><TbSortAscendingLetters size={20} color="white" /></button>
                    </div>
                    <div className="PRC2_DIV_D1_DTL">
                        <p className="DTL_P1">Expenses<br /><span className="VL">{numOfExpenses}</span></p>
                        <p className="DTL_P1">Types<br /><span className="VL">{numOfTypes}</span></p>
                    </div>
                </div>
                <div className="PRC2_DIV_D2">
                    <div className="PRC2_DT_DIV_D">
                        <input className="SRC_IP" type="text" placeholder="Search..." title="Enter Expense Name" onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="DATE_DIV_D">
                        <input className="DATE_D" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                        <input className="DATE_D" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    </div>
                    <div className="BUTN_DIV_D">
                        <button className="BUTN_D" onClick={handleDateFilter}>Click Here!</button>
                    </div>
                    <div className="FAM_DIV_D">
                        <p className="FAM_D_P">Filtered Total: </p>
                        <p className="FAM_D_P">{filteredTotal.toFixed(2)} ₹</p>
                    </div>
                </div>
            </div>
        </>
    );
}
