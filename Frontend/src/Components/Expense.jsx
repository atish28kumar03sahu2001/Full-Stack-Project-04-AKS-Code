//frontend/src/Components/Expense.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBookmark, FaEye } from "react-icons/fa";
import { MdCancel, MdDelete, MdEdit } from "react-icons/md";
import "../Styles/Expense.css";
import { addExpense, fetchExpenses, deleteExpense, updateExpense } from "../Redux/actions/expenseActions";
import { ExpenseDetails } from "./ExpenseDetails";
import { Price1 } from "./Price1";
import { Price2 } from "./Price2";
import { Price3 } from './Price3';

export const Expense = () => {
    //STATE DEFINITION
    const [formVisibility, setFormVisibility] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [sortedExpenses, setSortedExpenses] = useState([]);
    const [numOfTypes, setNumOfTypes] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [filteredTotal, setFilteredTotal] = useState(0);
    const [dateFilteredExpenses, setDateFilteredExpenses] = useState([]);
    
    const dispatch = useDispatch();
    const { loading, expenses } = useSelector((state) => state.expense);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userId = userInfo?._id;
    const plan = userInfo?.userplan;

    // CLOSE MODAL FUNCTION
    const HandleCloseModal = () => {
        setSelectedExpense(null);
    };

    // SHOW FORM HANDLERS
    const HandleShowForm = () => {
        setIsUpdateMode(false); setFormVisibility(true); HandleCloseModal();
    };

    // CLOSE FORM HANDLERS
    const HandleCancelForm = (e) => {
        e.preventDefault();
        setFormVisibility(false); setSelectedExpense(null);
    };

    //SUBMIT HANDLER TO SAVE THE DATA IN DATABASE
    const SubmitHandler = async (e) => {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        let formObj = Object.fromEntries(formData.entries());

        if (isUpdateMode) {
            await dispatch(updateExpense(selectedExpense._id, formObj, userId));
        } else {
            await dispatch(addExpense(formObj, userId));
        }

        await dispatch(fetchExpenses(userId));
        form.reset();
        setFormVisibility(false); setSelectedExpense(null); 
    };

    //LOAD EXPENSES ON MOUNT
    useEffect(() => {
        const loadExpenses = async () => {
            await dispatch(fetchExpenses(userId));
        };
        loadExpenses();
    }, [dispatch, userId]);

    //CALCULATE THE TOTAL AMOUNT AND UNIQUE EXPENSE TYPES
    useEffect(() => {
        if (expenses && expenses.length > 0) {
            const total = expenses.reduce((acc, curr) => acc + parseFloat(curr.expenseprice || 0), 0);
            setTotalAmount(total);
            setSortedExpenses([...expenses]);

            const uniqueTypes = new Set(expenses.map(expense => expense.expenseoption));
            setNumOfTypes(uniqueTypes.size);
        }
    }, [expenses]);

    //SEARCH FUNCTIONALITY USING DEBOUNCED CONCEPT
    const debouncedSearch = useCallback((term) => {
        const lowerCaseTerm = term.toLowerCase();
        if (term === "all" || term === "ALL" || term === "All") {
            setFilteredExpenses(sortedExpenses);
        } else {
            const filtered = sortedExpenses.filter(expense =>
                expense.expensename.toLowerCase().includes(lowerCaseTerm) || 
                expense.expenseoption.toLowerCase().includes(lowerCaseTerm)
            );
            setFilteredExpenses(filtered);
        }
    }, [sortedExpenses]);

    //USE USEEFFECT HOOK FOR THE SEARCH FUNCTIONALITY USING DEBOUNCED CONCEPT
    useEffect(() => {
        const handler = setTimeout(() => {
            debouncedSearch(searchTerm);
        }, 1000);
        return () => clearTimeout(handler);
    }, [searchTerm, debouncedSearch]);

    //GET THE FILTERED EXPENSE TYPES    
    const FilterTypes = () => {
        const uniqueTypes = new Set(filteredExpenses.map(expense => expense.expenseoption));
        setNumOfTypes(uniqueTypes.size);
    };

    //GET THE FILTERED EXPENSE DATA TOTAL AMOUNT
    useEffect(() => {
        if (filteredExpenses.length > 0) {
            const filteredTotal = filteredExpenses.reduce((acc, curr) => acc + parseFloat(curr.expenseprice || 0), 0);
            setFilteredTotal(filteredTotal);
            FilterTypes();
        } else {
            setFilteredTotal(0);
            setNumOfTypes(0);
        }
    }, [filteredExpenses]);

    //SORT THE EXPENSE DATA IN ASCENDING ORDER USING `expensename`
    const HandleSortAscending = () => {
        const sorted = [...filteredExpenses].sort((a, b) => a.expensename.localeCompare(b.expensename));
        setFilteredExpenses(sorted);
    };

    //SORT THE EXPENSE DATA IN DESCENDING ORDER USING `expensename`
    const HandleSortDescending = () => {
        const sorted = [...filteredExpenses].sort((a, b) => b.expensename.localeCompare(a.expensename));
        setFilteredExpenses(sorted);
    };
    
    //EDIT THE PARTICULAR EXPENSE DATA
    const HandleEditExpense = (ExpData) => {
        setSelectedExpense(ExpData); setIsUpdateMode(true); setFormVisibility(true); setEditModal(false);
    };

    //SEE THE EXPENSE DETAILS OF AN PARTICULAR EXPENSE DATA
    const HandleViewExpense = (ExpData) => {
        setSelectedExpense(ExpData); setEditModal(true);
    };

    //DELETE THE PARTICULAR EXPENSE DATA USING EXPENSEID AND USERID
    const HandleDelete = async (id) => {
        await dispatch(deleteExpense(id, userId));
    };

    //POPULATE THE DATA IN FORM DURING EDIT FUNCTIONALITY
    useEffect(() => {
        if (isUpdateMode && formVisibility) {
            document.getElementById("expenseid").value = selectedExpense?.expenseid || "";
            document.getElementById("expensename").value = selectedExpense?.expensename || "";
            document.getElementById("expenseabout").value = selectedExpense?.expenseabout || "";
            document.getElementById("expenseprice").value = selectedExpense?.expenseprice || "";
            document.getElementById("expensedate").value = selectedExpense?.expensedate?.split('T')[0] || "";
            document.getElementById("expenseoption").value = selectedExpense?.expenseoption || "";
        }
    }, [selectedExpense, isUpdateMode, formVisibility]);

    //FILTER THE ENTIRE EXPENSE DATA FROM SPECIFIC DATE RANGE.
    const filterExpensesByDate = (fromDate, toDate) => {
        const filtered = expenses.filter((expense) => {
            const expenseDate = new Date(expense.expensedate);
            return (
                expenseDate >= new Date(fromDate) && expenseDate <= new Date(toDate)
            );
        });
        setDateFilteredExpenses(filtered);
    };

    useEffect(() => {
        if (dateFilteredExpenses.length > 0) {
            setFilteredExpenses(dateFilteredExpenses);
        } else {
            setFilteredExpenses(sortedExpenses);
        }
    }, [dateFilteredExpenses, sortedExpenses]);

    return (
        <>
            <div className="EXP_FRM_DIV_D">
                {!formVisibility && (
                    <div className="BTN_DIV">
                        <button className="BTN_DIV_D" onClick={HandleShowForm}><p className="BTN_P">Expense Form</p></button>
                    </div>
                )}
                {formVisibility && (
                    <div className="EXP_FRM_D">
                        <form className="FRM_FORM_D" onSubmit={SubmitHandler}>
                            <div className="FRM_LBL_IPS">
                                <label htmlFor="expenseid" className="FRM_IP_LBL">Expense Id</label>
                                <input required className="FRM_IP_IP" type="text" placeholder="Enter Expense Id" id="expenseid" name="expenseid" />
                            </div>
                            <div className="FRM_LBL_IPS">
                                <label htmlFor="expensename" className="FRM_IP_LBL">Expense Name</label>
                                <input required className="FRM_IP_IP" type="text" placeholder="Enter Expense Name" id="expensename" name="expensename" />
                            </div>
                            <div className="FRM_LBL_IPS">
                                <label htmlFor="expenseabout" className="FRM_IP_LBL">Expense About</label>
                                <input required className="FRM_IP_IP" type="text" placeholder="Enter Expense About" id="expenseabout" name="expenseabout" />
                            </div>
                            <div className="FRM_LBL_IPS">
                                <label htmlFor="expenseprice" className="FRM_IP_LBL">Expense Price</label>
                                <input required className="FRM_IP_IP" type="text" placeholder="Enter Expense Price" id="expenseprice" name="expenseprice" />
                            </div>
                            <div className="FRM_LBL_IPS">
                                <label htmlFor="expensedate" className="FRM_IP_LBL">Expense Date</label>
                                <input required className="FRM_IP_IP" type="date" id="expensedate" name="expensedate" />
                            </div>
                            <div className="FRM_LBL_IPS">
                                <label htmlFor="expenseoption" className="FRM_IP_LBL">Expense Options</label>
                                <select required className="FRM_IP_IP" id="expenseoption" name="expenseoption">
                                    <option value="" hidden>Choose Options</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Food">Food</option>
                                    <option value="Rent">Rent</option>
                                    <option value="EMI">EMI</option>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Grocery">Grocery</option>
                                    <option value="Payment">Payment</option>
                                    <option value="Shopping">Shopping</option>
                                </select>
                            </div>
                            <div className="FRM_LBL_BTN">
                                <button className="BTN_DIV_D" type="submit"><p className="BTN_P">{isUpdateMode ? 'Update' : 'Submit'}</p><FaBookmark size={18} color="white" /></button>
                                <button className="BTN_DIV_D" onClick={HandleCancelForm}><p className="BTN_P">Cancel</p><MdCancel size={18} color="white" /></button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            {plan === "Basic Plan" && <Price1 totalAmount={totalAmount} HandleSortAscending={HandleSortAscending} HandleSortDescending={HandleSortDescending} /> }
            {plan === "Ideal Plan" && <Price2 totalAmount={totalAmount} HandleSortAscending={HandleSortAscending} HandleSortDescending={HandleSortDescending} numOfExpenses={filteredExpenses.length} numOfTypes={numOfTypes} setSearchTerm={setSearchTerm} filteredTotal={filteredTotal} onFilterByDate={filterExpensesByDate} /> }
            {plan === "Premium Plan" && <Price2 totalAmount={totalAmount} HandleSortAscending={HandleSortAscending} HandleSortDescending={HandleSortDescending} numOfExpenses={filteredExpenses.length} numOfTypes={numOfTypes} setSearchTerm={setSearchTerm} filteredTotal={filteredTotal} onFilterByDate={filterExpensesByDate} /> }

            <div className="EXP_DIV_D_LST">
                <div className="EXP_DIV_D_HD1"><h1 className="EXP_DIV_H1">Expense List</h1></div>
                {loading ? (
                    <p style={{textAlign: "center", fontSize: "15px", color: "rgb(63, 9, 58)"}}>Loading expenses...</p>
                ) : (
                    <div>
                        {filteredExpenses.map((expense) => (
                            <div key={expense._id} className="EXP_DIV_LST">
                                <p className="EXP_LST_P">{expense.expensename}</p>
                                <div className="EXP_LST_BTN_DIV">
                                    <button className="EXP_LST_BTN" onClick={() => HandleViewExpense(expense)}><FaEye size={20} color="white" /></button>
                                    <button className="EXP_LST_BTN" onClick={() => HandleEditExpense(expense)}><MdEdit size={20} color="white" /></button>
                                    <button className="EXP_LST_BTN" onClick={() => HandleDelete(expense._id)}><MdDelete size={20} color="white" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {selectedExpense && editModal && <ExpenseDetails expenseData={selectedExpense} onClose={HandleCloseModal} />}
            { plan === "Premium Plan" && <Price3 filteredExpenses={filteredExpenses} />}
        </>
    );
};
