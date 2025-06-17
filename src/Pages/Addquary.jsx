import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
// Removed useParams as it's not used in the form submission logic for adding a query
// import { useParams } from "react-router";
import { FaPlusCircle, FaTimes, FaCheckCircle } from 'react-icons/fa'; // Icons for button and alert

const AddQuery = () => {
  const { user } = useContext(AuthContext);
  // Removed jobid as it was not used for the 'AddQuery' functionality
  // const {id : jobid} = useParams();
  // console.log(jobid)

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success'); // 'success' or 'error'

  const showCustomAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage('');
    }, 3000);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Basic validation for image URL
    const productImageURL = form.productImage.value;
    const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i; // Simple URL regex

    if (!urlRegex.test(productImageURL)) {
        showCustomAlert("Please enter a valid Product Image URL (starts with http:// or https://).", "error");
        return;
    }

    const newQuery = {
      likes: [], // Initialize with an empty array as per previous components
      productName: form.productName.value,
      productBrand: form.productBrand.value,
      productImage: productImageURL,
      queryTitle: form.queryTitle.value,
      boycottingReason: form.boycottingReason.value,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      createdAt: new Date().toISOString(),
      recommendationCount: 0,
    };

    try {
      const res = await fetch("http://localhost:5000/queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuery),
      });

      const data = await res.json();
      if (data.insertedId) {
        showCustomAlert("Query added successfully! Your contribution is live.", "success");
        form.reset();
      } else {
        showCustomAlert("Failed to add query. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error adding query:", error);
      showCustomAlert("An error occurred while adding the query.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1128] text-white font-sans flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full p-8 bg-[#1c1f3b] rounded-3xl shadow-2xl border border-gray-700 animate-slide-in-up">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-lime-400 drop-shadow-md">
          Create New Query
        </h2>
        {user && (
            <div className="flex items-center justify-center mb-6 text-gray-300">
                <img
                    src={user.photoURL || 'https://i.ibb.co/L18f1Yh/user.png'}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full border-2 border-lime-400 object-cover shadow-lg mr-4"
                />
                <p className="text-xl font-semibold">Posting as <span className="text-lime-300">{user.displayName}</span></p>
            </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="queryTitle" className="block text-gray-300 text-sm font-semibold mb-2">Query Title</label>
            <input
              name="queryTitle"
              id="queryTitle"
              placeholder="e.g., Seeking alternatives for BrandX Coffee"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 shadow-inner"
              required
            />
          </div>
          <div>
            <label htmlFor="productName" className="block text-gray-300 text-sm font-semibold mb-2">Product Name</label>
            <input
              name="productName"
              id="productName"
              placeholder="e.g., EthiCo Coffee Beans"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 shadow-inner"
              required
            />
          </div>
          <div>
            <label htmlFor="productBrand" className="block text-gray-300 text-sm font-semibold mb-2">Product Brand</label>
            <input
              name="productBrand"
              id="productBrand"
              placeholder="e.g., BrandX"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 shadow-inner"
              required
            />
          </div>
          <div>
            <label htmlFor="productImage" className="block text-gray-300 text-sm font-semibold mb-2">Product Image URL</label>
            <input
              name="productImage"
              id="productImage"
              type="url" // Use type="url" for basic browser validation
              placeholder="e.g., https://example.com/product.jpg"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 shadow-inner"
              required
            />
          </div>
          <div>
            <label htmlFor="boycottingReason" className="block text-gray-300 text-sm font-semibold mb-2">Reason for Query/Boycott Details</label>
            <textarea
              name="boycottingReason"
              id="boycottingReason"
              placeholder="Explain why you are seeking alternatives for this product..."
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 shadow-inner h-32 resize-y"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-lime-500 to-lime-300 text-black font-extrabold text-lg
            px-8 py-4 rounded-full shadow-2xl hover:shadow-lime-400/70
            transform hover:scale-105 transition-all duration-300 ease-in-out
            tracking-wide uppercase relative overflow-hidden group flex items-center justify-center gap-3"
          >
            <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            <span className="relative z-10">Add Query</span>
            <FaPlusCircle className="relative z-10 text-xl" />
          </button>
        </form>
      </div>

      {/* Custom Alert Modal */}
      {showAlert && (
        <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-xl text-white flex items-center gap-3 z-50
          ${alertType === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {alertType === 'success' ? <FaCheckCircle size={24} /> : <FaTimes size={24} />}
          <span>{alertMessage}</span>
        </div>
      )}
    </div>
  );
};

export default AddQuery;