import React from 'react';
import { Card, Row } from 'antd';
import "./style.css";

function Cards({ 
    currentBalance,
    income,
    expenses,
    showExpenseModal,
    showIncomeModal,
    cardStyle,
    reset,
  }) {
    return (
      <Row className="my-row">
        <Card bordered={true} className="my-card">
          <h2>Current Balance</h2>
          <p>₹{currentBalance}</p>
          <div className="btn btn-blue" onClick={reset}>
            Reset Balance
          </div>
        </Card>
  
        <Card bordered={true} className="my-card">
          <h2>Total Income</h2>
          <p>₹{income}</p>
          <div className="btn btn-blue" onClick={showIncomeModal}>
            Add Income
          </div>
        </Card>
  
        <Card bordered={true} className="my-card">
          <h2>Total Expenses</h2>
          <p>₹{expenses}</p>
          <div className="btn btn-blue" onClick={showExpenseModal}>
            Add Expense
          </div>
        </Card>
      </Row>
    );
  }
  
  export default Cards;
