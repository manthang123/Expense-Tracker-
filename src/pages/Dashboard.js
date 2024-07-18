import React, { useState, useEffect } from 'react';
import { addDoc, collection, query, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import { Table, Input, Select, Radio } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { auth, db } from "../config";
import Cards from '../components/Cards/cards';
import AddExpenseModal from '../components/Modals/AddExpense';
import AddIncomeModal from '../components/Modals/AddIncome';
import Loader from '../components/Loader';
import ChartsComponents from '../components/Charts/ChartsComponents';
import NoTransactions from '../components/NoTransactions';


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

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    if (!user) {
      toast.error("No user is authenticated");
      return;
    }

    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
  };

  const addTransaction = async (transaction) => {
    if (!user) {
      toast.error("No user is authenticated");
      return;
    }

    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction Added!");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  };

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
  };

  const fetchTransactions = () => {
    setLoading(true);
    setError(null);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let transactionsArray = [];
        querySnapshot.forEach((doc) => {
          transactionsArray.push({ id: doc.id, ...doc.data() });
        });
        setTransactions(transactionsArray);
        setLoading(false);
        toast.success("Transactions Fetched!");
      }, (err) => {
        console.error("Error fetching transactions: ", err);
        setError(err);
        setLoading(false);
        toast.error("Error fetching transactions");
      });
      return () => unsubscribe();
    }
    setLoading(false);
  };

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
          {transactions.length !== 0 ? <ChartsComponents /> : <NoTransactions />}
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
          <div className="my-5 flex items-center gap-4">
            <Input
              placeholder="Search by name"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-52 p-2 border rounded"
            />
            <Select
              className="w-32"
              placeholder="Filter by type"
              onChange={(value) => setTypeFilter(value)}
              allowClear
            >
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
            </Select>
            <Radio.Group
              onChange={(e) => setSortKey(e.target.value)}
              value={sortKey}
              className="flex items-center gap-2"
            >
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
