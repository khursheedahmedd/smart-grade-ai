import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
    return (
        <div className="bg-gray-50 py-20 sm:py-24 lg:py-32">
            <div className="container mx-auto px-6 lg:px-16">
                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                        About Us
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover how SmartGrade AI is redefining the future of education
                        with intelligent tools and seamless solutions.
                    </p>
                </motion.div>

                {/* Content Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16">
                    {/* Mission Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl sm:text-3xl font-semibold text-green-600 mb-6">
                            Our Mission
                        </h3>
                        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
                            At{" "}
                            <span className="font-semibold text-green-600">SmartGrade AI</span>,
                            we are dedicated to enhancing education through technology. Our mission is
                            to empower educators and students by automating repetitive tasks and providing
                            actionable insights, enabling them to focus on what truly matters—learning and growth.
                        </p>
                    </motion.div>

                    {/* Features Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl sm:text-3xl font-semibold text-green-600 mb-6">
                            Key Features
                        </h3>
                        <ul className="space-y-4 text-gray-700 text-lg sm:text-xl leading-relaxed">
                            <li>
                                <strong className="text-green-600">Paper Upload:</strong>
                                Effortlessly upload and grade examination papers.
                            </li>
                            <li>
                                <strong className="text-green-600">Result Analysis:</strong>
                                Gain detailed insights into student performance.
                            </li>
                            <li>
                                <strong className="text-green-600">AI-Driven Insights:</strong>
                                Receive tailored recommendations for educational improvement.
                            </li>
                            <li>
                                <strong className="text-green-600">Custom Reports:</strong>
                                Generate comprehensive, customizable reports.
                            </li>
                            <li>
                                <strong className="text-green-600">Modern Interface:</strong>
                                Enjoy a sleek, intuitive user experience.
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Why Choose Us */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-16 lg:mt-20 text-center"
                >
                    <h3 className="text-2xl sm:text-3xl font-semibold text-green-600 mb-6">
                        Why Choose SmartGrade AI?
                    </h3>
                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                        SmartGrade AI combines advanced technology with simplicity. Our solutions save
                        time, provide accurate insights, and empower educators with the tools they need
                        to make informed decisions. By automating grading and analysis, we help you
                        transform education into a smarter, more efficient process.
                    </p>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mt-16 lg:mt-24"
                >
                    <h3 className="text-2xl sm:text-3xl font-semibold text-green-600 mb-4">
                        Join Us Today!
                    </h3>
                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
                        Be a part of our journey and experience the future of education.
                    </p>
                    <button className="mt-6 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium text-lg rounded-lg shadow-md hover:scale-105 transform transition-all duration-300">
                        Learn More
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;