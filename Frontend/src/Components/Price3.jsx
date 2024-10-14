//frontend/src/Components/Price3.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Expdoc } from './Expdoc';
import "../Styles/Price3.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getMonthFromDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'short' });
};

const aggregateExpensesByMonth = (expenses) => {
  const monthlyExpenses = {};

  expenses.forEach((expense) => {
    const month = getMonthFromDate(expense.expensedate);
    const amount = parseFloat(expense.expenseprice);

    if (monthlyExpenses[month]) { 
      monthlyExpenses[month] += amount; 
    } else { 
      monthlyExpenses[month] = amount; 
    }
  });

  return {
    labels: Object.keys(monthlyExpenses),
    data: Object.values(monthlyExpenses),
  };
};

export const Price3 = ({ filteredExpenses }) => {
  const aggregatedData = aggregateExpensesByMonth(filteredExpenses);
  const chartData = {
    labels: aggregatedData.labels,
    datasets: [
      {
        label: 'Total Expenses by Month',
        data: aggregatedData.data,
        backgroundColor: 'rgb(63, 9, 58)',
        borderColor: 'rgb(63, 9, 58)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expense Data Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100000,
        ticks: {
          stepSize: 10000,
          callback: function(value) {
            return value >= 1000 ? value / 1000 + 'K' : value;
          },
        },
      },
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 50,
          minRotation: 0,
          padding: 10,
        },
      },
    },
  };

  return (
    <>
      <div className='DIV_CHART_DIV_D'>
        <h2 className='DIV_CHART_H1'>Expenses Chart</h2>
      </div>
      <div className='DOC_DIV_D'>
        <Expdoc filteredExpenses={filteredExpenses} />
      </div>
      <div className='EXP_CHART'>
        <Bar className='EXP_BAR_CHART' data={chartData} options={chartOptions} width={1000} height={1000} />
      </div>

    </>
  );
};
