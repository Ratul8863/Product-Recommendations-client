import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import ExtraSection1 from '../../Components/ExtraSection1';
import ExtraSection2 from '../../Components/ExtraSection2';
import { FcLike, FcDislike } from "react-icons/fc";
import { FaCommentAlt, FaTh, FaThLarge, FaList } from 'react-icons/fa'; // Added icons for layouts
import { MdShare, MdFilterList, MdOutlineClose } from 'react-icons/md'; // Added filter and close icons

const RecentFeed = () => {
    const [recentQueries, setRecentQueries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState(''); // New state for brand filter
    const [minRecommendations, setMinRecommendations] = useState(0); // New state for recommendations filter
    const [gridLayout, setGridLayout] = useState(2);
    const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
  fetch('http://localhost:5000/queries/recent', {
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => setRecentQueries(data))
    .catch(error => console.error("Failed to fetch recent queries:", error));
}, []);


    const handleLike = async (id) => {
        if (!user) {
            alert("Please log in to like.");
            return;
        ;
        }
        try {
            const res = await fetch(`http://localhost:5000/queries/like/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: user.email })
            });

            if (res.ok) {
                setRecentQueries(prevQueries =>
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
                const updated = await fetch('http://localhost:5000/queries/recent').then(res => res.json());
                setRecentQueries(updated);
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

    // Derived state for unique brands for the filter dropdown
    const uniqueBrands = [...new Set(recentQueries.map(query => query.productBrand))].sort();

    // Filter queries based on search, brand, and recommendation count
    const filteredQueries = recentQueries.filter(query => {
        const matchesSearch = query.productName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBrand = selectedBrand ? query.productBrand === selectedBrand : true;
        const matchesRecommendations = query.recommendationCount >= minRecommendations;

        return matchesSearch && matchesBrand && matchesRecommendations;
    });

    // Dynamic grid layout class
    const gridColsClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }[gridLayout];

    return (
        <div className="min-h-screen bg-[#0D1128] flex flex-col lg:flex-row font-sans ">
            {/* Left Sidebar - Desktop */}
            <aside className="hidden lg:flex flex-col w-1/5 rounded-2xl ml-4 p-6 bg-[#1c1f3b] shadow-xl sticky top-0 h-screen overflow-y-auto transform transition-all duration-300 hover:scale-[1.01]">
                <h2 className="text-3xl font-extrabold text-lime-400 mb-8 tracking-wide">🧠 RecoSys</h2>
                <ExtraSection1 />
            </aside>

            {/* Main Feed */}
            <main className="flex-1 px-4 py-6 max-w-screen-lg mx-auto w-full space-y-8">
                {/* Filter & Layout Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="bg-lime-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-lime-500 transition-all duration-300 flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center"
                    >
                        {showFilters ? <MdOutlineClose size={20} /> : <MdFilterList size={20} />}
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>

                    {/* Layout Toggles */}
                    <div className="flex gap-2 bg-[#1c1f3b] p-2 rounded-xl shadow-inner w-full sm:w-auto justify-center">
                        <button
                            onClick={() => setGridLayout(1)}
                            className={`p-2 rounded-lg transition-colors duration-200 ${gridLayout === 1 ? 'bg-lime-400 text-black' : 'text-gray-400 hover:bg-gray-700'}`}
                            title="1 Column Layout"
                        >
                            <FaList size={20} />
                        </button>
                        <button
                            onClick={() => setGridLayout(2)}
                            className={`p-2 rounded-lg transition-colors duration-200 ${gridLayout === 2 ? 'bg-lime-400 text-black' : 'text-gray-400 hover:bg-gray-700'}`}
                            title="2 Column Layout"
                        >
                            <FaTh size={20} />
                        </button>
                       
                    </div>
                </div>

                {/* Dynamic Filter Section */}
                {showFilters && (
                    <div className="bg-[#1c1f3b] p-6 rounded-2xl shadow-xl mb-8 border border-gray-700 animate-fadeIn">
                        <h3 className="text-2xl font-bold text-lime-400 mb-5 text-center">Customize Your View</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Search Filter */}
                            <div>
                                <label htmlFor="search" className="block text-gray-300 text-sm font-semibold mb-2">Search Product Name</label>
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="e.g., iPhone 15"
                                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Brand Filter */}
                            <div>
                                <label htmlFor="brand" className="block text-gray-300 text-sm font-semibold mb-2">Filter by Brand</label>
                                <select
                                    id="brand"
                                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 appearance-none pr-8"
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                >
                                    <option value="">All Brands</option>
                                    {uniqueBrands.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Recommendations Filter */}
                            <div>
                                <label htmlFor="recommendations" className="block text-gray-300 text-sm font-semibold mb-2">Min. Recommendations</label>
                                <input
                                    type="number"
                                    id="recommendations"
                                    placeholder="0"
                                    min="0"
                                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    value={minRecommendations}
                                    onChange={(e) => setMinRecommendations(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {filteredQueries.length === 0 ? (
                    <p className="text-center text-gray-400 text-lg mt-10">No queries found matching your criteria. Try adjusting your filters!</p>
                ) : (
                    <div className={`grid ${gridColsClass} gap-6 mx-auto`}>
                        {filteredQueries.map(query => {
                            const isLiked = query.likes?.includes(user?.email);
                            return (
                                <div
                                    key={query._id}
                                    className="bg-[#1c1f3b] rounded-2xl shadow-lg hover:shadow-lime-400/50 transition-all duration-300 p-6 border border-gray-700 transform hover:-translate-y-1 hover:scale-[1.01] flex flex-col"
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={query.userPhoto || '/avatar.png'}
                                                alt={query.userName}
                                                className="w-12 h-12 rounded-full border-2 border-lime-400 object-cover"
                                            />
                                            <div>
                                                <p className="font-bold text-lime-300 text-lg">{query.userName}</p>
                                                <p className="text-xs text-gray-500">{new Date(query.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500 bg-gray-800 px-3 py-1 rounded-full">🌐 Public</span>
                                    </div>

                                    {/* Query Title */}
                                    <h3 className="text-xl font-extrabold text-white leading-tight mb-3">
                                        {query.queryTitle}
                                    </h3>

                                    {/* Product Image */}
                                    {query.productImage && (
                                        <div className="rounded-xl w-full max-h-64 overflow-hidden border border-gray-700 mb-4 flex justify-center items-center bg-gray-900">
                                            <img
                                                src={query.productImage}
                                                alt={query.productName}
                                                className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-500 ease-in-out"
                                            />
                                        </div>
                                    )}

                                    {/* Product Info */}
                                    <div className="space-y-2 mb-2 flex-grow">
                                        <p className="text-base text-gray-300">
                                            🛍️ <span className="font-semibold">Product:</span>
                                            <strong className="text-lime-400 ml-1">{query.productName}</strong> ({query.productBrand})
                                        </p>
                                        <p className="text-sm text-red-400 ">
                                            ❌ <span className="font-semibold">Reason:</span> {query.boycottingReason?.slice(0, 150)}{query.boycottingReason.length > 150 ? '...' : ''}
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
                                    {/* Reactions */}
                                    <div className="flex justify-around border-t border-gray-700 pt-4 text-sm text-gray-400 mt-auto">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleLike(query._id); }}
                                            className="hover:text-lime-300 flex items-center gap-2 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400 rounded-md px-2 py-1"
                                            aria-label={isLiked ? "Unlike" : "Like"}
                                        >
                                            {isLiked ? <FcDislike className='text-red-500' size={24} /> : <FcLike size={24} />}
                                            <span className="hidden sm:inline">{isLiked ? 'Unlike' : 'Like'}</span>
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleRecommend(query._id); }}
                                            className="hover:text-lime-300 flex items-center gap-2 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400 rounded-md px-2 py-1"
                                            aria-label="Recommend"
                                        >
                                            <FaCommentAlt size={20} /> <span className="hidden sm:inline">Recommend</span>
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleShare(query._id); }}
                                            className="hover:text-lime-300 flex items-center gap-2 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400 rounded-md px-2 py-1"
                                            aria-label="Share"
                                        >
                                            <MdShare size={24} /> <span className="hidden sm:inline">Share</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

           {/* Right Sidebar - Desktop */}
            <aside className="hidden lg:flex flex-col w-1/5 p-6 rounded-2xl mr-4 bg-[#1c1f3b] shadow-xl sticky top-0 h-screen overflow-y-auto space-y-8 transform transition-all duration-300 hover:scale-[1.01]">
                {user ? (
                    <div className="flex flex-col items-center text-center space-y-5">
                        <img
                            src={user.photoURL || 'https://i.ibb.co/L18f1Yh/user.png'} 
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full object-cover border-4 border-lime-400 shadow-lg "
                        />
                        <p className="text-2xl font-extrabold text-lime-300 drop-shadow-lg">
                            Welcome, <span className="text-white">{user.displayName}!</span> 👋
                        </p>
                        <p className="text-sm text-gray-400">
                            Ready to share your insights or discover new alternatives?
                        </p>
                        <Link to="/add-query" className="
                            bg-gradient-to-r from-lime-500 to-lime-300 text-black font-extrabold text-lg
                            px-8 py-4 rounded-full shadow-2xl hover:shadow-lime-400/70
                            transform hover:scale-105 transition-all duration-300 ease-in-out
                            tracking-wide uppercase relative overflow-hidden group
                        ">
                            <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Add Your Query
                            </span>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center space-y-5">
                        <p className="text-2xl font-extrabold text-lime-300 drop-shadow-lg">
                            Join the Conversation! 🚀
                        </p>
                        <p className="text-sm text-gray-400">
                            Log in to share queries, like posts, and get personalized recommendations.
                        </p>
                        <Link to="/login" className="
                            bg-gradient-to-r from-blue-700 to-blue-500 text-white font-extrabold text-lg
                            px-8 py-4 rounded-full shadow-2xl hover:shadow-blue-500/70
                            transform hover:scale-105 transition-all duration-300 ease-in-out
                            tracking-wide uppercase relative overflow-hidden group
                        ">
                            <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Secure Login
                            </span>
                        </Link>
                    </div>
                )}
              
            </aside>

            {/* Mobile Sticky Footer Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#1c1f3b] border-t border-gray-700 py-3 px-4 flex justify-around items-center z-50 shadow-lg">
                <Link to="/" className="flex flex-col items-center text-gray-400 hover:text-lime-400 transition-colors duration-200">
                    <FaCommentAlt size={20} />
                    <span className="text-xs mt-1">Feed</span>
                </Link>
                <Link to="/add-query" className="flex flex-col items-center bg-lime-400 text-black p-3 rounded-full shadow-lg hover:bg-lime-300 transition-colors duration-200 transform -translate-y-2">
                    <span className="text-xl font-bold">+</span>
                </Link>
                {user ? (
                    <Link to="/profile" className="flex flex-col items-center text-gray-400 hover:text-lime-400 transition-colors duration-200">
                        <img src={user.photoURL || '/avatar.png'} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
                        <span className="text-xs mt-1">Profile</span>
                    </Link>
                ) : (
                    <Link to="/login" className="flex flex-col items-center text-gray-400 hover:text-lime-400 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span className="text-xs mt-1">Login</span>
                    </Link>
                )}

               
            </div>
        </div>
    );
};

export default RecentFeed;