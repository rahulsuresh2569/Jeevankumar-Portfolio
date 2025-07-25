import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import ProjectRoadmap from './ProjectRoadmap';
import { ParticleCard, GlobalSpotlight } from './MagicBento';
import Footer from './Footer';
import WaveAnimation from './WaveAnimation';
import useDynamicFavicon from '../hooks/useDynamicFavicon';

const FieldServiceManagement = () => {
  const designProcessRef = useRef(null);
  const glowColor = "252, 211, 77"; // Yellow glow to match the page theme (#FCD34D)
  
  // Initialize dynamic favicon functionality to match main page
  useDynamicFavicon();
  
  // Scroll to top when component mounts
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Additional scroll to top after a brief delay to override any smooth scrolling
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  // Project data from Projects.js
  const projectData = {
    tag: "Real Time Project",
    title: "Field Service Management Software",
    category: "B2B SaaS",
    type: "Product Design", 
    industry: "Utilities Industry",
    platform: "Web & Mobile Application"
  };

  // Image paths for the FSM assets - using optimized Cloudinary URLs for better performance
  const fsmImages = {
    main: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1600,h_1000,c_limit,dpr_auto,fl_progressive/v1753450577/Main_h6p0qu.png",
    overview: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1400,h_900,c_limit,dpr_auto,fl_progressive/v1753450578/Overview_bwncht.png", 
    problemSolution: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1600,h_1200,c_limit,dpr_auto,fl_progressive/v1753450578/Problem_Solution_jv0rsb.png",
    modules: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1600,h_1200,c_limit,dpr_auto,fl_progressive/v1753450577/Modules_mzmfj0.png",
    tabletDesign1: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1200,h_900,c_limit,dpr_auto,fl_progressive/v1753450579/UI_Design_Tablet_1_ee5ms2.png",
    tabletDesign2: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1200,h_900,c_limit,dpr_auto,fl_progressive/v1753450580/UI_Design_Tablet_2_swuqky.png", 
    tabletDesign3: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1200,h_900,c_limit,dpr_auto,fl_progressive/v1753450581/UI_Design_Tablet_3_ppaxty.png",
    iPhone1: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_400,h_800,c_limit,dpr_auto,fl_progressive/v1753450575/iPhone_1_vur2y2.png",
    iPhone2: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_400,h_800,c_limit,dpr_auto,fl_progressive/v1753450576/iPhone_2_j74tw7.png",
    iPhone3: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_400,h_800,c_limit,dpr_auto,fl_progressive/v1753450575/iPhone_3_ttfqjz.png",
    iPhone4: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_400,h_800,c_limit,dpr_auto,fl_progressive/v1753450576/iPhone_4_lvqila.png"
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
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top section with title and tags */}
          <div className="flex flex-col lg:flex-row pt-20 lg:justify-between lg:pt-20 lg:items-center mb-8">
            {/* Left side - Project Info */}
            <div className="lg:flex-1 lg:max-w-2xl mb-8 lg:mb-0">
              {/* Back to projects link */}
              <div className="mb-6">
                <Link 
                  to="/#projects"
                  className="group inline-flex items-center gap-2 text-accent hover:text-secondary transition-colors duration-300"
                >
                  <svg 
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:-translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium">Back to Projects</span>
                </Link>
              </div>
              
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
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
            {/* Left side - Content */}
            <div className="lg:pr-8 xl:pr-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-8 lg:mb-10 text-left">
                <span className="text-yellow-400">Overview</span>
              </h2>
              <p className="text-base lg:text-lg xl:text-xl text-accent leading-relaxed lg:leading-8">
                This project focused on building a Field Service Management (FSM) system to streamline field operations for the client. It enables real-time tracking of service orders, employee progress, and resource usage. The platform includes modules for inventory, leave, customer management, and invoicing. Both web and mobile apps were designed for admins and employees to ensure smooth coordination and updates.
              </p>
            </div>
            
            {/* Right side - Overview Image */}
            <div className="order-first lg:order-last">
              <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
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
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
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
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
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
        <ProjectRoadmap 
          steps={roadmapSteps} 
          themeColor="#FCD34D" 
          textColor="text-black" 
          borderColor="border-yellow-400/50" 
        />
      </section>

      {/* Section 5: Design Process */}
      <section className="design-process-section py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-primary">
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
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-left">
            <span className="text-yellow-400">Modules &</span>
            <br />
            <span className="text-white">Sub Module</span>
          </h2>
          
          <div className="w-full rounded-lg overflow-hidden">
            <img 
              src={fsmImages.modules}
              alt="System Modules and Sub-modules Flowchart"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 7: UI Design */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-8 text-left">
            <span className="text-yellow-400">UI</span>{' '}
            <span className="text-white">Design</span>
          </h2>
          
          {/* Web Application for Admin Title */}
          <div className="mb-12">
            <h3 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-semibold text-accent text-left">
              Web Application
              <br />
              for Admin
            </h3>
          </div>
          
          {/* Tablet Mockups */}
          <div className="mb-16">
            
            {/* Desktop Layout - Zigzag Alignment */}
            <div className="hidden md:block">
              <div className="space-y-8 lg:space-y-10">
                
                {/* Tablet Design 1 - RIGHT ALIGNED */}
                <div className="flex justify-end">
                  <div className="w-96 lg:w-[500px] xl:w-[650px] 2xl:w-[750px]">
                    <img 
                      src={fsmImages.tabletDesign1}
                      alt="Tablet UI Design 1"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                
                {/* Tablet Design 2 - LEFT ALIGNED */}
                <div className="flex justify-start">
                  <div className="w-96 lg:w-[500px] xl:w-[650px] 2xl:w-[750px]">
                    <img 
                      src={fsmImages.tabletDesign2}
                      alt="Tablet UI Design 2"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                
                {/* Tablet Design 3 - RIGHT ALIGNED */}
                <div className="flex justify-end">
                  <div className="w-96 lg:w-[500px] xl:w-[650px] 2xl:w-[750px]">
                    <img 
                      src={fsmImages.tabletDesign3}
                      alt="Tablet UI Design 3"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Mobile Layout - Stacked Design */}
            <div className="block md:hidden space-y-10">
              <div className="w-full">
                <img 
                  src={fsmImages.tabletDesign1}
                  alt="Tablet UI Design 1"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="w-full">
                <img 
                  src={fsmImages.tabletDesign2}
                  alt="Tablet UI Design 2"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="w-full">
                <img 
                  src={fsmImages.tabletDesign3}
                  alt="Tablet UI Design 3"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
          
          {/* Mobile Application for Employee Title */}
          <div className="mb-12">
            <h3 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-semibold text-accent text-left">
              Mobile Application
              <br />
              for Employee
            </h3>
          </div>
          
          {/* iPhone Mockups */}
          <div>
            <div className="flex flex-wrap justify-center items-start gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              {/* iPhone 1 - Higher position */}
              <div className="rounded-lg overflow-hidden w-36 xs:w-40 sm:w-44 md:w-48 lg:w-52">
                <img 
                  src={fsmImages.iPhone1}
                  alt="iPhone UI Design 1"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* iPhone 2 - Lower position */}
              <div className="rounded-lg overflow-hidden w-36 xs:w-40 sm:w-44 md:w-48 lg:w-52 transform translate-y-4 sm:translate-y-6 md:translate-y-8 lg:translate-y-12">
                <img 
                  src={fsmImages.iPhone2}
                  alt="iPhone UI Design 2"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* iPhone 3 - Higher position */}
              <div className="rounded-lg overflow-hidden w-36 xs:w-40 sm:w-44 md:w-48 lg:w-52">
                <img 
                  src={fsmImages.iPhone3}
                  alt="iPhone UI Design 3"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* iPhone 4 - Lower position */}
              <div className="rounded-lg overflow-hidden w-36 xs:w-40 sm:w-44 md:w-48 lg:w-52 transform translate-y-4 sm:translate-y-6 md:translate-y-8 lg:translate-y-12">
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
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gray-800 border border-gray-600 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg">
            {/* Caution Icon - Top Right Corner */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg 
                  className="w-6 h-6 sm:w-7 sm:h-7 text-black font-bold" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="pr-16 sm:pr-20">
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed text-left">
                <span className="font-semibold text-white">Note :</span> Due to the project scope and confidentiality, only selected screens are shared here to highlight key UX decisions, improvements, and outcomes. The complete interface details can be discussed in a one-on-one call
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Thank You & Back to Projects */}
      <section className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Thank You Text with Underline Design */}
          <div className="text-center mb-16">
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-semibold text-white mb-8 tracking-tight leading-none">
              THANK YOU
            </h2>
            
            {/* Underline Design */}
            <div className="flex justify-center items-center gap-4 mb-12 w-fit mx-auto">
              {/* Long white line - matches actual text width */}
              <div className="h-1 bg-white w-[200px] sm:w-[280px] md:w-[380px] lg:w-[500px] xl:w-[620px]"></div>
              {/* Yellow accent line */}
              <div className="h-1 bg-yellow-400 w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32"></div>
            </div>
          </div>
          
          {/* Back to Projects Button */}
          <div className="text-center">
            <Link 
              to="/#projects"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-secondary/20 text-secondary/80 hover:border-secondary/40 hover:text-secondary rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Button content */}
              <span className="relative z-10 text-base font-semibold">Back to Projects</span>
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
            </Link>
          </div>
        </div>
      </section>
      
      {/* Additional spacing before wave animation */}
      <div className="h-24 md:h-32 lg:h-40"></div>
      </div>
      
      {/* Wave Animation before Footer */}
      <div className="relative">
        <WaveAnimation />
      </div>
      
      <Footer />
    </>
  );
};

export default FieldServiceManagement;
