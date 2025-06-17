import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Looding1 from "./Shared/Looding/Looding1";

const RecommendationsForMe = () => {
  const { user, loading } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
// Local loading for data fetch
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (user?.email) {
      // Start loading
      fetch(`https://product-reco-server.vercel.app/recommendations/user/${user.email}`, {
        method: 'GET',
        credentials: 'include'
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Unauthorized or error fetching data');
          }
          return res.json();
        })
        .then((data) => setRecommendations(data))
        .catch((error) => console.error("JWT Protected Fetch Error:", error))
       
    }
  }, [user]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recommendations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-white">
      <h2 className="text-3xl font-extrabold text-lime-400 mb-6 text-center">Recommendations For Your Queries</h2>

      {loading  ? (
        <Looding1></Looding1>
      ) : currentItems.length === 0 ? (
        <p className="text-center text-gray-400">No recommendations received yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((rec) => (
            rec.recommenderEmail !== user.email && (
              <div key={rec._id} className="bg-[#1c1f3b] border border-gray-700 p-6 rounded-2xl shadow-md text-white">
                <div className="flex items-center gap-3 mb-3">
                  {rec.recommenderPhoto && (
                    <img src={rec.recommenderPhoto} alt="User" className="w-10 h-10 rounded-full border border-gray-600" />
                  )}
                  <div>
                    <p className="font-semibold text-white">{rec.recommenderName}</p>
                    <p className="text-sm text-gray-400">{rec.recommenderEmail}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-lime-300 mb-1">{rec.productName}</h3>
                <p className="mb-1"><span className="font-medium text-lime-400">Reason:</span> {rec.recommendationReason}</p>
                <p className="text-sm text-gray-400 mb-3">Submitted: {new Date(rec.createdAt).toLocaleString()}</p>
              </div>
            )
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && currentItems.length > 0 && (
        <div className="flex justify-center mt-8 flex-wrap gap-2">
          {Array.from({ length: Math.ceil(recommendations.length / itemsPerPage) }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => paginate(num)}
              className={`px-4 py-1 rounded-lg text-sm font-semibold border transition duration-200 ${num === currentPage ? "bg-lime-400 text-black" : "border-gray-500 text-gray-300 hover:bg-gray-700"}`}
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
