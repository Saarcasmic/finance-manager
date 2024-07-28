import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    // Check login status (this is a simple example, adapt it to your authentication logic)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Handle logout logic (e.g., remove token from local storage)
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    history("/");
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">Home</Link>
        <div>
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="text-white mr-6 hover:text-gray-200 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-6 hover:text-gray-200 transition duration-300">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-200 transition duration-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
