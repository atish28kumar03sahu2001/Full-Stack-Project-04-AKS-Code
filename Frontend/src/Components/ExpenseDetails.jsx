//frontend/src/Components/ExpenseDetails.jsx
import React from "react";
import ReactDOM from "react-dom";
import { MdCancel } from "react-icons/md";
import '../Styles/ExpenseDetails.css';

export const ExpenseDetails = ({expenseData, onClose}) => {
    return ReactDOM.createPortal(
        <>
            <div className="player-modal-container">
                <button className="close-btn" onClick={onClose}><MdCancel size={24} color="red" /></button>
                <div className="player-modal-content">
                    <div className="Expense-Details">
                        <p><strong>Expense Id: </strong>{expenseData.expenseid}</p>
                        <p><strong>Expense Name: </strong>{expenseData.expensename}</p>
                        <p><strong>Expense About: </strong>{expenseData.expenseabout}</p>
                        <p><strong>Expense Option: </strong>{expenseData.expenseoption}</p>
                        <p><strong>Expense Price: </strong>{expenseData.expenseprice}</p>
                        <p><strong>Expense Date: </strong>{new Date(expenseData.expensedate).toLocaleDateString('en-US')}</p>
                    </div>
                </div>
            </div>
        </>, document.getElementById('root1')
    );
}
