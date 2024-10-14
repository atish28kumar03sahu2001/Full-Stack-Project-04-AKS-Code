//frontend/src/Pages/Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import "../Styles/Header.css";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const isUserLoggedIn = user || localStorage.getItem('userInfo');
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    const userId = storedUser ? storedUser._id : '';

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

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
                        <Link to={`/user/${userId}`} className="MBH_SG_H_MENU">User</Link>
                        <Link to={`/user/${userId}/expense`} className="MBH_SG_H_MENU">Expense</Link>
                        <Link to={`/user/${userId}/pricing`} className="MBH_SG_H_MENU">Pricing</Link>
                    </div>
                )}
                <div className="ICN_DIV_MENU" onClick={toggleMenu}>
                    {!menuOpen ? ( <FaBars className="NAVBAR_BAR" size={30} color="white" />) : 
                        (<RxCross1 className="NAVBAR_BAR" size={30} color="white" />)}
                </div>
                {menuOpen && (
                    <div className="MBH_SG_H_DIV_MENU">
                        {!isUserLoggedIn && (
                            <>
                                <Link to="/signup" className="MBH_SG_H_MENU">SignUp</Link>
                                <Link to="/signin" className="MBH_SG_H_MENU">SignIn</Link>
                                <Link to="/" className="MBH_SG_H_MENU">ClearExpense</Link>
                            </>
                        )}
                        {isUserLoggedIn && (
                            <>
                                <Link to={`/user/${userId}`} className="MBH_SG_H_MENU">User</Link>
                                <Link to={`/user/${userId}/expense`} className="MBH_SG_H_MENU">Expense</Link>
                                <Link to={`/user/${userId}/pricing`} className="MBH_SG_H_MENU">Pricing</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}