import React from 'react';
import { motion } from 'framer-motion';

// Import logos from assets
import microsoftLogo from '../assets/M.png';
import googleLogo from '../assets/google-removebg-preview.png';
import ibmLogo from '../assets/ibm-removebg-preview.png';
import courseraLogo from '../assets/C.png';
import udemyLogo from '../assets/udemy-removebg-preview.png';

const LogoSlider = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-center text-white mb-12"
        >
          Trusted by Leading Tech and EdTech Companies
        </motion.h2>

        {/* Logo Slider */}
        <motion.div
          className="overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="flex space-x-8 lg:space-x-16 animate-marquee"
            animate={{
              x: ['0%', '-100%'], // For the scrolling effect
            }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
            whileHover={{ x: 0 }} // Stop scrolling on hover
          >
            {/* Example Tech Company Logos with Links */}
            <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center bg-gray-800 rounded-full">
              <a href="https://www.microsoft.com" target="_blank" rel="noopener noreferrer">
                <img src={microsoftLogo} alt="Microsoft Logo" className="w-full h-full object-contain" />
              </a>
            </div>

            <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center bg-gray-800 rounded-full">
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                <img src={googleLogo} alt="Google Logo" className="w-full h-full object-contain" />
              </a>
            </div>


            <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center bg-gray-800 rounded-full">
              <a href="https://www.ibm.com" target="_blank" rel="noopener noreferrer">
                <img src={ibmLogo} alt="IBM Logo" className="w-full h-full object-contain" />
              </a>
            </div>

            <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center bg-gray-800 rounded-full">
              <a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer">
                <img src={courseraLogo} alt="Coursera Logo" className="w-full h-full object-contain" />
              </a>
            </div>

            <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center bg-gray-800 rounded-full">
              <a href="https://www.udemy.com" target="_blank" rel="noopener noreferrer">
                <img src={udemyLogo} alt="Udemy Logo" className="w-full h-full object-contain" />
              </a>
            </div>

            {/* Repeat logos for continuous scrolling effect */}
            <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center bg-gray-800 rounded-full">
              <a href="https://www.microsoft.com" target="_blank" rel="noopener noreferrer">
                <img src={microsoftLogo} alt="Microsoft Logo" className="w-full h-full object-contain" />
              </a>
            </div>

            {/* Repeat other logos similarly */}
            <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center bg-gray-800 rounded-full">
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                <img src={googleLogo} alt="Google Logo" className="w-full h-full object-contain" />
              </a>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LogoSlider;
