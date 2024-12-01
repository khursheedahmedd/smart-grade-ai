import React, { useState, useEffect } from 'react';

// Importing Font Awesome icons
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  // State to track if the button is visible
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Show the button when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      // Show the back to top button after scrolling down 300px
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }

      // Calculate the scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gray-800 text-white text-center p-6 relative">
      {/* Scroll Progress Circle */}
      <div className="absolute top-0 left-0 right-0 w-full h-2 bg-gray-700">
        <div
          className="h-full bg-green-600"
          style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease-out' }}
        />
      </div>

      <div className="mb-4">
        <p>&copy; {new Date().getFullYear()} SmartGrade AI. All rights reserved.</p>
      </div>
      <div className="mt-4">
        <a href="#" className="hover:underline mx-3">Privacy Policy</a>
        <a href="#" className="hover:underline mx-3">Contact Us</a>
      </div>

      {/* Social Media Links */}
      <div className="mt-6 flex justify-center space-x-6">
        <a href="#" className="text-white hover:text-green-500 transition duration-300">
          <FaFacebookF size={20} />
        </a>
        <a href="#" className="text-white hover:text-green-500 transition duration-300">
          <FaTwitter size={20} />
        </a>
        <a href="#" className="text-white hover:text-green-500 transition duration-300">
          <FaLinkedinIn size={20} />
        </a>
        <a href="#" className="text-white hover:text-green-500 transition duration-300">
          <FaInstagram size={20} />
        </a>
      </div>

      {/* Back to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-500 transition duration-300 transform hover:scale-110"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </footer>
  );
};

export default Footer;