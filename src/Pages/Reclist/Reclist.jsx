import React, { use } from 'react'

function Reclist({myRecPromise}) {

    const Recs = use(myRecPromise)
    console.log(Recs)



     const handleDelete = async (recId, queryId) => {
        const confirm = window.confirm("Are you sure you want to delete this recommendation?");
        if (!confirm) return;
    
        try {
          const res = await fetch(`http://localhost:5000/recommendations/${recId}`, {
            method: 'DELETE',
          });
    
          const data = await res.json();
          if (data.deletedCount > 0) {
            // Decrease the recommendation count
            await fetch(`http://localhost:5000/queries/${queryId}/decrease-recommendation`, {
              method: 'PATCH',
            });
    
            alert('Recommendation deleted and count updated.');
            setRecommendations(prev => prev.filter(r => r._id !== recId));
          }
        } catch (err) {
          console.error('Delete error:', err);
        }
      };
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Recommendations</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Query Title</th>
              <th className="p-3 border">Recommended At</th>
              <th className="p-3 border">User Photo</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Recs.map((rec, index) => (
              <tr key={rec._id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{rec.productName || "N/A"}</td>
                <td className="p-3 border">{rec.queryTitle || "N/A"}</td>
                <td className="p-3 border">
                  {new Date(rec.createdAt).toLocaleString()}
                </td>
                <td className="p-3 border">
                  <img
                    src={rec.recommenderPhoto || "https://i.ibb.co/6ZC6qHp/user.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-3 border">
                  <button
                    onClick={() => handleDelete(rec._id, rec.queryId)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Reclist