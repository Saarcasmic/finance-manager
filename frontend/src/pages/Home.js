import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 opacity-50"></div>
      <div className="relative z-10 text-center p-10 bg-white shadow-lg rounded-lg max-w-3xl">
        <h1 className="text-7xl font-bold text-gray-800 mb-6 transition-transform transform hover:scale-105 duration-300">
          Welcome to Money Minder
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          Your personal finance manager designed to help you track your expenses and incomes seamlessly.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Take control of your financial future by managing your budget with ease and insight.
        </p>
        <div className="flex justify-center mb-10">
          <button
            onClick={handleGetStarted} // Call the function on button click
            className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why Choose Money Minder?</h2>
          <ul className="list-disc list-inside text-left text-gray-600">
            <li className="mb-2">📊 <strong>Track Expenses:</strong> Easily log and categorize your spending.</li>
            <li className="mb-2">💰 <strong>Manage Incomes:</strong> Keep tabs on your earnings for better budgeting.</li>
            <li className="mb-2">🔒 <strong>Secure Authentication:</strong> Your data is protected with JWT authentication.</li>
            <li className="mb-2">📈 <strong>Visual Insights:</strong> Analyze your financial habits with intuitive graphs and charts.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
