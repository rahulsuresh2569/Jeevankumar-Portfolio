import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import project images
import inventoryImg from '../assets/images/projects/Inventory Management Software.jpg';
import fieldManagementImg from '../assets/images/projects/Field Management Software.jpg';
import rfidTrackingImg from '../assets/images/projects/Active RFID Employee Tracking System.jpg';
import aiditImg from '../assets/images/projects/AIDIT (Donation app).jpg';
import tynsImg from '../assets/images/projects/Tyns.jpg';

const Projects = () => {
  const showcaseSectionRef = useRef(null);
  const stickyWrapperRef = useRef(null);
  const [activeProjectIndex, setActiveProjectIndex] = React.useState(0);
  const mouseFollowerRef = useRef(null);
  const projectsRightRef = useRef(null);

  // Button gradient colors for each project
  const buttonGradients = [
    { from: '#E8B513', to: '#FFEBAC', textColor: 'black' }, // Project 1: Yellow
    { from: '#7161EF', to: '#9E92FF', textColor: 'white' }, // Project 2: Purple
    { from: '#FFFFFF', to: '#D8D8D8', textColor: 'black' }, // Project 3: White/Gray
    { from: '#25BD18', to: '#80E777', textColor: 'black' }, // Project 4: Green
    { from: '#3D8361', to: '#6CC298', textColor: 'white' }  // Project 5: Teal
  ];

  const projectsData = [
    {
      id: 1,
      tag: "Real Time Project",
      title: "Field Management Software",
      category: "B2B SaaS",
      type: "Product Design",
      industry: "Utilities Industry",
      platform: "Web & Mobile Application",
      description: "Comprehensive field management platform enabling real-time coordination and data collection for field service teams.",
      image: fieldManagementImg,
      ctaText: "Detail View"
    },
    {
      id: 2,
      tag: "Real Time Project", 
      title: "Inventory Management Software",
      category: "B2B SaaS",
      type: "Web & Mobile Application",
      industry: "Product Design",
      platform: "Manufacturing Industry",
      description: "Streamlined inventory tracking and management system designed for manufacturing businesses to optimize their supply chain operations.",
      image: inventoryImg,
      ctaText: "Detail View"
    },
    {
      id: 3,
      tag: "Real Time Project",
      title: "Active RFID Employee Tracking System",
      category: "B2B SaaS",
      type: "Web & Mobile Application",
      industry: "Product Design",
      platform: "Manufacturing Industry",
      description: "Advanced RFID-based employee tracking system providing real-time location data and workplace analytics.",
      image: rfidTrackingImg,
      ctaText: "Detail View"
    },
    {
      id: 4,
      tag: "Real Time Project",
      title: "Tyns",
      category: "B2C",
      type: "Product Design",
      industry: "Donation app",
      platform: "Mobile Application",
      description: "Modern e-commerce platform focusing on seamless shopping experience and personalized product discovery.",
      image: tynsImg,
      ctaText: "Detail View"
    },
    {
      id: 5,
      tag: "Mock Project",
      title: "AIDIT (Donation app)",
      category: "B2B & C2C",
      type: "Product Design",
      industry: "Donation app",
      platform: "Mobile Application",
      description: "User-friendly donation platform connecting donors with verified charitable organizations for transparent giving.",
      image: aiditImg,
      ctaText: "Detail View"
    }
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Capture ref values at the beginning of the effect
    const showcaseElement = showcaseSectionRef.current;
    const stickyWrapperElement = stickyWrapperRef.current;
    const projectsRightElement = projectsRightRef.current;
    const mouseFollowerElement = mouseFollowerRef.current;

    // Initialize - hide all projects except first
    const initializeProjects = () => {
      const sections = document.querySelectorAll('.project-content-item');
      const images = document.querySelectorAll('.project-image-item');
      
      sections.forEach((section, index) => {
        if (index === 0) {
          section.classList.add('is-active');
          section.style.opacity = '1';
        } else {
          section.classList.remove('is-active');
          section.style.opacity = '0';
        }
      });
      
      images.forEach((image, index) => {
        if (index === 0) {
          image.classList.add('is-active');
          image.style.opacity = '1';
        } else {
          image.classList.remove('is-active');
          image.style.opacity = '0';
        }
      });
    };

    // Create sticky behavior ONLY for the showcase section
    if (showcaseElement && stickyWrapperElement) {
      ScrollTrigger.create({
        trigger: showcaseElement,
        start: "top top",
        end: "bottom bottom",
        pin: stickyWrapperElement,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    }

    // Handle scroll-based project switching
    const handleScroll = () => {
      if (!showcaseElement) return;
      
      const showcaseSection = showcaseElement;
      const rect = showcaseSection.getBoundingClientRect();
      const sectionHeight = showcaseSection.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Only proceed if showcase section is sticky (top <= 0)
      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        const scrollProgress = Math.abs(rect.top) / (sectionHeight - viewportHeight);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // Calculate which project should be active
        const projectIndex = Math.floor(clampedProgress * projectsData.length);
        const currentIndex = Math.min(projectIndex, projectsData.length - 1);
        
        const sections = document.querySelectorAll('.project-content-item');
        const images = document.querySelectorAll('.project-image-item');
        
        // Update active project
        setActiveProjectIndex(currentIndex);
        
        sections.forEach((section, index) => {
          if (index === currentIndex) {
            section.classList.add('is-active');
            section.style.opacity = '1';
          } else {
            section.classList.remove('is-active');
            section.style.opacity = '0';
          }
        });
        
        images.forEach((image, index) => {
          if (index === currentIndex) {
            image.classList.add('is-active');
            image.style.opacity = '1';
          } else {
            image.classList.remove('is-active');
            image.style.opacity = '0';
          }
        });
      }
    };

    // Initialize after component mounts
    setTimeout(initializeProjects, 100);

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call
    handleScroll();

    // Mouse follower animation for right section
    if (projectsRightElement && mouseFollowerElement) {
      const follower = mouseFollowerElement;
      const mouseBox = projectsRightElement;
      
      // Set initial state
      gsap.set(follower, {
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 1
      });

      // Create quick animations for smooth following
      const xTo = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power2" });
      const yTo = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power2" });
      
      // Scale animation for enter/leave
      const scaleTween = gsap.to(follower, {
        scale: 1,
        ease: "power1.inOut",
        paused: true
      });

      // Event handlers
      const handleMouseEnter = () => {
        scaleTween.play();
        mouseBox.style.cursor = 'none';
      };

      const handleMouseLeave = () => {
        scaleTween.reverse();
        mouseBox.style.cursor = 'default';
      };

      const handleMouseMove = (e) => {
        const rect = mouseBox.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        xTo(x);
        yTo(y);
      };

      // Add event listeners
      mouseBox.addEventListener("mouseenter", handleMouseEnter);
      mouseBox.addEventListener("mouseleave", handleMouseLeave);
      mouseBox.addEventListener("mousemove", handleMouseMove);

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', handleScroll);
        mouseBox.removeEventListener("mouseenter", handleMouseEnter);
        mouseBox.removeEventListener("mouseleave", handleMouseLeave);
        mouseBox.removeEventListener("mousemove", handleMouseMove);
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === showcaseElement) {
            trigger.kill();
          }
        });
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === showcaseElement) {
          trigger.kill();
        }
      });
    };
  }, [projectsData.length]);

  return (
    <>
      {/* Static Header Section - Normal scroll, not sticky */}
              <section className="projects-header-section bg-primary text-secondary pt-20 pb-8 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="w-full max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            Selected Projects
          </h2>
                      <p className="text-lg sm:text-xl text-secondary/70 leading-relaxed max-w-2xl mx-auto">
            Showcasing innovative solutions across various industries and platforms through immersive design experiences
          </p>
        </div>
      </section>

      {/* Project Showcase Section - Becomes sticky when it hits viewport */}
      <section 
        ref={showcaseSectionRef}
        id="projects"
                  className="section-projects relative bg-primary"
        style={{ 
          height: `${projectsData.length * 100}vh` // Height for scroll-based animation
        }}
      >
        {/* Sticky wrapper - ONLY the showcase content */}
        <div 
          ref={stickyWrapperRef}
                      className="sticky bg-primary"
          style={{ 
            height: '100vh',
            top: '0px' // Account for navbar height
          }}
        >
          <div className="projects-container w-full max-w-7xl mx-auto h-full">
            
            {/* Projects Content Grid - Centered accounting for navbar */}
            <div 
              className="projects-component grid items-center px-4 sm:px-6 md:px-8 lg:px-10"
              style={{ 
                gridTemplateColumns: '0.4fr 1fr',
                gap: '2rem',
                height: '100vh', // Full viewport height
                paddingTop: '80px', // Account for navbar
                paddingBottom: '40px' // Bottom padding for better spacing
              }}
            >
              
              {/* Left Side - Project Content */}
              <div className="projects-left bg-white rounded-3xl p-10 flex flex-col justify-between h-full max-h-[85vh] shadow-lg">
                <div className="projects-left-top flex-1 flex flex-col text-left relative">
                  
                  {/* Fixed Section Label */}
                  <div className="mb-4">
                    <span className="inline-block text-sm font-normal text-blue-600">
                      {projectsData[activeProjectIndex]?.tag}
                    </span>
                  </div>

                  {/* Fixed Project Title */}
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-12">
                    {projectsData[activeProjectIndex]?.title}
                  </h3>

                  {/* Dynamic Pills Container - positioned relative to fixed title */}
                  <div className="relative">
                    {projectsData.map((project, index) => (
                      <div
                        key={project.id}
                        className="project-content-item absolute inset-0"
                        style={{
                          opacity: 0,
                          transition: 'opacity 0.5s ease-in-out'
                        }}
                      >
                        {/* Project Metadata - First 2 tags with dot, others on separate lines */}
                        <div className="space-y-4 mb-12">
                          {/* First line: First 2 tags with dot between them */}
                          <div className="flex items-center gap-2">
                            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {project.category}
                            </span>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {project.industry}
                            </span>
                          </div>
                          
                          {/* Second line: Third tag */}
                          <div>
                            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {project.platform}
                            </span>
                          </div>
                          
                          {/* Third line: Fourth tag */}
                          <div>
                            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {project.type}
                            </span>
                          </div>
                        </div>

                        {/* Divider Line */}
                        <div className="w-full h-px bg-gray-200 mb-10"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button - Left aligned */}
                <div className="projects-left-bottom flex justify-start">
                  <button 
                    className="group relative inline-flex items-center gap-2 font-medium text-sm px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                    style={{
                      background: `linear-gradient(to right, ${buttonGradients[activeProjectIndex]?.from}, ${buttonGradients[activeProjectIndex]?.to})`,
                      color: buttonGradients[activeProjectIndex]?.textColor,
                      boxShadow: `0 4px 15px ${buttonGradients[activeProjectIndex]?.from}25`
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
                </div>
              </div>

              {/* Right Side - Project Images */}
              <div 
                ref={projectsRightRef}
                className="projects-right w-full h-full rounded-3xl relative overflow-hidden max-h-[85vh] cursor-pointer"
              >
                {/* Mouse Follower - Circle with Arrow */}
                <div 
                  ref={mouseFollowerRef}
                  className="mouse-follower absolute pointer-events-none z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl border-2 border-gray-200"
                  style={{
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <svg 
                    className="w-6 h-6 text-gray-800" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                </div>

                {projectsData.map((project, index) => (
                  <div
                    key={`image-${project.id}`}
                    className="project-image-item absolute inset-0"
                    style={{
                      opacity: 0,
                      transform: 'translateY(100%)',
                      transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center rounded-3xl"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .project-content-item.is-active {
          opacity: 1 !important;
        }
        
        .project-image-item.is-active {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .mouse-follower {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .projects-right:hover {
          cursor: none !important;
        }

        @media (max-width: 1024px) {
          .projects-component {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            height: 100vh !important;
            padding-top: 60px !important;
            padding-bottom: 20px !important;
          }
          
          .projects-left {
            max-height: 50vh !important;
            margin-bottom: 1rem;
          }
          
          .projects-right {
            max-height: 40vh !important;
          }

          /* Disable mouse follower on mobile */
          .mouse-follower {
            display: none !important;
          }
          
          .projects-right {
            cursor: pointer !important;
          }
        }
      `}</style>
    </>
  );
};

export default Projects; 