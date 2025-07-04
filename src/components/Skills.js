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
            className={`block ${hasIcon ? 'px-3 py-3' : 'px-4 py-3'} text-sm font-medium text-secondary rounded-full ${hasIcon ? 'flex items-center gap-2' : ''} relative z-5`}
            style={{
              background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.3)'
            }}
          >
            {children}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="min-h-screen bg-primary text-secondary py-20 px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-16">Skills</h2>
        
        {/* Skills Grid Section */}
        <div ref={skillsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Strategic Product Design Skills (Tall Card) */}
          <div className="bg-tertiary rounded-2xl p-8 shadow-sm border border-gray-600">
            <h3 className="text-xl lg:text-2xl font-bold text-secondary mb-6 text-left">Strategic Product Design Skills</h3>
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
            <div className="bg-tertiary rounded-2xl p-6 shadow-sm border border-gray-600">
              <h3 className="text-lg lg:text-xl font-bold text-secondary mb-4 text-left">Tool Proficiency</h3>
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
            <div className="bg-tertiary rounded-2xl p-6 shadow-sm border border-gray-600">
              <h3 className="text-lg lg:text-xl font-bold text-secondary mb-4 text-left">Graphic Designing Skills</h3>
              <div className="flex flex-wrap gap-3">
                {graphicSkills.map((skill, index) => (
                  <SkillTag key={index} index={index} delay={1.6}>
                    {skill}
                  </SkillTag>
                ))}
              </div>
            </div>
            
            {/* Frontend Technology Card */}
            <div className="bg-tertiary rounded-2xl p-6 shadow-sm border border-gray-600">
              <h3 className="text-lg lg:text-xl font-bold text-secondary mb-4 text-left">Frontend Technology</h3>
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

export default Skills; 