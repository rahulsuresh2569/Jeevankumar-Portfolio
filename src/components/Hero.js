import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const designations = [
    { symbol: '✦', text: 'Product Designer' },
    { symbol: '✦', text: 'UI UX Designer' }, 
    { symbol: '✦', text: 'Visual Designer' }
    // { symbol: '✦', text: 'Logo Designer' },
    // { symbol: '✦', text: 'Banner & Poster Designer' }
  ];

  // Color palette for each designation
  const colorGradients = [
    { from: '#9333ea', to: '#8b5cf6' }, // Purple - Product Designer
    { from: '#2563eb', to: '#3b82f6' }, // Blue - UI UX Designer
    { from: '#059669', to: '#10b981' } // Emerald - Visual Designer
    // { from: '#e11d48', to: '#f43f5e' }, // Rose - Logo Designer
    // { from: '#d97706', to: '#f59e0b' }  // Amber - Banner & Poster Designer
  ];

  const [translateX, setTranslateX] = useState(0);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [swipeKey, setSwipeKey] = useState(0);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const elementRefs = useRef([]);

  // Create triple repetition for smoother infinite loop
  const tripleContent = [...designations, ...designations, ...designations];

  const calculateElementWidth = useCallback(() => {
    if (elementRefs.current[0] && elementRefs.current[1]) {
      // Calculate the width of one complete set (5 elements)
      let totalSetWidth = 0;
      for (let i = 0; i < designations.length; i++) {
        if (elementRefs.current[i]) {
          const rect = elementRefs.current[i].getBoundingClientRect();
          const styles = window.getComputedStyle(elementRefs.current[i]);
          const marginRight = parseFloat(styles.marginRight);
          totalSetWidth += rect.width + marginRight;
        }
      }
      return totalSetWidth;
    }
    return 0;
  }, [designations.length]);

  // Improved timing calculation - triggers when word is centered in container
  const calculateCurrentWordIndex = useCallback((translateXValue, oneElementWidth, containerWidth) => {
    if (oneElementWidth === 0 || containerWidth === 0) return 0;
    
    // Calculate the position where the word should be centered
    // Add half container width to account for centering
    const adjustedPosition = Math.abs(translateXValue) + (containerWidth / 2);
    
    // Calculate which element should be centered now
    const elementsScrolled = adjustedPosition / oneElementWidth;
    
    // Get the current word index (0-4) and handle the looping
    const currentIndex = Math.floor(elementsScrolled) % designations.length;
    
    return currentIndex;
  }, [designations.length]);

  useEffect(() => {
    let setWidth = 0;
    let oneElementWidth = 0;
    let containerWidth = 0;
    
    const animate = () => {
      setTranslateX(prev => {
        const newValue = prev - 1.0; // Animation speed
        
        // Calculate dimensions on first frame
        if (setWidth === 0 && containerRef.current) {
          setWidth = calculateElementWidth();
          oneElementWidth = setWidth / designations.length;
          containerWidth = containerRef.current.offsetWidth;
          if (setWidth === 0) return newValue; // Wait for elements to render
        }
        
        // Calculate current word and update color with improved timing
        if (oneElementWidth > 0 && containerWidth > 0) {
          const currentWordIndex = calculateCurrentWordIndex(newValue, oneElementWidth, containerWidth);
          
          // Only update if the index actually changed to prevent rapid updates
          setCurrentColorIndex(prev => {
            if (prev !== currentWordIndex) {
              return currentWordIndex;
            }
            return prev;
          });
        }
        
        // Use modulo to create seamless loop
        if (Math.abs(newValue) >= setWidth) {
          return newValue + setWidth; // Seamless reset by one set width
        }
        
        return newValue;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Small delay to ensure elements are rendered
    const timeoutId = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [calculateElementWidth, calculateCurrentWordIndex, designations.length]);

  useEffect(() => {
    const swipeInterval = setInterval(() => {
      setSwipeKey(prev => prev + 1);
    }, 3000); // Swipe every 3 seconds

    return () => {
      clearInterval(swipeInterval);
    };
  }, []);

  return (
    <section id="hero" className="min-h-[52vh] sm:min-h-[70vh] md:h-screen flex items-center justify-center bg-primary text-secondary px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-14 sm:pt-16 md:pt-18 lg:pt-20">
      <div className="max-w-[98%] sm:max-w-[95%] md:max-w-[92%] lg:max-w-[90%] xl:max-w-[88%] 2xl:max-w-[85%] mx-auto w-full">
        
        {/* Main Content Container */}
        <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-7">
          
          {/* First Row: "I'm" + Animation Container */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[7.5rem] font-bold leading-none flex-shrink-0">
              I'm
            </h1>
            
            {/* Continuous Scrolling Container with Framer Motion Color Transitions */}
            <motion.div 
              ref={containerRef}
              className="relative overflow-hidden px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 xl:px-12 xl:py-5 w-full flex-1 rounded-[35px]"
              animate={{
                background: `linear-gradient(to right, ${colorGradients[currentColorIndex].from}, ${colorGradients[currentColorIndex].to})`
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
            >
              <div 
                ref={trackRef}
                className="flex whitespace-nowrap"
                style={{
                  transform: `translateX(${translateX}px)`,
                  willChange: 'transform'
                }}
              >
                {tripleContent.map((designation, index) => (
                  <div
                    key={index}
                    ref={el => elementRefs.current[index] = el}
                    className="flex items-center mr-2 sm:mr-3 md:mr-4 lg:mr-5 flex-shrink-0"
                  >
                    <span 
                      className="text-white leading-none text-center flex-shrink-0"
                      style={{
                        fontSize: 'clamp(2rem, 4vw + 1rem, 6rem)',
                        width: 'clamp(3rem, 6vw + 1rem, 8rem)'
                      }}
                    >
                      {designation.symbol}
                    </span>
                    <span 
                      className="text-white leading-none ml-2 sm:ml-3 md:ml-4 lg:ml-5"
                      style={{
                        fontSize: 'clamp(2.5rem, 5vw + 1rem, 7.5rem)'
                      }}
                    >
                      {designation.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Second Row: Name + Subtext */}
          <div className="flex flex-col md:flex-row md:items-end gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[7.5rem] font-bold leading-none">
              Jeevankumar
            </h2>
            
            {/* Supporting Text - Center on Mobile, Left on Desktop */}
            <div className="md:mb-2 lg:mb-3 xl:mb-4 flex justify-center md:justify-start">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-secondary/70 leading-relaxed max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg text-center md:text-left">
                I craft user-centered, interactive designs and continually pushing creative boundaries to deliver impactful solutions
              </p>
            </div>
          </div>

          {/* Third Row: Resume Button - Centered */}
          <div className="flex justify-center pt-2 sm:pt-3 md:pt-4 lg:pt-6 xl:pt-8">
            <motion.button
              className="group relative inline-flex justify-center items-center rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
              }}
              whileHover={{
                boxShadow: '0 15px 40px rgba(139, 92, 246, 0.4)',
                y: -2
              }}
              whileTap={{
                scale: 0.98
              }}
            >
              {/* Ghost content for sizing */}
              <div className="flex items-center gap-1.5 sm:gap-2 opacity-0 px-4 py-2 sm:px-5 sm:py-3 md:px-7 md:py-3 lg:px-8 lg:py-4">
                <span>Resume</span>
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </div>

              <AnimatePresence>
                <motion.div
                  key={swipeKey}
                  className="absolute inset-0 flex items-center justify-center gap-2"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>Resume</span>
                  <motion.svg 
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </motion.svg>
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 