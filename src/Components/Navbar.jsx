import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import {
  FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt,
  FaEnvelope, FaClock, FaYoutube
} from "react-icons/fa";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.error("Logout error:", error));
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 shadow">
      {/* Top Info Bar */}
      <div className="hidden md:flex justify-between items-center px-6 py-2 text-sm bg-[#0D1128] text-lime-400 font-medium">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><FaPhoneAlt /> + (1800) 456 7890</span>
          <span className="flex items-center gap-1"><FaEnvelope /> info@query.com</span>
          <span className="flex items-center gap-1"><FaClock /> Mon-Sat: 10 am to 7 pm</span>
        </div>
        <div className="flex gap-3 text-lime-300 text-lg">
          <Link to={'https://www.facebook.com'}><FaFacebookF className="hover:text-white cursor-pointer" /></Link>
          <Link to={'https://twitter.com'}><FaTwitter className="hover:text-white cursor-pointer" /></Link>
          <Link to={'https://www.youtube.com'}><FaYoutube className="hover:text-white cursor-pointer" /></Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar max-w-[1400px] mx-auto bg-[#0D1128] text-white px-4 lg:px-10">
        {/* Logo & Mobile Hamburger */}
        <div className="navbar-start">
          <div className="lg:hidden">
            <div className="dropdown">
              <button tabIndex={0} className="btn btn-ghost text-lime-400 hover:bg-lime-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow bg-[#1c1f3b] rounded-lg w-52 text-white space-y-2">
                {['/', '/about', '/features', '/queries'].map((path, i) => (
                  <li key={i}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        isActive ? "text-lime-400 font-semibold" : "hover:text-lime-300 transition"
                      }>
                      {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                    </NavLink>
                  </li>
                ))}
                {user && (
                  <>
                    <li><NavLink to="/recommendations-for-me">Recommendations for Me</NavLink></li>
                    <li><NavLink to="/my-queries">My Queries</NavLink></li>
                    <li><NavLink to="/my-recommendations">My Recommendations</NavLink></li>
                    <li><NavLink to="/add-query">Add Query</NavLink></li>
                    {/* <li><NavLink to="/dashboard">Dashboard</NavLink></li> */}
                  </>
                )}
                <li>
                  {!user ? (
                    <Link to="/login" className="text-lime-400">Login</Link>
                  ) : (
                    <button onClick={handleSignOut} className="text-red-400">Logout</button>
                  )}
                </li>
              </ul>
            </div>
          </div>

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 font-bold text-xl">
            <img className="w-8 h-8 ml-1" src="https://i.ibb.co/39WLdycb/image.png" alt="RecoSys" />
            <span className="text-sm md:text-2xl">RecoSys</span>
          </NavLink>
        </div>

        {/* Desktop Nav */}
        <div className="navbar-center hidden lg:flex space-x-6 font-medium">
          {['/', '/about', '/features', '/queries'].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                isActive ? "text-lime-400 border-b-2 border-lime-400 pb-1"
                  : "hover:text-lime-300 transition"
              }>
              {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}

          {/* Hover Dropdown */}
          {user && (
            <div className="relative group">
              <button className="flex items-center px-4 py-2 text-white bg-gray-800 rounded-md focus:outline-none hover:bg-lime-500 hover:text-black transition">
                <span className="font-medium">Query Options</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-300 group-hover:text-black"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute left-0 mt-2 w-48 bg-[#1c1f3b] rounded-md shadow-lg py-1 z-10 
                opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                transition-all duration-300 ease-in-out">
                <NavLink to="/recommendations-for-me" className="block px-4 py-2 text-sm hover:bg-lime-500 hover:text-black rounded-md mx-1 my-1">Recommendations for Me</NavLink>
                <NavLink to="/my-queries" className="block px-4 py-2 text-sm hover:bg-lime-500 hover:text-black rounded-md mx-1 my-1">My Queries</NavLink>
                <NavLink to="/my-recommendations" className="block px-4 py-2 text-sm hover:bg-lime-500 hover:text-black rounded-md mx-1 my-1">My Recommendations</NavLink>
                <NavLink to="/add-query" className="block px-4 py-2 text-sm hover:bg-lime-500 hover:text-black rounded-md mx-1 my-1">Add Query</NavLink>
                <NavLink to="/dashboard" className="block px-4 py-2 text-sm hover:bg-lime-500 hover:text-black rounded-md mx-1 my-1">Dashboard</NavLink>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Theme & Auth */}
        <div className="navbar-end space-x-3">
          {/* <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" />
            <svg className="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5 12a7 7 0 1014 0 7 7 0 10-14 0z" />
            </svg>
            <svg className="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          </label> */}

          {!user ? (
            <Link to="/login" className="btn btn-sm bg-lime-400 text-black font-semibold hover:bg-lime-500 transition">Login</Link>
          ) : (
            <>
              <button onClick={handleSignOut} className="btn btn-sm bg-red-600 text-white hover:bg-red-700 transition">Logout</button>
              <img src={user?.photoURL || "/user.png"} alt="User" className="w-9 h-9 rounded-full border-2 border-lime-400 shadow" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
