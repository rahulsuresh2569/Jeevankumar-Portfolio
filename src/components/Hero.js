import React, { useState, useEffect, useRef, useCallback } from 'react';

const Hero = () => {
  const designations = [
    { symbol: '◆', text: 'Product Designer' },
    { symbol: '◆', text: 'UI UX Designer' }, 
    { symbol: '◆', text: 'Visual Designer' },
    { symbol: '◆', text: 'Logo Designer' },
    { symbol: '◆', text: 'Banner & Poster Designer' }
  ];

  const [translateX, setTranslateX] = useState(0);
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

  useEffect(() => {
    let setWidth = 0;
    
    const animate = () => {
      setTranslateX(prev => {
        const newValue = prev - 0.8; // Reduced speed for slower motion
        
        // Calculate set width on first frame
        if (setWidth === 0) {
          setWidth = calculateElementWidth();
          if (setWidth === 0) return newValue; // Wait for elements to render
        }
        
        // Use modulo to create seamless loop
        // When we've moved one complete set width, reset to create infinite effect
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
  }, [calculateElementWidth]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-secondary text-primary px-6 lg:px-10">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Main Content Container */}
        <div className="space-y-6 lg:space-y-8">
          
          {/* First Row: "I'm" + Animation Container */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none flex-shrink-0">
              I'm
            </h1>
            
            {/* Continuous Scrolling Container - Full Width with Increased Height */}
            <div 
              ref={containerRef}
              className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-500 rounded-full px-8 py-6 lg:px-12 lg:py-8 xl:py-10 w-full flex-1"
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
                    className="flex items-center mr-10 lg:mr-16 flex-shrink-0"
                  >
                    <span className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none w-16 md:w-20 lg:w-24 xl:w-28 text-center flex-shrink-0">
                      {designation.symbol}
                    </span>
                    <span className="text-white text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold leading-none ml-3 lg:ml-4 xl:ml-5">
                      {designation.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Row: Name + Subtext */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-12">
            <h2 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none">
              Jeevankumar
            </h2>
            
            {/* Supporting Text - Left Aligned */}
            <div className="lg:mb-4 xl:mb-8">
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