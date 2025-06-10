import React from 'react';

const Experience = () => {
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

  return (
    <section id="experience" className="min-h-screen bg-secondary text-primary py-20 px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-16">Experience & Skills</h2>
        
        {/* Top Section - Experience Block */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Side - Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-primary leading-tight">
                  {experienceData.company}
                </h3>
                <p className="text-lg text-primary/80 mt-2">{experienceData.position}</p>
              </div>
              
              {/* Timeline */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <div className="w-24 lg:w-32 h-0.5 bg-gray-300 mx-2"></div>
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-primary/70 -mt-2">
                <span>{experienceData.period.split(' - ')[0]}</span>
                <span>{experienceData.period.split(' - ')[1]}</span>
              </div>
            </div>
            
            {/* Right Side - Experience Description */}
            <div className="space-y-4">
              {experienceData.descriptions.map((desc, index) => (
                <p key={index} className="text-primary/80 leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Grid Section - Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Strategic Product Design Skills (Tall Card) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl lg:text-2xl font-bold text-primary mb-6">Strategic Product Design Skills</h3>
            <div className="flex flex-wrap gap-3">
              {strategicSkills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-primary rounded-full text-sm border border-gray-200 hover:bg-gray-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Right Column - Three Stacked Cards */}
          <div className="space-y-8">
            
            {/* Tool Proficiency Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg lg:text-xl font-bold text-primary mb-4">Tool Proficiency</h3>
              <div className="flex flex-wrap gap-3">
                {toolProficiency.map((tool, index) => (
                  <span 
                    key={index}
                    className="px-3 py-2 bg-gray-100 text-primary rounded-full text-sm border border-gray-200 hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <span>{tool.icon}</span>
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Graphic Designing Skills Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg lg:text-xl font-bold text-primary mb-4">Graphic Designing Skills</h3>
              <div className="flex flex-wrap gap-3">
                {graphicSkills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-2 bg-gray-100 text-primary rounded-full text-sm border border-gray-200 hover:bg-gray-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Frontend Technology Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg lg:text-xl font-bold text-primary mb-4">Frontend Technology</h3>
              <div className="flex flex-wrap gap-3">
                {frontendSkills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-2 bg-gray-100 text-primary rounded-full text-sm border border-gray-200 hover:bg-gray-200 transition-colors"
                  >
                    {skill}
                  </span>
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