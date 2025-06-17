import React, { use, useState } from 'react';
import { toast } from 'react-toastify';

function Reclist({ myRecPromise }) {
  const Recs = use(myRecPromise);
  // console.log(recs)
  const [recommendations, setRecommendations] = useState(Recs);

  const handleDelete = async (recId, queryId) => {
    console.log(recId)
    const confirm = window.confirm("Are you sure you want to delete this recommendation?");
    if (!confirm) return;

    try {
      const res = await fetch(`https://product-reco-server.vercel.app/recommendations/${recId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      console.log(data)
      setRecommendations(prev => prev.filter(r => r._id !== recId));
        toast.success("Recommendation deleted and count updated.");
      // if (data.success) {
      //   await fetch(`https://product-reco-server.vercel.app/queries/${queryId}/decrease-recommendation`, {
      //     method: 'PATCH',
      //   });  
      // }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white font-sans min-h-screen">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-lime-400">My Recommendations</h2>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700 bg-[#1c1f3b]">
        <table className="w-full text-sm md:text-base table-auto border-collapse">
          <thead>
            <tr className="bg-[#0D1128] text-lime-300">
              <th className="p-4 border-b border-gray-700">#</th>
              <th className="p-4 border-b border-gray-700">Product</th>
              <th className="p-4 border-b border-gray-700">Query Title</th>
              <th className="p-4 border-b border-gray-700">Recommended At</th>
              <th className="p-4 border-b border-gray-700">User</th>
              <th className="p-4 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-400">
                  No recommendations found.
                </td>
              </tr>
            ) : (
              recommendations.map((rec, index) => (
                <tr
                  key={rec._id}
                  className="hover:bg-[#2a2e4d] transition-colors duration-300"
                >
                  <td className="p-4 border-t border-gray-700 text-gray-300">{index + 1}</td>
                  <td className="p-4 border-t border-gray-700 text-white font-medium">{rec.productName || "N/A"}</td>
                  <td className="p-4 border-t border-gray-700 text-white">{rec.queryTitle || "N/A"}</td>
                  <td className="p-4 border-t border-gray-700 text-gray-400">
                    {new Date(rec.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4 border-t border-gray-700">
                    <img
                      src={rec.recommenderPhoto || "https://i.ibb.co/6ZC6qHp/user.png"}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-lime-400 shadow-sm"
                    />
                  </td>
                  <td className="p-4 border-t border-gray-700">
                    <button
                      onClick={() => handleDelete(rec._id, rec.queryId)}
                      className="bg-gradient-to-r from-lime-500 to-lime-300 text-black px-4 py-2 rounded-xl text-sm font-semibold hover:scale-105 transition-transform duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reclist;
