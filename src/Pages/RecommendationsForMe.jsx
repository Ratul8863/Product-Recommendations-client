import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Looding1 from "./Shared/Looding/Looding1";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom"; // ✅ use react-router-dom

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
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

  const filteredRecommendations = recommendations.filter(
    (rec) => rec.recommenderEmail !== user?.email
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecommendations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-white">
      <Helmet>
        <title>RecoSys | Recommendations for me</title>
      </Helmet>

      <h2 className="text-3xl font-extrabold text-lime-400 mb-6 text-center">
        Recommendations For Your Queries
      </h2>

      {loading ? (
        <Looding1 />
      ) : currentItems.length === 0 ? (
        <p className="text-center text-gray-400">No recommendations received yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-600 text-sm text-left">
            <thead className="bg-[#1c1f3b] text-lime-300 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Query</th>
                <th className="px-4 py-3">Recommended Product</th>
                <th className="px-4 py-3">Recommender</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-[#0D1128] text-white">
              {currentItems.map((rec) => (
                <tr key={rec._id} className="hover:bg-[#1c1f3b] transition">
                  <td className="px-4 py-3 font-medium text-lime-400">
                    <Link to={`/query/${rec.queryId}`} className="hover:underline">
                      {rec.queryTitle || "View Query"}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={rec.recommendedProductImage}
                        alt={rec.recommendedProductName}
                        className="w-10 h-10 object-cover rounded border border-gray-700"
                      />
                      <span>{rec.recommendedProductName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={rec.recommenderPhoto}
                        alt={rec.recommenderName}
                        className="w-8 h-8 rounded-full border border-gray-600"
                      />
                      <div>
                        <p className="font-semibold">{rec.recommenderName}</p>
                        <p className="text-xs text-gray-400">{rec.recommenderEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-xs">{rec.recommendationReason}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(rec.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {currentItems.length > 0 && (
        <div className="flex justify-center mt-8 flex-wrap gap-2">
          {Array.from({ length: Math.ceil(filteredRecommendations.length / itemsPerPage) }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => paginate(num)}
              className={`px-4 py-1 rounded-lg text-sm font-semibold border transition duration-200 ${
                num === currentPage ? "bg-lime-400 text-black" : "border-gray-500 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsForMe;
