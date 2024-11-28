import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ResultComparison = () => {
  const [comparisonReady, setComparisonReady] = useState(false);

  const handleCompare = () => {
    // Simulate comparison logic
    setComparisonReady(true);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen pt-16 pb-28 px-6 md:pt-20 md:pb-32 md:px-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto bg-gray-800 p-8 shadow-lg rounded-lg text-white"
      >
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300">
          Result Comparison
        </h2>
        <p className="text-gray-400 mb-6">
          View the AI-generated grading and compare it with the original answers to track performance.
        </p>

        {/* File Upload for Answer Paper */}
        <div className="mb-6">
          <label htmlFor="answer-upload" className="block text-sm font-medium mb-2">
            Upload Answer Sheet
          </label>
          <input
            type="file"
            id="answer-upload"
            accept="image/*, .pdf"
            className="w-full text-gray-700 p-3 bg-gray-700 border border-gray-600 rounded-md"
          />
        </div>

        {/* Compare Button */}
        <button
          onClick={handleCompare}
          className="w-full py-3 text-lg font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Compare Now
        </button>

        {/* Result Comparison Section */}
        {comparisonReady && (
          <div className="mt-8 bg-gray-700 p-6 rounded-md">
            <h3 className="text-xl font-semibold mb-4">Comparison Results</h3>
            <div className="flex justify-between mb-4">
              <div className="flex flex-col items-center">
                <h4 className="text-gray-300">AI Grading</h4>
                <div className="bg-gray-500 p-4 rounded-md text-white">B+ (85%)</div>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="text-gray-300">Original Answer</h4>
                <div className="bg-green-500 p-4 rounded-md text-white">A (90%)</div>
              </div>
            </div>
            <div className="bg-gray-600 p-4 rounded-md text-gray-300">
              <p>Detailed analysis of the grading comparison will be shown here, such as areas where the AI marked differently, suggestions for improvement, etc.</p>
            </div>
          </div>
        )}

        {/* Additional Content (e.g., Charts or Graphs) */}
        {comparisonReady && (
          <div className="mt-8 bg-gray-700 p-6 rounded-md">
            <h3 className="text-xl font-semibold mb-4">Visual Comparison</h3>
            <div className="bg-gray-600 p-6 rounded-md">
              <p>Placeholder for a visual comparison chart or graph.</p>
              <div className="h-48 bg-gray-500 rounded-md text-center flex items-center justify-center">
                <span className="text-white">Chart Here</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ResultComparison;
