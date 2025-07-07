import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

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
  const [rotationCounter, setRotationCounter] = useState(0);
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

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  }, [handleNext]);

  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  const getCardStyle = (index) => {
    const currentIndex = (rotationCounter % numTestimonials + numTestimonials) % numTestimonials;
    let offset = index - currentIndex;

    if (offset > numTestimonials / 2) offset -= numTestimonials;
    if (offset < -numTestimonials / 2) offset += numTestimonials;

    const isVisible = Math.abs(offset) <= 1;

    return {
        transform: `translateX(${offset * 95}%) scale(${1 - Math.abs(offset) * 0.2})`,
        opacity: isVisible ? 1 - Math.abs(offset) * 0.5 : 0,
        zIndex: numTestimonials - Math.abs(offset),
    };
  };

  return (
    <section id="testimonials" ref={sectionRef} className="relative min-h-screen bg-primary text-secondary py-20 px-6 sm:px-10 flex flex-col justify-center items-center overflow-hidden">
      
      <div className="w-full max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-16">
          Testimonials
        </h2>
        
        <div 
          className="w-full flex flex-col items-center"
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
        >
          {/* Carousel Container */}
          <div className="relative w-full h-[27rem] flex items-center justify-center mb-2">
            {testimonials.map((testimonial, index) => {
                const cardStyle = getCardStyle(index);

                return (
                  <motion.div
                    key={testimonial.id}
                    className="absolute w-4/12 max-w-3xl h-[27rem]"
                    initial={false}
                    animate={cardStyle}
                    transition={{
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <div 
                      className="rounded-xl h-full relative p-px"
                      style={{
                        background: 'radial-gradient(180% 180% at 50% 25%, rgba(255, 255, 255, 0.5), transparent 40%)'
                      }}
                    >
                      <div className="rounded-[11px] h-full w-full bg-primary flex flex-col overflow-hidden">
                        {/* Top blue line */}
                        <div className="w-full h-1.5 bg-blue-500 flex-shrink-0"></div>
                        
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
                            <div className="text-left flex-1 overflow-auto mt-3">
                                <p className="text-xs text-secondary/80 leading-relaxed">
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
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 