import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, description, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
    >
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-gray-300 mb-6">{description}</p>
      <a
        href={link}
        className="inline-block bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-all duration-300"
      >
        Learn More
      </a>
    </motion.div>
  );
};

export default Card;
