import React from 'react';

const ProjectRoadmap = ({ steps }) => {
  // Define the grid positioning logic for the snaking pattern
  const getStepPosition = (stepNumber) => {
    const positions = {
      1: { gridColumn: '1 / span 3', side: 'left', height: 'min-h-24', markerColumn: '1' },
      2: { gridColumn: '5 / span 3', side: 'left', height: 'min-h-20', markerColumn: '5' },
      3: { gridColumn: '9 / span 3', side: 'left', height: 'min-h-20', markerColumn: '9' },
      4: { gridColumn: '12 / span 3', side: 'right', height: 'min-h-20', markerColumn: '12' },
      5: { gridColumn: '8 / span 3', side: 'right', height: 'min-h-16', markerColumn: '8' },
      6: { gridColumn: '4 / span 3', side: 'right', height: 'min-h-16', markerColumn: '4' },
      7: { gridColumn: '1 / span 3', side: 'left', height: 'min-h-16', markerColumn: '1' },
      8: { gridColumn: '5 / span 3', side: 'left', height: 'min-h-16', markerColumn: '5' },
      9: { gridColumn: '9 / span 3', side: 'left', height: 'min-h-14', markerColumn: '9' },
      10: { gridColumn: '12 / span 3', side: 'left', height: 'min-h-14', markerColumn: '12' }
    };
    return positions[stepNumber] || { gridColumn: '8 / span 3', side: 'left', height: 'min-h-16', markerColumn: '8' };
  };

  return (
    <div className="relative">
      {/* Desktop Version - Hidden on mobile */}
      <section className="hidden md:block py-16 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Grid - 15 vertical dashed lines */}
        <div className="absolute inset-0 opacity-40">
          <div 
            className="h-full w-full grid gap-0"
            style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}
          >
            {[...Array(15)].map((_, i) => (
              <div key={i} className="border-r border-dashed border-white/60 h-full"></div>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Calculate total height needed for the roadmap */}
          <div 
            className="relative"
            style={{ height: `${(steps.length * 120) + 120}px` }}
          >
            {/* Central Spine for Markers */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-px bg-transparent z-10 h-full">
              {/* Roadmap Grid Container */}
              <div className="relative h-full">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const position = getStepPosition(stepNumber);
                  const markerTop = `${(index * 120) + 60}px`; // Spacing between markers
                  
                  return (
                    <div key={stepNumber} className="absolute w-full" style={{ top: markerTop }}>
                      {/* Connecting Line and Card Container */}
                      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-screen max-w-7xl">
                        <div 
                          className="relative w-full grid gap-2"
                          style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}
                        >
                          {/* Step Marker positioned on grid line */}
                          <div 
                            className="relative"
                            style={{ gridColumn: position.markerColumn }}
                          >
                            <div className="absolute -top-12 left-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-black text-lg z-30">
                              {stepNumber}
                            </div>
                          </div>
                          
                          {/* Content Card */}
                          <div 
                            className="relative"
                            style={{ gridColumn: position.gridColumn }}
                          >
                            <div className={`roadmap-card bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 ${position.height} min-h-16 flex items-center relative shadow-lg border border-gray-700/50`}>
                              <p className="text-white text-xs lg:text-sm leading-relaxed relative z-20">
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
        </div>
      </section>

      {/* Mobile Version - Visible only on mobile */}
      <section className="block md:hidden py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              
              return (
                <div key={stepNumber} className="relative">
                  {/* Mobile Step Marker and Card */}
                  <div className="flex flex-col items-start space-y-3">
                    {/* Step Number */}
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-black text-base z-20">
                      {stepNumber}
                    </div>
                    
                    {/* Content Card */}
                    <div className="w-full bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700/50">
                      <p className="text-white text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Connecting Line to Next Step */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-5 top-10 w-px h-8 bg-yellow-400/30 z-10"></div>
                  )}
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
