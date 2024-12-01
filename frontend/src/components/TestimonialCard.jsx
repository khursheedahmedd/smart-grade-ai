import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Replace with the actual path to your image
import testimonialImage from '../assets/picture1.jpg';

const TestimonialCard = () => {
    // States for the slider
    const [sliderIndex, setSliderIndex] = useState(0);
    const quotes = [
        {
            quote: "Outgrid exceeded our expectations in financial guidance. Their personalized services and strategic insights empowered us to make informed decisions, transforming our approach to finance and fostering newfound confidence in our financial future.",
            author: "Enagol Ame, CEO of Flash"
        },
        {
            quote: "The team at Outgrid provided us with comprehensive support, helping us navigate the complexities of finance and ultimately enhancing our financial strategies for the long term.",
            author: "John Doe, CEO of Tech Ventures"
        }
    ];

    // Automatically change the quote every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setSliderIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 5000); // Change every 5 seconds

        // Clear the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Slider functionality
    const handleNext = () => {
        setSliderIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    };

    const handlePrev = () => {
        setSliderIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
    };

    return (
        <section className="py-12 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="min-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8"
            >
                {/* Left Section: Quote and Author */}
                <div className="flex-1 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="bg-gradient-to-r from-green-600 to-green-400 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between"
                    >
                        <p className="text-3xl italic mb-6">{`"${quotes[sliderIndex].quote}"`}</p>
                        <p className="text-lg font-semibold text-gray-200">- {quotes[sliderIndex].author}</p>
                        {/* Quote Slider Buttons */}
                        <div className="flex justify-center items-center space-x-4 mt-6">
                            <button
                                onClick={handlePrev}
                                className="px-6 py-3 bg-green-600 rounded-full text-white hover:bg-green-500 transition duration-300 transform hover:scale-110"
                            >
                                &lt;
                            </button>
                            <button
                                onClick={handleNext}
                                className="px-6 py-3 bg-green-600 rounded-full text-white hover:bg-green-500 transition duration-300 transform hover:scale-110"
                            >
                                &gt;
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Right Section: Image */}
                <div className="flex-1 flex justify-center items-center">
                    <motion.img
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        src={testimonialImage}
                        alt="Testimonial"
                        className="w-full h-full object-cover rounded-2xl shadow-2xl"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default TestimonialCard;