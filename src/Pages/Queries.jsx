import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import { FcLike, FcDislike } from "react-icons/fc";
import { FaCommentAlt, FaTh, FaThLarge, FaList, FaRegLightbulb, FaShareAlt, FaSearch, FaInfoCircle, FaSortAmountDownAlt, FaEye } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Looding1 from './Shared/Looding/Looding1';
import { toast } from 'react-toastify';
import { MdFilterList, MdOutlineClose, MdShare } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';

const Queries = () => {
    const [queries, setQueries] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [gridLayout, setGridLayout] = useState(3);
    const [sortCriteria, setSortCriteria] = useState('newest');
    const [loading, setLoading] = useState(true);
    const [isFilterBarOpen, setIsFilterBarOpen] = useState(true); // State for the slide-down filter bar
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch('https://product-reco-server.vercel.app/queries/all')
            .then(res => res.json())
            .then(data => {
                setQueries(data);
            })
            .catch(err => console.error("Query fetch failed:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleLike = async (id) => {
        if (!user) {
            toast.error("Please login to like.", { position: "bottom-center" });
            return;
        }

        try {
            const res = await fetch(`https://product-reco-server.vercel.app/queries/like/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ userEmail: user.email })
            });

            if (res.ok) {
                setQueries(prev =>
                    prev.map(q => q._id === id
                        ? {
                            ...q,
                            likes: q.likes?.includes(user.email)
                                ? q.likes.filter(e => e !== user.email)
                                : [...(q.likes || []), user.email]
                        }
                        : q
                    )
                );
            }
        } catch (err) {
            console.error("Like failed:", err);
            toast.error("An error occurred while liking the query.", { position: "bottom-center" });
        }
    };

    const handleShare = (id) => {
        const url = `${window.location.origin}/query/${id}`;
        navigator.clipboard.writeText(url)
            .then(() => toast.success("🔗 Link copied!", { position: "bottom-center" }))
            .catch(err => console.error("Clipboard error:", err));
    };

    const handleRecommend = (id) => navigate(`/query/${id}`);

    const filteredQueries = queries.filter(query =>
        query.productName.toLowerCase().includes(searchText.toLowerCase())
    );

    const sortedQueries = [...filteredQueries].sort((a, b) => {
        if (sortCriteria === 'newest') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortCriteria === 'likes') {
            const aLikes = a.likes?.length || 0;
            const bLikes = b.likes?.length || 0;
            return bLikes - aLikes;
        } else if (sortCriteria === 'recommendations') {
            return (b.recommendationCount || 0) - (a.recommendationCount || 0);
        }
        return 0;
    });

    const gridColsClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
    }[gridLayout];

    const handleGridClick = (cols) => {
        const minWidth = cols === 4 ? 1280 : cols === 3 ? 1024 : 768;
        if (window.innerWidth < minWidth) {
            toast.error(`Use a larger screen to enable ${cols}-column layout`);
            return;
        }
        setGridLayout(cols);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0D1128] text-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <Helmet><title>RecoSys | Queries</title></Helmet>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-5xl font-extrabold text-lime-600 dark:text-lime-400 mb-4 drop-shadow-md">All Community Queries</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Explore product-related concerns raised by our community</p>
                </div>
                
                {/* Filter Bar Toggle Button */}
                <div className="flex justify-center md:justify-end mb-8">
                    <button
                        onClick={() => setIsFilterBarOpen(!isFilterBarOpen)}
                        className="bg-lime-500 hover:bg-lime-600 text-black dark:text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
                    >
                        {isFilterBarOpen ? <MdOutlineClose size={20} /> : <MdFilterList size={20} />}
                        {isFilterBarOpen ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>

                {/* Collapsible Filter Bar */}
                <div 
                    className={`bg-white dark:bg-[#1c1f3b] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 ease-in-out ${isFilterBarOpen ? 'max-h-96 opacity-100 mb-12' : 'max-h-0 opacity-0 mb-0'}`}
                >
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            {/* Search Input */}
                            <div className="relative w-full md:w-1/2 lg:w-2/5">
                                <input
                                    type="text"
                                    placeholder="Search by Product Name..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="w-full p-4 pl-12 rounded-full bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-3 focus:ring-lime-500 text-lg"
                                />
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                {/* Sort Dropdown */}
                                <div className="relative w-full sm:w-auto">
                                    <select
                                        value={sortCriteria}
                                        onChange={(e) => setSortCriteria(e.target.value)}
                                        className="w-full appearance-none bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full py-3 px-6 pr-10 focus:ring-3 focus:ring-lime-500 transition-colors duration-300 text-base font-semibold"
                                    >
                                        <option value="newest">Sort by: Newest</option>
                                        <option value="likes">Sort by: Most Likes</option>
                                        <option value="recommendations">Sort by: Most Recommendations</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>

                                {/* Grid Layout Switcher */}
                                <div className="flex gap-3 bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-inner border border-gray-300 dark:border-gray-700 w-full sm:w-auto justify-center">
                                    {[1, 2, 3, 4].map((cols, idx) => {
                                        const icons = [<FaList />, <FaTh />, <FaThLarge />, <span className="text-xl">4️⃣</span>];
                                        return (
                                            <button
                                                key={cols}
                                                onClick={() => handleGridClick(cols)}
                                                title={`${cols} Column Layout`}
                                                className={`p-3 rounded-full transition-all flex items-center justify-center text-xl ${
                                                    gridLayout === cols
                                                        ? 'bg-gradient-to-br from-lime-400 to-lime-600 text-black shadow-lg scale-105'
                                                        : 'text-gray-500 dark:text-gray-400 hover:text-lime-300 dark:hover:bg-gray-700 hover:bg-gray-300'
                                                }`}
                                            >
                                                {icons[idx]}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {loading ? <Looding1 /> : sortedQueries.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-[#1c1f3b] rounded-3xl border border-gray-200 dark:border-gray-700 space-y-6">
                        <FaInfoCircle className="text-lime-500 dark:text-lime-400 text-6xl opacity-70" />
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">No Queries Found!</p>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                            Try changing your search or submit your own product-related concern.
                        </p>
                        <Link to="/add-query">
                            <button className="bg-gradient-to-r from-lime-500 to-lime-300 text-black font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
                                <FaRegLightbulb className="inline mr-2" /> Share Your Query
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className={`grid ${gridColsClass} gap-8`}>
                        {sortedQueries.map(query => {
                            const isLiked = user && query.likes?.includes(user?.email);
                            return (
                               <div
                                                                   key={query._id}
                                                                   className="bg-white dark:bg-[#0D1128] text-gray-900 dark:text-white rounded-2xl shadow-lg hover:shadow-lime-400/50 transition-all duration-300 p-6  border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1 hover:scale-[1.01] flex flex-col"
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
                                                                               <p className="font-bold dark:text-lime-300 text-lg">{query.userName}</p>
                                                                               <p className="text-xs text-gray-500">{new Date(query.createdAt).toLocaleString()}</p>
                                                                           </div>
                                                                       </div>
                                                                       <span className="text-sm text-gray-500 dark:bg-gray-800 px-1 py-1 rounded-full">🌐</span>
                                                                   </div>
                               
                                                                   {/* Query Title */}
                                                                   <h3 className="text-xl font-extrabold dark:text-white leading-tight mb-3">
                                                                       {query.queryTitle}
                                                                   </h3>
                                                                  {/* Product Info */}
                                                                   <div className="space-y-2 mb-2 flex-grow">
                                                                       <p className="text-base dark:text-gray-300">
                                                                           🛍️ <span className="font-semibold text-gray-500">Product:</span>
                                                                           <strong className="dark:text-lime-400 ml-1">{query.productName?.slice(0, 20)}{query.productName.length > 20 ? '...' : ''}</strong> 
                                                                       </p>
                                                                       <p className="text-sm ">
                                                                            <span className="font-semibold"></span> {query.boycottingReason?.slice(0, 150)}{query.boycottingReason.length > 150 ? '...' : ''}
                                                                       </p>
                                                                      
                                                                   </div>
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
                               
                                                                   
                                <div className="flex items-center justify-between text-sm my-2">
                                                                           {query.likes?.length >= 0 && (
                                                                               <div className='flex items-center gap-1 text-pink-300'>
                                                                                  <AiFillHeart size={20} className="text-red-700" /> {query.likes.length}
                                                                               </div>
                                                                               
                                                                           )}
                                                                          <Link to={`/query/${query._id}`}>
                                                                           <p className="text-cyan-900 dark:text-white flex items-center gap-1">
                                                                               <FaEye size={15} /> <span className="font-semibold"></span> See More
                                                                           </p>
                                                                          </Link>
                               
                                                                           <p className="text-cyan-900 dark:text-white flex items-center gap-1">
                                                                               <FaCommentAlt size={15} /> <span className="font-semibold"></span> {query.recommendationCount || 0}
                                                                           </p>
                                                                           
                                                                       </div>
                                                                   {/* Reactions */}
                                                                   <div className="flex justify-around border-t border-gray-700 pt-4 text-sm text-gray-400 mt-auto">
                                                                       <button
                                                                           onClick={(e) => { e.stopPropagation(); handleLike(query._id); }}
                                                                           className="hover:text-lime-300 flex items-center gap-2 cursor-pointer transition-colors duration-200    rounded-md px-2 py-1"
                                                                           aria-label={isLiked ? "Unlike" : "Like"}
                                                                       >
                                                                           {isLiked ? <FcDislike className='text-red-700' size={24} /> :  <AiFillHeart size={24} className="text-red-700"  />}
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
            </div>
        </div>
    );
};

export default Queries;