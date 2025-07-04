import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import workSuitcaseImg from '../assets/images/work_suitcase.png';

const Experience = () => {
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, threshold: 0.3 });

  const experienceData = {
    company: 'Risolutor Technologies Pvt Ltd',
    position: 'UI UX Designer',
    period: 'Oct,2023 - Jun,2025',
    descriptions: [
      'I worked on web & mobile applications, websites, and various design projects (logos, posters, banners), delivering effective solutions while continuously learning and improving.',
      'Ensuring designs align with client requirements while maintaining a user-friendly and intuitive design system',
      'Collaborating with team and adept at delivering user-friendly designs while maintaining technical constraints.'
    ]
  };

  return (
    <section id="experience" className="min-h-screen bg-primary text-secondary py-20 px-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-16">Experience</h2>
        
        {/* Company Info Card */}
        <div className="bg-tertiary rounded-2xl p-8 mb-12 shadow-sm border border-gray-600">
          <div className="flex flex-col items-center text-center">
            
            {/* Company Name with Icon */}
            <div className="flex items-center gap-4 mb-8">
              <img 
                src={workSuitcaseImg} 
                alt="Work briefcase"
                className="w-12 h-12"
              />
              <h3 className="text-2xl lg:text-3xl font-bold text-secondary">
                {experienceData.company}
              </h3>
            </div>
            
            {/* Animated Timeline */}
            <div ref={timelineRef} className="w-full max-w-2xl">
              
              {/* Timeline Container */}
              <div className="relative flex items-center w-full">
                
                {/* Start Dot */}
                <motion.div 
                  className="w-4 h-4 bg-white rounded-full z-10 relative flex-shrink-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.2,
                    ease: "easeOut"
                  }}
                />
                
                {/* Connecting Line Container */}
                <div className="flex-1 h-0.5 relative overflow-hidden mx-0">
                  {/* Background Dotted Line */}
                  <div 
                    className="absolute top-0 left-0 w-full h-0.5"
                    style={{ 
                      borderTop: '2px dotted #6b7280',
                      top: '-1px'
                    }}
                  />
                  {/* Animated Dotted Line */}
                  <motion.div 
                    className="absolute h-0.5"
                    style={{ 
                      borderTop: '2px dotted #ffffff',
                      top: '-1px',
                      left: 0
                    }}
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: "100%" } : { width: "0%" }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.8,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                {/* End Dot */}
                <motion.div 
                  className="w-4 h-4 bg-white rounded-full z-10 relative flex-shrink-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 2.0,
                    ease: "easeOut"
                  }}
                />
              </div>
              
              {/* Date Labels */}
              <div className="relative w-full mt-3">
                <motion.span
                  className="absolute left-0 transform -translate-x-1/2 text-sm text-secondary/70"
                  style={{ left: '8px' }}
                  initial={{ y: 10, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.5,
                    ease: "easeOut"
                  }}
                >
                  {experienceData.period.split(' - ')[0]}
                </motion.span>
                <motion.span
                  className="absolute right-0 transform translate-x-1/2 text-sm text-secondary/70"
                  style={{ right: '8px' }}
                  initial={{ y: 10, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 2.3,
                    ease: "easeOut"
                  }}
                >
                  {experienceData.period.split(' - ')[1]}
                </motion.span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Experience Description Blocks */}
        <div className="space-y-8">
          {experienceData.descriptions.map((desc, index) => (
            <motion.div
              key={index}
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
            >
              <p className="text-lg text-secondary/80 leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 