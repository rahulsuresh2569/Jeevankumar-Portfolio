import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

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

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-secondary text-primary px-6 lg:px-10">
      <div className="max-w-[92%] xl:max-w-[90%] 2xl:max-w-[85%] mx-auto w-full">
        
        {/* Main Content Container */}
        <div className="space-y-6 lg:space-y-8">
          
          {/* First Row: "I'm" + Animation Container */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none flex-shrink-0">
              I'm
            </h1>
            
            {/* Continuous Scrolling Container with Framer Motion Color Transitions */}
            <motion.div 
              ref={containerRef}
              className="relative overflow-hidden px-8 py-4 lg:px-12 w-full flex-1"
              style={{ borderRadius: '60px' }}
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
                    className="flex items-center mr-4 lg:mr-5 flex-shrink-0"
                  >
                    <span className="text-white text-[8rem] leading-none w-32 lg:w-40 text-center flex-shrink-0">
                      {designation.symbol}
                    </span>
                    <span className="text-white text-[10rem] leading-none ml-4 lg:ml-5 xl:ml-5">
                      {designation.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Second Row: Name + Subtext */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-12">
            <h2 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none">
              Jeevankumar
            </h2>
            
            {/* Supporting Text - Left Aligned */}
            <div className="lg:mb-4">
              <p className="text-sm md:text-base lg:text-lg text-primary/70 leading-relaxed max-w-xs lg:max-w-sm text-left">
                I craft user-centered, interactive designs and continually pushing creative boundaries to deliver impactful solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 