import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import ProjectRoadmap from './ProjectRoadmap';
import { ParticleCard, GlobalSpotlight } from './MagicBento';
import Footer from './Footer';
import WaveAnimation from './WaveAnimation';
import useDynamicFavicon from '../hooks/useDynamicFavicon';

const InventoryManagement = () => {
  const designProcessRef = useRef(null);
  const glowColor = "113, 97, 239"; // Purple glow to match the design theme (#7161EF)
  
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
  
  // Project data
  const projectData = {
    tag: "Real Time Project",
    title: "Inventory Management Software",
    category: "B2B SaaS",
    type: "Product Design", 
    industry: "Manufacturing Industry",
    platform: "Web Application"
  };

  // Image paths for the Inventory assets - using optimized Cloudinary URLs for better performance
  const inventoryImages = {
    main: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1600,h_1000,c_limit,dpr_auto,fl_progressive/v1753450662/Main_ccgupl.png",
    overview: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1400,h_900,c_limit,dpr_auto,fl_progressive/v1753450664/Overview_r6isj1.png", 
    modules: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1600,h_1200,c_limit,dpr_auto,fl_progressive/v1753450663/Modules_nlcwo0.png",
    tabletDesign1: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1200,h_900,c_limit,dpr_auto,fl_progressive/v1753450665/UI_Design_Tablet-1_xgrkeo.png",
    tabletDesign2: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1200,h_900,c_limit,dpr_auto,fl_progressive/v1753450666/UI_Design_Tablet-2_jvu3vy.png", 
    tabletDesign3: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1200,h_900,c_limit,dpr_auto,fl_progressive/v1753450667/UI_Design_Tablet-3_qwcsm1.png",
    tabletDesign4: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1200,h_900,c_limit,dpr_auto,fl_progressive/v1753450668/UI_Design_Tablet-4_lefdk4.png"
  };

  // Roadmap steps data
  const roadmapSteps = [
    {
      description: "First, Our team had a call with the client to understand their pain points."
    },
    {
      description: "Identified key missing functionalities such as order tracking, manufacturing process management, raw material lot tracking, cash flow management, and FG dispatch tracking."
    },
    {
      description: "Conducted a competitor analysis of relevant products. And analyzed recurring requirements and need. Noted down features that could be suitable for solving the client's problems."
    },
    {
      description: "Created a user flow and discussed it with the client.After several discussions and iterations, we finalized the flow and began Ul design using a design system based on the company's color code."
    },
    {
      description: "Started designing the screens and created a prototype."
    },
    {
      description: "After completing the screen designs and setting up the prototype, we shared it with the client to check usability."
    },
    {
      description: "Based on client feedback, made necessary iterations and finalized the design"
    },
    {
      description: "Delivered a clean, intuitive design that made the system easy to use and met all the client's requirements."
    },
    {
      description: "Made sure the new solution fit naturally into their daily operations, solving past frustrations without disrupting their existing flow."
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
            --border-color: rgba(113, 97, 239, 0.1);
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
            box-shadow: 0 8px 32px rgba(113, 97, 239, 0.1);
          }
        `}
      </style>

      <div className="min-h-screen bg-primary">
      <Navbar isProjectPage={true} />
      
      {/* Section 1: Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row pt-20 lg:justify-between lg:pt-20 lg:items-center mb-8">
            {/* Left side - Project title and tags */}
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
            
            {/* Right side - Project info tags */}
            <div className="lg:flex-shrink-0 lg:ml-8">
              <div className="flex flex-col gap-3 lg:items-end">
                {/* First row - Industry and Category */}
                <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:gap-3">
                  {/* Industry and Category side by side on mobile/tablet, stacked on desktop */}
                  <div className="flex flex-col sm:flex-row gap-3 lg:flex-row">
                    <span className="inline-block px-4 py-2 bg-tertiary text-accent text-sm font-medium rounded-full border border-gray-600 text-center">
                      {projectData.type}
                    </span>
                    <span className="inline-block px-4 py-2 bg-tertiary text-accent text-sm font-medium rounded-full border border-gray-600 text-center">
                      {projectData.category}
                    </span>
                  </div>
                  
                  {/* Platform */}
                  <div className="flex justify-start lg:justify-end">
                    <span className="inline-block px-4 py-2 bg-tertiary text-accent text-sm font-medium rounded-full border border-gray-600 text-center w-full sm:w-auto">
                      {projectData.platform}
                    </span>
                  </div>
                  
                  {/* Type */}
                  <div className="flex justify-start lg:justify-end">
                    <span className="inline-block px-4 py-2 bg-tertiary text-accent text-sm font-medium rounded-full border border-gray-600 text-center w-full sm:w-auto">
                      {projectData.industry}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Separator */}
          <div className="w-full h-px bg-secondary mb-12"></div>
          
          {/* Main Project Image */}
          <div className="w-full">
            <div className="w-full h-96 lg:h-[500px] xl:h-[600px] rounded-lg overflow-hidden">
              <img 
                src={inventoryImages.main}
                alt="Inventory Management Software Main View"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Error loading main image:', e);
                  e.target.style.display = 'none';
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
            {/* Left side - Text content */}
            <div className="lg:pr-8 xl:pr-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-8 lg:mb-10 text-left">
                <span style={{color: '#7161EF'}}>Overview</span>
              </h2>
              <p className="text-base lg:text-lg xl:text-xl text-accent leading-relaxed lg:leading-8">
                We collaborated with a manufacturing industry client to redesign their outdated inventory system. Their existing tool only managed basic stock records and lacked features critical to their daily operations. Our goal was to build a more complete solution that would support their entire manufacturing and financial process. The result was a modern, user-friendly system that fit seamlessly into their existing workflow.
              </p>
            </div>
            
            {/* Right side - Overview image */}
            <div className="order-first lg:order-last">
              <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={inventoryImages.overview}
                  alt="Inventory Management Overview"
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
          <div className="space-y-16 lg:space-y-20">
            
            {/* Problem Section */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 lg:mb-12 text-left text-white">
                Problem
              </h2>
              
              <div className="space-y-6 lg:space-y-8">
                <p className="text-base sm:text-lg lg:text-xl text-accent leading-relaxed">
                  This product is designed for a Manufacturing industry-based client who is currently using an inventory management system that only maintains inventory records. However, the system lacks essential functionalities such as order tracking and manufacturing process management.
                </p>
                
                <p className="text-base sm:text-lg lg:text-xl text-accent leading-relaxed">
                  A critical challenge is the inability to track raw material lots used in specific products, which is crucial for quality control and auditing. Additionally, the client has requested the integration of a cash flow management module to efficiently handle financial transactions within the office.
                </p>
              </div>
            </div>
            
            {/* Solution Section */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 lg:mb-12 text-left text-white">
                Solution
              </h2>
              
              <div>
                <p className="text-base sm:text-lg lg:text-xl text-accent leading-relaxed">
                  We start designing a custom inventory management system with all the missing features: order tracking, manufacturing process management, raw material lot tracking, FG dispatch tracking, and an integrated cash flow module. The interface was designed to be intuitive and aligned with the client's workflow, ensuring easy adoption. The final product empowered them to manage production and finances more effectively, with full traceability and control.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Section 4: My Journey in this Project */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-left">
              <span style={{color: '#7161EF'}}>My Journey in</span>
              <br />
              <span className="text-white">this Project</span>
            </h2>
          </div>
        </div>
        
        {/* Roadmap Component */}
        <ProjectRoadmap 
          steps={roadmapSteps} 
          themeColor="#7161EF" 
          textColor="text-white" 
          borderColor="border-purple-400/50" 
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
            <span style={{color: '#7161EF'}}>Design</span>{' '}
            <span className="text-white">Process</span>
          </h2>
          
          {/* Design Process Grid */}
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

      {/* Section 6: Modules & Sub Module */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-left">
            <span style={{color: '#7161EF'}}>Modules &</span>
            <br />
            <span className="text-white">Sub Module</span>
          </h2>
          
          <div className="w-full rounded-lg overflow-hidden">
            <img 
              src={inventoryImages.modules}
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
            <span style={{color: '#7161EF'}}>UI</span>{' '}
            <span className="text-white">Design</span>
          </h2>
          
          {/* Web Application Section */}
          <div className="mb-12">
            <h3 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-semibold text-accent text-left">
              Web Application
            </h3>
          </div>
          
          {/* Tablet Mockups Section */}
          <div className="mb-16">
            
            {/* Desktop Layout - Zigzag Alignment */}
            <div className="hidden md:block">
              <div className="space-y-8 lg:space-y-10">
                
                {/* Tablet Design 1 - RIGHT ALIGNED */}
                <div className="flex justify-end">
                  <div className="w-96 lg:w-[500px] xl:w-[650px] 2xl:w-[750px]">
                    <img 
                      src={inventoryImages.tabletDesign1}
                      alt="Tablet UI Design 1"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                
                {/* Tablet Design 2 - LEFT ALIGNED */}
                <div className="flex justify-start">
                  <div className="w-96 lg:w-[500px] xl:w-[650px] 2xl:w-[750px]">
                    <img 
                      src={inventoryImages.tabletDesign2}
                      alt="Tablet UI Design 2"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                
                {/* Tablet Design 3 - RIGHT ALIGNED */}
                <div className="flex justify-end">
                  <div className="w-96 lg:w-[500px] xl:w-[650px] 2xl:w-[750px]">
                    <img 
                      src={inventoryImages.tabletDesign3}
                      alt="Tablet UI Design 3"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                
                {/* Tablet Design 4 - LEFT ALIGNED */}
                <div className="flex justify-start">
                  <div className="w-96 lg:w-[500px] xl:w-[650px] 2xl:w-[750px]">
                    <img 
                      src={inventoryImages.tabletDesign4}
                      alt="Tablet UI Design 4"
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
                  src={inventoryImages.tabletDesign1}
                  alt="Tablet UI Design 1"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="w-full">
                <img 
                  src={inventoryImages.tabletDesign2}
                  alt="Tablet UI Design 2"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="w-full">
                <img 
                  src={inventoryImages.tabletDesign3}
                  alt="Tablet UI Design 3"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="w-full">
                <img 
                  src={inventoryImages.tabletDesign4}
                  alt="Tablet UI Design 4"
                  className="w-full h-auto object-cover rounded-lg"
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#7161EF'}}>
                <svg 
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white font-bold" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
            </div>
            
            {/* Content with right margin for icon */}
            <div className="pr-16 sm:pr-20">
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed text-left">
                <span className="font-semibold text-white">Note :</span> Due to the project scope and confidentiality, only selected screens are shared here to highlight key UX decisions, improvements, and outcomes. The complete interface details can be discussed in a one-on-one call
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Thank You Section */}
      <section className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Thank You Text */}
          <div className="text-center mb-16">
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-semibold text-white mb-8 tracking-tight leading-none">
              THANK YOU
            </h2>
            
            {/* Decorative line with accent */}
            <div className="flex justify-center items-center gap-4 mb-12 w-fit mx-auto">
              {/* Main line */}
              <div className="h-1 bg-white w-[200px] sm:w-[280px] md:w-[380px] lg:w-[500px] xl:w-[620px]"></div>
              {/* Accent line */}
              <div className="h-1 w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32" style={{backgroundColor: '#7161EF'}}></div>
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
              
              {/* Button text and arrow */}
              <span className="relative z-10 text-base font-semibold">Back to Projects</span>
              <svg 
                className="relative z-10 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              
              {/* Shimmer effect */}
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

export default InventoryManagement;
