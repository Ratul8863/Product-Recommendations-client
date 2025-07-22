import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const blogs = [
  {
    id: 1,
    title: 'Behind the Scenes: Building the Product Recommendation System',
    excerpt:
      'How I designed and implemented a community-driven recommendation platform using React, Node.js, and Firebase authentication.',
    image: 'https://images.unsplash.com/photo-1581093588401-12b66ade9861?auto=format&fit=crop&w=800&q=80',
    link: 'https://yourblog.com/product-recommendation-system-dev-journey',
  },
  {
    id: 2,
    title: 'Secure Auth with Firebase & JWT: Lessons from My Project',
    excerpt:
      'Explore the integration of Firebase Auth and JWT for secure user sessions in the Product Recommendation System.',
    image: 'https://i.ibb.co/YDnDr6B/firebase-blog.jpg',
    link: 'https://yourblog.com/firebase-jwt-auth-product-platform',
  },
  {
    id: 3,
    title: 'What’s Next: Improving My Product Recommendation App',
    excerpt:
      'From ML integration to smarter filtering, here’s what I plan to improve in the next phase of my project.',
    image: 'https://i.ibb.co/QKh3ndT/ui-blog.jpg',
    link: 'https://yourblog.com/future-plans-product-recommendation',
  },
];

const BlogSection = () => {
  return (
    <section className="bg-[#0D1128] text-white py-20 px-4" id="blog">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-lime-400">
            Product Recommendation Dev Blog
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Explore the development journey, technical insights, and future ideas behind my Product Recommendation System.
          </p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-[#1c1f3b] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-5 flex flex-col justify-between h-full">
                <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                <p className="text-gray-400 text-sm flex-grow">{post.excerpt}</p>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-green-400 hover:underline"
                >
                  Read More <FaArrowRight className="ml-2 text-sm" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
