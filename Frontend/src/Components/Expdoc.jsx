//frontend/src/Components/Expdoc.jsx
import React from "react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import "../Styles/Price3.css";

export const Expdoc = ({ filteredExpenses }) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // Function to group expenses by month and year
    const groupByMonth = (expenses) => {
        const monthsTotal = {};

        expenses.forEach(expense => {
            const expensePrice = parseFloat(expense.expenseprice);  // Convert string to number
            const expenseDate = new Date(expense.expensedate);
            const monthYear = expenseDate.toLocaleString('default', { month: 'long', year: 'numeric' }); // e.g., "January 2024"
            
            // Accumulate total expenses per month
            if (!monthsTotal[monthYear]) {
                monthsTotal[monthYear] = 0;
            }
            monthsTotal[monthYear] += expensePrice;
        });

        return monthsTotal;
    };

    const generatePDF = (filteredExpenses) => {
        const doc = new jsPDF();
        const tableColumn = ["Expense ID", "Expense Name", "Expense About", "Expense Price", "Expense Date", "Expense Option"];
        const tableRows = [];
        let totalExpense = 0;

        const uniqueTypes = new Set(filteredExpenses.map(expense => expense.expenseoption));
        
        // Prepare main expense data
        filteredExpenses.forEach(expense => {
            const expensePrice = parseFloat(expense.expenseprice);
            totalExpense += expensePrice;

            const expenseData = [
                expense.expenseid, 
                expense.expensename, 
                expense.expenseabout || "N/A", 
                expensePrice.toFixed(2), 
                new Date(expense.expensedate).toLocaleDateString('en-US'), 
                expense.expenseoption  
            ];
            tableRows.push(expenseData);
        });
        
        // Add user information and table
        doc.text("Expense List", 14, 20);
        doc.text(`UserId: ${userInfo?._id}`, 14, 30);
        doc.text(`UserName: ${userInfo?.username}`, 14, 40);
        doc.text(`UserEmail : ${userInfo?.useremail}`, 14, 50);
        autoTable(doc, { head: [tableColumn], body: tableRows, startY: 70 });

        // Add summary below the table
        doc.text(`Number Of Expenses: ${filteredExpenses.length}`, 14, doc.previousAutoTable.finalY + 10);
        doc.text(`Total Expense Types: ${uniqueTypes.size}`, 14, doc.previousAutoTable.finalY + 20);
        doc.text(`Total Expense: ${totalExpense.toFixed(2)}/-`, 14, doc.previousAutoTable.finalY + 30);

        // Group expenses by month and calculate totals
        const monthsTotal = groupByMonth(filteredExpenses);

        // Prepare data for the "Month Name" & "Total In Month" table
        const monthTableRows = Object.keys(monthsTotal).map(month => [
            month, 
            monthsTotal[month].toFixed(2) // Format the total expense per month
        ]);

        // Add the new table for monthly totals
        autoTable(doc, {
            head: [["Month Name", "Total In Month"]],
            body: monthTableRows,
            startY: doc.previousAutoTable.finalY + 40 // Position this table below the summary
        });

        // Save the PDF
        doc.save("expenses.pdf");
    };

    return (
        <div>
            <button className="DOC_BTN" onClick={() => generatePDF(filteredExpenses)}>Create Document</button>
        </div>
    );
}
