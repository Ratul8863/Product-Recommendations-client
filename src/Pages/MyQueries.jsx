import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const MyQueries = () => {
  const { user } = useContext(AuthContext);
  const [queries, setQueries] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [formData, setFormData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://product-reco-server-i9d009gff-ratul8863s-projects.vercel.app/queries?email=${user.email}`)
        .then(res => res.json())
        .then(data => setQueries(data));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this query?");
    if (!confirm) return;

    const res = await fetch(`https://product-reco-server-i9d009gff-ratul8863s-projects.vercel.app/queries/${id}`, {
      method: 'DELETE'
    });

    const data = await res.json();
    if (data.deletedCount > 0) {
      alert("Query deleted successfully.");
      setQueries(prev => prev.filter(query => query._id !== id));
    }
  };

  const openModal = (query) => {
    setSelectedQuery(query);
    const { _id, createdAt, ...cleanData } = query;
    setFormData(cleanData);
    setModalIsOpen(true);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const res = await fetch(`https://product-reco-server-i9d009gff-ratul8863s-projects.vercel.app/queries/${selectedQuery._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    setIsUpdating(false);

    if (data.modifiedCount > 0) {
      alert("Query updated!");
      setModalIsOpen(false);

      const updated = await fetch(`https://product-reco-server-i9d009gff-ratul8863s-projects.vercel.app/queries?email=${user.email}`);
      const updatedData = await updated.json();
      setQueries(updatedData);
    } else {
      alert("No changes were made.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-lime-500 to-lime-300 text-[#0D1128] rounded-xl mb-12 shadow-lg">
        <div className="px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Manage Your Product Queries Easily
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Submit, Update, and Track your Product-related Concerns in One Place
          </p>
          <Link to="/add-query" className="bg-[#0D1128] hover:bg-[#1c1f3b] text-lime-300 px-4 py-2 rounded font-semibold transition">
            + Add New Query
          </Link>
        </div>
      </div>

      {/* Query Section */}
      {queries.length === 0 ? (
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-300">No queries found.</h2>
          <Link to="/add-query" className="bg-lime-500 hover:bg-lime-400 text-[#0D1128] px-4 py-2 rounded font-bold transition">
            Add Your First Query
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {queries
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(query => (
              <div key={query._id} className="border border-gray-700 rounded-2xl p-5 bg-[#1c1f3b] shadow-lg">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img src={query.userPhoto} alt={query.userName} className="w-10 h-10 rounded-full border-2 border-lime-400" />
                    <div>
                      <p className="font-semibold text-white">{query.userName}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        <strong>Submitted:</strong> {new Date(query.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-x-2">
                    <Link to={`/query/${query._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">View</Link>
                    <button onClick={() => openModal(query)} className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm font-medium">Update</button>
                    <button onClick={() => handleDelete(query._id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium">Delete</button>
                  </div>
                </div>
                <h4 className="text-xl font-bold mt-3 text-lime-300">{query.queryTitle}</h4>
                <p className="text-gray-300"><span className="font-medium">Product:</span> {query.productName}</p>
                <img src={query.productImage} alt="Product" className="w-28 rounded mt-2 border border-gray-700" />
                <p className="mt-2 text-gray-400">{query.boycottingReason}</p>
              </div>
            ))}
        </div>
      )}

      {/* Update Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-[#1c1f3b] text-white p-6 rounded-xl max-w-xl mx-auto mt-20 shadow-2xl border border-lime-300"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-lime-300">Update Query</h2>
        {selectedQuery && (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input type="text" name="productName" value={formData.productName || ''} onChange={handleChange} placeholder="Product Name" className="input input-bordered w-full bg-[#0D1128] text-white border-gray-600" />
            <input type="text" name="productBrand" value={formData.productBrand || ''} onChange={handleChange} placeholder="Product Brand" className="input input-bordered w-full bg-[#0D1128] text-white border-gray-600" />
            <input type="text" name="productImage" value={formData.productImage || ''} onChange={handleChange} placeholder="Image URL" className="input input-bordered w-full bg-[#0D1128] text-white border-gray-600" />
            <input type="text" name="queryTitle" value={formData.queryTitle || ''} onChange={handleChange} placeholder="Query Title" className="input input-bordered w-full bg-[#0D1128] text-white border-gray-600" />
            <textarea name="boycottingReason" value={formData.boycottingReason || ''} onChange={handleChange} placeholder="Boycotting Reason" className="textarea textarea-bordered w-full bg-[#0D1128] text-white border-gray-600" />
            <div className="flex gap-4">
              <button type="submit" className="bg-lime-500 hover:bg-lime-400 text-[#0D1128] font-bold px-4 py-2 rounded w-full transition" disabled={isUpdating}>
                {isUpdating ? 'Updating...' : 'Update'}
              </button>
              <button type="button" onClick={() => setModalIsOpen(false)} className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded w-full text-white transition">Cancel</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default MyQueries;
