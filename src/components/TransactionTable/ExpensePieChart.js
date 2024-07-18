import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = ({ transactions }) => {
  // Filter only expense transactions
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  // Group expenses by tag
  const expensesByTag = expenseTransactions.reduce((acc, transaction) => {
    acc[transaction.tag] = (acc[transaction.tag] || 0) + transaction.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(expensesByTag),
    datasets: [
      {
        data: Object.values(expensesByTag),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Expenses by Category',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default ExpensePieChart;