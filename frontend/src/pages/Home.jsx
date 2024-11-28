import React from 'react';
import { motion } from 'framer-motion';
import CardsSection from '../components/CardsSection'; // Importing CardsSection
import LogoSlider from '../components/LogoSlider'; // Importing LogoSlider

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white pt-16 sm:pt-20 lg:pt-24">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl mx-auto px-4 py-16 sm:py-24 lg:py-36" // Adjusted padding for better spacing
      >
        <header className="mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100">
            Welcome to SmartGrade AI
          </h1>
        </header>

        {/* Subheading */}
        <p className="text-lg sm:text-xl leading-relaxed mb-6 sm:mb-8 text-gray-300">
          Transform the way you evaluate and analyze handwritten documents.  
          SmartGrade AI leverages advanced machine learning to make grading smarter, faster, and more accurate—every time.
        </p>

        {/* Call to Action */}
        <a
          href="/upload-paper"
          className="inline-block px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform hover:bg-white hover:text-gray-800 hover:ring-2 hover:ring-white transition-all duration-300"
        >
          Get Started
        </a>
      </motion.div>

      {/* Cards Section */}
      <CardsSection /> {/* Using the CardsSection component */}

      {/* Logo Slider Section */}
      <LogoSlider />
    </div>
  );
};

export default Home;
