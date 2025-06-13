import React from 'react'
import { useNavigate } from 'react-router'

function NotFound() {
  const navigate=useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br  from-white via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg my-10 animate-moving-shadow4 rounded-2xl  p-10 max-w-2xl text-center">
        <img
          src="https://i.ibb.co/bMjcxJJr/1-YWUpn-Y-z-Nb-Sf-K62-GSJIBbw.png"
          alt="404 Not Found"
          className="w-72 mx-auto mb-6"
        />
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary px-6 py-2 text-white font-semibold rounded-lg transition duration-300 hover:scale-105"
        >
          Go to Home
        </button>
      </div>
    </div>    
  )
}

export default NotFound