import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext'; // Assuming AuthContext is still needed for like functionality
import { FcLike, FcDislike } from "react-icons/fc";
import { FaCommentAlt, FaTh, FaThLarge, FaList, FaRegLightbulb, FaShareAlt, FaSearch, FaInfoCircle } from 'react-icons/fa';

const Queries = () => {
    const [queries, setQueries] = useState([]); // Renamed from recentQueries for clarity on this page
    const [searchText, setSearchText] = useState('');
    const [gridLayout, setGridLayout] = useState(3); // Default to 3 columns, as per original Queries layout
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all queries, sorted in descending order of creation date
        fetch('https://product-reco-server.vercel.app/queries/all') // Assuming this endpoint gives all queries
            .then(res => res.json())
            .then(data => {
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setQueries(sortedData);
            })
            .catch(error => console.error("Failed to fetch queries:", error));
    }, []);

    const handleLike = async (id) => {
        if (!user) {
            alert("Please log in to like.");
            return;
        }
        try {
            const res = await fetch(`https://product-reco-server.vercel.app/queries/like/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: user.email })
            });

            if (res.ok) {
                // Update state to reflect the like/unlike immediately
                setQueries(prevQueries =>
                    prevQueries.map(query => {
                        if (query._id === id) {
                            const updatedLikes = query.likes?.includes(user.email)
                                ? query.likes.filter(email => email !== user.email)
                                : [...(query.likes || []), user.email];
                            return { ...query, likes: updatedLikes };
                        }
                        return query;
                    })
                );
                // Re-fetch to ensure like counts are updated accurately from backend, if needed
                // For a highly dynamic feed, a WebSocket or more sophisticated state management might be better,
                // but for a simple refresh, this works.
                const updated = await fetch('https://product-reco-server.vercel.app/queries').then(res => res.json());
                setQueries(updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); // Re-sort after fetch
            } else {
                alert("Failed to update like.");
            }
        } catch (error) {
            console.error("Error liking post:", error);
            alert("An error occurred while trying to like.");
        }
    };

    const handleShare = (id) => {
        const url = `${window.location.origin}/query/${id}`;
        navigator.clipboard.writeText(url)
            .then(() => alert("🔗 Link copied to clipboard!"))
            .catch(err => console.error("Failed to copy link: ", err));
    };

    const handleRecommend = (id) => {
        navigate(`/query/${id}`);
    };

    // Filter queries based on search text (productName)
    const filteredQueries = queries.filter((query) =>
        query.productName.toLowerCase().includes(searchText.toLowerCase())
    );

    // Dynamic grid column class based on layoutCols state
    const gridColsClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
    }[gridLayout];

    return (
        <div className="min-h-screen bg-[#0D1128] text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-extrabold text-lime-400 leading-tight mb-4 drop-shadow-md animate-fade-in-down">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-lime-600">All Community Queries</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up">
                        Explore every product query submitted by our vibrant community, sorted by the latest additions.
                    </p>
                </div>

                {/* Search Bar and Layout Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 p-6 bg-[#1c1f3b] rounded-3xl shadow-2xl border border-gray-700 animate-slide-in-up">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-1/2 lg:w-2/5">
                        <input
                            type="text"
                            placeholder="Search by Product Name..."
                            className="w-full p-4 pl-12 rounded-full bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-lime-500 focus:border-transparent shadow-inner transition-all duration-300 text-lg"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                    </div>

                    {/* Layout toggle buttons */}
                    <div className="flex gap-3 bg-gray-800 p-2 rounded-full shadow-inner border border-gray-700">
                        <button
                            onClick={() => setGridLayout(1)}
                            className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center text-xl
                                ${gridLayout === 1 ? 'bg-gradient-to-br from-lime-400 to-lime-600 text-black shadow-lg transform scale-105' : 'text-gray-400 hover:bg-gray-700 hover:text-lime-300'}
                            `}
                            title="1 Column Layout"
                        >
                            <FaList size={22} />
                        </button>
                        <button
                            onClick={() => setGridLayout(2)}
                            className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center text-xl
                                ${gridLayout === 2 ? 'bg-gradient-to-br from-lime-400 to-lime-600 text-black shadow-lg transform scale-105' : 'text-gray-400 hover:bg-gray-700 hover:text-lime-300'}
                            `}
                            title="2 Column Layout"
                        >
                            <FaTh size={22} />
                        </button>
                        <button
                            onClick={() => setGridLayout(3)}
                            className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center text-xl
                                ${gridLayout === 3 ? 'bg-gradient-to-br from-lime-400 to-lime-600 text-black shadow-lg transform scale-105' : 'text-gray-400 hover:bg-gray-700 hover:text-lime-300'}
                            `}
                            title="3 Column Layout"
                        >
                            <FaThLarge size={22} />
                        </button>
                    </div>
                </div>

                {/* Queries Grid */}
                {filteredQueries.length === 0 ? (
                    <div className="text-center py-20 bg-[#1c1f3b] rounded-3xl shadow-xl border border-gray-700 flex flex-col items-center justify-center space-y-6 animate-fade-in">
                        <FaInfoCircle className="text-lime-400 text-6xl opacity-70" />
                        <p className="text-3xl font-bold text-gray-200">
                            No Queries Found!
                        </p>
                        <p className="text-lg text-gray-400 max-w-md">
                            It seems your search didn't match any existing product queries.
                            Try adjusting your search terms or explore other categories.
                        </p>
                        <Link
                            to="/add-query"
                            className="mt-6 bg-gradient-to-r from-lime-500 to-lime-300 text-black font-extrabold text-lg
                            px-10 py-4 rounded-full shadow-2xl hover:shadow-lime-400/70
                            transform hover:scale-105 transition-all duration-300 ease-in-out
                            tracking-wide uppercase relative overflow-hidden group"
                        >
                            <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <FaRegLightbulb className="text-xl" /> Share Your Query
                            </span>
                        </Link>
                    </div>
                ) : (
                    <div className={`grid ${gridColsClass} gap-8 transition-all duration-500 ease-in-out`}>
                        {filteredQueries.map((query) => {
                            const isLiked = query.likes?.includes(user?.email);
                            return (
                                <div
                                    key={query._id}
                                    className="bg-[#1c1f3b] rounded-3xl shadow-xl border border-gray-700 p-7 flex flex-col transform transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lime-500/30 group relative overflow-hidden"
                                >
                                    {/* User Info Header */}
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={query.userPhoto || '/avatar.png'}
                                                alt={query.userName}
                                                className="w-12 h-12 rounded-full border-2 border-lime-400 object-cover shadow-md"
                                            />
                                            <div>
                                                <p className="font-bold text-lime-300 text-lg">{query.userName}</p>
                                                <p className="text-xs text-gray-500">{new Date(query.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">🌐 Public</span>
                                    </div>

                                    {/* Query Title */}
                                    <h3 className="text-2xl font-extrabold text-white leading-snug mb-3">
                                        {query.queryTitle}
                                    </h3>

                                    {/* Product Image */}
                                    {query.productImage && (
                                        <div className="rounded-2xl w-full h-56 overflow-hidden border border-gray-700 mb-5 flex justify-center items-center bg-gray-900 shadow-md">
                                            <img
                                                src={query.productImage}
                                                alt={query.productName}
                                                className="w-full h-full object-contain p-3 transition-transform duration-500 ease-in-out group-hover:scale-110"
                                            />
                                        </div>
                                    )}

                                    {/* Product Info */}
                                    <div className="space-y-2  flex-grow">
                                        <p className="text-base text-gray-300 flex items-center gap-2">
                                            <span className="text-lime-400">🛍️</span> <span className="font-semibold">Product:</span>
                                            <strong className="text-lime-300 ml-1">{query.productName}</strong> ({query.productBrand})
                                        </p>
                                        <p className="text-sm text-red-400 leading-snug">
                                            ❌ <span className="font-semibold">Reason:</span> {query.boycottingReason?.slice(0, 100)}{query.boycottingReason.length > 100 ? '...' : ''}
                                        </p>
                                       
                                    </div>
 <div className="flex items-center justify-between text-sm my-2">
     {query.likes?.length > 0 && (
                                                <div className='flex items-center gap-1 text-pink-300'>
                                                    <FcLike size={20} /> {query.likes.length}
                                                </div>
                                            )}
                                            <p className="text-cyan-300 flex items-center gap-1">
                                                💡 <span className="font-semibold">Recommendations:</span> {query.recommendationCount || 0}
                                            </p>
                                           
                                        </div>
                                    {/* Reactions and Action Buttons */}
                                    <div className="flex justify-around border-t border-gray-700 pt-5 text-gray-400 mt-auto">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleLike(query._id); }}
                                            className="hover:text-lime-300 flex items-center gap-2 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400 rounded-md p-2"
                                            aria-label={isLiked ? "Unlike" : "Like"}
                                        >
                                            {isLiked ? <FcDislike size={22} /> : <FcLike size={22} />}
                                            <span className="hidden md:inline">
                                                {isLiked ? 'Unlike' : 'Like'}
                                            </span>
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleRecommend(query._id); }}
                                            className="hover:text-lime-300 flex items-center gap-2 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400 rounded-md p-2"
                                            aria-label="Recommend"
                                        >
                                            <FaCommentAlt size={20} />
                                            <span className="hidden md:inline">
                                                Recommend
                                            </span>
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleShare(query._id); }}
                                            className="hover:text-lime-300 flex items-center gap-2 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400 rounded-md p-2"
                                            aria-label="Share"
                                        >
                                            <FaShareAlt size={20} />
                                            <span className="hidden md:inline">
                                                Share
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Queries;