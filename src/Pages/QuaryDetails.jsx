import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';


const QueryDetails = () => {
  const { id } = useParams();
  const { user,setRecommender,recommender } = useContext(AuthContext);
  const {_id,queryTitle,userEmail,userName,userPhoto,createdAt,productImage,productName,productBrand,boycottingReason,recommendationCount} = useLoaderData()

  const [query, setQuery] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
setRecommender(user.email)
  // Fetch Query Details
  // useEffect(() => {
  //   fetch(`http://localhost:5000/queries/${id}`)
  //     .then(res => res.json())
  //     .then(data => setQuery(data));
  // }, [id]);

  // Fetch Recommendations
  useEffect(() => {
    if (_id) {
      fetch(`http://localhost:5000/recommendations/${_id}`)
        .then(res => res.json())
        .then(data => setRecommendations(data));
    }
  }, [query]);

  const handleRecommendation = async (e) => {
    e.preventDefault();
    const form = e.target;

    const recommendation = {
      queryId: _id,
      queryTitle: queryTitle,
      productName: productName,
      userEmail: userEmail,
      userName: userName,
      recommenderEmail: user.email,
      recommenderName: user.displayName,
      recommenderPhoto: user.photoURL,
      createdAt: new Date().toISOString(),
      recommendationTitle: form.title.value,
      recommendedProductName: form.product.value,
      recommendedProductImage: form.image.value,
      recommendationReason: form.reason.value,
    };

    

    const res = await fetch('http://localhost:5000/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recommendation),
    });

    const data = await res.json();
    if (data.insertedId) {
      alert("Recommendation submitted!");
      form.reset();
      // Refresh the recommendation list
      fetch(`http://localhost:5000/recommendations/${_id}`)
        .then(res => res.json())
        .then(data => setRecommendations(data));
    }
  };

console.log(recommender)




  // if (!query) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Query Info */}
      <div className="bg-white shadow p-6 rounded mb-8">
        <h2 className="text-2xl font-bold mb-2">{queryTitle}</h2>
        <div className="flex items-center gap-3 mb-4">
          <img src={userPhoto} alt="User" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-medium">{userName}</p>
            <p className="text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</p>
          </div>
        </div>
        <img src={productImage} alt={productName} className="w-40 rounded mb-3" />
        <p><strong>Product:</strong> {productName} ({productBrand})</p>
        <p className="mt-2"><strong>Boycotting Reason:</strong> {boycottingReason}</p>
        <p className="mt-2"><strong>Recommendations:</strong> {recommendationCount}</p>
      </div>
  <Link  ><button className="mt-4 btn md:h-12 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200">Recommend</button></Link> 
      {/* Recommendation Form */}
      <div className="bg-blue-50 p-6 rounded mb-8">
        <h3 className="text-xl font-bold mb-4">Add a Recommendation</h3>
        <form onSubmit={handleRecommendation} className="space-y-4">
          <input type="text" name="title" placeholder="Recommendation Title" className="input input-bordered w-full" required />
          <input type="text" name="product" placeholder="Recommended Product Name" className="input input-bordered w-full" required />
          <input type="text" name="image" placeholder="Recommended Product Image URL" className="input input-bordered w-full" required />
          <textarea name="reason" placeholder="Why do you recommend this product?" className="textarea textarea-bordered w-full" required></textarea>
          <button type="submit" className="btn btn-primary">Add Recommendation</button>
        </form>
      </div>

      {/* All Recommendations */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">All Recommendations</h3>
        {recommendations.length === 0 ? (
          <p>No recommendations yet. Be the first to recommend!</p>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec._id} className="border rounded p-4 bg-white shadow">
                <div className="flex items-center gap-3 mb-2">
                  <img src={rec.recommenderPhoto} alt="recommender" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold">{rec.recommenderName}</p>
                    <p className="text-sm text-gray-500">{new Date(rec.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <h4 className="text-lg font-bold">{rec.recommendationTitle}</h4>
                <p><span className="font-medium">Product:</span> {rec.recommendedProductName}</p>
                <img src={rec.recommendedProductImage} alt="Recommended" className="w-28 rounded mt-2" />
                <p className="mt-2">{rec.recommendationReason}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryDetails;
