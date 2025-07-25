import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Skills = () => {
  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, threshold: 0.2 });

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
    { name: 'Figma', icon: 'https://res.cloudinary.com/dcua87ney/image/upload/v1753450725/figma_k2xz1o.svg' },
    { name: 'Adobe XD', icon: 'https://res.cloudinary.com/dcua87ney/image/upload/v1753450723/adobe_xd_nmdv4w.svg' },
    { name: 'Figjam', icon: 'https://res.cloudinary.com/dcua87ney/image/upload/v1753450724/figjam_ltjlor.svg' },
    { name: 'Prottapp', icon: 'https://res.cloudinary.com/dcua87ney/image/upload/v1753450726/prottapp_baolgh.svg' },
    { name: 'Photoshop', icon: 'https://res.cloudinary.com/dcua87ney/image/upload/v1753450722/adobe_photoshop_qtr7kr.svg' },
    { name: 'Illustrator', icon: 'https://res.cloudinary.com/dcua87ney/image/upload/v1753450721/adobe_illustrator_n19zml.svg' }
  ];

  const graphicSkills = [
    'Social Media Posters',
    'Logos Designs',
    'Cover page',
    'Business Cards',
    'Banner Designs'
  ];

  const softSkills = [
    'Communication',
    'Team Worker',
    'Empathetic',
    'Discipline'
  ];

  const frontendSkills = [
    'HTML5',
    'CSS (Basic)'
  ];

  // Enhanced SkillTag component with intense shine animation on the card content
  const SkillTag = ({ children, index, delay = 0, hasIcon = false, icon = null }) => {
    return (
      <div
        className="rounded-full p-[1px] transition-all duration-200 hover:shadow-md mb-2 sm:mb-3"
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
              background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.1) 35%, rgba(255, 255, 255, 0.2) 45%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.2) 55%, rgba(255, 255, 255, 0.1) 65%, transparent 80%)',
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
          
          <span 
            className={`block ${hasIcon ? 'px-2 py-2 sm:px-3 sm:py-3' : 'px-2.5 py-2 sm:px-4 sm:py-3'} text-xs sm:text-sm font-medium text-secondary rounded-full ${hasIcon ? 'flex items-center gap-1 sm:gap-2' : ''} relative z-5`}
            style={{
              background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.3)'
            }}
          >
            {hasIcon && icon && (
              <img 
                src={icon} 
                alt={`${children} icon`} 
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain" 
              />
            )}
            {children}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="min-h-screen bg-primary text-secondary pb-14 px-3 sm:py-16 sm:px-5 md:py-20 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-16">Skills</h2>
        
        {/* Skills Grid Section */}
        <div ref={skillsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 lg:items-stretch">
          
          {/* Left Column - Two Stacked Cards */}
          <div className="flex flex-col gap-5 sm:gap-8 h-full">
            
            {/* Strategic Product Design Skills Card */}
            <div className="bg-tertiary rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-600 flex-1">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-secondary mb-4 sm:mb-6 text-left">Strategic Product Design Skills</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {strategicSkills.map((skill, index) => (
                <SkillTag key={index} index={index} delay={0}>
                  {skill}
                </SkillTag>
              ))}
            </div>
            </div>

            {/* Soft Skills Card */}
            <div className="bg-tertiary rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-600 flex-1">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-secondary mb-4 sm:mb-6 text-left">Soft Skill</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {softSkills.map((skill, index) => (
                  <SkillTag key={index} index={index} delay={0.8}>
                    {skill}
                  </SkillTag>
                ))}
              </div>
            </div>
            
          </div>
          
          {/* Right Column - Three Stacked Cards */}
          <div className="flex flex-col gap-5 sm:gap-8 h-full">
            
            {/* Tool Proficiency Card */}
            <div className="bg-tertiary rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-sm border border-gray-600">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-secondary mb-3 sm:mb-4 text-left">Tool Proficiency</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {toolProficiency.map((tool, index) => (
                  <SkillTag key={index} index={index} delay={1.0} hasIcon icon={tool.icon}>
                    {tool.name}
                  </SkillTag>
                ))}
              </div>
            </div>
            
            {/* Graphic Designing Skills Card */}
            <div className="bg-tertiary rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-sm border border-gray-600">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-secondary mb-3 sm:mb-4 text-left">Graphic Designing Skills</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {graphicSkills.map((skill, index) => (
                  <SkillTag key={index} index={index} delay={1.6}>
                    {skill}
                  </SkillTag>
                ))}
              </div>
            </div>
            
            {/* Frontend Technology Card */}
            <div className="bg-tertiary rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-sm border border-gray-600">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-secondary mb-3 sm:mb-4 text-left">Frontend Technology</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
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

export default Skills; 