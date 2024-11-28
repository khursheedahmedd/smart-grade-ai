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
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header with gradient text */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 mb-12"
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
            className="flex space-x-8 sm:space-x-12 md:space-x-16 animate-marquee"
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
            {/* Logos */}
            {[microsoftLogo, googleLogo, ibmLogo, courseraLogo, udemyLogo].map((logo, index) => (
              <div key={index} className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-48 lg:h-48 flex items-center justify-center bg-gray-800 rounded-full">
                <a href="https://www.microsoft.com" target="_blank" rel="noopener noreferrer">
                  <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                </a>
              </div>
            ))}
            {/* Repeat logos for continuous scrolling effect */}
            {[microsoftLogo, googleLogo, ibmLogo, courseraLogo, udemyLogo].map((logo, index) => (
              <div key={`repeat-${index}`} className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-48 lg:h-48 flex items-center justify-center bg-gray-800 rounded-full">
                <a href="https://www.microsoft.com" target="_blank" rel="noopener noreferrer">
                  <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                </a>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LogoSlider;
