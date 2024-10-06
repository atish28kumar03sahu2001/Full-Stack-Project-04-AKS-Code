//frontend/sr/Pages/Welcome.jsx
import React from "react";
import "../Styles/Welcome.css";
import { Link } from "react-router-dom";
export const Welcome = () => {
    return (
        <>
            <div className="DIV_HD1_H1">
                <h1 className="H1_DIV">Welcome To</h1>
                <h1 className="H1_DIV">ClearExpense App</h1>
            </div>
            <div className="CLICK_LINK_DIV">
                <Link to="/signup" className="CLICK_LNK">Click Here!</Link>
            </div>
            <div className="DIV_HD2_PP">
                <p className="DIV_PP">ClearExpense is a comprehensive full-stack expense management solution designed to simplify personal and business financial tracking. With its robust authentication system, ClearExpense ensures a secure environment where users can seamlessly create, update, and manage their accounts. The platform allows users to easily track their expenses with full CRUD (Create, Read, Update, Delete) operations, providing them with complete control over their financial data. One of the key features of ClearExpense is its powerful data visualization capabilities. Users can view their spending patterns through intuitive charts, breaking down their expenses by day, month, and year. This visual representation helps users better understand their financial habits, making it easier to manage budgets and track where their money is going.</p>
                <p className="DIV_PP">For administrators, ClearExpense offers a dashboard to monitor user activity. Admins can view user account details, track how many expenses each user has recorded, and analyze user activity through charts. This feature makes ClearExpense a valuable tool for both individual users and businesses that need to keep an eye on their employees' spending habits. Additionally, ClearExpense includes document generation capabilities, allowing users to download detailed reports of their expenses. These reports can be exported by day, month, or year, providing flexible reporting options for users who need to keep accurate financial records for personal or professional purposes. The platform also offers a user-friendly profile management system. Users can update their personal information and keep their accounts up to date with ease. Whether you're an individual looking to manage your personal budget or a business in need of streamlined expense reporting, ClearExpense delivers an efficient, user-friendly experience with cutting-edge features that make financial management a breeze.</p>
            </div>
        </>
    );
}