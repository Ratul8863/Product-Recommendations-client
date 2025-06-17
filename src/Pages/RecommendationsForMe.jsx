// RecommendationsForMe.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/recommendations/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => setRecommendations(data));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this recommendation?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:5000/recommendations/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.deletedCount > 0) {
      alert("Recommendation deleted successfully.");
      setRecommendations((prev) => prev.filter((r) => r._id !== id));
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recommendations.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems)
  console.log(user)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Recommendations For Your Queries</h2>

      {currentItems.length === 0  ? (
        <p className="text-center text-gray-600">No recommendations received yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((rec) => (
             rec.recommenderEmail !== user.email && <div key={rec._id} className="card bg-white shadow-md p-4 rounded">
              {rec.recommenderPhoto && (
                <img src={rec.recommenderPhoto} alt="User" className="w-12 h-12 rounded-full mb-2" />
              )}
              <h3 className="text-xl font-semibold mb-1">{rec.productName}</h3>
              <p><span className="font-semibold">Recommended By:</span> {rec.recommenderName}</p>
              <p className="text-sm text-gray-500">{rec.recommenderEmail}</p>
              <p className="mt-1"><span className="font-semibold">Reason:</span> {rec.reason}</p>
              <p className="text-sm text-gray-500 mt-2">Submitted: {new Date(rec.createdAt).toLocaleString()}</p>
              <button
                onClick={() => handleDelete(rec._id)}
                className="btn btn-sm btn-error mt-3"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(recommendations.length / itemsPerPage) }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => paginate(num)}
            className={`btn btn-sm mx-1 ${num === currentPage ? "btn-primary" : "btn-outline"}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsForMe;





// // RecommendationsForMe.jsx
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Contexts/AuthContext";

// const RecommendationsForMe = () => {
//   const { user } = useContext(AuthContext);
//   const [recommendations, setRecommendations] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:5000/recommendations/user/${user.email}`)
//         .then((res) => res.json())
//         .then((data) => setRecommendations(data));
//     }
//   }, [user]);

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Are you sure you want to delete this recommendation?");
//     if (!confirm) return;

//     const res = await fetch(`http://localhost:5000/recommendations/${id}`, {
//       method: "DELETE",
//     });

//     const data = await res.json();
//     if (data.deletedCount > 0) {
//       alert("Recommendation deleted successfully.");
//       setRecommendations((prev) => prev.filter((r) => r._id !== id));
//     }
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = recommendations.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       <h2 className="text-3xl font-bold mb-6 text-center">Recommendations For Your Queries</h2>

//       {currentItems.length === 0 ? (
//         <p className="text-center text-gray-600">No recommendations received yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {currentItems.map((rec) => (
//             <div key={rec._id} className="card bg-white shadow-md p-4 rounded">
//               {rec.recommenderPhoto && (
//                 <img src={rec.recommenderPhoto} alt="User" className="w-12 h-12 rounded-full mb-2" />
//               )}
//               <h3 className="text-xl font-semibold mb-1">{rec.productName}</h3>
//               <p><span className="font-semibold">Recommended By:</span> {rec.recommenderName}</p>
//               <p className="text-sm text-gray-500">{rec.recommenderEmail}</p>
//               <p className="mt-1"><span className="font-semibold">Reason:</span> {rec.reason}</p>
//               <p className="text-sm text-gray-500 mt-2">Submitted: {new Date(rec.createdAt).toLocaleString()}</p>
//               <button
//                 onClick={() => handleDelete(rec._id)}
//                 className="btn btn-sm btn-error mt-3"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="flex justify-center mt-6">
//         {Array.from({ length: Math.ceil(recommendations.length / itemsPerPage) }, (_, i) => i + 1).map((num) => (
//           <button
//             key={num}
//             onClick={() => paginate(num)}
//             className={`btn btn-sm mx-1 ${num === currentPage ? "btn-primary" : "btn-outline"}`}
//           >
//             {num}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecommendationsForMe;
