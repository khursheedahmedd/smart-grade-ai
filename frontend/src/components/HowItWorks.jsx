import React from 'react';
import { motion } from 'framer-motion';

// Icons for the cards
import { FaCog, FaUpload, FaChartLine } from 'react-icons/fa';

const HowItWorks = () => {
    return (
        <section className="py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-white to-white" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with gradient text */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600 mb-6 sm:mb-8"
                >
                    How It Works
                </motion.h2>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Card 1: Setup */}
                    <motion.div
                        className="bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl transform"
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 100 }}
                        viewport={{ once: true, amount: 0.3 }} // Trigger the animation when 30% of the element is in the viewport
                        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }} // Add delay to stagger the animations
                    >
                        <div className="bg-green-500 p-3 sm:p-4 rounded-full mb-4 sm:mb-6 shadow-lg">
                            <FaCog className="w-10 sm:w-12 h-10 sm:h-12 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-black">Setup Your Class</h3>
                        <p className="text-sm sm:text-base text-gray-700 mb-3">
                            Quickly define classes, exams, and parameters to streamline the evaluation process.
                        </p>
                        <a href="#" className="text-green-500 hover:underline">Learn more</a>
                    </motion.div>

                    {/* Card 2: Upload */}
                    <motion.div
                        className="bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl transform"
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 100 }}
                        viewport={{ once: true, amount: 0.3 }} // Trigger the animation when 30% of the element is in the viewport
                        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }} // Add delay to stagger the animations
                    >
                        <div className="bg-green-500 p-3 sm:p-4 rounded-full mb-4 sm:mb-6 shadow-lg">
                            <FaUpload className="w-10 sm:w-12 h-10 sm:h-12 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-black">Upload Materials</h3>
                        <p className="text-sm sm:text-base text-gray-700 mb-3">
                            Upload your exam papers, answer keys, and supporting documents for AI-assisted evaluation.
                        </p>
                        <a href="#" className="text-green-500 hover:underline">Learn more</a>
                    </motion.div>

                    {/* Card 3: Results */}
                    <motion.div
                        className="bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl transform"
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 100 }}
                        viewport={{ once: true, amount: 0.3 }} // Trigger the animation when 30% of the element is in the viewport
                        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.5 }} // Add delay to stagger the animations
                    >
                        <div className="bg-green-500 p-3 sm:p-4 rounded-full mb-4 sm:mb-6 shadow-lg">
                            <FaChartLine className="w-10 sm:w-12 h-10 sm:h-12 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-black">Track Results</h3>
                        <p className="text-sm sm:text-base text-gray-700 mb-3">
                            View results, monitor progress over time, and make informed decisions based on analytics.
                        </p>
                        <a href="#" className="text-green-500 hover:underline">Learn more</a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;