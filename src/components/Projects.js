import React, { useRef, useLayoutEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Remove local image imports and use Cloudinary URLs
const cloudinaryImages = {
  inventory: "https://res.cloudinary.com/dcua87ney/image/upload/v1753799887/inventory_2_fe3mqs.png",
  fieldManagement: "https://res.cloudinary.com/dcua87ney/image/upload/v1753797862/FSM_jozpz2.png",
  aidit: "https://res.cloudinary.com/dcua87ney/image/upload/v1753305296/Aidit_fhxqif.png",
  tyns: "https://res.cloudinary.com/dcua87ney/image/upload/v1753820701/Tyns_ush18a.png",
};

// Project Scroll Stack Item Component
const ProjectScrollStackItem = ({ project, index, buttonGradients, itemClassName = "", navigate }) => (
  <div
    className={`scroll-stack-card relative w-full min-h-[320px] sm:min-h-[350px] md:min-h-[380px] lg:min-h-[400px] xl:min-h-[420px] h-auto my-8 rounded-[40px] border-none origin-top will-change-transform overflow-hidden ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
    }}
  >
    {/* Direct Project Layout */}
    <div className="grid items-stretch sm:grid-cols-1 md:grid-cols-[0.6fr_1fr] lg:grid-cols-[0.5fr_1fr] xl:grid-cols-[0.4fr_1fr] h-full">
      
      {/* Right Side - Project Image (Mobile: order-1, Desktop: order-2) */}
      <div className="w-full h-full lg:h-[450px] xl:h-[600px] relative overflow-hidden cursor-pointer order-1 md:order-2">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center"
          loading="lazy"
          onClick={() => {
            if (project.link) {
              if (project.isInternal) {
                // For internal links, use React Router navigation
                navigate(project.link);
              } else {
                // For external links, open in new tab
                window.open(project.link, '_blank', 'noopener,noreferrer');
              }
            }
          }}
        />
      </div>

      {/* Left Side - Project Content (Mobile: order-2, Desktop: order-1) */}
      <div className="bg-white p-6 sm:p-7 md:p-8 lg:p-10 xl:p-12 flex flex-col h-full lg:h-[450px] xl:h-[600px] shadow-lg order-2 md:order-1">
        
        <div className="flex-1 flex flex-col justify-between text-left min-h-0">
          
          {/* Content Area - Top Section */}
          <div className="flex-shrink-0">
            {/* Project Tag */}
            <div className="mb-3 sm:mb-4 lg:mb-4">
              <span className="inline-block text-xs sm:text-sm lg:text-sm font-normal text-blue-600">
                {project.tag}
              </span>
            </div>
            
            {/* Project Title */}
            <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-4xl font-bold text-gray-900 leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-6 xl:mb-10">
              {project.title}
            </h3>
          </div>
          
          {/* Project Metadata - Middle Section */}
          <div className="flex-1 min-h-0">
            <div className="space-y-2.5 sm:space-y-3 lg:space-y-3 mb-5 sm:mb-6 md:mb-7 lg:mb-7 xl:mb-12">
              
              {/* First line: First 2 tags with dot between them */}
              <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-2.5">
                <span className="inline-block px-3 sm:px-3.5 lg:px-3.5 py-1.5 sm:py-1.5 lg:py-1.5 bg-gray-100 text-gray-700 text-xs lg:text-xs font-medium rounded-full">
                  {project.category}
                </span>
                <span className="w-1 h-1 lg:w-1 lg:h-1 bg-gray-400 rounded-full"></span>
                <span className="inline-block px-3 sm:px-3.5 lg:px-3.5 py-1.5 sm:py-1.5 lg:py-1.5 bg-gray-100 text-gray-700 text-xs lg:text-xs font-medium rounded-full">
                  {project.industry}
                </span>
              </div>
              
              {/* Second line: Third tag */}
              <div>
                <span className="inline-block px-3 sm:px-3.5 lg:px-3.5 py-1.5 sm:py-1.5 lg:py-1.5 bg-gray-100 text-gray-700 text-xs lg:text-xs font-medium rounded-full">
                  {project.platform}
                </span>
              </div>
              
              {/* Third line: Fourth tag */}
              <div>
                <span className="inline-block px-3 sm:px-3.5 lg:px-3.5 py-1.5 sm:py-1.5 lg:py-1.5 bg-gray-100 text-gray-700 text-xs lg:text-xs font-medium rounded-full">
                  {project.type}
                </span>
              </div>
              
            </div>
            
            {/* Divider Line */}
            <div className="w-full h-px bg-gray-200"></div>
          </div>
        
        {/* Bottom CTA Button - with proper spacing */}
        <div className="flex justify-start pt-4 sm:pt-5 md:pt-6 lg:pt-6 xl:pt-10 flex-shrink-0">
          {project.link ? (
            project.isInternal ? (
              <Link 
                to={project.link}
                className="group relative inline-flex items-center gap-2 sm:gap-2.5 lg:gap-2.5 font-medium text-xs sm:text-sm lg:text-sm px-4 sm:px-5 md:px-6 lg:px-6 xl:px-10 py-2.5 sm:py-3 lg:py-3 xl:py-5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{
                  background: `linear-gradient(to right, ${buttonGradients[index]?.from}, ${buttonGradients[index]?.to})`,
                  color: buttonGradients[index]?.textColor,
                  boxShadow: `0 4px 15px ${buttonGradients[index]?.from}25`
                }}
              >
                <span>Detail View</span>
                <svg 
                  className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            ) : (
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 sm:gap-2.5 lg:gap-2.5 font-medium text-xs sm:text-sm lg:text-sm px-4 sm:px-5 md:px-6 lg:px-6 xl:px-10 py-2.5 sm:py-3 lg:py-3 xl:py-5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{
                  background: `linear-gradient(to right, ${buttonGradients[index]?.from}, ${buttonGradients[index]?.to})`,
                  color: buttonGradients[index]?.textColor,
                  boxShadow: `0 4px 15px ${buttonGradients[index]?.from}25`
                }}
              >
                <span>Detail View</span>
                <svg 
                  className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )
          ) : (
            <button 
              className="group relative inline-flex items-center gap-2 sm:gap-2.5 lg:gap-2.5 font-medium text-xs sm:text-sm lg:text-sm px-4 sm:px-5 md:px-6 lg:px-6 xl:px-10 py-2.5 sm:py-3 lg:py-3 xl:py-5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                background: `linear-gradient(to right, ${buttonGradients[index]?.from}, ${buttonGradients[index]?.to})`,
                color: buttonGradients[index]?.textColor,
                boxShadow: `0 4px 15px ${buttonGradients[index]?.from}25`
              }}
            >
              <span>Detail View</span>
              <svg 
                className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const sectionRef = useRef(null);
  const scrollStackContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  // Button gradient colors for each project
  const buttonGradients = [
    { from: '#916CDA', to: '#B198FF', textColor: 'white' }, // Project 1: Purple (FSM)
    { from: '#6182EF', to: '#8BA3F7', textColor: 'white' }, // Project 2: Blue (Inventory)
    { from: '#FCC81E', to: '#FFD700', textColor: 'black' }, // Project 3: Yellow/Orange (Tyns)
    { from: '#3D8361', to: '#6CC298', textColor: 'white' }  // Project 4: Teal
  ];

  const projectsData = [
    {
      id: 1,
      tag: "Real Time Project",
      title: "Field Service Management Software",
      category: "B2B SaaS",
      type: "Product Design",
      industry: "Utilities Industry",
      platform: "Web & Mobile Application",
      description: "Comprehensive field management platform enabling real-time coordination and data collection for field service teams.",
      image: cloudinaryImages.fieldManagement,
      ctaText: "Detail View",
      link: "/field-service-management",
      isInternal: true
    },
    {
      id: 2,
      tag: "Real Time Project", 
      title: "Inventory Management Software",
      category: "B2B SaaS",
      type: "Product Design",
      industry: "Manufacturing Industry",
      platform: "Web Application",
      description: "Streamlined inventory tracking and management system designed for manufacturing businesses to optimize their supply chain operations.",
      image: cloudinaryImages.inventory,
      ctaText: "Detail View",
      link: "/inventory-management",
      isInternal: true
    },
    {
      id: 3,
      tag: "Real Time Project",
      title: "Tyns",
      category: "B2C",
      type: "Product Design",
      industry: "URL Shortener",
      platform: "Web Application",
      description: "URL shortening and QR code generation tool that allows users to quickly shorten links, customize them, and get real-time analytics.",
      image: cloudinaryImages.tyns,
      ctaText: "Detail View",
      link: "/tyns",
      isInternal: true
    },
    {
      id: 4,
      tag: "Mock Project",
      title: "AIDIT (Donation app)",
      category: "B2B & C2C",
      type: "Product Design",
      industry: "Donation app",
      platform: "Mobile Application",
      description: "User-friendly donation platform connecting donors with verified charitable organizations for transparent giving.",
      image: cloudinaryImages.aidit,
      ctaText: "Detail View",
      link: "https://www.behance.net/gallery/173833547/AIDIT-(Donation-app)-UIUX-Case-Study",
      isInternal: false
    }
  ];

  // Scroll Stack Animation Logic using main page scroll
  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  useLayoutEffect(() => {
    // Check if we're on mobile screen
    const isMobile = window.innerWidth < 768; // md breakpoint
    
    if (isMobile) {
      // For mobile: no animations, just return early
      return;
    }

    // Desktop: Apply scroll stack animation
    gsap.registerPlugin(ScrollTrigger);
    
    const section = sectionRef.current;
    const scrollStackContainer = scrollStackContainerRef.current;
    
    if (!section || !scrollStackContainer) return;

    // Get all cards
    const cards = Array.from(scrollStackContainer.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;

    // Scroll Stack parameters - matching scroll-stack.js exactly
    const itemDistance = 100;
    const itemScale = 0.03;
    const itemStackDistance = 30;
    const stackPosition = "10%";
    const scaleEndPosition = "5%";
    const baseScale = 0.85;

    // Set up card styling exactly like scroll-stack.js
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    // Performance optimization: cache last transforms to avoid unnecessary updates
    const lastTransforms = new Map();
    let isUpdating = false;

    // Create the scroll-triggered animation matching scroll-stack.js behavior
    const updateCardTransforms = () => {
      if (isUpdating) return;
      isUpdating = true;

      // Get current scroll position and container dimensions
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const containerHeight = window.innerHeight;
      const stackPositionPx = parsePercentage(stackPosition, containerHeight);
      const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
      
      // Get the end element position for pin release
      const endElement = scrollStackContainer.querySelector('.scroll-stack-end');
      const endElementTop = endElement ? endElement.offsetTop : scrollStackContainer.offsetTop + scrollStackContainer.offsetHeight;

      cards.forEach((card, i) => {
        if (!card) return;

        const cardTop = card.offsetTop;
        
        // Calculate trigger points exactly like scroll-stack.js
        const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
        const triggerEnd = cardTop - scaleEndPositionPx;
        const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
        const pinEnd = endElementTop - containerHeight / 2;

        // Scale animation - cards shrink as they approach the stack
        const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
        const targetScale = baseScale + (i * itemScale);
        const scale = 1 - scaleProgress * (1 - targetScale);

        // Pin/translate animation - cards move to stack position
        let translateY = 0;
        const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
        
        if (isPinned) {
          // Card is pinned at the stack position
          translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
        } else if (scrollTop > pinEnd) {
          // Card moves away with the rest of the content after stack completes
          translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
        }
        // else: card is still in normal document flow (translateY = 0)

        const newTransform = {
          translateY: Math.round(translateY * 100) / 100,
          scale: Math.round(scale * 1000) / 1000
        };

        // Performance optimization: only update if values changed significantly
        const lastTransform = lastTransforms.get(i);
        const hasChanged = !lastTransform || 
          Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
          Math.abs(lastTransform.scale - newTransform.scale) > 0.001;

        if (hasChanged) {
          // Apply transforms exactly like scroll-stack.js
          const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})`;
          card.style.transform = transform;
          
          lastTransforms.set(i, newTransform);
        }
      });

      isUpdating = false;
    };

    ScrollTrigger.create({
      trigger: scrollStackContainer,
      start: "top bottom",
      end: "bottom top",
      onUpdate: updateCardTransforms,
      onRefresh: updateCardTransforms
    });

    // Initial update
    updateCardTransforms();

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === scrollStackContainer) {
          trigger.kill();
        }
      });
    };
  }, [calculateProgress, parsePercentage]);

  return (
    <section id="projects" ref={sectionRef} className="bg-primary text-secondary">
      
      {/* Section Header - Scrolls away normally */}
      <div className="py-20 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="w-full max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            Selective Projects
          </h2>
          <p className="text-lg sm:text-xl text-secondary/70 leading-relaxed max-w-2xl mx-auto">
            Showcasing innovative solutions across various industries and platforms through immersive design experiences
          </p>
        </div>
      </div>

      {/* Scroll Stack Container - Desktop: Scroll stack animation, Mobile: Simple list */}
      <div 
        ref={scrollStackContainerRef}
        className="w-full px-4 sm:px-6 md:px-8 lg:px-10 pb-8 md:pb-[20rem] md:sm:pb-[10rem] md:md:pb-[12rem] md:lg:pb-[15rem] md:xl:pb-[25rem]"
      >
        <div className="scroll-stack-inner md:pt-[3vh] md:sm:pt-[4vh] md:md:pt-[5vh] max-w-7xl mx-auto">
          {/* Mobile: Simple list layout */}
          <div className="block md:hidden space-y-8">
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                className="relative w-full min-h-[320px] sm:min-h-[350px] h-auto rounded-[40px] border-none overflow-hidden bg-primary border border-secondary/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                {/* Mobile Project Layout */}
                <div className="grid items-stretch grid-cols-1 h-full">
                  {/* Project Image */}
                  <div className="w-full h-64 relative overflow-hidden cursor-pointer">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      onClick={() => {
                        if (project.link) {
                          if (project.isInternal) {
                            navigate(project.link);
                          } else {
                            window.open(project.link, '_blank', 'noopener,noreferrer');
                          }
                        }
                      }}
                    />
                  </div>

                  {/* Project Content */}
                  <div className="bg-white p-6 flex flex-col shadow-lg">
                    <div className="flex-1 flex flex-col justify-between text-left min-h-0">
                      {/* Content Area - Top Section */}
                      <div className="flex-shrink-0">
                        {/* Project Tag */}
                        <div className="mb-3">
                          <span className="inline-block text-xs font-normal text-blue-600">
                            {project.tag}
                          </span>
                        </div>
                        
                        {/* Project Title */}
                        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-4">
                          {project.title}
                        </h3>
                      </div>
                      
                      {/* Project Metadata - Middle Section */}
                      <div className="flex-1 min-h-0">
                        <div className="space-y-2.5 mb-5">
                          {/* First line: First 2 tags with dot between them */}
                          <div className="flex items-center gap-2">
                            <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {project.category}
                            </span>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {project.industry}
                            </span>
                          </div>
                          
                          {/* Second line: Third tag */}
                          <div>
                            <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {project.platform}
                            </span>
                          </div>
                          
                          {/* Third line: Fourth tag */}
                          <div>
                            <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {project.type}
                            </span>
                          </div>
                        </div>
                        
                        {/* Divider Line */}
                        <div className="w-full h-px bg-gray-200"></div>
                      </div>
                    
                      {/* Bottom CTA Button */}
                      <div className="flex justify-start pt-4 flex-shrink-0">
                        {project.link ? (
                          project.isInternal ? (
                            <Link 
                              to={project.link}
                              className="group relative inline-flex items-center gap-2 font-medium text-xs px-4 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                              style={{
                                background: `linear-gradient(to right, ${buttonGradients[index]?.from}, ${buttonGradients[index]?.to})`,
                                color: buttonGradients[index]?.textColor,
                                boxShadow: `0 4px 15px ${buttonGradients[index]?.from}25`
                              }}
                            >
                              <span>Detail View</span>
                              <svg 
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          ) : (
                            <a 
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative inline-flex items-center gap-2 font-medium text-xs px-4 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                              style={{
                                background: `linear-gradient(to right, ${buttonGradients[index]?.from}, ${buttonGradients[index]?.to})`,
                                color: buttonGradients[index]?.textColor,
                                boxShadow: `0 4px 15px ${buttonGradients[index]?.from}25`
                              }}
                            >
                              <span>Detail View</span>
                              <svg 
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </a>
                          )
                        ) : (
                          <button 
                            className="group relative inline-flex items-center gap-2 font-medium text-xs px-4 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                            style={{
                              background: `linear-gradient(to right, ${buttonGradients[index]?.from}, ${buttonGradients[index]?.to})`,
                              color: buttonGradients[index]?.textColor,
                              boxShadow: `0 4px 15px ${buttonGradients[index]?.from}25`
                            }}
                          >
                            <span>Detail View</span>
                            <svg 
                              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Scroll stack layout */}
          <div className="hidden md:block">
            {projectsData.map((project, index) => (
              <ProjectScrollStackItem
                key={project.id}
                project={project}
                index={index}
                buttonGradients={buttonGradients}
                itemClassName="bg-primary border border-secondary/10 h-auto shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                navigate={navigate}
              />
            ))}
            {/* End spacer for proper animation completion */}
            <div className="scroll-stack-end w-full h-px" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 