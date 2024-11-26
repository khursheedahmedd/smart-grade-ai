import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section (Updated without image) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300">
            SmartGrade AI
          </h1>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-gray-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/upload-paper"
              className="hover:text-gray-400 transition duration-300"
            >
              Upload Paper
            </Link>
          </li>
          <li>
            <Link
              to="/result-comparison"
              className="hover:text-gray-400 transition duration-300"
            >
              Compare Results
            </Link>
          </li>
          <li>
            <Link
              to="/quiz-system"
              className="hover:text-gray-400 transition duration-300"
            >
              Quiz System
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="hover:text-gray-400 transition duration-300"
            >
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded shadow hover:scale-105 transform transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-900 shadow-md"
        >
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link
                to="/"
                className="block text-gray-300 hover:text-white transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/upload-paper"
                className="block text-gray-300 hover:text-white transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Upload Paper
              </Link>
            </li>
            <li>
              <Link
                to="/result-comparison"
                className="block text-gray-300 hover:text-white transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Compare Results
              </Link>
            </li>
            <li>
              <Link
                to="/quiz-system"
                className="block text-gray-300 hover:text-white transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiz System
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="block text-gray-300 hover:text-white transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
