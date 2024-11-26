import React from 'react';
import { motion } from 'framer-motion';
import CardsSection from '../components/CardsSection'; // Importing the CardsSection component
import LogoSlider from '../components/LogoSlider'; // Importing the LogoSlider component

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl mx-auto px-4 py-40" // Increased padding
      >
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100">
            Welcome to SmartGrade AI
          </h1>
        </header>

        {/* Subheading */}
        <p className="text-lg sm:text-xl leading-relaxed mb-8 text-gray-300">
          Transform the way you evaluate and analyze handwritten documents.  
          SmartGrade AI leverages advanced machine learning to make grading smarter, faster, and more accurate—every time.
        </p>

        {/* Call to Action */}
        <a
          href="/upload-paper"
          className="inline-block px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded shadow-lg hover:scale-105 transform hover:bg-white hover:text-gray-800 hover:ring-2 hover:ring-white transition-all duration-300"
        >
          Get Started
        </a>
      </motion.div>

      {/* Cards Section with Shaded Effect */}
      <section className="py-40 bg-gradient-to-b from-gray-800 to-gray-900"> {/* Increased padding */}
        <div className="max-w-6xl mx-auto px-6">
          {/* Title with Framer Motion for smooth fade-in */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl font-extrabold text-center text-white mb-12"
          >
            Explore Our Features
          </motion.h2>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl hover:shadow-2xl hover:border-4 hover:border-white hover:bg-gray-700 hover:scale-105 transition-all duration-300 p-8 max-w-xs mx-auto">
                <h3 className="text-2xl font-semibold text-white mb-4">AI-Powered Quizzes</h3>
                <p className="text-gray-300 mb-6">Test your knowledge with interactive quizzes powered by AI. Receive instant feedback on your answers.</p>
                <a href="/quiz-system" className="inline-block bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-gray-800 hover:ring-2 hover:ring-white transition-all duration-300">Learn More</a>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl hover:shadow-2xl hover:border-4 hover:border-white hover:bg-gray-700 hover:scale-105 transition-all duration-300 p-8 max-w-xs mx-auto">
                <h3 className="text-2xl font-semibold text-white mb-4">Upload and Analyze Papers</h3>
                <p className="text-gray-300 mb-6">Easily upload documents and get key insights extracted through AI-powered analysis.</p>
                <a href="/upload-paper" className="inline-block bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-gray-800 hover:ring-2 hover:ring-white transition-all duration-300">Learn More</a>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl hover:shadow-2xl hover:border-4 hover:border-white hover:bg-gray-700 hover:scale-105 transition-all duration-300 p-8 max-w-xs mx-auto">
                <h3 className="text-2xl font-semibold text-white mb-4">Compare Your Results</h3>
                <p className="text-gray-300 mb-6">Compare your quiz results and track your progress over time to improve your knowledge.</p>
                <a href="/result-comparison" className="inline-block bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-gray-800 hover:ring-2 hover:ring-white transition-all duration-300">Learn More</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logo Slider Section */}
      <LogoSlider />
    </div>
  );
};

export default Home;
