import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import individual element images

// Remove local image imports and use Cloudinary URLs
const cloudinaryImages = {
  myPictureImg: "https://res.cloudinary.com/dcua87ney/image/upload/v1752739867/my-picture_y6oeai.svg",
  cursorTooltipImg: "https://res.cloudinary.com/dcua87ney/image/upload/v1752739868/cursor-tooltip_myuyx2.svg",
  helloWorldTextImg: "https://res.cloudinary.com/dcua87ney/image/upload/v1752739868/hello-world-text_bcblp6.svg",
  shapeImg: "https://res.cloudinary.com/dcua87ney/image/upload/v1752739866/shape_xlxduo.svg",
  toolImg: "https://res.cloudinary.com/dcua87ney/image/upload/v1752739867/tool_gmjeyn.svg",
  toolbarImg: "https://res.cloudinary.com/dcua87ney/image/upload/v1752739866/toolbar_cbiusl.svg",
  pencilImg: "https://res.cloudinary.com/dcua87ney/image/upload/v1752739866/pencil_zgyzsy.svg",
  certificateImg: "https://res.cloudinary.com/dcua87ney/image/upload/v1752739874/certificate_qh5pqe.png",
  risolutorLogo: "https://res.cloudinary.com/dcua87ney/image/upload/v1752739868/risoluter_logo_fh5cwl.svg",
};

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      transition: 'transform 130ms ease-out',
      borderRadius: '1.5rem',
      position: 'relative',
    },
    // Base 3D positioning for elements - moderate elevation
    shapeBase: {
      transform: 'translate3d(0, 0, 12px)',
      transition: 'transform 130ms ease-out',
    },
    toolBase: {
      transform: 'translate3d(0, 0, 18px)',
      transition: 'transform 130ms ease-out',
    },
    helloWorldBase: {
      transform: 'translate3d(0, 0, 15px)',
      transition: 'transform 130ms ease-out',
    },
    tooltipBase: {
      transform: 'translate3d(0, 0, 22px)',
      transition: 'transform 130ms ease-out',
    },
    toolbarBase: {
      transform: 'translate3d(-50%, 0, 20px)',
      transition: 'transform 130ms ease-out',
    },
  };

  // Cursor-following 3D rotation function
  const rotateToMouse = (e) => {
    const container = containerRef.current;
    if (!container) return;

    // Check if mobile device
    const isMobile = window.innerWidth < 768;
    
    // Reduce or disable 3D effects on mobile for performance
    if (isMobile) {
      return; // Disable 3D effects on mobile
    }

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

    // Calculate rotation intensity - MODERATE
    const rotationIntensity = Math.log(distance + 1) * 2.2;
    const scaleValue = 1.05;

    // Apply dynamic transforms to card container - MODERATE SENSITIVITY
    if (card) {
      card.style.transform = `
        scale3d(${scaleValue}, ${scaleValue}, ${scaleValue})
        rotate3d(
          ${center.y / 110},
          ${-center.x / 110},
          0,
          ${rotationIntensity}deg
        )
      `;
    }

    // Apply individual transforms to elements with MODERATE elevation and sensitivity
    if (shape) {
      shape.style.transform = `
        translate3d(0, 0, 60px)
        rotate3d(
          ${center.y / 130},
          ${-center.x / 130},
          0,
          ${rotationIntensity * 1.0}deg
        )
        rotate(-2deg)
      `;
    }

    if (tool) {
      tool.style.transform = `
        translate3d(0, 0, 70px)
        rotate3d(
          ${center.y / 120},
          ${-center.x / 120},
          0,
          ${rotationIntensity * 1.15}deg
        )
      `;
    }

    if (helloWorld) {
      helloWorld.style.transform = `
        translate3d(0, 0, 65px)
        rotate3d(
          ${center.y / 125},
          ${-center.x / 125},
          0,
          ${rotationIntensity * 1.1}deg
        )
      `;
    }

    if (tooltip) {
      tooltip.style.transform = `
        translate3d(0, 0, 80px)
        rotate3d(
          ${center.y / 100},
          ${-center.x / 100},
          0,
          ${rotationIntensity * 1.3}deg
        )
      `;
    }

    if (toolbar) {
      toolbar.style.transform = `
        translate3d(-50%, 0, 75px)
        rotate3d(
          ${center.y / 115},
          ${-center.x / 115},
          0,
          ${rotationIntensity * 1.2}deg
        )
        rotate(-1deg)
      `;
    }
  };

  const handleMouseEnter = () => {
    // Only enable 3D effects on desktop
    if (window.innerWidth >= 768) {
      document.addEventListener('mousemove', rotateToMouse);
    }
  };

  const handleMouseLeave = () => {
    document.removeEventListener('mousemove', rotateToMouse);
    
    const container = containerRef.current;
    if (!container) return;

    // Only reset transforms on desktop (where 3D effects are active)
    if (window.innerWidth >= 768) {
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
        shape.style.transform = 'translate3d(0, 0, 12px) rotate(-2deg)';
      }
      if (tool) {
        tool.style.transform = 'translate3d(0, 0, 18px)';
      }
      if (helloWorld) {
        helloWorld.style.transform = 'translate3d(0, 0, 15px)';
      }
      if (tooltip) {
        tooltip.style.transform = 'translate3d(0, 0, 22px)';
      }
      if (toolbar) {
        toolbar.style.transform = 'translate3d(-50%, 0, 20px) rotate(-1deg)';
      }
    }
  };

  // Info Pills Component with same style as Experience section
  const InfoPill = ({ children, index, delay = 0, icon, looped = false, onClick }) => {
    const isClickable = !!onClick;
    return (
      <div
        onClick={onClick}
        className={`rounded-full p-[1px] transition-all duration-250 hover:shadow-lg hover:shadow-white/10 w-fit ${isClickable ? 'cursor-pointer hover:scale-107 hover:-translate-y-1' : 'hover:scale-103'}`}
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
            className="block px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2 text-xs sm:text-sm font-medium text-secondary rounded-full flex items-center gap-1.5 sm:gap-2 relative z-5 info-pill-text"
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
      className="min-h-screen bg-primary text-secondary pt-12 sm:pt-16 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
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
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 items-start">
          
          {/* Image Section with Layered Elements */}
          <div className="relative order-2 lg:order-1 lg:col-span-4">
            
            {/* Info Pills Section - Positioned above image */}
            <motion.div 
              className="mt-5 mb-5 sm:mb-6 lg:mb-8 w-full relative z-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, threshold: 0.3 }}
            >
              {/* Responsive Pills Layout */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 max-w-full sm:max-w-fit items-start">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <InfoPill index={0} delay={0} icon="⭐" looped={true} onClick={openModal}>
                    Effortless Achiever
                    <i className="fas fa-arrow-right ml-1 text-sm"></i>
                  </InfoPill>
                </motion.div>
                <InfoPill index={1} delay={0.2} icon="🌐">English, Tamil</InfoPill>
                <InfoPill index={2} delay={0.4} icon="📍">
                  <span className="block sm:hidden">Chennai, India</span>
                  <span className="hidden sm:block">Chennai, Tamil Nadu, India</span>
                </InfoPill>
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
                <div className="mt-16 relative w-full aspect-[4/5] sm:aspect-[3/4] min-h-[280px] sm:h-[700px] sm:mt-28 lg:min-h-[680px] xl:mt-20">
                  


                  {/* Combined Picture and Background */}
                  <img
                    src={cloudinaryImages.myPictureImg}
                    alt="Jeevan Kumar"
                    className="absolute w-[92%] sm:w-[90%] h-[88%] sm:h-[90%] object-contain rounded-xl sm:rounded-2xl"
                    style={{ 
                      zIndex: 2,
                      left: '50%',
                      top: '32%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    loading="lazy"
                  />

                  {/* 3D Animated Elements Container */}
                  <div className="absolute inset-0" style={{ zIndex: 10 }}>
                    <div className="card-3d relative w-full h-full" style={card3DStyles.card}>

                      {/* Green Grid Shape - 3D Effect */}
                      <img
                        src={cloudinaryImages.shapeImg}
                        alt="Grid shape"
                        className="shape-3d absolute w-[30%] sm:w-[32%] h-auto object-contain"
                        style={{ 
                          zIndex: 12,
                          left: '1%',
                          top: '30%',
                          ...card3DStyles.shapeBase,
                          transform: `${card3DStyles.shapeBase.transform} rotate(-2deg)`,
                        }}
                        loading="lazy"
                      />

                      {/* Magic Tool Icon - 3D Effect */}
                      <img
                        src={cloudinaryImages.toolImg}
                        alt="Design tool"
                        className="tool-3d absolute w-[10%] sm:w-[12%] h-auto object-contain"
                        style={{ 
                          zIndex: 13,
                          left: '10%',
                          top: '4%',
                          ...card3DStyles.toolBase,
                        }}
                        loading="lazy"
                      />

                      {/* Hello World Text - 3D Effect */}
                      <img
                        src={cloudinaryImages.helloWorldTextImg}
                        alt="Hello World"
                        className="hello-world-3d absolute w-[18%] sm:w-[20%] h-auto object-contain"
                        style={{ 
                          zIndex: 13,
                          right: '-1%',
                          top: '10%',
                          ...card3DStyles.helloWorldBase,
                        }}
                        loading="lazy"
                      />

                      {/* Designer Tooltip - 3D Effect */}
                      <img
                        src={cloudinaryImages.cursorTooltipImg}
                        alt="Designer tooltip"
                        className="tooltip-3d absolute w-[16%] sm:w-[18%] h-auto object-contain"
                        style={{ 
                          zIndex: 15,
                          right: '10%',
                          top: '36%',
                          ...card3DStyles.tooltipBase,
                        }}
                        loading="lazy"
                      />

                      {/* Figma Toolbar - 3D Effect */}
                      <img
                        src={cloudinaryImages.toolbarImg}
                        alt="Design toolbar"
                        className="toolbar-3d absolute w-[62%] sm:w-[65%] h-auto object-contain"
                        style={{ 
                          zIndex: 15,
                          left: '52%',
                          bottom: '36%',
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
          <div ref={textRef} className="order-1 lg:order-2 lg:col-span-4 space-y-5 sm:space-y-5 lg:space-y-6 lg:pl-4 px-1">
            
            {/* Introduction */}
            <motion.div 
              className="space-y-2 sm:space-y-2 lg:space-y-3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true, threshold: 0.3 }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-left whitespace-normal sm:whitespace-pre-line text-center sm:text-left">
                <span className="block sm:hidden">Hi there, I'm Jeevankumar</span>
                <span className="hidden sm:inline">Hi there, I'm<br />Jeevankumar</span>
              </h3>
              <div className="relative mt-2 sm:mt-3">
                <p className="text-sm sm:text-sm md:text-base lg:text-lg text-secondary font-medium text-center sm:text-left mt-2 sm:mt-4" >
                  Product Designer
                </p>
                {/* Pencil underline */}
                <img 
                  src={cloudinaryImages.pencilImg} 
                  alt="pencil line" 
                  className="w-3/4 sm:w-full h-auto -mt-3 sm:-mt-5 md:-mt-6 mx-auto sm:mx-0"
                  style={{
                    display: 'block',
                    opacity: 0.8
                  }}
                />
              </div>
            </motion.div>

            {/* Main Description */}
            <motion.div 
              className="space-y-4 sm:space-y-4 md:space-y-5 lg:space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true, threshold: 0.3 }}
            >
              <p className="text-center sm:text-left text-sm sm:text-sm md:text-base lg:text-lg text-secondary/80 leading-relaxed" style={{ lineHeight: '1.7' }}>
                With <strong className="text-secondary font-semibold">1.7 years of experience</strong> crafting user-centered, interactive designs using tools like <strong className="text-secondary font-semibold">Figma and Photoshop</strong>, I've honed my skills and expanded my knowledge by worked on a various projects like mobile applications, web applications, websites, and cross-platform design solutions.
              </p>

              <p className="text-center sm:text-left text-sm sm:text-sm md:text-base lg:text-lg text-secondary/80 leading-relaxed" style={{ lineHeight: '1.7' }}>
                Beyond digital interfaces, I've also explored the creative side of visual communication through <strong className="text-secondary font-semibold">graphic design projects</strong>, including posters, banners, and logos. This variety has helped me build a well-rounded design perspective.
              </p>

              <p className="text-center sm:text-left text-sm sm:text-sm md:text-base lg:text-lg text-secondary/80 leading-relaxed" style={{ lineHeight: '1.7' }}>
                My core strength lies in <strong className="text-secondary font-semibold">product design</strong>, where I enjoy identifying real user problems, solving complex challenges, and delivering intuitive, impactful solutions. I'm eager to push my creative boundaries further and delivering impactful and innovative design solutions who balances functionality, aesthetics, and user needs.
              </p>
            </motion.div>


          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#111111] rounded-xl sm:rounded-2xl w-full max-w-6xl h-auto max-h-[90vh] flex flex-col overflow-hidden shadow-2xl mx-2 sm:mx-4"
            >
              {/* Header with Award title and close button */}
              <div className="flex items-center justify-between p-4 sm:p-6 bg-[#151515] sm:py-2 border-b border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Award</h2>
                <button
                  onClick={closeModal}
                  className="text-white/50 hover:text-white transition-colors p-1"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Main content area */}
              <div className="flex flex-col lg:flex-row flex-1">

              {/* Certificate Image */}
              <div className="w-full lg:w-3/4 p-3 sm:p-4 lg:p-8 flex items-center justify-center">
                <img 
                  src={cloudinaryImages.certificateImg} 
                  alt="Effortless Achiever Certificate" 
                  className="w-full h-full object-contain rounded-md sm:rounded-lg max-h-[60vh] lg:max-h-full"
                />
              </div>

              {/* Details Panel - Mobile: Bottom, Desktop: Right */}
              <div className="w-full lg:w-1/4 bg-[#111111] flex flex-col justify-start p-4 sm:p-6 lg:px-2 lg:p-8 space-y-3 sm:space-y-4 lg:space-y-5">
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 text-left">Effortless Achiever</h3>
                </div>

                <div className="text-left">
                  <p className="text-xs text-white/50 mb-2">Issued By</p>
                  <img 
                    src={cloudinaryImages.risolutorLogo} 
                    alt="Risolutor Technologies Logo" 
                    className="w-24 sm:w-28 lg:w-32 h-auto"
                  />
                </div>

                <div className="text-left">
                  <p className="text-xs text-white/50 mb-1">Period</p>
                  <p className="text-sm sm:text-base font-medium text-white">2023 - 2024</p>
                </div>
              </div>

                            </div> {/* Close main content area */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Performance Optimizations handled via CSS */}
    </section>
  );
};

export default About; 