import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../assets/logo.png'; // Ensure the logo path is correct
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close the menu when clicking outside
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Check if the current link is active
  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4 md:px-10">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">
            <img
              src={Logo}
              alt="SmartGrade AI Logo"
              className="w-40 h-12 object-contain drop-shadow-lg"
            />
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium text-sm">
          <li>
            <Link
              to="/"
              className={`${isActiveLink('/') ? 'text-green-600 font-semibold' : 'text-gray-800'
                } transition-colors hover:text-green-500`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/upload-paper"
              className={`${isActiveLink('/upload-paper') ? 'text-green-600 font-semibold' : 'text-gray-800'
                } transition-colors hover:text-green-500`}
            >
              Instant Checking
            </Link>
          </li>
          <li>
            <Link
              to="/teacher/upload"
              className={`${isActiveLink('/about-us') ? 'text-green-600 font-semibold' : 'text-gray-800'
                } transition-colors hover:text-green-500`}
            >
              Bulk Checking
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              className={`${isActiveLink('/about-us') ? 'text-green-600 font-semibold' : 'text-gray-800'
                } transition-colors hover:text-green-500`}
            >
              About Us
            </Link>
          </li>
        </ul>

        {/* Buttons Section */}
        <div className="hidden md:flex space-x-4">
          <button className="px-4 py-2 transform hover:scale-105 bg-gradient-to-r from-green-600 to-green-400 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:ring-2 hover:ring-green-600 text-white text-sm rounded-lg shadow-md transition"
            onClick={() => handleNavigation("/upload-paper")}
          >
            Free Demo
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-md hover:bg-gray-900 transition"
            onClick={() => handleNavigation("/about-us")}
          >
            Explore
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden px-3 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="md:hidden fixed top-0 right-0 bg-white w-3/4 h-full shadow-lg z-40"
        >
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 text-2xl text-gray-800"
          >
            &times;
          </button>
          <ul className="flex flex-col space-y-6 p-6 font-medium text-base">
            <li>
              <Link
                to="/"
                className={`${isActiveLink('/') ? 'text-green-600 font-semibold' : 'text-gray-800'
                  } transition hover:text-green-500`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/upload-paper"
                className={`${isActiveLink('/upload-paper') ? 'text-green-600 font-semibold' : 'text-gray-800'
                  } transition hover:text-green-500`}
                onClick={closeMenu}
              >
                Instant Checking
              </Link>
            </li>
            <li>
              <Link
                to="//teacher/upload"
                className={`${isActiveLink('/about-us') ? 'text-green-600 font-semibold' : 'text-gray-800'
                  } transition hover:text-green-500`}
                onClick={closeMenu}
              >
                Bulk Checking
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className={`${isActiveLink('/about-us') ? 'text-green-600 font-semibold' : 'text-gray-800'
                  } transition hover:text-green-500`}
                onClick={closeMenu}
              >
                About Us
              </Link>
            </li>
          </ul>
          <div className="flex flex-col space-y-4 mt-6 px-6">
            <button
              onClick={() => handleNavigation("/upload-paper")}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Free Demo
            </button>
            <button
              onClick={() => handleNavigation("/about-us")}
              className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-md hover:bg-gray-900 transition"
            >
              Explore
            </button>
          </div>
        </motion.div>
      )}

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={closeMenu}
        />
      )}

      {/* Bottom Line */}
      <div className="border-t border-gray-300"></div>
    </nav>
  );
};

export default Navbar;