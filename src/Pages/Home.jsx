import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../Components/Banner';
import HomeSlider from '../Components/HomeSlider';
import RecentFeed from './Shared/RecentFeed';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div className="min-h-screen  ">
      <Helmet>
        <title>RecoSys | Home</title>
      </Helmet>

      {/* Hero Section */}
      <Banner />

      <div className="space-y-20 py-12 px-4 md:px-8 lg:px-16">
        
        {/* Highlighted Products (Slider) */}
        <section>
          <h2 className="text-3xl font-bold text-lime-400 text-center mb-8">🌟 Highlighted Products</h2>
          <HomeSlider />
        </section>

        {/* Recent Queries */}
        <section>
          <h2 className="text-3xl text-yellow-400 font-bold text-center mb-6">📢 Recent Queries</h2>
          <RecentFeed />
        </section>

        {/* Product Categories */}
        <section className="bg-[#1c1f3b] rounded-3xl text-white shadow-xl border border-gray-700 p-10">
          <h2 className="text-3xl text-center text-lime-400 font-bold mb-8">📦 Product Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
            {["Electronics", "Fashion", "Health", "Books", "Food", "Software", "Home", "Toys"].map(cat => (
              <div key={cat} className="p-4 bg-gray-800 hover:bg-lime-600 hover:text-black rounded-lg transition font-semibold">
                {cat}
              </div>
            ))}
          </div>
        </section>

        {/* Promotional Offers */}
        <section className="bg-gradient-to-r from-pink-500 to-yellow-500 text-black p-10 rounded-3xl text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">🔥 Promotional Offers</h2>
          <p className="mb-4">Get up to <span className="font-extrabold text-4xl">50% OFF</span> on featured sustainable products!</p>
          <button className="bg-black text-yellow-300 px-6 py-3 rounded-full font-bold hover:scale-105 transition">Shop Now</button>
        </section>

        {/* Community Trust */}
        <section className="bg-purple-700 text-white rounded-3xl p-10 text-center shadow-2xl ">
          <h2 className="text-3xl font-bold mb-4">🔐 Trusted by the Community</h2>
          <p className="text-lg mb-6">Thousands rely on RecoSys for ethical recommendations.</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <div><h3 className="text-2xl font-bold text-purple-200">10K+</h3><p>Active Users</p></div>
            <div><h3 className="text-2xl font-bold text-purple-200">20K+</h3><p>Products Suggested</p></div>
            <div><h3 className="text-2xl font-bold text-purple-200">100+</h3><p>Partner Brands</p></div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="bg-[#1c1f3b] text-white p-10 rounded-3xl shadow-xl border border-gray-700">
          <h2 className="text-3xl text-center text-yellow-400 font-bold mb-8">📰 From the Blog</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((b, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-xl hover:bg-lime-600 hover:text-black transition">
                <h3 className="text-xl font-bold mb-2">How to Spot Greenwashing in Brands {b}</h3>
                <p className="text-sm text-gray-400">Learn how to identify misleading marketing and make informed ethical choices in your purchases.</p>
                <button className="mt-4 underline font-semibold hover:text-white">Read More</button>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
       

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-pink-600 to-purple-700 rounded-3xl p-10 text-center  text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Share Your Voice?</h2>
          <p className="text-lg mb-6">Post your queries or recommend ethical alternatives today.</p>
          <Link to="/add-query">
            <button className="bg-white text-purple-700 font-bold px-6 py-3 rounded-full text-lg hover:scale-105 transition-transform">Add Your Query</button>
          </Link>
        </section>

      </div>
    </div>
  );
};

export default Home;
