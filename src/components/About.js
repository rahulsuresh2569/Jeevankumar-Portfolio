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
    // Base 3D positioning for elements
    shapeBase: {
      transform: 'translate3d(0, 0, 20px)',
      transition: 'transform 150ms ease-out',
    },
    toolBase: {
      transform: 'translate3d(0, 0, 30px)',
      transition: 'transform 150ms ease-out',
    },
    helloWorldBase: {
      transform: 'translate3d(0, 0, 25px)',
      transition: 'transform 150ms ease-out',
    },
    tooltipBase: {
      transform: 'translate3d(0, 0, 40px)',
      transition: 'transform 150ms ease-out',
    },
    toolbarBase: {
      transform: 'translate3d(-50%, 0, 35px)',
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

    // Calculate rotation intensity - INCREASED
    const rotationIntensity = Math.log(distance + 1) * 3;
    const scaleValue = 1.15;

    // Apply dynamic transforms to card container - INCREASED SENSITIVITY
    if (card) {
      card.style.transform = `
        scale3d(${scaleValue}, ${scaleValue}, ${scaleValue})
        rotate3d(
          ${center.y / 80},
          ${-center.x / 80},
          0,
          ${rotationIntensity}deg
        )
      `;
    }

    // Apply individual transforms to elements with MUCH HIGHER elevation and sensitivity
    if (shape) {
      shape.style.transform = `
        translate3d(0, 0, 120px)
        rotate3d(
          ${center.y / 100},
          ${-center.x / 100},
          0,
          ${rotationIntensity * 1.2}deg
        )
        rotate(-2deg)
      `;
    }

    if (tool) {
      tool.style.transform = `
        translate3d(0, 0, 140px)
        rotate3d(
          ${center.y / 90},
          ${-center.x / 90},
          0,
          ${rotationIntensity * 1.4}deg
        )
      `;
    }

    if (helloWorld) {
      helloWorld.style.transform = `
        translate3d(0, 0, 130px)
        rotate3d(
          ${center.y / 95},
          ${-center.x / 95},
          0,
          ${rotationIntensity * 1.3}deg
        )
      `;
    }

    if (tooltip) {
      tooltip.style.transform = `
        translate3d(0, 0, 160px)
        rotate3d(
          ${center.y / 70},
          ${-center.x / 70},
          0,
          ${rotationIntensity * 1.6}deg
        )
      `;
    }

    if (toolbar) {
      toolbar.style.transform = `
        translate3d(-50%, 0, 150px)
        rotate3d(
          ${center.y / 85},
          ${-center.x / 85},
          0,
          ${rotationIntensity * 1.5}deg
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
      shape.style.transform = 'translate3d(0, 0, 20px) rotate(-2deg)';
    }
    if (tool) {
      tool.style.transform = 'translate3d(0, 0, 30px)';
    }
    if (helloWorld) {
      helloWorld.style.transform = 'translate3d(0, 0, 25px)';
    }
    if (tooltip) {
      tooltip.style.transform = 'translate3d(0, 0, 40px)';
    }
    if (toolbar) {
      toolbar.style.transform = 'translate3d(-50%, 0, 35px) rotate(-1deg)';
    }
  };

  // Info Pills Component with same style as Experience section
  const InfoPill = ({ children, index, delay = 0, icon }) => {
    return (
      <div
        className="rounded-full p-[1px] transition-all duration-200 hover:shadow-md w-fit"
        style={{
          background: 'linear-gradient(45deg, #9ca3af, #f9fafb, #9ca3af, #f9fafb)',
          backgroundSize: '200% 200%'
        }}
      >
        <div className="relative overflow-hidden rounded-full">
          {/* Shine effect overlay */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none z-20"
            style={{
              background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.4) 35%, rgba(255, 255, 255, 0.8) 45%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.8) 55%, rgba(255, 255, 255, 0.4) 65%, transparent 80%)',
              transform: 'translateX(-150%) skewX(-15deg)',
            }}
            animate={{
              transform: ['translateX(-150%) skewX(-15deg)', 'translateX(150%) skewX(-15deg)']
            }}
            transition={{
              duration: 1.8,
              delay: delay + (index * 0.15) + 0.3,
              ease: "easeInOut"
            }}
          />
          
          <span 
            className="block px-6 py-3 text-base font-medium text-secondary rounded-full flex items-center gap-2 relative z-5 whitespace-nowrap"
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
      className="min-h-screen bg-primary text-secondary pb-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12"
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none">
            About Me
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 lg:gap-y-12 xl:gap-y-16 items-start">
          
          {/* Image Section with Layered Elements */}
          <div className="relative order-2 lg:order-1 lg:col-span-4">
            
            {/* Info Pills Section - Positioned above image */}
            <motion.div 
              className="mb-8 lg:mb-12 w-fit"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, threshold: 0.3 }}
            >
              {/* First row - 2 pills */}
              <div className="flex gap-3 mb-5">
                <InfoPill index={0} delay={0} icon="⭐">Effortless Achiever</InfoPill>
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
                <div className="relative w-full aspect-[3/4] min-h-[400px] lg:min-h-[480px]">
                  


                  {/* Combined Picture and Background */}
                  <img
                    src={myPictureImg}
                    alt="Jeevan Kumar"
                    className="absolute w-[100%] h-[1000px] object-contain rounded-2xl"
                    style={{ 
                      zIndex: 2,
                      left: '50%',
                      top: '50%',
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
                        className="shape-3d absolute w-[40%] h-auto object-contain"
                        style={{ 
                          zIndex: 12,
                          left: '2%',
                          top: '35%',
                          ...card3DStyles.shapeBase,
                          transform: `${card3DStyles.shapeBase.transform} rotate(-2deg)`,
                        }}
                        loading="lazy"
                      />

                      {/* Magic Tool Icon - 3D Effect */}
                      <img
                        src={toolImg}
                        alt="Design tool"
                        className="tool-3d absolute w-[16%] h-auto object-contain"
                        style={{ 
                          zIndex: 13,
                          left: '12%',
                          top: '8%',
                          ...card3DStyles.toolBase,
                        }}
                        loading="lazy"
                      />

                      {/* Hello World Text - 3D Effect */}
                      <img
                        src={helloWorldTextImg}
                        alt="Hello World"
                        className="hello-world-3d absolute w-[26%] h-auto object-contain"
                        style={{ 
                          zIndex: 13,
                          right: '-2%',
                          top: '15%',
                          ...card3DStyles.helloWorldBase,
                        }}
                        loading="lazy"
                      />

                      {/* Designer Tooltip - 3D Effect */}
                      <img
                        src={cursorTooltipImg}
                        alt="Designer tooltip"
                        className="tooltip-3d absolute w-[22%] h-auto object-contain"
                        style={{ 
                          zIndex: 15,
                          right: '12%',
                          top: '40%',
                          ...card3DStyles.tooltipBase,
                        }}
                        loading="lazy"
                      />

                      {/* Figma Toolbar - 3D Effect */}
                      <img
                        src={toolbarImg}
                        alt="Design toolbar"
                        className="toolbar-3d absolute w-[80%] h-auto object-contain"
                        style={{ 
                          zIndex: 15,
                          left: '50%',
                          bottom: '18%',
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
          <div ref={textRef} className="order-1 lg:order-2 lg:col-span-4 space-y-6 lg:space-y-8 lg:pl-4">
            
            {/* Introduction */}
            <motion.div 
              className="space-y-3 lg:space-y-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true, threshold: 0.3 }}
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-left">
                Hi there, I'm<br />Jeevankumar
              </h3>
              <div className="relative">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-secondary font-medium text-left mt-6" >
                  Product Designer
                </p>
                {/* Pencil underline */}
                <img 
                  src={pencilImg} 
                  alt="pencil line" 
                  className="w-full h-auto -mt-5"
                  style={{
                    display: 'block',
                    opacity: 0.8
                  }}
                />
              </div>
            </motion.div>

            {/* Main Description */}
            <motion.div 
              className="space-y-8 sm:space-y-10 md:space-y-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true, threshold: 0.3 }}
            >
              <p className="text-base sm:text-lg md:text-xl text-secondary/80 text-left" style={{ lineHeight: '1.6' }}>
                With <strong className="text-secondary font-semibold">1.7 years of experience</strong> crafting user-centered, interactive designs using tools like <strong className="text-secondary font-semibold">Figma and Photoshop</strong>, I've honed my skills and expanded my knowledge by worked on a various projects like mobile applications, web applications, websites, and cross-platform design solutions.
              </p>

              <p className="text-base sm:text-lg md:text-xl text-secondary/80 text-left" style={{ lineHeight: '1.6' }}>
                Beyond digital interfaces, I've also explored the creative side of visual communication through <strong className="text-secondary font-semibold">graphic design projects</strong>, including posters, banners, and logos. This variety has helped me build a well-rounded design perspective.
              </p>

              <p className="text-base sm:text-lg md:text-xl text-secondary/80 text-left" style={{ lineHeight: '1.6' }}>
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