import React, { useContext } from 'react'; // Import useContext
import { AuthContext } from '../Contexts/AuthContext'; // Import AuthContext
import {
    FaPlusCircle,      // For "Add Queries"
    FaSearch,         // For "Discover Alternatives" / "Smart Search"
    FaRegLightbulb,   // For "Share Expertise" / "Recommendations"
    FaEdit,           // For "Manage Contributions" (Update)
    FaTrashAlt,       // For "Manage Contributions" (Delete)
    FaUsers,          // For "Community Engagement"
    FaHandPointRight, // Another option for call to action
    FaExchangeAlt,    // For finding alternatives
    FaEye             // For viewing details
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Features = () => {
    const { user } = useContext(AuthContext); // Get user from AuthContext

    // Determine the redirect path for a logged-in user
    const redirectPathForLoggedInUser = '/add-query'; // You can change this if you prefer a different route

    const featureItems = [
        {
            icon: <FaPlusCircle />,
            title: "Submit Your Queries",
            description: "Easily post queries about products you're boycotting, clearly stating your reasons and what kind of alternatives you seek."
        },
        {
            icon: <FaSearch />,
            title: "Discover Product Alternatives",
            description: "Browse a vast collection of queries submitted by the community and explore recommended alternative products."
        },
        {
            icon: <FaRegLightbulb />,
            title: "Share Expert Recommendations",
            description: "Contribute your knowledge by recommending alternative products to existing queries, helping others make informed decisions."
        },
        {
            icon: <FaEdit />,
            title: "Manage Your Queries",
            description: "Maintain full control over your submitted queries – edit details, update reasons, or delete them if no longer needed."
        },
        {
            icon: <FaTrashAlt />,
            title: "Control Your Recommendations",
            description: "You have the power to delete any recommendation you've added or comments you've made at any time."
        },
        {
            icon: <FaUsers />,
            title: "Engage with the Community",
            description: "Like queries, discuss recommendations in comments, and interact with a community passionate about ethical consumption."
        }
    ];

    return (
        <div className="min-h-screen  bg-[#0D1128] text-white font-sans py-16 px-4 sm:px-6 lg:px-8">
             <Helmet>
                         <title>RecoSys | Features</title>
                        </Helmet>
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-6xl font-extrabold text-lime-400 mb-8 drop-shadow-lg leading-tight animate-fade-in-down">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-600">
                        Powerful Features at Your Fingertips
                    </span>
                </h1>
                <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in-up">
                    RecoSys is designed to be intuitive and empowering, offering a suite of features to help you navigate your product choices with confidence and community support.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {featureItems.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#1c1f3b] p-8 rounded-3xl shadow-xl border border-gray-700
                                       transform transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lime-500/30 group animate-fade-in"
                        >
                            <div className="text-lime-400 text-5xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="p-8 bg-[#1c1f3b] rounded-3xl shadow-2xl border border-gray-700 animate-slide-in-up">
                    <h2 className="text-4xl font-bold text-lime-300 mb-6 drop-shadow">
                        Ready to Transform Your Product Choices?
                    </h2>
                    <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
                        Join RecoSys today and become part of a movement dedicated to informed and ethical consumption.
                    </p>
                    <Link
                        to={user ? redirectPathForLoggedInUser : "/register"} // Conditional redirect based on user login status
                        className="mt-6 bg-gradient-to-r from-lime-500 to-lime-300 text-black font-extrabold text-xl
                        px-12 py-5 rounded-full shadow-2xl hover:shadow-lime-400/70
                        transform hover:scale-105 transition-all duration-300 ease-in-out
                        tracking-wide uppercase relative overflow-hidden group inline-flex items-center justify-center gap-3"
                    >
                        <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                        <span className="relative z-10">
                            {user ? "Start Adding Queries!" : "Get Started Now"} {/* Text changes based on login */}
                        </span>
                        {user ? (
                            <FaPlusCircle className="relative z-10 text-2xl" /> // Icon for logged-in user
                        ) : (
                            <FaHandPointRight className="relative z-10 text-2xl" /> // Original icon for not logged-in
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Features;