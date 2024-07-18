import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

const PiggyBank = () => {
  const initialGoal = parseFloat(localStorage.getItem('piggybank_goal')) || 0;
  const initialBalance = parseFloat(localStorage.getItem('piggybank_balance')) || 0;
  const initialToken = parseInt(localStorage.getItem('piggybank_token')) || 0;
  const initialDailyTotal = parseFloat(localStorage.getItem('piggybank_dailyTotal')) || 0;
  const initialLastSaveTime = parseInt(localStorage.getItem('piggybank_lastSaveTime')) || null;
  const initialLastDate = localStorage.getItem('piggybank_lastDate') || new Date().toDateString();

  const [goal, setGoal] = useState(initialGoal);
  const [balance, setBalance] = useState(initialBalance);
  const [input, setInput] = useState('');
  const [token, setToken] = useState(initialToken);
  const [dailyTotal, setDailyTotal] = useState(initialDailyTotal);
  const [lastSaveTime, setLastSaveTime] = useState(initialLastSaveTime);
  const [lastDate, setLastDate] = useState(initialLastDate);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const currentDate = new Date().toDateString();
    if (currentDate !== lastDate) {
      setGoal(0);
      setDailyTotal(0);
      setLastDate(currentDate);
    }

    localStorage.setItem('piggybank_goal', goal.toString());
    localStorage.setItem('piggybank_balance', balance.toString());
    localStorage.setItem('piggybank_token', token.toString());
    localStorage.setItem('piggybank_dailyTotal', dailyTotal.toString());
    localStorage.setItem('piggybank_lastSaveTime', lastSaveTime ? lastSaveTime.toString() : '');
    localStorage.setItem('piggybank_lastDate', lastDate);
  }, [goal, balance, token, dailyTotal, lastSaveTime, lastDate]);

  const handleSave = () => {
    const amount = parseFloat(input);
    if (!isNaN(amount) && dailyTotal + amount <= 500) {
      setGoal(goal + amount);
      setBalance(balance + amount);
      setDailyTotal(dailyTotal + amount);
      setInput('');
      if (goal + amount >= 500) {
        setToken(token + 1);
        setLastSaveTime(new Date().getTime());
      }
    } else {
      alert('You can only save up to $500 per day.');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setGoal(0);
    setDailyTotal(0);
    setLastDate(date.toDateString());
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r black space-y-4 p-4">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <div className="bg-white p-2 rounded-lg shadow-md text-center border-2 border-blue-500">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            customInput={<FaCalendarAlt className="text-black text-2xl cursor-pointer" />}
          />
        </div>
        <div className="bg-white p-2 rounded-lg shadow-md text-center border-2 border-blue-500">
          <h2 className="text-lg font-bold text-blue-700">Tokens</h2>
          <p className="text-md font-semibold text-gray-600">{token}</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center space-x-4">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Today's Goal</h2>
          <p className="text-xl font-semibold text-gray-600">${goal.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Current Balance</h2>
          <p className="text-xl font-semibold text-gray-600">${balance.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Save Amount</h2>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border rounded p-2 mb-4 w-full text-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter amount"
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white font-bold p-2 rounded w-full hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PiggyBank;