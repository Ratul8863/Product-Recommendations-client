import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import { Link } from 'react-router';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

function Navbar() {
 const { user } = useContext(AuthContext);
 const handleSignOut = e =>
  {
      signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
  }

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        🛍️ RecoSys
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        <Link to="/queries">Queries</Link>
        {!user ? (
          <>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/recommendations-for-me">Recommendations For Me</Link>
            <Link to="/my-queries">My Queries</Link>
            <Link to="/my-recommendations">My Recommendations</Link>
            <button onClick={handleSignOut} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
            <img src={user.photoURL} className="w-8 h-8 rounded-full" />
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar