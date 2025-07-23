import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FuzzyText from './FuzzyText';

const NotFound = () => {
  const navigate = useNavigate();
  const [hoverIntensity] = useState(0.5);
  const [enableHover] = useState(true);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleContactClick = () => {
    navigate('/');
    setTimeout(() => {
      const contactElement = document.querySelector('#contact');
      if (contactElement) {
        contactElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-primary text-secondary flex flex-col items-center justify-center px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 overflow-hidden font-sans">
      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, 
            rgba(139, 92, 246, 0.1) 0%, 
            rgba(124, 58, 237, 0.05) 30%, 
            transparent 70%
          )`
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        
        {/* Animated 404 Text with Fuzzy Effect */}
        <div className="mb-6 xs:mb-8 sm:mb-12 md:mb-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <FuzzyText 
              baseIntensity={0.2} 
              hoverIntensity={hoverIntensity} 
              enableHover={enableHover}
              fontSize="clamp(5rem, 18vw, 16rem)"
              fontWeight={900}
              color="#ffffff"
              fontFamily="'DM Sans', sans-serif"
            >
              404
            </FuzzyText>
          </motion.div>
        </div>

        {/* Main heading */}
        <motion.h1 
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 xs:mb-6 sm:mb-8 px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          Oops! Page Not Found
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-base xs:text-lg sm:text-xl md:text-2xl text-secondary/80 leading-relaxed mb-6 xs:mb-8 sm:mb-12 max-w-2xl mx-auto px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          The page you're looking for seems to have wandered off into the digital void. Let's get you back on track!
        </motion.p>

        {/* Action buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-6 justify-center items-center px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
        >
          {/* Go Home Button */}
          <motion.button
            onClick={handleGoHome}
            className="group relative inline-flex justify-center items-center w-full sm:w-auto px-6 xs:px-8 py-3 xs:py-4 rounded-lg xs:rounded-xl font-bold text-white text-base xs:text-lg transition-all duration-300 overflow-hidden min-w-[200px] sm:min-w-0"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 15px 40px rgba(139, 92, 246, 0.4)',
              y: -2
            }}
            whileTap={{
              scale: 0.98
            }}
          >
            <span className="relative z-10">Go Back Home</span>
            <div 
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.button>

          {/* Contact Button */}
          <motion.button
            onClick={handleContactClick}
            className="w-full sm:w-auto px-6 xs:px-8 py-3 xs:py-4 text-base xs:text-lg font-medium bg-white/8 hover:bg-white/15 text-white border border-white/15 hover:border-white/30 backdrop-blur-sm rounded-lg xs:rounded-xl transition-all duration-300 min-w-[200px] sm:min-w-0"
            whileHover={{
              scale: 1.05,
              y: -2
            }}
            whileTap={{
              scale: 0.95
            }}
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Decorative elements - Hidden on very small screens, positioned better on larger screens */}
        <div className="hidden xs:block absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full opacity-60 animate-pulse" />
        <div className="hidden xs:block absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-80 animate-ping" />
        <div className="hidden xs:block absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-70 animate-pulse" 
             style={{ animationDelay: '1s' }} />
        
        {/* Mobile-only decorative elements */}
        <div className="block xs:hidden absolute top-16 right-4 w-1 h-1 bg-purple-400 rounded-full opacity-50 animate-pulse" />
        <div className="block xs:hidden absolute bottom-16 left-4 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60 animate-ping" />
      </div>
    </div>
  );
};

export default NotFound; 