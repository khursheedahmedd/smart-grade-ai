import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, description, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(255, 255, 255, 0.2)' }}
      whileTap={{ scale: 0.98 }}
      className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg transition-all duration-300 p-6"
    >
      <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 mb-4">
        {title}
      </h3>
      <p className="text-gray-300 mb-6">{description}</p>
      <a
        href={link}
        className="inline-block bg-gradient-to-r from-gray-600 to-gray-800 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-gray-800 hover:ring-2 hover:ring-white transition-all duration-300"
      >
        Learn More
      </a>
    </motion.div>
  );
};

export default Card;
