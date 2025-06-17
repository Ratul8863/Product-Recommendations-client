import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const QueryDetails = () => {
  const { id } = useParams();
  const { user, setRecommender } = useContext(AuthContext);
  const {
    _id,
    queryTitle,
    userEmail,
    userName,
    userPhoto,
    createdAt,
    productImage,
    productName,
    productBrand,
    boycottingReason,
    recommendationCount,
  } = useLoaderData();

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (user?.email) setRecommender(user.email);
  }, [user, setRecommender]);

  useEffect(() => {
    if (_id) {
      fetch(`https://product-reco-server.vercel.app/recommendations/${_id}`)
        .then(res => res.json())
        .then(data => setRecommendations(data));
    }
  }, [_id]);

  const handleRecommendation = async (e) => {
    e.preventDefault();
    const form = e.target;

    const recommendation = {
      queryId: _id,
      queryTitle,
      productName,
      userEmail,
      userName,
      recommenderEmail: user.email,
      recommenderName: user.displayName,
      recommenderPhoto: user.photoURL,
      createdAt: new Date().toISOString(),
      recommendationTitle: form.title.value,
      recommendedProductName: form.product.value,
      recommendedProductImage: form.image.value,
      recommendationReason: form.reason.value,
    };

    const res = await fetch('https://product-reco-server.vercel.app/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recommendation),
      credentials: 'include'
      
    });

    const data = await res.json();
    if (data.insertedId) {
      alert('Recommendation submitted!');
      form.reset();
      const updated = await fetch(`https://product-reco-server.vercel.app/recommendations/${_id}`);
      const updatedData = await updated.json();
      setRecommendations(updatedData);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-white">
      {/* Query Info */}
      <div className="bg-[#1c1f3b] border border-gray-700 shadow-lg p-6 rounded-2xl mb-10">
        <h2 className="text-3xl font-extrabold text-lime-400 mb-3">{queryTitle}</h2>
        <div className="flex items-center gap-4 mb-4">
          <img src={userPhoto} alt="User" className="w-12 h-12 rounded-full border border-gray-600" />
          <div>
            <p className="font-semibold text-white">{userName}</p>
            <p className="text-sm text-gray-400">{new Date(createdAt).toLocaleString()}</p>
          </div>
        </div>
        <img src={productImage} alt={productName} className="w-32 rounded-xl mb-4 border border-gray-700" />
        <p><span className="font-semibold text-lime-300">Product:</span> {productName} ({productBrand})</p>
        <p className="mt-2"><span className="font-semibold text-lime-300">Boycotting Reason:</span> {boycottingReason}</p>
        <p className="mt-2"><span className="font-semibold text-lime-300">Total Recommendations:</span> {recommendationCount}</p>
      </div>

      {/* Recommendation Form */}
      <div className="bg-gradient-to-r from-lime-800 to-lime-700 text-black p-6 rounded-2xl shadow-lg mb-12">
        <h3 className="text-2xl font-bold mb-4">Add a Recommendation</h3>
        <form onSubmit={handleRecommendation} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Recommendation Title"
            className="input input-bordered w-full rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            name="product"
            placeholder="Recommended Product Name"
            className="input input-bordered w-full rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Recommended Product Image URL"
            className="input input-bordered w-full rounded-lg px-4 py-2"
            required
          />
          <textarea
            name="reason"
            placeholder="Why do you recommend this product?"
            className="textarea textarea-bordered w-full rounded-lg px-4 py-2"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#0D1128] text-lime-300 px-6 py-2 rounded-xl hover:bg-[#1c1f3b] transition duration-200 shadow-md"
          >
            Add Recommendation
          </button>
        </form>
      </div>

      {/* All Recommendations */}
      <div className="bg-[#1c1f3b] p-6 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-lime-400 mb-4">All Recommendations</h3>
        {recommendations.length === 0 ? (
          <p className="text-gray-400">No recommendations yet. Be the first to recommend!</p>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec._id} className="border border-gray-700 p-4 rounded-xl bg-[#0D1128]">
                <div className="flex items-center gap-3 mb-2">
                  <img src={rec.recommenderPhoto} alt="recommender" className="w-10 h-10 rounded-full border border-gray-600" />
                  <div>
                    <p className="font-semibold text-white">{rec.recommenderName}</p>
                    <p className="text-sm text-gray-400">{new Date(rec.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-lime-300">{rec.recommendationTitle}</h4>
                <p><span className="font-medium text-white">Product:</span> {rec.recommendedProductName}</p>
                <img src={rec.recommendedProductImage} alt="Recommended" className="w-28 rounded mt-2 border border-gray-700" />
                <p className="mt-2 text-white">{rec.recommendationReason}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryDetails;
