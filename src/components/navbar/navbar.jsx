import React, { useState } from 'react';
import { FaBars, FaHome, FaSignInAlt, FaUserPlus, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '/logo.png';

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="flex border-b-2 border-[slate-100] bg-slate-900 z-10 items-center justify-between px-4 sticky top-0 py-4 border-slate-300/10 lg:mx-0">
      <div className="flex items-center justify-center gap-2 ">
        <img className="h-12 w-12 rounded-full" src={logo} alt="Logo" />
      </div>
      <div className="lg:hidden">
        {!showSidebar && (
          <button onClick={toggleSidebar}>
            <FaBars className="text-gray-300" />
          </button>
        )}
      </div>

      {/* Navbar Links (visible on larger screens) */}
      <nav className="hidden lg:flex gap-4 lg:space-x-4">
        <Link to="/" className="flex items-center text-gray-300 hover:text-cyan-400" onClick={closeSidebar}>
          <FaHome className="mr-2" /> Home
        </Link>
        <Link to="/signup" className="flex items-center text-gray-300 hover:text-cyan-400" onClick={closeSidebar}>
          <FaUserPlus className="mr-2" /> Sign Up
        </Link>
        <Link to="/signin" className="flex items-center text-gray-300 hover:text-cyan-400" onClick={closeSidebar}>
          <FaSignInAlt className="mr-2" /> Sign In
        </Link>
      </nav>

      {/* Sidebar (visible on mobile when toggled) */}
      {showSidebar && (
        <div className="lg:hidden absolute top-0 right-0 w-full h-full bg-opacity-50 z-10">
          <div className="absolute top-0 right-0 w-64 h-lvh bg-white shadow-lg">
            <div className="flex justify-between items-center px-4 py-2">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={toggleSidebar}>
                <FaTimes className="text-black" />
              </button>
            </div>
            <nav className="flex flex-col py-4 gap-4 ml-4 space-y-2">
              <Link to="/" className="flex items-center hover:text-cyan-400" onClick={closeSidebar}>
                <FaHome className="mr-2" /> Home
              </Link>
              <Link to="/signup" className="flex items-center hover:text-cyan-400" onClick={closeSidebar}>
                <FaUserPlus className="mr-2" /> Sign Up
              </Link>
              <Link to="/signin" className="flex items-center hover:text-cyan-400" onClick={closeSidebar}>
                <FaSignInAlt className="mr-2" /> Sign In
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
