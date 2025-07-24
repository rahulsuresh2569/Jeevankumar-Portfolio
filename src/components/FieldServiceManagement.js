import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import ProjectRoadmap from './ProjectRoadmap';
import { ParticleCard, GlobalSpotlight } from './MagicBento';
import useDynamicFavicon from '../hooks/useDynamicFavicon';

const FieldServiceManagement = () => {
  const designProcessRef = useRef(null);
  const glowColor = "255, 255, 255"; // White glow to match the design theme
  
  // Initialize dynamic favicon functionality to match main page
  useDynamicFavicon();
  
  // Project data from Projects.js
  const projectData = {
    tag: "Real Time Project",
    title: "Field Service Management Software",
    category: "B2B SaaS",
    type: "Product Design", 
    industry: "Utilities Industry",
    platform: "Web & Mobile Application"
  };

  // Image paths for the FSM assets - using public folder for reliable access
  const fsmImages = {
    main: "/images/fsm/Main.png",
    overview: "/images/fsm/Overview.png", 
    problemSolution: "/images/fsm/Problem_Solution.png",
    modules: "/images/fsm/Modules.png",
    tabletDesign1: "/images/fsm/UI_Design_Tablet_1.png",
    tabletDesign2: "/images/fsm/UI_Design_Tablet_2.png", 
    tabletDesign3: "/images/fsm/UI_Design_Tablet_3.png",
    iPhone1: "/images/fsm/iPhone_1.png",
    iPhone2: "/images/fsm/iPhone_2.png",
    iPhone3: "/images/fsm/iPhone_3.png",
    iPhone4: "/images/fsm/iPhone_4.png"
  };

  // Roadmap steps data
  const roadmapSteps = [
    {
      description: "First, Our team had a call with the client to understand their pain points."
    },
    {
      description: "Collected the key requirements and needed functionalities."
    },
    {
      description: "Conducted a competitor analysis of relevant products. And analyzed feedback from various clients who struggled with tracking and assigning field jobs."
    },
    {
      description: "Noted down features that could be suitable for solving the client's problems."
    },
    {
      description: "We Start Creating User Flow, particularly the two-step job assignment model from inspection to execution, based on job complexity."
    },
    {
      description: "After Client satisfied with the flow we start designing screens and created prototype."
    },
    {
      description: "Created the complete UI for the admin web portal and employee mobile portal, including job assignment, inventory integration, attendance tracking, reimbursements, and leave management."
    },
    {
      description: "After completing the screen designs and setting up the prototype, we shared it with the client to check usability."
    },
    {
      description: "Based on client feedback, made necessary iterations and finalized the design."
    },
    {
      description: "Handed over a well-structured, user-friendly design that met all the client's requirements."
    }
  ];

  // Design process data
  const designProcessSteps = [
    {
      title: "Empathize",
      points: [
        "User Research",
        "Competitive Research"
      ]
    },
    {
      title: "Define",
      points: [
        "Empathy Mapping",
        "Documenting all the Requirements"
      ]
    },
    {
      title: "Ideate",
      points: [
        "Scope Document",
        "User Flow"
      ]
    },
    {
      title: "Prototyping",
      points: [
        "Sketch",
        "Wireframes",
        "Prototype"
      ]
    },
    {
      title: "Testing",
      points: [
        "Feedback",
        "Corrections"
      ]
    }
  ];

  return (
    <>
      <style>
        {`
          .design-process-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: rgba(255, 255, 255, 0.1);
            --background-dark: #1f1f1f;
            --white: #ffffff;
          }
          
          .design-process-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 1.5rem;
          }
          
          @media (min-width: 640px) {
            .design-process-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1.5rem;
            }
          }
          
          @media (min-width: 768px) {
            .design-process-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 2rem;
            }
          }
          
          @media (min-width: 1024px) {
            .design-process-grid {
              grid-template-columns: repeat(5, 1fr);
              gap: 1.5rem;
            }
          }
          
          .design-process-card {
            background: var(--background-dark);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 1.5rem;
            height: 180px;
            width: 100%;
            aspect-ratio: 1;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          
          @media (min-width: 640px) {
            .design-process-card {
              height: 220px;
              padding: 2rem;
            }
          }
          
          @media (min-width: 768px) {
            .design-process-card {
              height: 200px;
            }
          }
          
          @media (min-width: 1024px) {
            .design-process-card {
              height: 240px;
            }
          }
          
          .design-process-card::after {
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
          
          .design-process-card:hover::after {
            opacity: 1;
          }
          
          .design-process-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
          }
        `}
      </style>

      <div className="min-h-screen bg-primary">
      <Navbar isProjectPage={true} />
      
      {/* Section 1: Project Header with Main Image */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top section with title and tags */}
          <div className="flex flex-col lg:flex-row pt-20 lg:justify-between lg:pt-32 lg:items-start mb-8">
            {/* Left side - Project Info */}
            <div className="lg:flex-1 lg:max-w-2xl mb-8 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary leading-tight mb-4">
                {projectData.title}
              </h1>
              
              <div className="mb-6">
                <span className="inline-block text-sm font-medium text-blue-400">
                  {projectData.tag}
                </span>
              </div>
            </div>
            
            {/* Right side - Project Tags */}
            <div className="lg:flex-shrink-0 lg:ml-8">
              <div className="flex flex-col gap-3 lg:items-end">
                {/* Mobile: Single column layout, Desktop: Multi-row layout */}
                <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:gap-3">
                  {/* First row - two tags */}
                  <div className="flex flex-col sm:flex-row gap-3 lg:flex-row">
                    <span className="inline-block px-4 py-2 bg-tertiary text-accent text-sm font-medium rounded-full border border-gray-600 text-center">
                      {projectData.industry}
                    </span>
                    <span className="inline-block px-4 py-2 bg-tertiary text-accent text-sm font-medium rounded-full border border-gray-600 text-center">
                      {projectData.category}
                    </span>
                  </div>
                  
                  {/* Second row - one tag */}
                  <div className="flex justify-start lg:justify-end">
                    <span className="inline-block px-4 py-2 bg-tertiary text-accent text-sm font-medium rounded-full border border-gray-600 text-center w-full sm:w-auto">
                      {projectData.platform}
                    </span>
                  </div>
                  
                  {/* Third row - one tag */}
                  <div className="flex justify-start lg:justify-end">
                    <span className="inline-block px-4 py-2 bg-tertiary text-accent text-sm font-medium rounded-full border border-gray-600 text-center w-full sm:w-auto">
                      {projectData.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* White separator line */}
          <div className="w-full h-px bg-secondary mb-12"></div>
          
          {/* Main Project Image - Full Width */}
          <div className="w-full">
            <div className="w-full h-96 lg:h-[500px] xl:h-[600px] rounded-lg overflow-hidden">
              <img 
                src={fsmImages.main}
                alt="Field Service Management Software Main View"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-accent">Image not available</div>';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="pr-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-8 text-left">
                <span className="text-yellow-400">Overview</span>
              </h2>
              <p className="text-base lg:text-lg text-accent leading-relaxed">
                This project focused on building a Field Service Management (FSM) system to streamline field operations for the client. It enables real-time tracking of service orders, employee progress, and resource usage. The platform includes modules for inventory, leave, customer management, and invoicing. Both web and mobile apps were designed for admins and employees to ensure smooth coordination and updates.
              </p>
            </div>
            
            {/* Right side - Overview Image */}
            <div>
              <div className="w-full rounded-2xl overflow-hidden">
                <img 
                  src={fsmImages.overview}
                  alt="Field Service Management Overview"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Problem & Solution */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="w-full rounded-lg overflow-hidden">
            <img 
              src={fsmImages.problemSolution}
              alt="Problem and Solution Analysis"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 4: My Journey in This Project */}
      <section className="py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-left">
              <span className="text-yellow-400">My Journey in</span>
              <br />
              <span className="text-white">this Project</span>
            </h2>
          </div>
        </div>
        
        {/* Roadmap Component */}
        <ProjectRoadmap steps={roadmapSteps} />
      </section>

      {/* Section 5: Design Process */}
      <section className="design-process-section py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        {/* Global Spotlight Effect */}
        <GlobalSpotlight
          gridRef={designProcessRef}
          enabled={true}
          spotlightRadius={300}
          glowColor={glowColor}
        />
        
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16 text-left">
            <span className="text-yellow-400">Design</span>{' '}
            <span className="text-white">Process</span>
          </h2>
          
          {/* Design Process Cards */}
          <div ref={designProcessRef} className="design-process-grid">
            {designProcessSteps.map((step, index) => (
              <ParticleCard
                key={index}
                className="design-process-card card"
                disableAnimations={false}
                particleCount={6}
                glowColor={glowColor}
                enableTilt={true}
                clickEffect={true}
                enableMagnetism={true}
              >
                <div className="relative z-10 h-full flex flex-col justify-center items-center">
                  <h3 className="text-xl sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">
                    {step.title}
                  </h3>
                  <ul className="space-y-1 sm:space-y-2">
                    {step.points.map((point, pointIndex) => (
                      <li 
                        key={pointIndex}
                        className="text-gray-300 text-sm sm:text-sm leading-relaxed text-center"
                      >
                        • {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </ParticleCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Modules & Sub-modules */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-left">
            <span className="text-yellow-400">Modules &</span>
            <br />
            <span className="text-white">Sub Module</span>
          </h2>
          
          <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <img 
              src={fsmImages.modules}
              alt="System Modules and Sub-modules Flowchart"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 7: UI Design */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-12 text-left">
            <span className="text-yellow-400">UI</span>{' '}
            <span className="text-white">Design</span>
          </h2>
          
          {/* Tablet Mockups */}
          <div className="mb-16">
            <h3 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-semibold text-accent mb-8 text-center">
              Tablet Interface
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={fsmImages.tabletDesign1}
                  alt="Tablet UI Design 1"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={fsmImages.tabletDesign2}
                  alt="Tablet UI Design 2"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={fsmImages.tabletDesign3}
                  alt="Tablet UI Design 3"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* iPhone Mockups */}
          <div>
            <h3 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-semibold text-accent mb-8 text-center">
              Mobile Interface
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              <div className="rounded-lg overflow-hidden max-w-xs">
                <img 
                  src={fsmImages.iPhone1}
                  alt="iPhone UI Design 1"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden max-w-xs">
                <img 
                  src={fsmImages.iPhone2}
                  alt="iPhone UI Design 2"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden max-w-xs">
                <img 
                  src={fsmImages.iPhone3}
                  alt="iPhone UI Design 3"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden max-w-xs">
                <img 
                  src={fsmImages.iPhone4}
                  alt="iPhone UI Design 4"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Project Summary Card */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-tertiary rounded-xl p-8 shadow-lg text-center">
            <p className="text-lg text-accent leading-relaxed">
              [Project summary and key takeaways will be added here]
            </p>
          </div>
        </div>
      </section>

      {/* Section 9: Thank You & Back to Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-secondary mb-12 text-center">
            <span className="text-yellow-400">Thank</span>{' '}
            <span className="text-white">You</span>
          </h2>
          
          <Link 
            to="/"
            className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span>Back to Projects</span>
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
      </div>
    </>
  );
};

export default FieldServiceManagement;
