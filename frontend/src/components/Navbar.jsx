import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${isScrolled
          ? 'bg-gradient-to-r from-gray-700 via-gray-800 to-black shadow-lg'
          : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black'
        } fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <h1 className="text-2xl font-bold text-white">
            SmartGrade AI
          </h1>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/upload-paper"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Upload Paper
            </Link>
          </li>
          <li>
            <Link
              to="/teacher/upload"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Teacher Upload
            </Link>
          </li>
          <li>
            <Link
              to="/upload_answer/:key_id"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Student Upload
            </Link>
          </li>
          <li>
            <Link
              to="/result-comparison"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Compare Results
            </Link>
          </li>
          <li>
            <Link
              to="/quiz-system"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Quiz System
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="text-white hover:text-gray-400 transition duration-300"
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
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gradient-to-r from-gray-700 via-gray-800 to-black shadow-md"
        >
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link
                to="/"
                className="block text-white hover:text-gray-400 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/upload-paper"
                className="block text-white hover:text-gray-400 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Upload Paper
              </Link>
            </li>
            <li>
              <Link
                to="/result-comparison"
                className="block text-white hover:text-gray-400 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Compare Results
              </Link>
            </li>
            <li>
              <Link
                to="/quiz-system"
                className="block text-white hover:text-gray-400 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiz System
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="block text-white hover:text-gray-400 transition duration-300"
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
