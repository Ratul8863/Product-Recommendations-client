import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Lottie from "lottie-react";
import login from "../assets/loginman.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SignInWithGoogle from "./Shared/SignInWithGoogle";

function Login() {
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();
  const { SignInuser } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    SignInuser(email, password)
      .then(() => navigate(from))
      .catch((error) => setError(error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 transition-colors duration-500 
      
      dark:from-[#0D1128] dark:via-[#1c1f3b] dark:to-[#0D1128]">
      
      <div className="bg-gray-100 dark:bg-[#1c1f3b]/80 backdrop-blur-md rounded-2xl shadow-xl max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 p-6 md:p-12 border border-gray-200 dark:border-gray-700">
        
        {/* Animation */}
        <div className="flex items-center justify-center">
          <Lottie className="w-72 md:w-96" animationData={login} loop />
        </div>

        {/* Form */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Sign In to Your Account
          </h2>

          <SignInWithGoogle from={from} />

          <form onSubmit={handleSignin} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-lime-400 bg-white dark:bg-[#0D1128] text-gray-900 dark:text-white"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-lime-400 bg-white dark:bg-[#0D1128] text-gray-900 dark:text-white"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="text-right">
              <a className="text-sm text-blue-600 dark:text-lime-400 hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full  bg-lime-500 text-white dark:text-black py-2 rounded-md cursor-pointer  hover:bg-lime-400 transition duration-200 font-semibold"
            >
              Sign In
            </button>
          </form>

          {error && (
            <p className="text-red-500 mt-3 text-sm text-center">{error}</p>
          )}

          <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              state={location.state}
              className="text-blue-600 dark:text-lime-400 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
