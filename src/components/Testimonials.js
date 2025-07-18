import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Remove local testimonial avatar imports and use Cloudinary URLs
const cloudinaryImages = {
  roshin: "https://res.cloudinary.com/dcua87ney/image/upload/v1752747654/roshin_nfgcu1.jpg",
  ashika: "https://res.cloudinary.com/dcua87ney/image/upload/v1752747653/ashika_ztsvax.jpg",
  anshan: "https://res.cloudinary.com/dcua87ney/image/upload/v1752747651/anshan_zqjyqd.jpg",
};

const testimonials = [
  {
    id: 1,
    quote: "I highly recommend Jeevan as an exceptional UI/UX designer who consistently demonstrates outstanding collaboration skills with development teams. His ability to deliver ui designs while maintaining technical feasibility has been invaluable to our projects. What sets them apart is their remarkable adaptability and willingness to iterate based on technical constraints, coupled with his proactive approach to improving design systems. Through our collaboration, he shown an impressive understanding of frontend development considerations, which has significantly streamlined our workflow and enhanced the quality of our final products.",
    name: 'Roshin Prasad',
    designation: 'Frontend Developer',
    avatar: cloudinaryImages.roshin,
  },
  {
    id: 2,
    quote: "I had the pleasure of working with Jeevan for at Risolutor Technologies. Jeevan has an exceptional eye for detail and a deep understanding of user-centered design principles, consistently creating interfaces that are not only visually stunning but also intuitive and user-friendly. What sets Jeevan apart is his ability to balance creativity with functionality, ensuring that the designs are both aesthetically pleasing and aligned with the goals of the project. His strong collaboration skills make him an invaluable team member, as he is always open to feedback and able to iterate quickly without losing sight of the end user's needs. In addition to their technical expertise, Jeevan brings a positive attitude and a passion for design that is truly contagious. I highly recommend Jeevan as he will be an incredible addition to the team.",
    name: 'Ashika Vignanamani',
    designation: 'HR Professional',
    avatar: cloudinaryImages.ashika,
  },
  {
    id: 3,
    quote: "Jeevan is a cool to work with guy. With his presence, he'll fill the place with charm. Same time he is keen observer, grab the requirements, and gives life to it with his creativity. Sometimes exceeds expectations. I highly recommend for him.",
    name: 'Anshan Jose A',
    designation: 'Content Administrator',
    avatar: cloudinaryImages.anshan,
  },
];

