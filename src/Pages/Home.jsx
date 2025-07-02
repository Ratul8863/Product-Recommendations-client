import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../Components/Banner';
import HomeSlider from '../Components/HomeSlider';
import RecentFeed from './Shared/RecentFeed';
import ExtraSection1 from '../Components/ExtraSection1';
import ExtraSection2 from '../Components/ExtraSection2';
import { Helmet } from 'react-helmet-async';

// --- Mock Components for demonstration ---
// In a real application, these would be in separate files and imported.
// For self-contained demonstration and to resolve compilation errors, they are included here.

const Home = () => {
 
  return (
    <div className='relative min-h-screen  '> {/* Added a dark background */}
     <Helmet>
             <title>RecoSys | Home</title>
            </Helmet>
<div className='pt-[60px]'>
  <Banner />
</div>
      
      <div className='py-12 space-y-20 px-4 md:px-8 lg:px-16'>

        <HomeSlider />

        {/* Recent Queries Section */}
        <div className="px-4 py-8 ">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-yellow-400 font-bold text-center mb-6">
            📢 Recent Queries 
          </h2>
          <RecentFeed />
        </div>

        {/* Rethink what you buy / Recommend what matters section */}
        <div className="text-center px-4 text-white">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            Rethink what you buy. <br />
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl leading-tight">
            Recommend what matters.
          </h3>
        </div>

        {/* Extra Section 3: Community Trust */}
        {/* Removed Slide component as react-awesome-reveal is not available */}
        <div className="bg-purple-700 text-white shadow-2xl rounded-3xl p-6 md:p-10 text-center max-w-4xl mx-auto"> {/* Adjusted colors for dark theme */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">🔐 Trusted by the Community</h2>
          <p className="text-base md:text-lg mb-6">
            Thousands of users rely on RecoSys to discover the most ethical and personalized product suggestions.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="text-center min-w-[100px]">
              <h3 className="text-xl md:text-2xl font-bold text-purple-200">10K+</h3>
              <p className="text-sm md:text-base">Active Users</p>
            </div>
            <div className="text-center min-w-[100px]">
              <h3 className="text-xl md:text-2xl font-bold text-purple-200">20K+</h3>
              <p className="text-sm md:text-base">Products Suggested</p>
            </div>
            <div className="text-center min-w-[100px]">
              <h3 className="text-xl md:text-2xl font-bold text-purple-200">100+</h3>
              <p className="text-sm md:text-base">Partner Brands</p>
            </div>
          </div>
        </div>

        {/* Removed Lottie Animation */}
        {/* Lottie component and duck.json import are removed as they are external dependencies. */}
        {/* If you want an animation, consider using simple CSS animations or inline SVGs. */}
        <div className="flex justify-center my-8">
            <p className="text-gray-500">
                {/* Placeholder for removed animation */}
            </p>
        </div>

        {/* Extra Section 4: Call to Action */}
        {/* Removed Fade component as react-awesome-reveal is not available */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-700  shadow-2xl rounded-3xl p-6 md:p-10 text-center max-w-4xl mx-auto"> {/* Adjusted colors for dark theme */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Share Your Voice?</h2>
          <p className="text-base md:text-lg mb-6">
            Post your queries or recommend ethical alternatives today. Your insights shape the future.
          </p>
          <Link to={"/add-query"}>
            <button className="bg-white text-purple-700 font-bold px-6 py-3 rounded-full text-lg hover:scale-105 transition-transform duration-300">
              Add Your Query
            </button>
          </Link>
        </div>

        <ExtraSection1 />
        <ExtraSection2 />

      </div>
    </div>
  );
}

export default Home;
