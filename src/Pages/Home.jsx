import React, { useEffect, useState } from 'react'
import Slider from '../Components/Slider'
import ExtraSection1 from '../Components/ExtraSection1'
import ExtraSection2 from '../Components/ExtraSection2'
import { Fade, Slide } from 'react-awesome-reveal';
import { Link } from 'react-router';
import duck from "../assets/duck.json"
import Lottie from 'lottie-react';
import RecentFeed from './Shared/RecentFeed';
import Banner from '../Components/Banner';

function Home() {
  const [recentQueries, setRecentQueries] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/queries/recent')
      .then(res => res.json())
      .then(data => setRecentQueries(data));
  }, []);

  return (
    <div>
      <Banner></Banner>
      <div className=' py-12 space-y-20 '>
      
      <Slider />

      <div className="px-4 py-8">
  <h2 className="text-2xl font-bold text-center mb-6">📢 Recent Queries</h2>

<RecentFeed></RecentFeed>


</div>


     

      <div className="text-center">
        <h2 className="text-4xl text-white md:text-6xl font-bold mb-4 leading-tight">
          Rethink what you buy. <br />

        </h2 >
        <h3 className="text-2xl md:text-3xl text-white  leading-tight">Recommend what matters.</h3>
      </div>

    

      {/* Extra Section 3: Community Trust */}
      <Slide direction="left" triggerOnce>
        <div className="bg-purple-100 shadow-2xl rounded-4xl p-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">🔐 Trusted by the Community</h2>
          <p className="text-lg mb-6">Thousands of users rely on RecoSys to discover the most ethical and personalized product suggestions.</p>
          <div className="flex justify-center space-x-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-700">10K+</h3>
              <p>Active Users</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-700">20K+</h3>
              <p>Products Suggested</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-700">100+</h3>
              <p>Partner Brands</p>
            </div>
          </div>
        </div>
      </Slide>
<Lottie className="w-22 md:w-40 absolute top-1061 md:top-648 md:left-68" animationData={duck} loop />
      {/* Extra Section 4: Call to Action */}
      <Fade direction='up' triggerOnce>
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-2xl rounded-4xl p-10 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Share Your Voice?</h2>
          <p className="text-lg mb-6">Post your queries or recommend ethical alternatives today. Your insights shape the future.</p>
         <Link to={"/add-query"}> <button className="btn btn-accent text-white font-bold px-6 py-2 rounded-full">Add Your Query</button></Link>
        </div>
      </Fade>
    </div>
    </div>
  )
}

export default Home;
