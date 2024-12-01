import React from "react";
import { motion } from "framer-motion";

const FeatureCards = () => {
    const cards = [
        {
            title: "AI-Powered",
            description:
                "Our chatbot robots use the latest artificial intelligence technology to understand and respond to customer inquiries, providing accurate and efficient assistance.",
            link: "/ai-powered",
        },
        {
            title: "Class Management",
            description:
                "Exam Checker allows for easy creation, organization, and management of all student data in one place, offering a clear overview for tracking progress and making informed decisions.",
            link: "/class-management",
        },
        {
            title: "Performance Data",
            description:
                "Exam Checker allows for quick access to important information, making record-keeping easy, saving you time and allowing you to easily analyze student data, eliminating manual data entry.",
            link: "/performance-data",
        },
    ];

    return (
        <section className="py-8 sm:py-12 lg:py-10 max-h-screen flex items-center">
            <div className="max-w-6xl mx-auto px-6">
                {/* Title with Framer Motion for smooth fade-in */}
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-6 sm:mb-8 lg:mb-10"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    Explore Our Features
                </motion.h2>

                {/* Grid of Cards */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                            className="h-full flex"
                        >
                            <div className="flex flex-col justify-between h-full w-full rounded-lg shadow-lg p-6 bg-white">
                                <h3
                                    className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    {card.title}
                                </h3>
                                <p
                                    className="text-gray-700 text-sm sm:text-base mb-6 flex-grow"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    {card.description}
                                </p>
                                <a
                                    href={card.link}
                                    className="inline-block bg-gradient-to-r from-green-700 to-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-400 hover:text-green-300 hover:ring-2 hover:ring-green-400 transition-all duration-300 text-center"
                                >
                                    Learn More
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeatureCards;