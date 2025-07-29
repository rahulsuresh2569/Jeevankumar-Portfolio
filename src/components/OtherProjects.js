import React, { useRef } from 'react';
import { ParticleCard, GlobalSpotlight } from './MagicBento';
import CountUp from './CountUp';

const otherProjectsData = [
  {
    id: 1,
    title: "Active RFID Employee Tracking System",
    description: "The solution featured for real-time tracking of employee on plants, canteen access, feedback, task management, live map, and path map for enhanced monitoring and efficiency.",
  },
  {
    id: 2,
    title: "Field service Tracking App",
    description: "To meet the client's need for better employee oversight, I designed tracking applications that streamline Jobs, monitor work timelines (start/end times, total hours, employee location), and enable performance evaluation and maintain jobs accordingly",
  },
  {
    id: 3,
    title: "Employee Task Management Software",
    description: "Addressing the client's need to track employees' I designed employee task tracking apps to manage projects and tasks, monitor work progress (start/end times, total hours), and evaluate performance with ratings.",
  },
  {
    id: 4,
    title: "Human Resource Management Software",
    description: "Designed a dynamic attendance tracking, leave management, organizational oversight, and user-friendly web and mobile applications.",
  },
];

const OtherProjects = () => {
  const gridRef = useRef(null);
  const statsGridRef = useRef(null);
  const glowColor = "255, 255, 255"; // White glow to match the design theme

  // Project statistics data
  const projectStats = [
    {
      id: 1,
      title: "Mobile Applications",
      count: 6,
    },
    {
      id: 2,
      title: "Web Applications", 
      count: 10,
    },
    {
      id: 3,
      title: "Website Designs",
      count: 4,
    }
  ];

  return (
    <>
      <style>
        {`
          .other-projects-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: rgba(255, 255, 255, 0.1);
            --background-dark: #1f1f1f;
            --white: #ffffff;
          }
          
          .other-projects-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .stats-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          @media (min-width: 640px) {
            .other-projects-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .stats-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 1.5rem;
            }
          }
          
          @media (min-width: 1024px) {
            .other-projects-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 2rem;
            }
            
            .stats-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 2rem;
            }
          }
          
          .stats-card {
            background: var(--background-dark);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 1.5rem;
            min-height: 160px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            text-align: center;
          }
          
          @media (min-width: 640px) {
            .stats-card {
              padding: 2rem;
              min-height: 180px;
            }
          }
          
          @media (min-width: 1024px) {
            .stats-card {
              min-height: 200px;
            }
          }
          
          .stats-card::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.6)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.3)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .stats-card:hover::after {
            opacity: 1;
          }
          
          .stats-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
          }
          
          .other-project-card {
            background: var(--background-dark);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 2rem;
            min-height: 280px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .other-project-card::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.6)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.3)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .other-project-card:hover::after {
            opacity: 1;
          }
          
          .other-project-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
        `}
      </style>

      <section id="other-projects" className="other-projects-section bg-primary text-secondary py-20 px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Global Spotlight Effect */}
        <GlobalSpotlight
          gridRef={gridRef}
          enabled={true}
          spotlightRadius={300}
          glowColor={glowColor}
        />
        
        {/* Stats Section Spotlight Effect */}
        <GlobalSpotlight
          gridRef={statsGridRef}
          enabled={true}
          spotlightRadius={300}
          glowColor={glowColor}
        />

        <div className="w-full max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Other Important Projects
            </h2>
            <p className="text-lg sm:text-xl text-secondary/70 leading-relaxed max-w-3xl mx-auto">
              Additional solutions showcasing expertise in employee tracking, task management, and enterprise applications
            </p>
          </div>

          {/* Projects Grid */}
          <div ref={gridRef} className="other-projects-grid">
            {otherProjectsData.map((project, index) => (
              <ParticleCard
                key={project.id}
                className="other-project-card card"
                disableAnimations={false}
                particleCount={8}
                glowColor={glowColor}
                enableTilt={true}
                clickEffect={true}
                enableMagnetism={true}
              >
                <div className="relative z-10 h-full flex flex-col justify-center">
                  {/* Project Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-secondary leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-secondary/80 leading-relaxed text-base">
                      {project.description}
                    </p>
                  </div>
                </div>
              </ParticleCard>
            ))}
          </div>

          {/* Overall Projects Done Section */}
          <div className="mt-16 sm:mt-20">
            {/* Stats Section Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 px-4">
                Overall Projects Done
              </h3>
            </div>

            {/* Stats Grid */}
            <div ref={statsGridRef} className="stats-grid">
              {projectStats.map((stat, index) => (
                <ParticleCard
                  key={stat.id}
                  className="stats-card card"
                  disableAnimations={false}
                  particleCount={6}
                  glowColor={glowColor}
                  enableTilt={true}
                  clickEffect={true}
                  enableMagnetism={true}
                >
                  <div className="relative z-10 h-full flex flex-col justify-center items-center">
                    {/* Count Display */}
                    <div className="mb-3 sm:mb-4">
                      <CountUp
                        from={0}
                        to={stat.count}
                        direction="up"
                        duration={2}
                        delay={0.5}
                        className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary"
                      />
                    </div>
                    
                    {/* Project Type */}
                    <h4 className="text-base sm:text-lg md:text-xl font-medium text-secondary/80 leading-tight text-center px-2">
                      {stat.title}
                    </h4>
                  </div>
                </ParticleCard>
              ))}
            </div>

            {/* For Mock Projects Button */}
            <div className="text-center mt-20">
              <button 
                onClick={() => window.open('https://www.behance.net/jeevankumar352', '_blank', 'noopener,noreferrer')}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-secondary/20 text-secondary/80 hover:border-secondary/40 hover:text-secondary rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button content */}
                <span className="relative z-10 text-base font-semibold">For Mock Projects</span>
                <svg 
                  className="relative z-10 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out"></div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OtherProjects;
