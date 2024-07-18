import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import moment from 'moment';

function ChartsComponents({ sortedTransactions }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Sort transactions by date and set state
    const sortedTransactionsByDate = sortedTransactions.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    setTransactions(sortedTransactionsByDate);
  }, [sortedTransactions]);

  // Map transactions to the format expected by the chart
  const chartData = transactions.map(transaction => ({
    date: moment(transaction.date).format('YYYY-MM-DD'),
    amount: transaction.amount,
  }));

  const config = {
    data: chartData,
    xField: 'date',
    yField: 'amount',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  return (
    <div className="charts-container">
      <Line {...config} />
    </div>
  );
}

export default ChartsComponents;
