import React, { useContext } from 'react'; // Import useContext
import { FaRegLightbulb, FaExchangeAlt, FaUsers, FaCheckCircle, FaSearch, FaPlusCircle, FaCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext'; // Import AuthContext
import { Helmet } from 'react-helmet-async';

const About = () => {
    const { user } = useContext(AuthContext); // Get user from AuthContext

    // Determine the redirect path for a logged-in user
    const redirectPathForLoggedInUser = '/add-query'; // Or '/my-queries', '/profile', '/queries'

    return (
        <div className="min-h-screen bg-[#0D1128] text-white font-sans py-16 px-4 sm:px-6 lg:px-8">
             <Helmet>
                         <title>RecoSys | About</title>
                        </Helmet>
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-6xl font-extrabold text-lime-400 mb-8 drop-shadow-lg leading-tight animate-fade-in-down">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-600">
                        About RecoSys
                    </span>
                </h1>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in-up">
                    Your go-to platform for community-driven product recommendations and finding alternatives.
                </p>

                <div className="bg-[#1c1f3b] p-10 rounded-3xl shadow-2xl border border-gray-700 animate-slide-in-left">
                    <h2 className="text-4xl font-bold text-lime-300 mb-8 drop-shadow">What We Do</h2>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                        RecoSys is more than just a website; it's a vibrant community dedicated to helping you make informed product choices. In today's dynamic market, finding alternatives that align with your values can be challenging. That's where we come in. We empower users to query about products they are boycotting and receive diverse, practical recommendations from fellow community members.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-10">
                        <div className="flex items-start gap-4 p-5 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-lime-500/20 transition-all duration-300 group">
                            <FaRegLightbulb className="text-lime-400 text-3xl mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-2">Query & Discover</h3>
                                <p className="text-gray-400">
                                    Have a product you're looking to replace? Submit your query and let the community suggest alternatives that might be a better fit. You can also browse existing queries to find solutions for products others are boycotting.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-lime-500/20 transition-all duration-300 group">
                            <FaExchangeAlt className="text-lime-400 text-3xl mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-2">Share & Recommend</h3>
                                <p className="text-gray-400">
                                    Know a great alternative? Share your expertise! Add recommendations to queries and help others make smarter choices. Your insights empower the entire community.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-lime-500/20 transition-all duration-300 group">
                            <FaUsers className="text-lime-400 text-3xl mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-2">Community Driven</h3>
                                <p className="text-400">
                                    RecoSys thrives on its users. Every query, every recommendation, and every interaction builds a stronger, more informed community. We believe in collective wisdom.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-lime-500/20 transition-all duration-300 group">
                            <FaCheckCircle className="text-lime-400 text-3xl mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-2">Empower Your Choices</h3>
                                <p className="text-gray-400">
                                    Whether you're boycotting for ethical, environmental, or personal reasons, RecoSys provides a supportive space to find alternatives and contribute to a more conscious consumer landscape.
                                </p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-lime-300 mb-8 drop-shadow mt-12">Key Features</h2>
                    <ul className="text-lg text-gray-300 space-y-4 text-left mb-10">
                        <li className="flex items-center gap-3">
                            <FaPlusCircle className="text-lime-400 text-xl flex-shrink-0" />
                            <span className="font-semibold text-white">Add, Update, & Delete Your Queries:</span> Full control over your product inquiries.
                        </li>
                        <li className="flex items-center gap-3">
                            <FaSearch className="text-lime-400 text-xl flex-shrink-0" />
                            <span className="font-semibold text-white">View & Explore Queries:</span> Browse a comprehensive feed of community queries, complete with details and existing recommendations.
                        </li>
                        <li className="flex items-center gap-3">
                            <FaCommentAlt className="text-lime-400 text-xl flex-shrink-0" />
                            <span className="font-semibold text-white">Add Recommendations:</span> Contribute your product suggestions to help others.
                        </li>
                        <li className="flex items-center gap-3">
                            <FaCheckCircle className="text-lime-400 text-xl flex-shrink-0" />
                            <span className="font-semibold text-white">Manage Your Contributions:</span> Easily delete your own recommendations and modify/delete your comments.
                        </li>
                    </ul>

                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                        Join RecoSys today and become part of a community that's building a better way to discover and recommend products. Together, we can make informed decisions.
                    </p>

                    {/* Conditional Rendering of the Call to Action Button */}
                    <Link
                        to={user ? redirectPathForLoggedInUser : "/register"} // Redirect based on user login status
                        className="mt-8 bg-gradient-to-r from-lime-500 to-lime-300 text-black font-extrabold text-xl
                        px-12 py-5 rounded-full shadow-2xl hover:shadow-lime-400/70
                        transform hover:scale-105 transition-all duration-300 ease-in-out
                        tracking-wide uppercase relative overflow-hidden group inline-flex items-center justify-center gap-3"
                    >
                        <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                        <span className="relative z-10">
                            {user ? "Start Adding Queries!" : "Join Our Community"} {/* Text changes based on login */}
                        </span>
                        {user ? (
                            <FaPlusCircle className="relative z-10 text-2xl" /> // Icon for logged-in user
                        ) : (
                            <FaUsers className="relative z-10 text-2xl" /> // Icon for not logged-in user
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;