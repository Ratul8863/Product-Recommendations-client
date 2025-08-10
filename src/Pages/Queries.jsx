import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import { FcLike, FcDislike } from "react-icons/fc";
import { FaCommentAlt, FaTh, FaThLarge, FaList, FaRegLightbulb, FaShareAlt, FaSearch, FaInfoCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Looding1 from './Shared/Looding/Looding1';
import { toast } from 'react-toastify';

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [gridLayout, setGridLayout] = useState(3);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('https://product-reco-server.vercel.app/queries/all')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQueries(sorted);
      })
      .catch(err => console.error("Query fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleLike = async (id) => {
    if (!user) {
      toast.error("Please login to like.", { position: "bottom-center" }); // Replaced alert() with a toast
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
    document.execCommand('copy')
    navigator.clipboard.writeText(url)
      .then(() => toast.success("🔗 Link copied!", { position: "bottom-center" }))
      .catch(err => console.error("Clipboard error:", err));
  };

  const handleRecommend = (id) => navigate(`/query/${id}`);

  const filteredQueries = queries.filter(query =>
    query.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
  }[gridLayout];

  const handleGridClick = (cols) => {
    const minWidth = cols === 4 ? 1280 : cols === 3 ? 1172 : 640;
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
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-lime-600 dark:text-lime-400 mb-4 drop-shadow-md">All Community Queries</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Explore product-related concerns raised by our community</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 p-6 bg-white dark:bg-[#1c1f3b] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
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

          {/* Grid Layout Switcher */}
          <div className="flex gap-3 bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-inner border border-gray-300 dark:border-gray-700">
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

        {/* Results */}
        {loading ? <Looding1 /> : filteredQueries.length === 0 ? (
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
            {filteredQueries.map(query => {
              const isLiked = query.likes?.includes(user?.email);
              return (
                <div key={query._id} className="bg-white dark:bg-[#1c1f3b] rounded-3xl p-7 shadow-xl border border-gray-200 dark:border-gray-700 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lime-500/30 transition duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={query.userPhoto || '/avatar.png'} className="w-12 h-12 rounded-full border-2 border-lime-400" alt="" />
                      <div>
                        <p className="font-bold text-lime-500 dark:text-lime-300">{query.userName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{new Date(query.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-sm rounded-full">🌐 </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{query.queryTitle}</h3>
                  {query.productImage && (
                    <div className="w-full h-56 bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                      <img src={query.productImage} className="object-contain w-full h-full group-hover:scale-110 transition" alt="" />
                    </div>
                  )}
                  <p className="text-gray-600 dark:text-gray-300"><span className="text-lime-500 dark:text-lime-400">🛍️ Product:</span> <b>{query.productName}</b> </p>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-2">❌ Reason: {query.boycottingReason.slice(0, 10)} <span onClick={() => handleRecommend(query._id)}>{query.boycottingReason.length > 100 ? '...' : ''}</span></p>

                  <div className="flex justify-between text-sm mt-4 text-gray-600 dark:text-gray-300">
                    {query.likes?.length > 0 && (
                      <span className="flex items-center gap-1 text-pink-500 dark:text-pink-300"><FcLike /> {query.likes.length}</span>
                    )}
                    <span className="text-cyan-500 dark:text-cyan-300">💡 Recommendations: {query.recommendationCount || 0}</span>
                  </div>

                  <div className="flex justify-around pt-5 border-t border-gray-300 dark:border-gray-700 mt-4 text-gray-500 dark:text-gray-400">
                    <button onClick={() => handleLike(query._id)} className="hover:text-lime-500 dark:hover:text-lime-300 flex gap-2 items-center cursor-pointer">
                      {isLiked ? <FcDislike /> : <FcLike />}
                    </button>
                    <button onClick={() => handleRecommend(query._id)} className="hover:text-lime-500 dark:hover:text-lime-300 flex gap-2 items-center cursor-pointer">
                      <FaCommentAlt />
                    </button>
                    <button onClick={() => handleShare(query._id)} className="hover:text-lime-500 dark:hover:text-lime-300 flex gap-2 items-center cursor-pointer">
                      <FaShareAlt />
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