const Testimonials = () => {
  const [rotationCounter, setRotationCounter] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const wasHoveringActiveRef = useRef(false);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);
  const numTestimonials = testimonials.length;

  const handleNext = useCallback(() => {
    setRotationCounter(c => c + 1);
  }, []);
  
  const handleAvatarClick = (index) => {
    const currentWrappedIndex = (rotationCounter % numTestimonials + numTestimonials) % numTestimonials;
    let diff = index - currentWrappedIndex;

    if (Math.abs(diff) > numTestimonials / 2) {
      if (diff > 0) {
        diff -= numTestimonials;
      } else {
        diff += numTestimonials;
      }
    }
    setRotationCounter(c => c + diff);
  };

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      handleNext();
    }, 3000);
  }, [handleNext]);

  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  useEffect(() => {
    const currentIndex = (rotationCounter % numTestimonials + numTestimonials) % numTestimonials;
    const isHoveringActive = hoveredCardIndex === currentIndex;

    if (isHoveringActive && !wasHoveringActiveRef.current) {
      stopTimer();
    } else if (!isHoveringActive && wasHoveringActiveRef.current) {
      startTimer();
    }
    
    wasHoveringActiveRef.current = isHoveringActive;
  }, [hoveredCardIndex, rotationCounter, stopTimer, startTimer, numTestimonials]);

  const getCardStyle = (index) => {
    const currentIndex = (rotationCounter % numTestimonials + numTestimonials) % numTestimonials;
    let offset = index - currentIndex;

    if (offset > numTestimonials / 2) offset -= numTestimonials;
    if (offset < -numTestimonials / 2) offset += numTestimonials;

    if (isMobile) {
      const isActive = offset === 0;
      return {
        transform: `translateX(${offset * 100}%) scale(${isActive ? 1 : 0.8})`,
        opacity: isActive ? 1 : 0,
        zIndex: isActive ? numTestimonials : numTestimonials - Math.abs(offset),
        pointerEvents: isActive ? 'auto' : 'none',
      };
    }

    const isVisible = Math.abs(offset) <= 1;

    return {
        transform: `translateX(${offset * 95}%) scale(${1 - Math.abs(offset) * 0.2})`,
        opacity: isVisible ? 1 - Math.abs(offset) * 0.5 : 0,
        zIndex: numTestimonials - Math.abs(offset),
        pointerEvents: isVisible ? 'auto' : 'none',
    };
  };

  return (
    <section id="testimonials" ref={sectionRef} className="relative min-h-screen bg-primary text-secondary py-20 px-4 sm:px-6 md:px-10 flex flex-col justify-center items-center overflow-hidden">
      
      <div className="w-full max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-16">
          Testimonials
        </h2>
        
        <div 
          className="w-full flex flex-col items-center"
        >
          {/* Carousel Container */}
          <div className="relative w-full h-[38rem] md:h-[30rem] flex items-center justify-center mb-2">
            {testimonials.map((testimonial, index) => {
                const cardStyle = getCardStyle(index);
                const currentIndex = (rotationCounter % numTestimonials + numTestimonials) % numTestimonials;
                const isActive = index === currentIndex;

                return (
                  <motion.div
                    key={testimonial.id}
                    className="absolute w-11/12 md:w-8/12 lg:w-4/12 max-w-md h-full"
                    initial={false}
                    animate={cardStyle}
                    transition={{
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    onMouseEnter={() => setHoveredCardIndex(index)}
                    onMouseLeave={() => setHoveredCardIndex(null)}
                  >
                    <div 
                      className="rounded-xl h-full relative p-px"
                      style={{
                        background: 'radial-gradient(180% 180% at 50% 25%, rgba(255, 255, 255, 0.5), transparent 40%)'
                      }}
                    >
                      <div className="rounded-[11px] h-full w-full bg-primary flex flex-col overflow-hidden">
                        {/* Top blue line */}
                        <motion.div 
                          className="w-full h-1.5 bg-blue-500 flex-shrink-0"
                          initial={false}
                          animate={{ opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                        
                        <div className="p-5 flex-1 flex flex-col">
                            {/* Header */}
                            <div className="flex items-center mb-3">
                                <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 mr-4">
                                  <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-semibold text-secondary truncate">
                                      {testimonial.name}
                                    </h3>
                                    <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
                                      <span className="text-white text-xs font-bold">in</span>
                                    </div>
                                  </div>
                                  <p className="text-xs text-secondary/60 font-medium truncate" style={{fontSize: '0.625rem'}}>
                                    {testimonial.designation}
                                  </p>
                                </div>
                            </div>
                            
                            {/* Divider */}
                            <hr className="border-gray-700/80" />

                            {/* Quote */}
                            <div className="text-left flex-1 overflow-auto mt-3 pr-2">
                                <p className={`text-sm leading-relaxed transition-colors duration-700 ${isActive ? 'text-secondary' : 'text-secondary/80'}`}>
                                    {testimonial.quote}
                                </p>
                            </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>

          {/* Avatar Navigation */}
          <div className="flex items-center justify-center space-x-3 h-10 sm:space-x-4 mt-4">
            {testimonials.map((testimonial, index) => {
              const currentIndex = (rotationCounter % numTestimonials + numTestimonials) % numTestimonials;
              return (
                <motion.button
                  key={testimonial.id}
                  onClick={() => handleAvatarClick(index)}
                  className="relative rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  animate={index === currentIndex ? "active" : "inactive"}
                  variants={{
                      active: { scale: 1.0, opacity: 1 },
                      inactive: { scale: 0.85, opacity: 0.6 }
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  whileHover={{ scale: 0.95 }}
                >
                  <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="rounded-full object-cover"
                    variants={{
                        active: { width: isMobile ? 52 : 60, height: isMobile ? 52 : 60 },
                        inactive: { width: isMobile ? 40 : 48, height: isMobile ? 40 : 48 }
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                  
                  {/* Active indicator ring */}
                  {index === currentIndex && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute inset-0 rounded-full border-2 border-secondary/30 -m-1"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 