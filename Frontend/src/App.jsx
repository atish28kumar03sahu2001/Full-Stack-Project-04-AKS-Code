import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Welcome } from "./Pages/Welcome";
import { Header } from "./Pages/Header";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { UserPage } from "./Components/UserPage";
import { useSelector } from "react-redux";
import { Expense } from "./Components/Expense";
import { Pricing } from "./Components/Pricing";
export const App = () => {
    const user = useSelector((state) => state.userAuth);
    const ProtectedRoute = ({ children }) => {
        const storedUser = JSON.parse(localStorage.getItem('userInfo'));
        if (!storedUser) {
            return <Navigate to="/signup" />;
        }
        return children;
    };
    const RedirectIfLoggedIn = ({ children }) => {
        const storedUser = localStorage.getItem('userInfo');
        
        if (user || storedUser) {
            const parsedUser = storedUser ? JSON.parse(storedUser) : null;
            if (parsedUser && parsedUser._id) {
                return <Navigate to={`/user/${parsedUser._id}`} />;
            }
        }
        
        return children;
    };
    
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<RedirectIfLoggedIn><Welcome /></RedirectIfLoggedIn>} />
                    <Route path="/signup" element={<RedirectIfLoggedIn><Signup /></RedirectIfLoggedIn>} />
                    <Route path="/signin" element={<RedirectIfLoggedIn><Signin /></RedirectIfLoggedIn>} />
                    <Route path="/user/:id" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
                    <Route path="/user/:id/expense" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
                    <Route path="/user/:id/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
//userInfo