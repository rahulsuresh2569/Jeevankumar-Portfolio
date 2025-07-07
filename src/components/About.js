import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import individual element images

import myPictureImg from '../assets/images/about-me/my-picture.svg';
import cursorTooltipImg from '../assets/images/about-me/cursor-tooltip.svg';
import helloWorldTextImg from '../assets/images/about-me/hello-world-text.svg';
import shapeImg from '../assets/images/about-me/shape.svg';
import toolImg from '../assets/images/about-me/tool.svg';
import toolbarImg from '../assets/images/about-me/toolbar.svg';
import pencilImg from '../assets/images/about-me/pencil.svg';

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const text = textRef.current;

    if (section && text) {
      // Text reveal animation
      gsap.fromTo(text, 
        { 
          opacity: 0,
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section || trigger.trigger === text) {
          trigger.kill();
        }
      });
    };
  }, []);

  // 3D Card Styles
  const card3DStyles = {
    parent: {
      perspective: '1500px',
      width: '100%',
      height: '100%',
    },
    card: {
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transition: 'transform 150ms ease-out',
      borderRadius: '1.5rem',
      position: 'relative',
    },
    // Base 3D positioning for elements - reduced elevation
    shapeBase: {
      transform: 'translate3d(0, 0, 8px)',
      transition: 'transform 150ms ease-out',
    },
    toolBase: {
      transform: 'translate3d(0, 0, 12px)',
      transition: 'transform 150ms ease-out',
    },
    helloWorldBase: {
      transform: 'translate3d(0, 0, 10px)',
      transition: 'transform 150ms ease-out',
    },
    tooltipBase: {
      transform: 'translate3d(0, 0, 16px)',
      transition: 'transform 150ms ease-out',
    },
    toolbarBase: {
      transform: 'translate3d(-50%, 0, 14px)',
      transition: 'transform 150ms ease-out',
    },
  };

  // Cursor-following 3D rotation function
  const rotateToMouse = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2
    };
    const distance = Math.sqrt(center.x**2 + center.y**2);

    // Get all animated elements
    const card = container.querySelector('.card-3d');
    const shape = container.querySelector('.shape-3d');
    const tool = container.querySelector('.tool-3d');
    const helloWorld = container.querySelector('.hello-world-3d');
    const tooltip = container.querySelector('.tooltip-3d');
    const toolbar = container.querySelector('.toolbar-3d');

    // Calculate rotation intensity - REDUCED
    const rotationIntensity = Math.log(distance + 1) * 1.5;
    const scaleValue = 1.02;

    // Apply dynamic transforms to card container - REDUCED SENSITIVITY
    if (card) {
      card.style.transform = `
        scale3d(${scaleValue}, ${scaleValue}, ${scaleValue})
        rotate3d(
          ${center.y / 150},
          ${-center.x / 150},
          0,
          ${rotationIntensity}deg
        )
      `;
    }

    // Apply individual transforms to elements with REDUCED elevation and sensitivity
    if (shape) {
      shape.style.transform = `
        translate3d(0, 0, 40px)
        rotate3d(
          ${center.y / 200},
          ${-center.x / 200},
          0,
          ${rotationIntensity * 0.8}deg
        )
        rotate(-2deg)
      `;
    }

    if (tool) {
      tool.style.transform = `
        translate3d(0, 0, 50px)
        rotate3d(
          ${center.y / 180},
          ${-center.x / 180},
          0,
          ${rotationIntensity * 0.9}deg
        )
      `;
    }

    if (helloWorld) {
      helloWorld.style.transform = `
        translate3d(0, 0, 45px)
        rotate3d(
          ${center.y / 190},
          ${-center.x / 190},
          0,
          ${rotationIntensity * 0.85}deg
        )
      `;
    }

    if (tooltip) {
      tooltip.style.transform = `
        translate3d(0, 0, 60px)
        rotate3d(
          ${center.y / 140},
          ${-center.x / 140},
          0,
          ${rotationIntensity * 1.0}deg
        )
      `;
    }

    if (toolbar) {
      toolbar.style.transform = `
        translate3d(-50%, 0, 55px)
        rotate3d(
          ${center.y / 170},
          ${-center.x / 170},
          0,
          ${rotationIntensity * 0.95}deg
        )
        rotate(-1deg)
      `;
    }
  };

  const handleMouseEnter = () => {
    document.addEventListener('mousemove', rotateToMouse);
  };

  const handleMouseLeave = () => {
    document.removeEventListener('mousemove', rotateToMouse);
    
    const container = containerRef.current;
    if (!container) return;

    // Reset all transforms to base positions
    const card = container.querySelector('.card-3d');
    const shape = container.querySelector('.shape-3d');
    const tool = container.querySelector('.tool-3d');
    const helloWorld = container.querySelector('.hello-world-3d');
    const tooltip = container.querySelector('.tooltip-3d');
    const toolbar = container.querySelector('.toolbar-3d');

    if (card) {
      card.style.transform = '';
    }
    if (shape) {
      shape.style.transform = 'translate3d(0, 0, 8px) rotate(-2deg)';
    }
    if (tool) {
      tool.style.transform = 'translate3d(0, 0, 12px)';
    }
    if (helloWorld) {
      helloWorld.style.transform = 'translate3d(0, 0, 10px)';
    }
    if (tooltip) {
      tooltip.style.transform = 'translate3d(0, 0, 16px)';
    }
    if (toolbar) {
      toolbar.style.transform = 'translate3d(-50%, 0, 14px) rotate(-1deg)';
    }
  };

  // Info Pills Component with same style as Experience section
  const InfoPill = ({ children, index, delay = 0, icon, looped = false }) => {
    return (
      <div
        className="rounded-full p-[1px] transition-all duration-200 hover:shadow-md w-fit"
        style={{
          background: 'linear-gradient(45deg, #9ca3af, #f9fafb, #9ca3af, #f9fafb)',
          backgroundSize: '200% 200%'
        }}
      >
        <div className="relative overflow-hidden rounded-full">
          {/* Shine effect overlay - only for looped pills */}
          {looped && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none z-20"
              style={{
                background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.08) 35%, rgba(255, 255, 255, 0.15) 45%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.15) 55%, rgba(255, 255, 255, 0.08) 65%, transparent 80%)',
                transform: 'translateX(-150%) skewX(-15deg)',
              }}
              animate={{
                transform: [
                  'translateX(-150%) skewX(-15deg)', 
                  'translateX(150%) skewX(-15deg)', 
                  'translateX(150%) skewX(-15deg)', 
                  'translateX(-150%) skewX(-15deg)'
                ]
              }}
              transition={{
                duration: 3.6,
                delay: delay + (index * 0.15) + 0.3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          )}
          
          <span 
            className="block px-5 py-2 text-sm font-medium text-secondary rounded-full flex items-center gap-2 relative z-5 whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.3)'
            }}
          >
            <span>{icon}</span>
            {children}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen bg-primary text-secondary pb-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, threshold: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-none">
            About Me
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 lg:gap-y-10 xl:gap-y-12 items-start">
          
          {/* Image Section with Layered Elements */}
          <div className="relative order-2 lg:order-1 lg:col-span-4">
            
            {/* Info Pills Section - Positioned above image */}
            <motion.div 
              className="mb-6 lg:mb-10 w-fit"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, threshold: 0.3 }}
            >
              {/* First row - 2 pills */}
              <div className="flex gap-2 mb-4">
                <InfoPill index={0} delay={0} icon="⭐" looped={true}>
                  Effortless Achiever
                  <span className="ml-1">→</span>
                </InfoPill>
                <InfoPill index={1} delay={0.2} icon="🌐">English, Tamil</InfoPill>
              </div>
              {/* Second row - 1 pill */}
              <div className="flex">
                <InfoPill index={2} delay={0.4} icon="📍">Chennai, Tamil Nadu, India</InfoPill>
              </div>
            </motion.div>
            <div 
              className="p-0 md:p-0 lg:p-0"
              style={card3DStyles.parent}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={containerRef}
            >
              <div className="h-full rounded-xl bg-transparent relative overflow-visible">
                <div className="relative w-full aspect-[3/4] min-h-[300px] lg:min-h-[350px]">
                  


                  {/* Combined Picture and Background */}
                  <img
                    src={myPictureImg}
                    alt="Jeevan Kumar"
                    className="absolute w-[90%] h-[90%] object-contain rounded-2xl"
                    style={{ 
                      zIndex: 2,
                      left: '50%',
                      top: '30%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    loading="lazy"
                  />

                  {/* 3D Animated Elements Container */}
                  <div className="absolute inset-0" style={{ zIndex: 10 }}>
                    <div className="card-3d relative w-full h-full" style={card3DStyles.card}>

                      {/* Green Grid Shape - 3D Effect */}
                      <img
                        src={shapeImg}
                        alt="Grid shape"
                        className="shape-3d absolute w-[32%] h-auto object-contain"
                        style={{ 
                          zIndex: 12,
                          left: '2%',
                          top: '32%',
                          ...card3DStyles.shapeBase,
                          transform: `${card3DStyles.shapeBase.transform} rotate(-2deg)`,
                        }}
                        loading="lazy"
                      />

                      {/* Magic Tool Icon - 3D Effect */}
                      <img
                        src={toolImg}
                        alt="Design tool"
                        className="tool-3d absolute w-[12%] h-auto object-contain"
                        style={{ 
                          zIndex: 13,
                          left: '12%',
                          top: '6%',
                          ...card3DStyles.toolBase,
                        }}
                        loading="lazy"
                      />

                      {/* Hello World Text - 3D Effect */}
                      <img
                        src={helloWorldTextImg}
                        alt="Hello World"
                        className="hello-world-3d absolute w-[20%] h-auto object-contain"
                        style={{ 
                          zIndex: 13,
                          right: '-2%',
                          top: '12%',
                          ...card3DStyles.helloWorldBase,
                        }}
                        loading="lazy"
                      />

                      {/* Designer Tooltip - 3D Effect */}
                      <img
                        src={cursorTooltipImg}
                        alt="Designer tooltip"
                        className="tooltip-3d absolute w-[18%] h-auto object-contain"
                        style={{ 
                          zIndex: 15,
                          right: '12%',
                          top: '38%',
                          ...card3DStyles.tooltipBase,
                        }}
                        loading="lazy"
                      />

                      {/* Figma Toolbar - 3D Effect */}
                      <img
                        src={toolbarImg}
                        alt="Design toolbar"
                        className="toolbar-3d absolute w-[65%] h-auto object-contain"
                        style={{ 
                          zIndex: 15,
                          left: '54%',
                          bottom: '38%',
                          ...card3DStyles.toolbarBase,
                        }}
                        loading="lazy"
                      />

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Text Content Section */}
          <div ref={textRef} className="order-1 lg:order-2 lg:col-span-4 space-y-5 lg:space-y-6 lg:pl-4">
            
            {/* Introduction */}
            <motion.div 
              className="space-y-2 lg:space-y-3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true, threshold: 0.3 }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-left">
                Hi there, I'm<br />Jeevankumar
              </h3>
              <div className="relative">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-secondary font-medium text-left mt-4" >
                  Product Designer
                </p>
                {/* Pencil underline */}
                <img 
                  src={pencilImg} 
                  alt="pencil line" 
                  className="w-full h-auto -mt-6"
                  style={{
                    display: 'block',
                    opacity: 0.8
                  }}
                />
              </div>
            </motion.div>

            {/* Main Description */}
            <motion.div 
              className="space-y-2 sm:space-y-4 md:space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true, threshold: 0.3 }}
            >
              <p className="text-sm sm:text-base md:text-lg text-secondary/80 text-left" style={{ lineHeight: '1.6' }}>
                With <strong className="text-secondary font-semibold">1.7 years of experience</strong> crafting user-centered, interactive designs using tools like <strong className="text-secondary font-semibold">Figma and Photoshop</strong>, I've honed my skills and expanded my knowledge by worked on a various projects like mobile applications, web applications, websites, and cross-platform design solutions.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-secondary/80 text-left" style={{ lineHeight: '1.6' }}>
                Beyond digital interfaces, I've also explored the creative side of visual communication through <strong className="text-secondary font-semibold">graphic design projects</strong>, including posters, banners, and logos. This variety has helped me build a well-rounded design perspective.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-secondary/80 text-left" style={{ lineHeight: '1.6' }}>
                My core strength lies in <strong className="text-secondary font-semibold">product design</strong>, where I enjoy identifying real user problems, solving complex challenges, and delivering intuitive, impactful solutions. I'm eager to push my creative boundaries further and delivering impactful and innovative design solutions who balances functionality, aesthetics, and user needs.
              </p>
            </motion.div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 