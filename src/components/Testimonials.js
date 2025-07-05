import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import quoteImg from '../assets/images/quote.svg';
import roshinImg from '../assets/images/roshin.jpeg';
import ashikaImg from '../assets/images/ashika.jpeg';
import anshanImg from '../assets/images/anshan.jpeg';

const testimonials = [
  {
    id: 1,
    quote: "I highly recommend Jeevan as an exceptional UI/UX designer who consistently demonstrates outstanding collaboration skills with development teams. His ability to deliver ui designs while maintaining technical feasibility has been invaluable to our projects. What sets them apart is their remarkable adaptability and willingness to iterate based on technical constraints, coupled with his proactive approach to improving design systems. Through our collaboration, he shown an impressive understanding of frontend development considerations, which has significantly streamlined our workflow and enhanced the quality of our final products",
    name: 'Roshin Prasad',
    designation: 'Frontend Developer',
    avatar: roshinImg,
  },
  {
    id: 2,
    quote: "I had the pleasure of working with Jeevan for at Risolutor Technologies. Jeevan has an exceptional eye for detail and a deep understanding of user-centered design principles, consistently creating interfaces that are not only visually stunning but also intuitive and user-friendly. What sets Jeevan apart is his ability to balance creativity with functionality, ensuring that the designs are both aesthetically pleasing and aligned with the goals of the project. His strong collaboration skills make him an invaluable team member, as he is always open to feedback and able to iterate quickly without losing sight of the end user's needs. In addition to their technical expertise, Jeevan brings a positive attitude and a passion for design that is truly contagious. I highly recommend Jeevan as he will be an incredible addition to the team ",
    name: 'Ashika Vignanamani',
    designation: 'HR Professional',
    avatar: ashikaImg,
  },
  {
    id: 3,
    quote: "Jeevan is a cool to work with guy. With his presence, he'll fill the place with charm. Same time he is keen observer, grab the requirements, and gives life to it with his creativity. Sometimes exceeds expectations. I highly recommend for him.",
    name: 'Anshan Jose A',
    designation: 'Content Administrator',
    avatar: anshanImg,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const quoteIconRef = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const quoteIcon = quoteIconRef.current;
    const section = sectionRef.current;

    if (quoteIcon && section) {
      gsap.to(quoteIcon, {
        y: -250,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleAvatarClick = (index) => {
    setCurrentIndex(index);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000); 
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Function to get card position and styling
  const getCardStyle = (index) => {
    const position = index - currentIndex;
    const absPosition = Math.abs(position);
    
    if (absPosition === 0) {
      // Active card - center
      return {
        transform: 'translateX(0%) scale(1)',
        opacity: 1,
        zIndex: 10,
        filter: 'blur(0px)'
      };
    } else if (absPosition === 1) {
      // Adjacent cards
      return {
        transform: `translateX(${position > 0 ? '85%' : '-85%'}) scale(0.85)`,
        opacity: 0.4,
        zIndex: 5,
        filter: 'blur(1px)'
      };
    } else {
      // Far cards - hidden
      return {
        transform: `translateX(${position > 0 ? '200%' : '-200%'}) scale(0.7)`,
        opacity: 0.1,
        zIndex: 1,
        filter: 'blur(2px)'
      };
    }
  };

  return (
    <section id="testimonials" ref={sectionRef} className="relative min-h-screen bg-primary text-secondary py-20 px-6 sm:px-10 flex flex-col justify-center items-center overflow-hidden">
      <img 
        src={quoteImg} 
        alt="quote"
        ref={quoteIconRef}
        className="absolute top-40 left-16 w-48 h-48 opacity-20"
        style={{ transform: 'rotate(330deg)' }}
      />
      
      <div className="w-full max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-16">
          Testimonials
        </h2>
        
        <div className="w-full flex flex-col items-center">
          {/* Cards Gallery Container */}
          <div className="relative w-full max-w-6xl mb-16 h-96 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {testimonials.map((testimonial, index) => {
                const cardStyle = getCardStyle(index);
                return (
                  <motion.div
                    key={testimonial.id}
                    className="absolute w-96 h-80 cursor-pointer"
                    style={cardStyle}
                    animate={cardStyle}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                    onClick={() => handleAvatarClick(index)}
                  >
                                        {/* Testimonial Card */}
                     <div 
                       className="rounded-2xl p-6 h-full flex flex-col"
                       style={{
                         background: 'rgba(31, 31, 31, 0.3)',
                         backdropFilter: 'blur(20px)',
                         WebkitBackdropFilter: 'blur(20px)',
                         border: '1px solid rgba(255, 255, 255, 0.1)',
                         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                       }}
                     >
                      
                      {/* Header - Profile Info */}
                      <div className="flex items-center mb-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-3">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-secondary truncate">
                              {testimonial.name}
                            </h3>
                            <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">in</span>
                            </div>
                          </div>
                          <p className="text-secondary/70 text-sm font-medium truncate">
                            {testimonial.designation}
                          </p>
                        </div>
                      </div>
                      
                                             {/* Testimonial Content */}
                       <div className="text-left flex-1 overflow-hidden">
                         <p 
                           className="text-secondary/90 text-sm leading-relaxed"
                           style={{
                             display: '-webkit-box',
                             WebkitLineClamp: 12,
                             WebkitBoxOrient: 'vertical',
                             overflow: 'hidden',
                             textOverflow: 'ellipsis'
                           }}
                         >
                           {testimonial.quote}
                         </p>
                       </div>
                      
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          

          {/* Avatar Navigation */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            {testimonials.map((testimonial, index) => (
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
                      active: { width: 60, height: 60 },
                      inactive: { width: 48, height: 48 }
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 