import React from 'react';

const ProjectRoadmap = ({ steps, themeColor = '#FACC13', textColor = 'text-black', borderColor = 'border-yellow-400/50' }) => {
  // Define a more organized grid positioning logic
  const getStepPosition = (stepNumber) => {
    // Create a snaking pattern with consistent spacing
    // Grid has 12 columns for better organization
    const positions = {
      1: { gridColumn: '1 / span 3', side: 'left', markerColumn: '1' },
      2: { gridColumn: '4 / span 3', side: 'left', markerColumn: '4' },
      3: { gridColumn: '7 / span 3', side: 'left', markerColumn: '7' },
      4: { gridColumn: '10 / span 3', side: 'right', markerColumn: '10' },
      5: { gridColumn: '7 / span 3', side: 'right', markerColumn: '7' },
      6: { gridColumn: '4 / span 3', side: 'right', markerColumn: '4' },
      7: { gridColumn: '1 / span 3', side: 'left', markerColumn: '1' },
      8: { gridColumn: '4 / span 3', side: 'left', markerColumn: '4' },
      9: { gridColumn: '7 / span 3', side: 'left', markerColumn: '7' },
      10: { gridColumn: '10 / span 3', side: 'right', markerColumn: '10' }
    };
    return positions[stepNumber] || { gridColumn: '7 / span 3', side: 'left', markerColumn: '7' };
  };

  return (
    <div className="relative">
      {/* Desktop Version - Hidden on mobile */}
      <section className="hidden md:block py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Grid - Perfectly aligned with existing 12-column system */}
        <div className="absolute inset-0 opacity-40">
          <div className="h-full w-full mx-auto max-w-7xl">
            <div 
              className="h-full w-full grid gap-2"
              style={{ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}
            >
              {[...Array(12)].map((_, i) => {
                // Highlight main positioning columns (1, 4, 7, 10) where cards are placed
                const isMainColumn = [0, 3, 6, 9].includes(i);
                return (
                  <div 
                    key={i} 
                    className={`border-l border-dashed h-full ${
                      isMainColumn 
                        ? borderColor 
                        : 'border-white/30'
                    }`}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Calculate total height needed for the roadmap */}
          <div 
            className="relative"
            style={{ height: `${(steps.length * 140) + 100}px` }}
          >
            {/* Roadmap Grid Container */}
            <div className="relative h-full w-full">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const position = getStepPosition(stepNumber);
                const stepTop = `${(index * 140) + 70}px`; // Consistent spacing between steps
                
                return (
                  <div key={stepNumber} className="absolute w-full" style={{ top: stepTop }}>
                    {/* Main Grid Container */}
                    <div className="w-full" style={{ marginLeft: '-15px' }}>
                      <div 
                        className="relative w-full grid gap-2"
                        style={{ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}
                      >
                        {/* Step Marker positioned on grid line */}
                        <div 
                          className="relative flex justify-start"
                          style={{ gridColumn: position.markerColumn }}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg z-30 shadow-lg ${themeColor === '#FCC81E' ? 'text-black' : textColor}`} style={{backgroundColor: themeColor}}>
                            {stepNumber}
                          </div>
                        </div>
                        
                        {/* Content Card */}
                        <div 
                          className="relative"
                          style={{ gridColumn: position.gridColumn }}
                        >
                          <div className={`roadmap-card bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 min-h-16 flex items-center relative shadow-lg border border-gray-700/50 hover:bg-gray-700/90 transition-colors duration-300`}>
                            <p className="text-white text-base lg:text-lg leading-relaxed relative z-20">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Version - Visible only on mobile */}
      <section className="block md:hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="relative space-y-8">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              
              return (
                <div key={stepNumber} className="relative">
                  {/* Mobile Step Marker and Card */}
                  <div className="flex items-start space-x-4">
                    {/* Step Number with Connecting Line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base z-20 shadow-lg ${themeColor === '#FCC81E' ? 'text-black' : textColor}`} style={{backgroundColor: themeColor}}>
                        {stepNumber}
                      </div>
                      
                      {/* Connecting Line to Next Step */}
                      {index < steps.length - 1 && (
                        <div className="w-px h-8 mt-2" style={{background: `linear-gradient(to bottom, ${themeColor}, ${themeColor}30)`}}></div>
                      )}
                    </div>
                    
                    {/* Content Card */}
                    <div className="flex-1 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700/50 hover:bg-gray-700/90 transition-colors duration-300">
                      <p className="text-white text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectRoadmap;
