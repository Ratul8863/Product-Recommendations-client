import React from 'react';
import { FaTwitter, FaYoutube } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';

import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <>
      {/* Top Section */}
      <footer className=" bg-gradient-to-br from-slate-100 to-slate-200  dark:shadow-blue-600 dark:from-gray-950 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-10 py-12 grid grid-cols-2 md:justify-center md:grid-cols-3 gap-8">
        <div className=' md:text-center'>
          <h6 className="text-xl font-semibold mb-4">Hobbies</h6>
          <ul className="space-y-2">
            {["Drawing & Painting",
    "Photography",
    "Video Gaming",
    "Fishing",
    "Running",
    "Cooking",
    "Reading",
    "Writing",].map((item, i) => (
              <li key={i} >
            <a className="hover:underline hover:text-blue-600 dark:hover:text-blue-400  transition duration-200 cursor-pointer" >
{item}
            </a>
                  
   
              </li>
            ))}
          </ul>
        </div>

        <div className='md:text-center'>
          <h6 className="text-xl font-semibold mb-4">Company</h6>
          <ul className="space-y-2">
            {["About Us", "Contact", "Support"].map((item, i) => (
              <li key={i}>
                <a className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition duration-200 cursor-pointer">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className='md:text-center'>
          <h6 className="text-xl font-semibold mb-4">Legal</h6>
          <ul className="space-y-2">
            {["Terms of Use", "Privacy Policy", "Cookie Policy"].map((item, i) => (
              <li key={i}>
                <a className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition duration-200 cursor-pointer">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      {/* Bottom Section */}
      <footer className="flex  flex-col md:flex-row items-center justify-between bg-slate-300 dark:bg-gray-900 px-10 py-6 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-400 dark:border-gray-600">
        {/* Branding */}
        <Link onClick={()=>window.scrollTo(0,0)} to="/" className="flex items-center gap-3 mb-4 md:mb-0">
          <img src="https://i.ibb.co/39WLdycb/image.png" alt="Logo" className="w-10 h-10" />
          <div>
            <p className="text-lg font-bold text-black dark:text-white">Query Sysetem</p>
            <p className="text-sm">Connecting  since 2025</p>
             
          </div>
        </Link>
 <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        {/* Social Links */}
        <div className="flex gap-5">
          {/* Twitter */}
          <a href="https://twitter.com" className='className="w-6  h-8 hover:text-blue-900 text-blue-500 dark:hover:text-blue-400 transition"' target="_blank" rel="noreferrer">
           
             <FaTwitter size={30}></FaTwitter>
            
          </a>
          {/* YouTube */}
          <a href="https://www.youtube.com" className="w-6 h-6  hover:text-red-800  text-red-600 dark:hover:text-red-400 transition" target="_blank" rel="noreferrer">
          
              <FaYoutube size={30}></FaYoutube>
           
          </a>
          {/* Facebook */}
          <a href="https://www.facebook.com" className="w-full   hover:text-blue-700 dark:hover:text-blue-500 transition" target="_blank" rel="noreferrer">
          
            <FaFacebook size={30}></FaFacebook>
          
          </a>

           <a href="https://www.linkedin.com" className="w-full   hover:text-blue-700 dark:hover:text-blue-500 transition" target="_blank" rel="noreferrer">
          
           <FaLinkedin size={30}/>
          
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;