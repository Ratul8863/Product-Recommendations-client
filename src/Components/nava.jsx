
import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

function Navbar() {
  const { user } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.error("Logout error:", error));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50">
      {/* Left: Mobile Menu + Logo */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/queries">Queries</Link></li>
            {user && (
              <>
                <li><Link to="/recommendations-for-me">Recs for me</Link></li>
                <li><Link to="/my-queries">My Queries</Link></li>
                <li><Link to="/my-recommendations">My Recomrndation</Link></li>
                <li><button onClick={handleSignOut} className="text-red-500">Logout</button></li>
              </>
            )}
            {!user && (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl font-bold text-purple-700">
          🛍️ RecoSys
        </Link>
      </div>

      {/* Center: Main Nav (Desktop only) */}
      <div className="navbar-center lg:gap-4 hidden lg:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/queries">Queries</NavLink>


 {user && (
            <>
     
      <div class="relative group">
      <button class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
       
        <span class="font-medium">Query Options</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

  <div class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 ease-in-out">
       <NavLink tabIndex={0} className='block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white rounded-md mx-1 my-1' to="/recommendations-for-me">Recs for me</NavLink>
      <NavLink tabIndex={0} className='block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white rounded-md mx-1 my-1'  to="/my-queries">My Queries</NavLink>
      <NavLink tabIndex={0} className='block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white rounded-md mx-1 my-1' to="/my-recommendations">My Recomrndation</NavLink>
      </div>




      {/* <ul tabIndex={0}  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow" >

     
      </ul> */}
</div>

            </>
          )}
    
      </div>

 
 
          {/* {user && (
            <>
             <select defaultValue="Server location" className="select select-neutral">
  <option disabled={true}>Querie more</option>
  <option><Link to="/recommendations-for-me">Recs for me</Link></option>
  <option><Link to="/my-queries">My Queries</Link></option>
  <option><Link to="/my-recommendations">My Recomrndation</Link></option>
</select>
            </>
          )}
    
      </div> */}

      {/* Right: Auth & Profile */}
      <div className="navbar-end gap-2">
        {!user ? (
          <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
        ) : (
          <>
            <button onClick={handleSignOut} className="btn btn-sm btn-error text-white">Logout</button>
            {user && (
              <img src={user.photoURL} alt="User" className="w-9 h-9 rounded-full border border-purple-500 shadow" />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;

