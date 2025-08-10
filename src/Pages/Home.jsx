import React, { useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../Components/Banner";
import HomeSlider from "../Components/HomeSlider";
import RecentFeed from "./Shared/RecentFeed";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const Home = () => {


  const blogs = [
    {
      id: 1,
      title: "How to Spot Greenwashing in Brands",
      shortText:
        "Learn how to identify misleading marketing and make informed ethical choices in your purchases.",
      fullText:
        "Greenwashing is when companies pretend to be eco-friendly but aren't really sustainable. Look for certifications, check the materials, and research the brand’s history before buying. This helps you avoid false claims and support truly green companies.",
    },
    {
      id: 2,
      title: "Sustainable Shopping: What You Need to Know",
      shortText:
        "Discover the basics of sustainable shopping and how to make responsible choices.",
      fullText:
        "Sustainable shopping involves choosing products that minimize environmental impact. Focus on quality over quantity, buy from ethical brands, and consider the product lifecycle. Every small choice contributes to a healthier planet.",
    },
  ];

  // Track which blogs are expanded
  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };




  return (
    <div className="min-h-screen bg-white dark:bg-[#0D1128] text-gray-900 dark:text-white transition-colors duration-500">
      <Helmet>
        <title>RecoSys | Home</title>
      </Helmet>

      {/* Hero Section */}
      <Banner />

      <div className="space-y-20 py-12 px-4 md:px-8 lg:px-16">

        {/* Highlighted Products */}
        <section>
          <h2 className="text-3xl font-bold text-lime-500 dark:text-lime-400 text-center mb-8">
            🌟 Highlighted Products
          </h2>
          <HomeSlider />
        </section>

        {/* Recent Queries */}
        <section>
          <h2 className="text-3xl text-yellow-500 font-bold text-center mb-6">
            📢 Recent Queries
          </h2>
          <RecentFeed />
        </section>

        {/* Product Categories */}
        <section className="relative bg-[#f4f8f4] dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-3xl text-gray-800 dark:text-white shadow-xl border border-gray-200 dark:border-gray-700 p-10 overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-lime-400/20 dark:bg-lime-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-green-300/20 dark:bg-green-500/20 rounded-full blur-3xl"></div>

          <h2 className="text-3xl text-center text-lime-600 dark:text-lime-400 font-bold mb-3">
            📦 Product Categories
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Explore sustainable product types tailored for you.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center relative z-10">
            {[
              "Electronics",
              "Fashion",
              "Health",
              "Books",
              "Food",
              "Software",
              "Home",
              "Toys",
            ].map((cat) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={cat}
                className="p-4 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-lime-400 hover:to-green-500 hover:text-black rounded-lg transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
              >
                {cat}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Promotional Offers */}
        <section className="bg-gradient-to-r from-pink-500 to-yellow-400 dark:from-red-600 dark:to-yellow-500 text-black p-10 rounded-3xl text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">🔥 Promotional Offers</h2>
          <p className="mb-4">
            Get up to{" "}
            <span className="font-extrabold text-4xl">50% OFF</span> on featured
            sustainable products!
          </p>
          <button className="bg-black text-yellow-300 px-6 py-3 rounded-full font-bold hover:scale-105 hover:bg-white hover:text-black transition">
            Shop Now
          </button>
        </section>

        {/* Community Trust */}
        <section className="bg-purple-700 dark:bg-purple-800 text-white rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-400/30 rounded-full blur-3xl"></div>
          <h2 className="text-3xl font-bold mb-4">🔐 Trusted by the Community</h2>
          <p className="text-lg mb-6">
            Thousands rely on RecoSys for ethical recommendations.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { num: "10K+", label: "Active Users" },
              { num: "20K+", label: "Products Suggested" },
              { num: "100+", label: "Partner Brands" },
            ].map((stat) => (
              <motion.div
                whileHover={{ scale: 1.1 }}
                key={stat.label}
                className="bg-purple-900/30 px-6 py-4 rounded-xl shadow-md"
              >
                <h3 className="text-2xl font-bold text-purple-200">
                  {stat.num}
                </h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="bg-[#f4f8f4] dark:bg-[#1c1f3b] text-gray-900 dark:text-white p-10 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl text-center text-yellow-500 font-bold mb-3">
        📰 From the Blog
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        Insights & tips for making ethical product choices.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {blogs.map((blog) => {
          const isExpanded = expandedIds.includes(blog.id);
          return (
            <div
              key={blog.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl transition shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isExpanded ? blog.fullText : blog.shortText}
              </p>
              <button
                onClick={() => toggleExpand(blog.id)}
                className="mt-4 underline font-semibold cursor-pointer hover:text-white"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            </div>
          );
        })}
      </div>
    </section>

        {/* Newsletter Section */}
        {/* <section className="bg-gradient-to-r from-indigo-600 to-lime-500 p-10 rounded-3xl shadow-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            📬 Subscribe to Our Newsletter
          </h2>
          <p className="text-lg mb-6">
            Stay updated with ethical product trends and deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-2/3 px-5 py-3 rounded-full text-black focus:ring-2 focus:ring-lime-400"
            />
            <button className="bg-black text-lime-400 px-6 py-3 rounded-full font-bold hover:bg-white hover:text-black transition">
              Subscribe
            </button>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-pink-600 to-purple-700 rounded-3xl p-10 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Share Your Voice?
          </h2>
          <p className="text-lg mb-6">
            Post your queries or recommend ethical alternatives today.
          </p>
          <Link to="/add-query">
            <button className="bg-white text-purple-700 font-bold px-6 py-3 rounded-full text-lg hover:scale-105 transition-transform">
              Add Your Query
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
