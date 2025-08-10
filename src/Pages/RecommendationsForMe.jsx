import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Looding1 from "./Shared/Looding/Looding1";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa"; // Import for the info icon

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Only fetch data if a user is logged in
    if (user?.email) {
      setLoading(true);
      fetch(`https://product-reco-server.vercel.app/recommendations/user/${user.email}`, {
        method: 'GET',
        credentials: 'include'
      })
        .then((res) => {
          if (!res.ok) throw new Error('Unauthorized or error fetching data');
          return res.json();
        })
        .then((data) => setRecommendations(data))
        .catch((error) => console.error("JWT Protected Fetch Error:", error))
        .finally(() => setLoading(false));
    }
  }, [user]);

  // Filter out recommendations made by the user to their own queries
  const filteredRecommendations = recommendations.filter(
    (rec) => rec.recommenderEmail !== user?.email
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecommendations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecommendations.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D1128] text-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <Helmet>
        <title>RecoSys | Recommendations for me</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-lime-600 dark:text-lime-400 mb-4 drop-shadow-md">
            Recommendations for Your Queries
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            View the products that others have recommended for your queries.
          </p>
        </div>

        {loading ? (
          <Looding1 />
        ) : filteredRecommendations.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#1c1f3b] rounded-3xl border border-gray-200 dark:border-gray-700 space-y-6">
            <FaInfoCircle className="text-lime-500 dark:text-lime-400 text-6xl opacity-70" />
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">No recommendations received yet!</p>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Share your queries with the community to get started.
            </p>
            <Link to="/add-query">
              <button className="bg-gradient-to-r from-lime-500 to-lime-300 text-black font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
                Create a Query
              </button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-xl dark:shadow-lime-500/10 border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600 text-sm text-left">
              <thead className="bg-gray-200 dark:bg-[#1c1f3b] text-gray-800 dark:text-lime-300 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Query</th>
                  <th className="px-4 py-3">Recommended Product</th>
                  <th className="px-4 py-3">Recommender</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-[#0D1128] text-gray-800 dark:text-white">
                {currentItems.map((rec) => (
                  <tr key={rec._id} className="hover:bg-gray-100 dark:hover:bg-[#1c1f3b] transition duration-200">
                    <td className="px-4 py-3 font-medium text-lime-600 dark:text-lime-400">
                      <Link to={`/query/${rec.queryId}`} className="hover:underline">
                        {rec.queryTitle || "View Query"}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={rec.recommendedProductImage}
                          alt={rec.recommendedProductName}
                          className="w-10 h-10 object-cover rounded border border-gray-300 dark:border-gray-700"
                        />
                        <span>{rec.recommendedProductName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={rec.recommenderPhoto}
                          alt={rec.recommenderName}
                          className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
                        />
                        <div>
                          <p className="font-semibold">{rec.recommenderName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{rec.recommenderEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-xs">{rec.recommendationReason}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {new Date(rec.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {currentItems.length > 0 && totalPages > 1 && (
          <div className="flex justify-center mt-8 flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => paginate(num)}
                className={`px-4 py-1 rounded-lg text-sm font-semibold border transition duration-200 ${
                  num === currentPage ? "bg-lime-500 text-black border-lime-500" : "border-gray-500 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsForMe;
