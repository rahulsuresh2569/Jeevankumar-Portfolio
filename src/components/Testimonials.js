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
  
  const handleAvatarClick = (index) => {
    setCurrentIndex(index);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000); 
    return () => clearInterval(timer);
  }, [currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" ref={sectionRef} className="relative min-h-screen bg-primary text-secondary py-20 px-10 flex flex-col justify-center items-center overflow-hidden">
      <img 
        src={quoteImg} 
        alt="quote"
        ref={quoteIconRef}
        className="absolute top-40 left-16 w-48 h-48"
        style={{ transform: 'rotate(330deg)' }}
      />
      <div className="w-full max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold">
          Testimonials
        </h2>
        
        <div className="w-full h-[36rem] flex flex-col">
          <div className="flex-grow flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentTestimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="max-w-4xl mx-auto flex flex-col items-center"
                >
                    <p className="md:text-xl">
                        "{currentTestimonial.quote}"
                    </p>
                    <footer className="mt-6">
                        <p className="font-bold text-lg">{currentTestimonial.name}</p>
                        <p className="text-secondary/80">{currentTestimonial.designation}</p>
                    </footer>
                </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex-shrink-0 pb-8">
            <div className="flex items-end justify-center space-x-2 sm:space-x-4">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial.id}
                  onClick={() => handleAvatarClick(index)}
                  className="cursor-pointer flex flex-col items-center"
                  animate={index === currentIndex ? "active" : "inactive"}
                  variants={{
                      active: { scale: 1.0, y: 0 },
                      inactive: { scale: 0.85, y: 10 }
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="rounded-full object-cover"
                    variants={{
                        active: { width: 80, height: 80, opacity: 1 },
                        inactive: { width: 64, height: 64, opacity: 0.6 }
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 