import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">Home</Link>
        <div>
          <Link to="/login" className="text-white mr-6 hover:text-gray-200 transition duration-300">Login</Link>
          <Link to="/register" className="text-white hover:text-gray-200 transition duration-300">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
