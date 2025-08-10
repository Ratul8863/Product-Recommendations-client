import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import Modal from 'react-modal';
import { Helmet } from 'react-helmet-async';
import Looding1 from './Shared/Looding/Looding1';
import { FaCommentAlt } from 'react-icons/fa';

Modal.setAppElement('#root');

const MyQueries = () => {
    const { user } = useContext(AuthContext);
    const [queries, setQueries] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [formData, setFormData] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            fetch(`https://product-reco-server.vercel.app/queries?email=${user.email}`, {
                method: 'GET',
                credentials: 'include',
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        throw new Error("Unauthorized. Please log in again.");
                    }
                    return res.json();
                })
                .then(data => setQueries(data))
                .catch(err => {
                    console.error('Error fetching queries:', err);
                    alert(err.message);
                })
                .finally(() => setLoading(false));
        }
    }, [user]);

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this query?");
        if (!confirm) return;

        const res = await fetch(`https://product-reco-server.vercel.app/queries/${id}`, {
            method: 'DELETE',
            credentials: 'include'
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

        const res = await fetch(`https://product-reco-server.vercel.app/queries/${selectedQuery._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        setIsUpdating(false);

        if (data.modifiedCount > 0) {
            alert("Query updated!");
            setModalIsOpen(false);

            const updated = await fetch(`https://product-reco-server.vercel.app/queries?email=${user.email}`, {
                method: 'GET',
                credentials: 'include'
            });
            const updatedData = await updated.json();
            setQueries(updatedData);
        } else {
            alert("No changes were made.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-[#0D1128] dark:via-[#1a1f34] dark:to-[#2a2f4c]">
            <Helmet>
                <title>RecoSys | MyQueries</title>
            </Helmet>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 text-gray-900 dark:text-white">

                {/* Header Banner */}
                <div className="relative overflow-hidden bg-gradient-to-r from-lime-400 to-teal-500 text-white rounded-2xl shadow-xl mb-12 transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <div className="p-8 text-center">
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 tracking-wide">
                            Your Product Queries
                        </h1>
                        <p className="text-lg md:text-xl font-light mb-6">
                            Manage your submitted queries, update them, and track recommendations.
                        </p>
                        <Link
                            to="/add-query"
                            className="inline-block bg-white dark:bg-[#0D1128] text-lime-600 dark:text-lime-300 px-6 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            + Add New Query
                        </Link>
                    </div>
                </div>

                {/* Query Section */}
                {loading ? (
                    <Looding1 />
                ) : queries.length === 0 ? (
                    <div className="text-center mt-12 bg-white dark:bg-[#1c1f3b] p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">No queries found.</h2>
                        <Link
                            to="/add-query"
                            className="inline-block bg-lime-500 hover:bg-lime-400 text-[#0D1128] dark:text-gray-900 px-6 py-3 rounded-full font-bold transition-colors duration-300"
                        >
                            Add Your First Query
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {queries
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map(query => (
                                <div
                                    key={query._id}
                                    className="border border-gray-200 dark:border-gray-700 rounded-3xl p-6 bg-gradient-to-b from-gray-100 to-white dark:from-[#1c1f3b] dark:to-[#12162a] shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={query.userPhoto}
                                                    alt={query.userName}
                                                    className="w-12 h-12 rounded-full border-3 border-lime-400 shadow-md"
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">{query.userName}</p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                        <strong>Submitted:</strong> {new Date(query.createdAt).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right  flex items-center gap-1">
                                                <h2 className="text-md text-cyan-600 dark:text-cyan-300 font-semibold">
                                                    <FaCommentAlt size={15} />
                                                </h2>
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {query.recommendationCount || 0}
                                                </p>
                                            </div>
                                        </div>

                                        <h4 className="text-xl font-bold mt-3 text-lime-600 dark:text-lime-400">{query.queryTitle}</h4>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                            <span className="font-medium">Product:</span> {query.productName}
                                        </p>
                                        <img
                                            src={query.productImage}
                                            alt="Product"
                                            className="w-full h-48 object-cover rounded-lg mt-4 border border-gray-400 dark:border-gray-700 shadow-sm"
                                        />
                                        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{query.boycottingReason}</p>
                                    </div>

                                    {/* Buttons Section */}
                                    <div className="mt-6 flex flex-col sm:flex-row gap-2 w-full">
                                        <Link
                                            to={`/query/${query._id}`}
                                            className="w-full text-center px-4 py-2 rounded-full border-2 border-blue-500 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-colors duration-300 text-sm"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => openModal(query)}
                                            className="w-full text-center px-4 py-2 rounded-full border-2 border-yellow-400 text-yellow-400 font-semibold hover:bg-yellow-400 hover:text-black transition-colors duration-300 text-sm"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(query._id)}
                                            className="w-full text-center px-4 py-2 rounded-full border-2 border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-colors duration-300 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                {/* Update Modal */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    className="fixed inset-0 flex items-center justify-center p-4"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300"
                >
                    <div className="bg-white dark:bg-[#1c1f3b] text-gray-900 dark:text-white p-6 rounded-2xl max-w-xl mx-auto shadow-2xl border border-lime-400 dark:border-lime-600 transform scale-95 md:scale-100 transition-transform duration-300">
                        <h2 className="text-2xl font-bold mb-4 text-lime-600 dark:text-lime-400">Update Query</h2>
                        {selectedQuery && (
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <input
                                    type="text"
                                    name="productName"
                                    value={formData.productName || ''}
                                    onChange={handleChange}
                                    placeholder="Product Name"
                                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    name="productBrand"
                                    value={formData.productBrand || ''}
                                    onChange={handleChange}
                                    placeholder="Product Brand"
                                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    name="productImage"
                                    value={formData.productImage || ''}
                                    onChange={handleChange}
                                    placeholder="Image URL"
                                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    name="queryTitle"
                                    value={formData.queryTitle || ''}
                                    onChange={handleChange}
                                    placeholder="Query Title"
                                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-md p-2"
                                />
                                <textarea
                                    name="boycottingReason"
                                    value={formData.boycottingReason || ''}
                                    onChange={handleChange}
                                    placeholder="Boycotting Reason"
                                    className="textarea textarea-bordered w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-md p-2"
                                />
                                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                    <button
                                        type="submit"
                                        className="bg-lime-500 hover:bg-lime-600 text-[#0D1128] font-bold px-4 py-2 rounded-full w-full transition disabled:opacity-70"
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? 'Updating...' : 'Update'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setModalIsOpen(false)}
                                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-full w-full transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default MyQueries;