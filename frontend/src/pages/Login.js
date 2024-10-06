import React, { useState, useContext } from 'react';
import { loginn } from '../services/api';  // Ensure this API call is correct
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';  // Ensure this imports correctly
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginn({ email, password });
      localStorage.setItem('token', data.token);
      login(data.token);
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        console.error('Backend returned error:', error.response.data);
      } else {
        console.error('Unknown error occurred:', error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold text-center text-gray-800">Welcome Back!</h2>
        <p className="text-center text-gray-600">Please enter your credentials to log in</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account? 
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500"> Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
