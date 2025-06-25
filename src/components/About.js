import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import individual element images
import backgroundImg from '../assets/images/about-me/background.png';
import myPictureImg from '../assets/images/about-me/my-picture.svg';
import cursorTooltipImg from '../assets/images/about-me/cursor-tooltip.svg';
import helloWorldTextImg from '../assets/images/about-me/hello-world-text.svg';
import shapeImg from '../assets/images/about-me/shape.svg';
import toolImg from '../assets/images/about-me/tool.svg';
import toolbarImg from '../assets/images/about-me/toolbar.svg';

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

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen bg-secondary text-primary pb-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12"
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
            <div 
              className="p-4 md:p-6 lg:p-6"
              style={card3DStyles.parent}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={containerRef}
            >
              <div className="h-full rounded-xl bg-transparent relative overflow-visible">
                <div className="relative w-full aspect-[3/4] min-h-[500px] lg:min-h-[600px]">
                  
                  {/* Background Layer - Completely Static */}
                  <img
                    src={backgroundImg}
                    alt="Background shapes"
                    className="absolute w-full h-full object-cover rounded-2xl"
                    style={{ 
                      zIndex: 1,
                      left: '0%',
                      top: '-6%',
                      width: '100%',
                      height: '90%'
                    }}
                    loading="lazy"
                  />

                  {/* Main Picture - Completely Static */}
                  <img
                    src={myPictureImg}
                    alt="Jeevan Kumar"
                    className="absolute w-[85%] h-auto object-contain"
                    style={{ 
                      zIndex: 2,
                      left: '50%',
                      top: '45%',
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
                I'm Jeevankumar
              </h3>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary/60 font-medium text-left">
                Product Designer
              </p>
            </motion.div>

            {/* Main Description */}
            <motion.div 
              className="space-y-4 sm:space-y-5 md:space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true, threshold: 0.3 }}
            >
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-primary/80 text-left">
                With <strong className="text-primary font-semibold">1.7 years of experience</strong> crafting user-centered, interactive designs using tools like <strong className="text-primary font-semibold">Figma and Photoshop</strong>, I've honed my skills and expanded my knowledge by worked on a various projects like mobile applications, web applications, websites, and cross-platform design solutions.
              </p>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-primary/80 text-left">
                Beyond digital interfaces, I've also explored the creative side of visual communication through <strong className="text-primary font-semibold">graphic design projects</strong>, including posters, banners, and logos. This variety has helped me build a well-rounded design perspective.
              </p>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-primary/80 text-left">
                My core strength lies in <strong className="text-primary font-semibold">product design</strong>, where I enjoy identifying real user problems, solving complex challenges, and delivering intuitive, impactful solutions. I'm eager to push my creative boundaries further and delivering impactful and innovative design solutions who balances functionality, aesthetics, and user needs.
              </p>
            </motion.div>

            {/* Skills Highlight */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 lg:pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
              viewport={{ once: true, threshold: 0.3 }}
            >
              {['Product Design', 'UI/UX Design', 'Visual Design', 'Figma', 'Prototyping', 'User Research'].map((skill, index) => (
                <motion.div
                  key={skill}
                  className="bg-white/80 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 rounded-xl text-center text-sm sm:text-base font-medium text-primary shadow-sm border border-gray-100"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "backOut", 
                    delay: 0.9 + (index * 0.1) 
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 