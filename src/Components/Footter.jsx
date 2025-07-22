import React from 'react';
import { FaTwitter, FaYoutube, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
   <div className='bg-gradient-to-br  from-[#1c1f3b] to-[#0D1128] text-gray-200 border-t border-gray-700 shadow-inner'>
     <footer className="max-w-[1400px] mx-auto ">
      {/* Top Grid Section */}
      <div className="px-8 py-12 w-full justify-items-center grid grid-cols-2 md:grid-cols-3 lg:flex justify-between gap-8">
        {/* Explore */}
        <div className="text-center md:text-left">
          <h6 className="text-xl font-bold mb-5 text-lime-400">Explore</h6>
          <ul className="space-y-3">
            <li><Link to="/queries" className="hover:text-lime-300 transition">All Queries</Link></li>
            <li><Link to="/add-query" className="hover:text-lime-300 transition">Add New Query</Link></li>
            <li><Link to="/my-queries" className="hover:text-lime-300 transition">My Queries</Link></li>
            <li><Link to="/recommendations-for-me" className="hover:text-lime-300 transition">Recommendations</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="text-center md:text-left">
          <h6 className="text-xl font-bold mb-5 text-lime-400">Company</h6>
          <ul className="space-y-3">
            <li><Link to="/about" className="hover:text-lime-300 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-lime-300 transition">Contact</Link></li>
            {/* <li><Link to="/blog" className="hover:text-lime-300 transition">Blog</Link></li> */}
          </ul>
        </div>

        {/* Legal */}
        <div className="text-center md:text-left">
          <h6 className="text-xl font-bold mb-5 text-lime-400">Legal</h6>
          <ul className="space-y-3">
            <li><Link to="/terms" className="hover:text-lime-300 transition">Terms of Use</Link></li>
            <li><Link to="/privacy" className="hover:text-lime-300 transition">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6 text-sm text-gray-400 border-t border-gray-700">
        {/* Branding */}
        <Link onClick={() => window.scrollTo(0, 0)} to="/" className="flex items-center gap-3 mb-4 md:mb-0">
          <img src="https://i.ibb.co/39WLdycb/image.png" alt="RecoSys Logo" className="w-10 h-10 rounded-full border border-lime-400" />
          <div>
            <p className="text-xl font-bold text-lime-400">RecoSys</p>
            <p className="text-sm text-gray-500">Connecting insights since 2025</p>
          </div>
        </Link>

        {/* Copyright */}
        <p className="text-center mb-4 md:mb-0">© {new Date().getFullYear()} RecoSys — All rights reserved</p>

        {/* Social Icons */}
        <div className="flex gap-6">
          <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter size={24} /></a>
          <a href="https://www.youtube.com" className="text-gray-400 hover:text-red-500 transition" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube size={24} /></a>
          <a href="https://www.facebook.com" className="text-gray-400 hover:text-blue-600 transition" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF size={24} /></a>
          <a href="https://www.linkedin.com" className="text-gray-400 hover:text-blue-700 transition" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={24} /></a>
        </div>
      </div>
    </footer>
   </div>
  );
}

export default Footer;
