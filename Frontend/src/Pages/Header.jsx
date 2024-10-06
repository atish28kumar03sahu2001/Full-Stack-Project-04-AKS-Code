//frontend/src/Pages/Header.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import "../Styles/Header.css";
export const Header = () => {
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const isUserLoggedIn = user || localStorage.getItem('userInfo');
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    const userId = storedUser ? storedUser._id : '';

    const isSignupPage = location.pathname === "/signup" || location.pathname === "/signin" || location.pathname.startsWith("/user/");
    return (
        <>
            <div className="HDR_DIV_H1">
                <Link to="/" className="HDR_H1">ClearExpense</Link>
                {!isSignupPage && !isUserLoggedIn && (
                    <div className="MBH_SG_H_DIV">
                        <Link to="/signup" className="HDR_SGUP">SignUp</Link>
                    </div>
                )}
                {isUserLoggedIn && (
                    <div className="MBH_BTNS_DIV">
                        <Link to={`/user/${userId}`}>User</Link>
                        <Link to={`/user/${userId}/expense`}>Expense</Link>
                        <Link to={`/user/${userId}/pricing`}>Pricing</Link>
                    </div>
                )}
            </div>
        </>
    );
}