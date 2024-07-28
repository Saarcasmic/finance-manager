import React, { useEffect, useState } from 'react';
import { getExpenses, getIncomes,deleteExpense, deleteIncome } from '../services/api';
import AddExpense from './AddExpense';
import AddIncome from './AddIncome';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    const fetchedExpenses = await getExpenses(token);
    const fetchedIncomes = await getIncomes(token);
    setExpenses(fetchedExpenses);
    setIncomes(fetchedIncomes);
  };

  const handleDeleteExpense = async (e, id) => {
    e.preventDefault();
    try {
      await deleteExpense(id, token);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteIncome = async (e, id) => {
    e.preventDefault();
    try {
      await deleteIncome(id, token);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchData();
  }, [token]);


  return (
    <div className="container mx-auto mt-8 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Expense</h3>
          <AddExpense token={token}  reloadData={fetchData}/>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Income</h3>
          <AddIncome token={token}  reloadData={fetchData}/>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Expenses</h3>
          <ul className="space-y-2">
            {expenses.map((expense) => (
              <li key={expense._id} className="flex justify-between text-gray-700">
                <span>{expense.category}</span>
                <span>{expense.amount}</span>
                <button className="text-red-500" onClick={(e) => handleDeleteExpense(e, expense._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Incomes</h3>
          <ul className="space-y-2">
            {incomes.map((income) => (
              <li key={income._id} className="flex justify-between text-gray-700">
                <span>{income.source}</span>
                <span>{income.amount}</span>
                <button className="text-red-500" onClick={(e) => handleDeleteIncome(e, income._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
