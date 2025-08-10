import { useContext, useState } from "react";
import lottieregister from '../assets/Register.json';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import Lottie from "lottie-react";
import SignInWithGoogle from "./Shared/SignInWithGoogle";
import { toast } from "react-toastify";

export default function Register() {
  const { createuser, updateuser, setUser, setLoading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    if (password.length < 6) {
      toast.error("Password must have 6 characters");
      setError("Password must have 6 characters");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must have a lower case letter");
      setError("Password must have a lower case letter");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must have an upper case letter");
      setError("Password must have an upper case letter");
      return;
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      toast.error("Password must have at least one special character");
      setError("Password must have at least one special character");
      return;
    }

    createuser(email, password)
      .then(result => {
        const user = result.user;
        updateuser({ displayName: name, photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL });
          })
          .catch(() => {
            setUser(user);
          });

        toast.success("Successfully Registered");
        navigate(from);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        toast.error("User already exists. Please login.");
        setError("Registration failed: " + error.message);
      });
  };

  return (
    <div className="min-h-screen  dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center px-4 py-10 transition-colors duration-500">
      <div className="bg-gray-100 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 p-6 lg:p-10 transition-colors duration-500">
        
        {/* Lottie Animation */}
        <div className="flex items-center justify-center p-4">
          <Lottie className="w-72 md:w-96" animationData={lottieregister} loop />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-lime-300 transition-colors duration-300">
            Create Your Account
          </h1>

          <SignInWithGoogle from={from} />

          <form onSubmit={handleRegister} className="space-y-4 mt-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-300"
              required
            />
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-300"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-300"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-300"
              required
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-lime-500 to-lime-400 hover:from-lime-400 hover:to-lime-300 text-gray-900 font-semibold shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              Register
            </button>
          </form>

          {error && <p className="text-red-500 mt-3 text-sm text-center">{error}</p>}

          <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300 transition-colors duration-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-lime-300 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
