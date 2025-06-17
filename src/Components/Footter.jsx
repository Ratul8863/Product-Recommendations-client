import React from 'react';
import { FaTwitter, FaYoutube, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'; // Updated Facebook icon, added LinkedIn icon
import { Link } from 'react-router-dom'; // Using Link for internal navigation

function Footer() {
  return (
    <>
      {/* Top Section */}
      <footer className="bg-gradient-to-br from-[#1c1f3b] to-[#0D1128] text-gray-200 px-8 py-12 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-gray-700 shadow-inner">
        {/* Explore Section (Replaced Hobbies) */}
        <div className='text-center md:text-left'>
          <h6 className="text-xl font-bold mb-5 text-lime-400">Explore</h6>
          <ul className="space-y-3">
            <li>
              <Link to="/queries" className="hover:text-lime-300 transition-colors duration-200 cursor-pointer">
                All Queries
              </Link>
            </li>
            <li>
              <Link to="/add-query" className="hover:text-lime-300 transition-colors duration-200 cursor-pointer">
                Add New Query
              </Link>
            </li>
            <li>
              <Link to="/popular-queries" className="hover:text-lime-300 transition-colors duration-200 cursor-pointer">
                Popular Queries
              </Link>
            </li>
            <li>
              <Link to="/brands" className="hover:text-lime-300 transition-colors duration-200 cursor-pointer">
                Browse Brands
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div className='text-center md:text-left'>
          <h6 className="text-xl font-bold mb-5 text-lime-400">Company</h6>
          <ul className="space-y-3">
            <li>
              <Link to="/about" className="hover:text-lime-300 transition-colors duration-200 cursor-pointer">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-lime-300 transition-colors duration-200 cursor-pointer">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-lime-300 transition-colors duration-200 cursor-pointer">
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className='text-center md:text-left'>
          <h6 className="text-xl font-bold mb-5 text-lime-400">Legal</h6>
          <ul className="space-y-3">
            <li>
              <Link to="/terms" className="hover:text-lime-300 transition-colors duration-200 cursor-pointer">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-lime-300 transition-colors duration-200 cursor-pointer">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/cookie" className="hover:text-lime-300 transition-colors duration-200 cursor-pointer">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </footer>

      {/* Bottom Section */}
      <footer className="flex flex-col md:flex-row items-center justify-between bg-gray-900 px-8 py-6 text-sm text-gray-400 border-t border-gray-700">
        {/* Branding */}
        <Link onClick={() => window.scrollTo(0, 0)} to="/" className="flex items-center gap-3 mb-4 md:mb-0">
          {/* Using a themed placeholder logo. Replace with your actual dark-theme compatible logo. */}
          <img
            src="https://placehold.co/40x40/1c1f3b/a3e635?text=Logo" // Dark background, lime text
            alt="RecoSys Logo"
            className="w-10 h-10 rounded-full border border-lime-400"
          />
          <div>
            <p className="text-xl font-bold text-lime-400">RecoSys</p> {/* Changed to RecoSys and lime color */}
            <p className="text-sm text-gray-500">Connecting insights since 2025</p> {/* More relevant tagline */}
          </div>
        </Link>

        {/* Copyright */}
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>

        {/* Social Links */}
        <div className="flex gap-6 mt-4 md:mt-0">
          {/* Twitter */}
          <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" target="_blank" rel="noreferrer" aria-label="Twitter">
            <FaTwitter size={28} />
          </a>
          {/* YouTube */}
          <a href="https://www.youtube.com" className="text-gray-400 hover:text-red-500 transition-colors duration-200" target="_blank" rel="noreferrer" aria-label="YouTube">
            <FaYoutube size={28} />
          </a>
          {/* Facebook */}
          <a href="https://www.facebook.com" className="text-gray-400 hover:text-blue-600 transition-colors duration-200" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FaFacebookF size={28} /> {/* Using FaFacebookF for solid icon */}
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com" className="text-gray-400 hover:text-blue-700 transition-colors duration-200" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn size={28} /> {/* Using FaLinkedinIn for solid icon */}
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;