import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "This innovative solution offers unparalleled ease of use, allowing businesses to swiftly onboard exceptional developers and seamlessly integrate.",
    name: 'Isabella Martinez',
    designation: 'Lead Developer',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    quote: "Our platform simplifies the hiring process, saving you valuable time and effort. Say goodbye to the frustration of sifting through countless resumes.",
    name: 'Matthew Bennett',
    designation: 'Hiring Manager',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    quote: "A game-changer for our team's productivity. The intuitive interface and powerful features have streamlined our workflow significantly.",
    name: 'Sophia Chen',
    designation: 'Project Manager',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

const transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 0.5,
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleAvatarClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, []);

  const onDragEnd = (event, { offset, velocity }) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      handleNext();
    } else if (offset.x > swipeThreshold) {
      handlePrev();
    }
  };
  
  const getCardStyle = (index) => {
    const totalItems = testimonials.length;
    let offset = index - currentIndex;
    if (offset > totalItems / 2) offset -= totalItems;
    if (offset < -totalItems / 2) offset += totalItems;

    const isActive = offset === 0;
    const isAdjacent = Math.abs(offset) === 1;

    let x = `${offset * 55}%`;
    if (isAdjacent) x = `${offset * 50}%`;
    if (!isActive && !isAdjacent) x = `${offset * 100}%`;

    return {
      x,
      scale: isActive ? 1 : 0.8,
      opacity: isActive ? 1 : (isAdjacent ? 0.4 : 0),
      zIndex: isActive ? 3 : (isAdjacent ? 2 : 1),
      boxShadow: isActive ? '0px 20px 40px rgba(0, 0, 0, 0.15)' : 'none',
    };
  };

  return (
    <section id="testimonials" className="min-h-screen bg-secondary text-primary py-20 px-4 sm:px-10 flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full max-w-5xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-16">
          Testimonials
        </h2>
        
        <motion.div 
            className="relative h-72 w-full mb-16"
            style={{ background: 'transparent', boxShadow: 'none' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.05}
            onDragEnd={onDragEnd}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="absolute w-full h-full p-4"
              style={{
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              initial={false}
              animate={getCardStyle(index)}
              transition={transition}
            >
              <div className="relative w-full h-full max-w-lg bg-tertiary text-primary rounded-2xl p-8 flex flex-col justify-center">
                <span className="text-6xl font-serif text-primary/20 absolute top-4 left-6 z-0">“</span>
                <p className="relative z-10 text-base md:text-lg text-center">
                    {testimonial.quote}
                </p>
                <div className="relative z-10 mt-4 text-center">
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm opacity-80">{testimonial.designation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                onClick={() => handleAvatarClick(index)}
                className="cursor-pointer flex flex-col items-center"
                animate={index === currentIndex ? "active" : "inactive"}
                variants={{
                    active: { scale: 1, opacity: 1 },
                    inactive: { scale: 0.85, opacity: 0.7 }
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <motion.img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="rounded-full object-cover"
                  variants={{
                      active: { width: 64, height: 64,
                        boxShadow: '0 0 0 3px #4F46E5, 0 0 20px 5px rgba(79, 70, 229, 0.4)'
                      },
                      inactive: { width: 48, height: 48,
                        boxShadow: '0 0 0 0px #4F46E5, 0 0 0 0px rgba(79, 70, 229, 0)'
                      }
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 