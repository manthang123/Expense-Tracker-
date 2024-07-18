import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards/cards';
import AddExpenseModal from '../components/Modals/AddExpense';
import AddIncomeModal from '../components/Modals/AddIncome';
import moment from 'moment';
import { addDoc, collection, query, onSnapshot } from "firebase/firestore";
import { auth, db } from "../config";
import { onAuthStateChanged } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../components/Loader';
import { Header } from 'antd/es/layout/layout';
import { Table, Input, Select, Radio } from 'antd';

const { Option } = Select;

const Dashboard = () => {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  // New state for filtering and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  // ... [rest of your existing useEffect hooks and functions]

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  // Filter and sort transactions
  const filteredAndSortedTransactions = transactions
    .filter((transaction) => {
      const searchMatch = searchTerm
        ? transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const typeMatch = typeFilter ? transaction.type === typeFilter : true;
      return searchMatch && typeMatch;
    })
    .sort((a, b) => {
      if (sortKey === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortKey === "amount") {
        return a.amount - b.amount;
      }
      return 0;
    });

  return (
    <div className="dashboard-container">
      <Toaster />
      <Header />
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <Cards
            currentBalance={currentBalance}
            income={income}
            expenses={expenses}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={(values) => onFinish(values, "expense")}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={(values) => onFinish(values, "income")}
          />
          <div style={{ margin: '20px 0' }}>
            <Input
              placeholder="Search by name"
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 200, marginRight: 16 }}
            />
            <Select
              style={{ width: 120, marginRight: 16 }}
              placeholder="Filter by type"
              onChange={(value) => setTypeFilter(value)}
              allowClear
            >
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
              <Option value="all">All</Option>
            </Select>
            <Radio.Group onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
              <Radio.Button value="">No Sort</Radio.Button>
              <Radio.Button value="date">Sort by Date</Radio.Button>
              <Radio.Button value="amount">Sort by Amount</Radio.Button>
            </Radio.Group>
          </div>
          <Table dataSource={filteredAndSortedTransactions} columns={columns} />
        </>
      )}
    </div>
  );
};

export default Dashboard;