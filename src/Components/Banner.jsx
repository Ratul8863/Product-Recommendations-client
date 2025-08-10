import React from 'react';
import { FaPuzzlePiece, FaKey, FaClock, FaQuestionCircle } from "react-icons/fa";
import banner1 from "../assets/banner1.json"
import banner2 from "../assets/Banner2.json"
import Lottie from 'lottie-react';
import { motion } from "motion/react"
import { Typewriter } from 'react-simple-typewriter'
import { Link } from 'react-router-dom'; // Changed to 'react-router-dom' for consistency

const Banner = () => {
  return (
    // The main container now has dark and light mode classes with a transition
    <div className="bg-[#0d1128] text-white py-16 px-6 relative overflow-hidden transition-colors duration-500 dark:bg-white dark:text-gray-800">
      {/* Left Icons - added dark mode text color */}
      <div className="absolute hidden md:flex flex-col left-4 top-1/2 transform -translate-y-1/2 space-y-6 text-green-400 text-3xl dark:text-green-600">
        <FaPuzzlePiece />
        <FaClock />
        <FaQuestionCircle />
      </div>

      {/* Right Icons - added dark mode text color */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-6 text-yellow-400 text-3xl dark:text-yellow-600">
        <FaKey className='hidden md:flex flex-col' />
        <div className="w-6 h-6 rounded-full bg-green-500 animate-ping"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto text-center">
        {/* Title - Inherits color from parent div */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Before You Buy</h1>
        <motion.span animate={{
          color: ['#f04621','#21f06f','#219ef0 '],
          transition : {duration : 4 , repeat : Infinity}
        }}>
          <h1 className='text-4xl font-bold border w-fit mx-auto rounded-2xl'>Check RecoSys</h1>
        </motion.span> <br />
        <div className="text-center px-4">
          <h1 className="text-xl md:text-5xl font-bold">
            {/* Typewriter text - added dark mode text color */}
            <span className="text-gray-400 font-extrabold dark:text-gray-600">
              <Typewriter
                words={[ "Find Better Alternatives.",
                  "Ask. Recommend. Discover.",
                  "Make Smarter Shopping Decisions.",
                  "Avoid Wasting Money.",
                  "Real Users. Real Feedback.",]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h1>
        </div>
        <Link to={'/queries'}>
          <button className="bg-lime-400 mt-2 text-black font-semibold px-6 py-3 rounded hover:bg-lime-500 transition">
            FIND OUT MORE
          </button>
        </Link>
      </div>

      {/* Characters - Lottie animations and motion effects are not affected by themes */}
      <div className="flex justify-center mt-6 gap-10">
        <motion.div 
          animate = {{
            y :[-40,0,-40]
          }
        }
        transition = {{duration : 5, repeat: Infinity}}>
          <Lottie className="w-40 md:w-70" animationData={banner1} loop />
        </motion.div>
        <motion.div 
          animate = {{
            x :[-40,0,-40]
          }
        }
        transition = {{duration : 5, repeat: Infinity}}>
          <Lottie className="w-40 md:w-70" animationData={banner2} loop />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
