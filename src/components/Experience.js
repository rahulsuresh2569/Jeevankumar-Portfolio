import React, { useRef, useLayoutEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import workSuitcaseImg from '../assets/images/work_suitcase.png';

const Experience = () => {
  const timelineRef = useRef(null);
  const suitcaseRef = useRef(null);
  const leftSectionRef = useRef(null);
  const skillsRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, threshold: 0.3 });
  const skillsInView = useInView(skillsRef, { once: true, threshold: 0.2 });

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

  const strategicSkills = [
    'UX and CX Design',
    'User Flows and Journey Mapping',
    'Human-centric Design thinking',
    'Competitive Analysis',
    'UX research',
    'Usability Testing',
    'Persona Creation',
    'Wireframing and Prototyping',
    'Visual Design',
    'Responsive Design'
  ];

  const toolProficiency = [
    { name: 'Figma', icon: '🎨' },
    { name: 'Adobe XD', icon: '🎨' },
    { name: 'Figjam', icon: '🔧' },
    { name: 'Prottapp', icon: '⚡' },
    { name: 'Photoshop', icon: '🖼️' },
    { name: 'Illustrator', icon: '✨' }
  ];

  const graphicSkills = [
    'Social Media Posters',
    'Logos Designs',
    'Cover page',
    'Business Cards',
    'Banner Designs'
  ];

  const frontendSkills = [
    'HTML5',
    'CSS (Basic)'
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const suitcase = suitcaseRef.current;
    const leftSection = leftSectionRef.current;

    if (suitcase && leftSection) {
      gsap.to(suitcase, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: leftSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }
  }, []);

  // Enhanced SkillTag component with intense shine animation on the card content
  const SkillTag = ({ children, index, delay = 0, hasIcon = false }) => {
    return (
      <div
        className="rounded-full p-[1px] transition-all duration-200 hover:shadow-md mb-3"
        style={{
          background: 'linear-gradient(45deg, #9ca3af, #f9fafb, #9ca3af, #f9fafb)',
          backgroundSize: '200% 200%'
        }}
      >
        <div className="relative overflow-hidden rounded-full">
          {/* Intense shine effect overlay on the skill card content */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none z-20"
            style={{
              background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.4) 35%, rgba(255, 255, 255, 0.8) 45%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.8) 55%, rgba(255, 255, 255, 0.4) 65%, transparent 80%)',
              transform: 'translateX(-150%) skewX(-15deg)',
            }}
            animate={skillsInView ? {
              transform: ['translateX(-150%) skewX(-15deg)', 'translateX(150%) skewX(-15deg)']
            } : {}}
            transition={{
              duration: 1.8,
              delay: delay + (index * 0.15) + 0.3,
              ease: "easeInOut"
            }}
          />
          
          {/* Secondary shimmer effect for extra intensity */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none z-10"
            style={{
              background: 'linear-gradient(110deg, transparent 30%, rgba(240, 248, 255, 0.6) 45%, rgba(255, 255, 255, 0.9) 50%, rgba(240, 248, 255, 0.6) 55%, transparent 70%)',
              transform: 'translateX(-120%) skewX(-10deg)',
            }}
            animate={skillsInView ? {
              transform: ['translateX(-120%) skewX(-10deg)', 'translateX(120%) skewX(-10deg)']
            } : {}}
            transition={{
              duration: 1.5,
              delay: delay + (index * 0.15) + 0.5,
              ease: "easeInOut"
            }}
          />
          
          <span 
            className={`block ${hasIcon ? 'px-3 py-3' : 'px-4 py-3'} text-sm font-medium text-gray-700 rounded-full ${hasIcon ? 'flex items-center gap-2' : ''} relative z-5`}
            style={{
              background: 'linear-gradient(135deg, #fdfdfd 0%, #ffffff 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            {children}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="experience" className="min-h-screen bg-secondary text-primary py-20 px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-16">Experience & Skills</h2>
        
        {/* Top Section - Experience Block */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Side - Company Info */}
            <div ref={leftSectionRef} className="text-left pt-8 px-8 pb-12 rounded-2xl relative overflow-hidden min-h-[280px] flex flex-col justify-between" style={{ backgroundColor: '#1e1e1e' }}>
              
              {/* Top Section with Text and Icons */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight text-left relative z-10">
                    {experienceData.company}
                  </h3>
                  <p className="text-lg text-white/80 mt-2 text-left relative z-10">{experienceData.position}</p>
                </div>
              </div>
              
                             {/* Briefcase Image with Parallax - Positioned prominently */}
               <div className="absolute right-4 top-2/3 transform -translate-y-1/2">
                 <img 
                   ref={suitcaseRef}
                   src={workSuitcaseImg} 
                   alt="Work briefcase"
                   className="w-36 h-36 lg:w-44 lg:h-44 pointer-events-none"
                   style={{ transform: 'translateY(0px)' }}
                 />
               </div>
              
              {/* Animated Timeline */}
              <div ref={timelineRef} className="relative w-full z-10">
                
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
                  
                  {/* Connecting Line Container - Takes remaining space */}
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
                
                {/* Date Labels - Positioned directly under the dots */}
                <div className="relative w-full mt-3">
                  <motion.span
                    className="absolute left-0 transform -translate-x-1/2 text-sm text-white/70"
                    style={{ left: '8px' }} // Half of dot width (4px) to center under dot
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
                    className="absolute right-0 transform translate-x-1/2 text-sm text-white/70"
                    style={{ right: '8px' }} // Half of dot width (4px) to center under dot
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
            
            {/* Right Side - Experience Description */}
            <div className="space-y-4 text-left">
              {experienceData.descriptions.map((desc, index) => (
                <p key={index} className="text-primary/80 leading-relaxed text-left">
                  {desc}
                </p>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Grid Section - Skills */}
        <div ref={skillsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Strategic Product Design Skills (Tall Card) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl lg:text-2xl font-bold text-primary mb-6 text-left">Strategic Product Design Skills</h3>
            <div className="flex flex-wrap gap-3">
              {strategicSkills.map((skill, index) => (
                <SkillTag key={index} index={index} delay={0}>
                  {skill}
                </SkillTag>
              ))}
            </div>
          </div>
          
          {/* Right Column - Three Stacked Cards */}
          <div className="space-y-8">
            
            {/* Tool Proficiency Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg lg:text-xl font-bold text-primary mb-4 text-left">Tool Proficiency</h3>
              <div className="flex flex-wrap gap-3">
                {toolProficiency.map((tool, index) => (
                  <SkillTag key={index} index={index} delay={1.0} hasIcon>
                    <span>{tool.icon}</span>
                    {tool.name}
                  </SkillTag>
                ))}
              </div>
            </div>
            
            {/* Graphic Designing Skills Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg lg:text-xl font-bold text-primary mb-4 text-left">Graphic Designing Skills</h3>
              <div className="flex flex-wrap gap-3">
                {graphicSkills.map((skill, index) => (
                  <SkillTag key={index} index={index} delay={1.6}>
                    {skill}
                  </SkillTag>
                ))}
              </div>
            </div>
            
            {/* Frontend Technology Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg lg:text-xl font-bold text-primary mb-4 text-left">Frontend Technology</h3>
                              <div className="flex flex-wrap gap-3">
                  {frontendSkills.map((skill, index) => (
                    <SkillTag key={index} index={index} delay={2.2}>
                      {skill}
                    </SkillTag>
                  ))}
                </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 