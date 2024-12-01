import React from 'react';
import { motion } from 'framer-motion';
import CardsSection from '../components/FeatureCards'; // Importing CardsSection
import LogoSlider from '../components/HowItWorks'; // Importing LogoSlider
import FeatureCard from '../components/TestimonialCard'; // Importing FeatureCard
import ImageCard from '../components/ImageCard'; // Correctly importing ImageCard component

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-black pt-28 sm:pt-32 lg:pt-36 pb-28 sm:pb-32 lg:pb-40">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl mx-auto px-4 py-16 sm:py-15 lg:py-25"
      >
        <header className="mb-0 sm:mb-0 lg:mb-0" style={{ fontFamily: 'Inter, sans-serif' }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-2 sm:mb-2 lg:mb-4">
            <span className="text-black">Welcome</span>{' '}
            <span className="text-green-500">to SmartGrade.</span>{' '}
            <span className="text-black">AI</span>
          </h1>
        </header>

        <p
          className="text-lg sm:text-xl leading-relaxed text-gray-600 mt-0 mb-6 sm:mb-8 lg:mb-10"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Transform the way you evaluate and analyze handwritten documents. SmartGrade AI leverages advanced machine
          learning to make grading smarter, faster, and more accurate—every time.
        </p>

        {/* Buttons Section */}
        <div className="flex justify-center">
          <a
            href="/upload-paper"
            className="relative inline-block px-12 py-3 bg-gradient-to-r from-green-600 to-green-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:ring-2 hover:ring-green-600 w-full sm:w-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Explore
            {/* Background link */}
            <span className="absolute inset-0 -z-10">
              <a
                href="/upload-paper"
                className="block w-full h-full"
                aria-label="Explore background link"
              ></a>
            </span>
          </a>
        </div>
      </motion.div>

      {/* Feature Cards Section */}
      <section className="py-28 sm:py-32 lg:py-40 bg-white">
        <CardsSection />
      </section>

      {/* ImageCard Section */}
      {/* <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <ImageCard />
      </section> */}

      {/* Testimonials Section */}
      {/* <section className="py-16 sm:py-20 lg:py-28">
        <FeatureCard />
      </section> */}

      {/* Logo Slider Section */}
      <section className="bg-white py-28 sm:py-32 lg:py-40">
        <LogoSlider />
      </section>
    </div>
  );
};

export default Home;