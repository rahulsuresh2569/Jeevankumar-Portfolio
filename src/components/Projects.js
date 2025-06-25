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

  const projectsData = [
    {
      id: 1,
      tag: "Real Time Project",
      title: "Inventory Management Software",
      category: "B2B SaaS",
      type: "Product Design",
      industry: "Manufacturing Industry",
      platform: "Web & Mobile Application",
      description: "Streamlined inventory tracking and management system designed for manufacturing businesses to optimize their supply chain operations.",
      image: inventoryImg,
      ctaText: "Detail View"
    },
    {
      id: 2,
      tag: "Enterprise Solution", 
      title: "Field Management Software",
      category: "Enterprise",
      type: "UI/UX Design",
      industry: "Field Operations",
      platform: "Mobile & Desktop Application",
      description: "Comprehensive field management platform enabling real-time coordination and data collection for field service teams.",
      image: fieldManagementImg,
      ctaText: "Detail View"
    },
    {
      id: 3,
      tag: "IoT Integration",
      title: "Active RFID Employee Tracking System",
      category: "IoT Solution",
      type: "System Design",
      industry: "Corporate Management",
      platform: "Web Dashboard & Mobile",
      description: "Advanced RFID-based employee tracking system providing real-time location data and workplace analytics.",
      image: rfidTrackingImg,
      ctaText: "Detail View"
    },
    {
      id: 4,
      tag: "Social Impact",
      title: "AIDIT Donation App",
      category: "Mobile App",
      type: "Product Design",
      industry: "Non-Profit & Social",
      platform: "Mobile Application",
      description: "User-friendly donation platform connecting donors with verified charitable organizations for transparent giving.",
      image: aiditImg,
      ctaText: "Detail View"
    },
    {
      id: 5,
      tag: "E-Commerce Platform",
      title: "Tyns Shopping Experience",
      category: "E-Commerce",
      type: "UI/UX Design",
      industry: "Retail & Fashion",
      platform: "Web & Mobile Application",
      description: "Modern e-commerce platform focusing on seamless shopping experience and personalized product discovery.",
      image: tynsImg,
      ctaText: "Detail View"
    }
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
    if (showcaseSectionRef.current && stickyWrapperRef.current) {
      ScrollTrigger.create({
        trigger: showcaseSectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyWrapperRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    }

    // Handle scroll-based project switching
    const handleScroll = () => {
      if (!showcaseSectionRef.current) return;
      
      const showcaseSection = showcaseSectionRef.current;
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === showcaseSectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [projectsData.length]);

  return (
    <>
      {/* Static Header Section - Normal scroll, not sticky */}
      <section className="projects-header-section bg-secondary text-primary pt-20 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="w-full max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Selected Projects
          </h2>
          <p className="text-lg sm:text-xl text-primary/70 leading-relaxed max-w-2xl mx-auto">
            Showcasing innovative solutions across various industries and platforms through immersive design experiences
          </p>
        </div>
      </section>

      {/* Project Showcase Section - Becomes sticky when it hits viewport */}
      <section 
        ref={showcaseSectionRef}
        id="projects"
        className="section-projects relative bg-secondary"
        style={{ 
          height: `${projectsData.length * 100}vh` // Height for scroll-based animation
        }}
      >
        {/* Sticky wrapper - ONLY the showcase content */}
        <div 
          ref={stickyWrapperRef}
          className="sticky bg-secondary"
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
                height: 'calc(100vh - 80px)', // Subtract navbar height
                paddingTop: '80px' // Account for navbar
              }}
            >
              
              {/* Left Side - Project Content */}
              <div className="projects-left bg-primary rounded-3xl p-8 sm:p-10 lg:p-12 flex flex-col justify-between h-full max-h-[75vh]">
                <div className="projects-left-top flex-1 flex flex-col justify-center relative">
                  
                  {/* All project content items (absolutely positioned) */}
                  {projectsData.map((project, index) => (
                    <div
                      key={project.id}
                      className="project-content-item absolute inset-0 flex flex-col justify-center text-left"
                      style={{
                        opacity: 0,
                        transition: 'opacity 0.5s ease-in-out'
                      }}
                    >
                      {/* Project Tag */}
                      <div className="mb-6">
                        <span className="inline-block text-sm font-medium px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30">
                          {project.tag}
                        </span>
                      </div>

                      {/* Project Title - Reduced size to match image */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary leading-tight mb-8">
                        {project.title}
                      </h3>

                      {/* Project Metadata - Text Pills Design */}
                      <div className="space-y-4 mb-8">
                        {/* Category and Type - Combined pill */}
                        <div className="flex items-center gap-3">
                          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary text-sm font-medium rounded-full border border-secondary/20">
                            {project.category}
                          </span>
                          <span className="w-1 h-1 bg-secondary/60 rounded-full"></span>
                          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary text-sm font-medium rounded-full border border-secondary/20">
                            {project.type}
                          </span>
                        </div>
                        
                        {/* Industry - Text pill */}
                        <div>
                          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary text-sm font-medium rounded-full border border-secondary/20">
                            {project.industry}
                          </span>
                        </div>
                        
                        {/* Platform - Text pill */}
                        <div>
                          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary text-sm font-medium rounded-full border border-secondary/20">
                            {project.platform}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA Button */}
                <div className="projects-left-bottom mt-8">
                  <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-105 w-full justify-center">
                    <span>Detail View</span>
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
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
              <div className="projects-right w-full h-full rounded-3xl relative overflow-hidden max-h-[75vh]">
                {projectsData.map((project, index) => (
                  <div
                    key={`image-${project.id}`}
                    className="project-image-item absolute inset-0"
                    style={{
                      opacity: 0,
                      transition: 'opacity 0.5s ease-in-out'
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
        }

        @media (max-width: 1024px) {
          .projects-component {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            height: calc(100vh - 60px) !important;
            padding-top: 60px !important;
          }
          
          .projects-left {
            max-height: 45vh !important;
            margin-bottom: 1rem;
          }
          
          .projects-right {
            max-height: 35vh !important;
          }
        }
      `}</style>
    </>
  );
};

export default Projects; 