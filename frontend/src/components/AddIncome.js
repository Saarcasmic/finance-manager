import React, { useState } from 'react';
import { addIncome } from '../services/api';

const AddIncome = ({ token,reloadData  }) => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const incomeData = { source, amount };
      await addIncome(incomeData, token);
      alert('Income added successfully!');
      setSource('');
      setAmount('');
      reloadData();
    } catch (error) {
      console.error('Error adding income:', error);
      alert('Failed to add income. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="source" className="block text-sm font-medium text-gray-700">
          Source
        </label>
        <input
          type="text"
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Source"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Income
      </button>
    </form>
  );
};

export default AddIncome;
