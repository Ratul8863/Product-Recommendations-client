import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
  const { user, setTheme, theme } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.error("Logout error:", error));
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 shadow bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 ">
      {/* Top Info Bar */}
      <div className="hidden md:flex justify-between items-center max-w-[1400px] mx-auto px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <FaPhoneAlt /> + (1800) 456 7890
          </span>
          <span className="flex items-center gap-1">
            <FaEnvelope /> info@query.com
          </span>
          <span className="flex items-center gap-1">
            <FaClock /> Mon-Sat: 10 am to 7 pm
          </span>
        </div>
        <div className="flex gap-3 text-lg text-lime-500">
          <Link to="https://www.facebook.com">
            <FaFacebookF className="hover:text-lime-400 transition-colors" />
          </Link>
          <Link to="https://twitter.com">
            <FaTwitter className="hover:text-lime-400 transition-colors" />
          </Link>
          <Link to="https://www.youtube.com">
            <FaYoutube className="hover:text-lime-400 transition-colors" />
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar max-w-[1400px] mx-auto px-4 lg:px-10 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        {/* Left: Logo & Mobile Menu */}
        <div className="navbar-start">
          {/* Mobile Hamburger */}
          <div className="lg:hidden relative">
            <button
              onClick={toggleMenu}
              className="btn btn-ghost text-black dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {menuOpen && (
              <ul className="absolute left-0 mt-2 z-[100] p-4 shadow rounded-lg w-52 bg-white dark:bg-gray-800 text-black dark:text-white space-y-2">
                {["/", "/about", "/features", "/queries"].map((path, i) => (
                  <li key={i}>
                    <NavLink
                      to={path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "text-lime-400 font-semibold"
                          : "hover:text-lime-400"
                      }
                    >
                      {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                    </NavLink>
                  </li>
                ))}

                {user && (
                  <>
                    <li><NavLink to="/recommendations-for-me" onClick={() => setMenuOpen(false)}>Recommendations for Me</NavLink></li>
                    <li><NavLink to="/my-queries" onClick={() => setMenuOpen(false)}>My Queries</NavLink></li>
                    <li><NavLink to="/my-recommendations" onClick={() => setMenuOpen(false)}>My Recommendations</NavLink></li>
                    <li><NavLink to="/add-query" onClick={() => setMenuOpen(false)}>Add Query</NavLink></li>
                    <li><NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink></li>
                  </>
                )}

                <li>
                  {!user ? (
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="text-lime-400">
                      Login
                    </Link>
                  ) : (
                    <button onClick={() => { handleSignOut(); setMenuOpen(false); }} className="text-red-400">
                      Logout
                    </button>
                  )}
                </li>

                {/* Theme Toggle */}
                <li>
                  <button
                    onClick={() => { toggleTheme(); setMenuOpen(false); }}
                    className="btn btn-circle btn-ghost"
                  >
                    {theme === "dark" ? <MdOutlineLightMode size={20} /> : <MdOutlineDarkMode size={20} />}
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 font-bold text-xl">
            <img className="w-8 h-8 ml-1" src="https://i.ibb.co/39WLdycb/image.png" alt="RecoSys" />
            <span className="text-sm md:text-2xl">RecoSys</span>
          </NavLink>
        </div>

        {/* Center: Desktop Nav */}
        <div className="navbar-center hidden lg:flex space-x-6 font-medium">
          {["/", "/about", "/features", "/queries"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-lime-400 border-b-2 border-lime-400 pb-1"
                  : "hover:text-lime-400"
              }
            >
              {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}

          {user && (
            <div className="relative group">
              <button className="flex items-center px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-lime-500 hover:text-black transition">
                Query Options
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <NavLink to="/recommendations-for-me" className="block px-4 py-2 hover:bg-lime-500 hover:text-black rounded-md">Recommendations for Me</NavLink>
                <NavLink to="/my-queries" className="block px-4 py-2 hover:bg-lime-500 hover:text-black rounded-md">My Queries</NavLink>
                <NavLink to="/my-recommendations" className="block px-4 py-2 hover:bg-lime-500 hover:text-black rounded-md">My Recommendations</NavLink>
                <NavLink to="/add-query" className="block px-4 py-2 hover:bg-lime-500 hover:text-black rounded-md">Add Query</NavLink>
                <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-lime-500 hover:text-black rounded-md">Dashboard</NavLink>
              </div>
            </div>
          )}
        </div>

        {/* Right: Theme & Auth */}
        <div className="navbar-end space-x-3">
          <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost hidden lg:flex"
          >
            {theme === "dark" ? <MdOutlineLightMode size={20} /> : <MdOutlineDarkMode size={20} />}
          </button>

          {!user ? (
            <Link to="/login" className="btn btn-sm bg-lime-400 text-black hover:bg-lime-500">
              Login
            </Link>
          ) : (
            <>
              <button onClick={handleSignOut} className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
                Logout
              </button>
              <img src={user?.photoURL || "/user.png"} alt="User" className="w-9 h-9 rounded-full border-2 border-lime-400 shadow" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
