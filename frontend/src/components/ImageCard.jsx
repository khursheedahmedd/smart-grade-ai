import React from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import yourImage from '../assets/image.png'; // Import image from the assets folder

const ImageCard = () => {
    return (
        <div className="relative w-full h-[80vh] bg-white overflow-hidden"> {/* Reduced height to 80% of the viewport */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full"
                initial={{ opacity: 0, scale: 1.2 }} // Slightly larger initial scale for the zoom effect
                animate={{ opacity: 1, scale: 1 }} // Animate to full opacity and scale
                transition={{ duration: 0.8 }} // Duration of the animation
            >
                <motion.div
                    className="mx-auto max-w-6xl w-full h-full" // max-w-6xl ensures responsiveness
                >
                    <motion.img
                        src={yourImage} // Use the imported image from assets
                        alt="Large Picture"
                        className="object-contain w-full h-full mx-auto" // Ensure the image fits without cutting sides and is responsive
                        initial={{ opacity: 0 }} // Image starts off as invisible
                        animate={{ opacity: 1 }} // Fade in image
                        transition={{ duration: 1 }} // Fade duration
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ImageCard;