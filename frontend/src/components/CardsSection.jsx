import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

const CardsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-700">
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
          >
            <Card
              title="AI-Powered Quizzes"
              description="Test your knowledge with interactive quizzes powered by AI. Receive instant feedback on your answers."
              link="/quiz-system"
            />
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card
              title="Upload and Analyze Papers"
              description="Easily upload documents and get key insights extracted through AI-powered analysis."
              link="/upload-paper"
            />
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card
              title="Compare Your Results"
              description="Compare your quiz results and track your progress over time to improve your knowledge."
              link="/result-comparison"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CardsSection;
