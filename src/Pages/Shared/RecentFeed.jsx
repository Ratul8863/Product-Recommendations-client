import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import ExtraSection1 from '../../Components/ExtraSection1';
import ExtraSection2 from '../../Components/ExtraSection2';
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { FaCommentAlt } from 'react-icons/fa';

const RecentFeed = () => {
  const [recentQueries, setRecentQueries] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/queries/recent')
      .then(res => res.json())
      .then(data => setRecentQueries(data));
  }, []);

  const handleLike = async (id) => {
    if (!user) return alert("Please log in to like.");
    const res = await fetch(`http://localhost:5000/queries/like/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail: user.email })
    });

    if (res.ok) {
      // Refresh likes
      const updated = await fetch('http://localhost:5000/queries/recent').then(res => res.json());
      setRecentQueries(updated);
    }
  };

  const handleShare = (id) => {
    const url = `${window.location.origin}/query/${id}`;
    navigator.clipboard.writeText(url);
    alert("🔗 Link copied to clipboard!");
  };

  const handleRecommend = (id) => {
    navigate(`/query/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#0D1128] flex flex-col lg:flex-row">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-1/5 rounded-2xl ml-4 p-6 bg-[#1c1f3b] shadow-xl sticky top-0 h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold text-lime-400 mb-6">🧠 RecoSys</h2>
        <ExtraSection1 />
      </aside>

      {/* Mobile Sidebar */}
      {/* <div className="lg:hidden p-4 bg-[#1c1f3b] space-y-4">
        <h2 className="text-2xl font-bold text-lime-400">🧠 RecoSys</h2>
        <ExtraSection1 />
        {user ? (
          <div className="space-y-2">
            <p className="text-lime-300 font-semibold">👋 Hello, {user.displayName}</p>
            <Link to="/add-query" className="block bg-lime-400 text-black font-medium text-center px-4 py-2 rounded-xl hover:bg-lime-300 transition">
              ➕ Add a Query
            </Link>
          </div>
        ) : (
          <Link to="/login" className="block bg-blue-600 text-white text-center px-4 py-2 rounded-xl hover:bg-blue-500 transition">
            🔐 Log In
          </Link>
        )}
        <ExtraSection2 />
      </div> */}

      {/* Main Feed */}
      <main className="flex-1 px-4 py-6 max-w-screen-lg mx-auto w-fit space-y-6">
        {recentQueries.length === 0 ? (
          <p className="text-center text-gray-400">No queries found.</p>
        ) : (
          <div className='md:w-170 mx-auto space-y-4'>
            {recentQueries.map(query => {
              const isLiked = query.likes?.includes(user?.email);
              return (
                <div
                  key={query._id}
                  
                  className="bg-[#1c1f3b] rounded-xl shadow-md hover:shadow-lime-400 transition-all duration-300 p-5 border border-gray-700 "
                >
                  {/* Header */}
                  <div  className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={query.userPhoto || '/avatar.png'}
                        alt={query.userName}
                        className="w-10 h-10 rounded-full border border-lime-400"
                      />
                      <div>
                        <p className="font-semibold text-lime-300">{query.userName}</p>
                        <p className="text-xs text-gray-500">{new Date(query.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">🌐 Public</span>
                  </div>

                  {/* Query Title */}
                  <p className="text-base font-bold text-white leading-relaxed mt-2">
                    Query Title: {query.queryTitle}
                  </p>

                  {/* Product Image */}
                  {query.productImage && (
                    <div className="rounded-xl w-fit mx-auto overflow-hidden border border-gray-700 mt-3">
                      <img
                        src={query.productImage}
                        alt={query.productName}
                        className="w-fit md:h-64 object-cover p-2 hover:scale-105 transition-transform"
                      />
                    </div>
                  )}

                  {/* Product Info */}
                  <div className="space-y-1 mt-3">
                    <p className="text-sm text-gray-300">
                      🛍️ <span>Product Name:</span>
                      <strong className="text-lime-400"> {query.productName}</strong> — ({query.productBrand})
                    </p>
                    <p className="text-sm text-red-400">❌ {query.boycottingReason?.slice(0, 120)}...</p>
                    <p className="text-sm text-cyan-300">
                      💡 Recommendations: {query.recommendationCount || 0}
                    </p>
                    <p className="text-sm text-pink-300">

                        {query.likes?.length? <div className='flex gap-1'><FcLike size={20} />{ query.likes.length}</div> : ''}
                      {/* {query.likes?.length || 0} */}
                    </p>
                  </div>

                  {/* Reactions */}
                  <div className="flex justify-around border-t border-gray-700 pt-3 text-sm text-gray-400 mt-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleLike(query._id); }}
                      className="hover:text-lime-300 flex items-center gap-1 cursor-pointer"
                    >
                      {isLiked ? <FcDislike className='' size={20}/> : <FcLike size={20} />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRecommend(query._id); }}
                      className="hover:text-lime-300 flex items-center gap-1 cursor-pointer"
                    >
                      <FaCommentAlt /> Recommend
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleShare(query._id); }}
                      className="hover:text-lime-300 flex items-center gap-1 cursor-pointer"
                    >
                      🔁 Share
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Right Sidebar */}
      <aside className="hidden lg:flex flex-col w-1/5 p-6 rounded-2xl mr-4 bg-[#1c1f3b] shadow-xl sticky top-0 h-screen overflow-y-auto space-y-6">
        {user ? (
          <>
            <p className="text-lg font-semibold text-lime-300">👋 Hello, {user.displayName}</p>
            <Link to="/add-query" className="bg-lime-400 text-black font-medium text-center px-4 py-2 rounded-xl hover:bg-lime-300 transition">
              ➕ Add a Query
            </Link>
          </>
        ) : (
          <Link to="/login" className="bg-blue-600 text-white text-center px-4 py-2 rounded-xl hover:bg-blue-500 transition">
            🔐 Log In
          </Link>
        )}
        <ExtraSection2 />
      </aside>
    </div>
  );
};

export default RecentFeed;
