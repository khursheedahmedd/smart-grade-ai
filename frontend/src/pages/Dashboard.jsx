import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-16 pb-28 px-6 md:pt-20 md:pb-32 md:px-12">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-gray-800 text-white shadow-lg p-6 rounded-lg"
      >
        <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300">
          Dashboard
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Track your grading performance, progress, and other key metrics over time.
        </p>

        {/* Performance Overview Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Performance Overview</h3>
          <p className="text-gray-400 mb-4">Your performance summary for the last 7 days:</p>
          <div className="flex justify-between text-gray-300">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">85%</span>
              <p className="text-sm">Overall Grade</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">92%</span>
              <p className="text-sm">Accuracy Rate</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">12</span>
              <p className="text-sm">Assignments Completed</p>
            </div>
          </div>
        </div>

        {/* Interactive Chart Placeholder */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Interactive Progress Chart</h3>
          <div className="bg-gray-600 p-4 rounded text-center text-gray-300">
            [Interactive Chart Placeholder] {/* Replace this with an actual chart component */}
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <ul className="space-y-4 text-gray-300">
            <li>
              <p className="font-semibold">Assignment 1 - Math Test</p>
              <p className="text-sm">Completed on 11/18/2024</p>
            </li>
            <li>
              <p className="font-semibold">Quiz - History</p>
              <p className="text-sm">Completed on 11/17/2024</p>
            </li>
            <li>
              <p className="font-semibold">Assignment 3 - Science Paper</p>
              <p className="text-sm">Completed on 11/15/2024</p>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
