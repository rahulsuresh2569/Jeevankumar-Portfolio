import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Moved projectsData outside the component for stability
const projectsData = [
    {
      id: 1,
    title: 'AIDIT',
    subtitle: 'UI/UX Case Study',
    description: 'A UI/UX case study for a donation application. Focused on intuitive navigation and user engagement, aiming to connect donors with causes seamlessly.',
    imageUrl: 'https://placehold.co/1200x900?text=AIDIT+Project',
    behanceUrl: 'YOUR_BEHANCE_PROJECT_LINK_HERE'
    },
    {
      id: 2,
    title: 'Hospital Management',
    subtitle: 'System UI/UX Design',
    description: 'Comprehensive UI/UX design for a hospital management system, enhancing usability for medical staff and improving patient care coordination.',
    imageUrl: 'https://placehold.co/1200x900?text=Hospital+Mgmt',
    behanceUrl: 'YOUR_BEHANCE_PROJECT_LINK_HERE'
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    subtitle: 'Full-Stack Development',
    description: 'Designed and developed a responsive e-commerce platform with a focus on seamless user experience and robust backend functionality for inventory and sales.',
    imageUrl: 'https://placehold.co/1200x900?text=E-commerce+Platform',
      behanceUrl: 'YOUR_BEHANCE_PROJECT_LINK_HERE'
    },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const mainTitleRef = useRef(null);
  const stickyContainerRef = useRef(null); // This will be the main pinned element containing both columns
  const leftColumnRef = useRef(null); // The sticky left column itself
  const textListScrollContainerRef = useRef(null); // The div inside left col that scrolls
  
  const projectTextItemRefs = useRef([]);
  const projectImageRefs = useRef([]);

  // To store the current active index, mainly for GSAP logic if needed outside onUpdate
  const activeProjectIndex = useRef(0); 

  useEffect(() => {
    projectTextItemRefs.current = projectTextItemRefs.current.slice(0, projectsData.length);
    projectImageRefs.current = projectImageRefs.current.slice(0, projectsData.length);

    const section = sectionRef.current;
    const titleEl = mainTitleRef.current;
    const stickyEl = stickyContainerRef.current; 
    const leftCol = leftColumnRef.current;
    const textList = textListScrollContainerRef.current;
    const texts = projectTextItemRefs.current.filter(Boolean);
    const images = projectImageRefs.current.filter(Boolean);

    if (!section || !titleEl || !stickyEl || !leftCol || !textList || texts.length !== projectsData.length || images.length !== projectsData.length) {
      console.warn("Projects Section: Missing crucial refs or element mismatch. GSAP setup skipped.");
      return;
    }

    // Initial visual setup
    gsap.set(images, { opacity: 0, scale: 0.95 });
    if (images[0]) gsap.set(images[0], { opacity: 1, scale: 1 });
    texts.forEach((text, i) => gsap.set(text, { opacity: i === 0 ? 1 : 0.3})); // Dim non-active texts

    // Height of the viewport for text items within the left column
    const leftColViewportHeight = leftCol.clientHeight;
    // Total scroll distance for the text list: (Number of items - 1) * height of one item viewport
    const scrollDistance = (texts.length - 1) * leftColViewportHeight;

    if (scrollDistance <= 0 && texts.length > 0) {
        console.warn("Text list content might not be correctly set up for scrolling one item at a time.");
        // Fallback for single item or no scroll needed
        if(images[0]) gsap.to(images[0], {opacity: 1, scale: 1, duration: 0.3});
        if(texts[0]) gsap.to(texts[0], {opacity: 1, duration: 0.3});
        // No return here, allow title animation
    }

    let pinTween;
    if (scrollDistance > 0) {
        pinTween = gsap.to(textList, {
            y: -scrollDistance,
            ease: "none",
            scrollTrigger: {
                trigger: stickyEl,
                pin: true,
                scrub: 0.5, // Smoother scrub
                start: "top top",
                end: () => `+=${scrollDistance}`,
                // markers: {startColor: "green", endColor: "red", indent: 80},
                onUpdate: self => {
                    const progress = self.progress;
                    let currentIndex = Math.floor(progress * texts.length);
                    currentIndex = Math.min(currentIndex, texts.length - 1); // Clamp to max index
                    
                    if (currentIndex !== activeProjectIndex.current) {
                        activeProjectIndex.current = currentIndex;

                        gsap.to(images, { 
                            opacity: 0, 
                            scale: 0.95, 
                            duration: 0.4, 
                            ease: "power2.inOut",
                            overwrite: 'auto' 
                        });
                        if (images[currentIndex]) {
                            gsap.to(images[currentIndex], { 
                                opacity: 1, 
                                scale: 1, 
                                duration: 0.4, 
                                ease: "power2.out",
                                overwrite: 'auto' 
                            });
                        }
                        
                        texts.forEach((textEl, i) => {
                            gsap.to(textEl, { 
                                opacity: i === currentIndex ? 1 : 0.3, // Active text fully visible, others dimmed
                                duration: 0.4,
                                ease: "power2.inOut",
                                overwrite: 'auto'
                            });
                        });
                    }
                }
            }
        });
    }
    
    gsap.fromTo(titleEl, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, scrollTrigger: {
            trigger: section, start: 'top 80%', toggleActions: 'play none none none'
        }
    });

    return () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
        gsap.killTweensOf([textList, titleEl, ...images, ...texts]);
    };
  }, []);

  if (projectsData.length === 0) {
    return (
      <section id="projects" className="min-h-screen bg-background text-primary py-20 px-10 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-center">My Projects</h2>
        <p className="text-center mt-4">No projects to display at the moment.</p>
      </section>
    );
  }

  return (
    <section id="projects" ref={sectionRef} className="relative bg-background text-primary overflow-hidden py-16 md:py-24">
      <h2 ref={mainTitleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 sticky top-0 bg-background/90 backdrop-blur-md z-30 py-6">
        My Projects
      </h2>

      <div ref={stickyContainerRef} className="relative max-w-7xl mx-auto">
        {/* The height of this container will be determined by the total scroll needed for the left column animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Column: Sticky with internal scroll via GSAP translateY */}
          {/* Height of this column defines the viewport for one text item */}
          <div ref={leftColumnRef} className="md:sticky md:top-[10rem] h-[calc(100vh-12rem)] max-h-[700px] md:max-h-none overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>
            {/* This container scrolls its children (project-text-item) */}
            <div ref={textListScrollContainerRef} className="relative">
              {projectsData.map((project, index) => (
                <div 
                  key={project.id} 
                  ref={el => projectTextItemRefs.current[index] = el}
                  // Each item takes full height of the leftCol viewport. Content is centered.
                  className={`project-text-item h-[calc(100vh-12rem)] max-h-[700px] md:max-h-none flex flex-col justify-center items-start p-6 md:p-8 lg:p-12 box-border transition-opacity duration-300`}
                >
                  <div> {/* Inner div for content alignment if needed, or apply padding to parent */}
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-3">
                      {project.title}
                    </h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary mb-2">
                      {project.subtitle}
                    </p>
                    <p className="text-md sm:text-lg lg:text-xl text-primary-muted leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <a 
                      href={project.behanceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block text-accent font-semibold hover:underline text-lg sm:text-xl transition-transform duration-200 hover:translate-x-1"
                    >
                      View on Behance &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Right Column: Image reveal */}
          <div className="relative flex items-center justify-center md:sticky md:top-[10rem] h-[calc(100vh-12rem)] max-h-[700px] md:max-h-none">
            <div className="w-full h-full max-w-2xl aspect-auto md:aspect-[4/3]">
                {projectsData.map((project, index) => (
                    <img 
                        key={project.id} 
                        ref={el => projectImageRefs.current[index] = el}
                        src={project.imageUrl} 
                        alt={`${project.title} screenshot`} 
                        className="absolute inset-0 w-full h-full object-contain rounded-lg shadow-xl"
                    />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 