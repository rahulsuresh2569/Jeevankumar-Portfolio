import React, { useEffect, useRef } from 'react';
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
    imageUrl: 'https://via.placeholder.com/800x600?text=AIDIT+Project+Screenshot',
    behanceUrl: 'YOUR_BEHANCE_PROJECT_LINK_HERE'
  },
  {
    id: 2,
    title: 'Hospital Management',
    subtitle: 'System UI/UX Design',
    description: 'Comprehensive UI/UX design for a hospital management system, enhancing usability for medical staff and improving patient care coordination.',
    imageUrl: 'https://via.placeholder.com/800x600?text=Hospital+Mgmt+Screenshot',
    behanceUrl: 'YOUR_BEHANCE_PROJECT_LINK_HERE'
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    subtitle: 'Full-Stack Development',
    description: 'Designed and developed a responsive e-commerce platform with a focus on seamless user experience and robust backend functionality for inventory and sales.',
    imageUrl: 'https://via.placeholder.com/800x600?text=E-commerce+Screenshot',
    behanceUrl: 'YOUR_BEHANCE_PROJECT_LINK_HERE'
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  // 2. useRef initializes .current. No need to reset in component body.
  const projectSlideRefs = useRef([]); 
  const textCardContainersRef = useRef([]);
  const imageContainersRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;

    // Refs are populated by JSX callbacks after the first render.
    // We access them here. It's good to ensure they match expected counts.
    const slides = projectSlideRefs.current.filter(Boolean);
    const textContainers = textCardContainersRef.current.filter(Boolean);
    const imageContainers = imageContainersRef.current.filter(Boolean);

    if (!section || !titleEl || 
        slides.length !== projectsData.length || 
        textContainers.length !== projectsData.length || 
        imageContainers.length !== projectsData.length) {
      console.warn("GSAP ScrollTrigger: Refs not fully populated or mismatched. Animation setup skipped. Lengths:",
        {slides: slides.length, text: textContainers.length, images: imageContainers.length, expected: projectsData.length });
      return;
    }

    // Title fade-in
    gsap.fromTo(titleEl,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      }
    );

    // Pin the entire section
    const pinST = ScrollTrigger.create({
      trigger: section,
      pin: true,
      scrub: 1,
      start: "top top",
      end: () => `+=${slides.length * window.innerHeight}`,
    });

    slides.forEach((slide, index) => {
      const textContainer = textContainers[index];
      const imageEl = imageContainers[index]?.querySelector('img');

      if (!textContainer || !imageEl) {
        console.warn(`GSAP: Missing text or image elements for slide ${index}`);
        return; 
      }

      // Initial state for each slide and its content
      gsap.set(slide, { position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', opacity: 0, zIndex: index + 1 });
      gsap.set(textContainer, { opacity: 0, x: -50 });
      gsap.set(imageEl, { opacity: 0, scale: 0.8, x: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, 
          start: () => `top+=${index * window.innerHeight} top`, 
          end: () => `top+=${(index + 1) * window.innerHeight} top`, 
          scrub: true,
        }
      });

      // Animate IN
      tl.to(slide, { opacity: 1, duration: 0.1 }, 0) 
        .to(textContainer, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, 0.05) 
        .to(imageEl, { opacity: 1, scale: 1, x: 0, duration: 0.4, ease: "power2.out" }, "<0.1"); 

      // Animate OUT (if not the last slide)
      if (index < slides.length - 1) {
        tl.to(textContainer, { opacity: 0, x: 50, duration: 0.4, ease: "power2.in" }, 0.55) 
          .to(imageEl, { opacity: 0, scale: 0.8, x: -50, duration: 0.4, ease: "power2.in" }, "<") 
          .to(slide, { opacity: 0, duration: 0.1 }, ">_ -=0.1"); 
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      const elementsToClean = [
        titleEl,
        ...slides,
        ...textContainers,
        // Ensure imageEl itself is used if it was found
        ...imageContainers.map(container => container?.querySelector('img')).filter(Boolean)
      ].filter(Boolean);

      // Check if elements are still part of the DOM before trying to kill tweens on them.
      const validElementsToClean = elementsToClean.filter(el => document.body.contains(el));
      if (validElementsToClean.length > 0) {
          gsap.killTweensOf(validElementsToClean);
      }
    };
  // 3. Empty dependency array: useEffect runs once on mount, cleans up on unmount.
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
    <section id="projects" ref={sectionRef} className="relative bg-background text-primary overflow-hidden" style={{minHeight: `${projectsData.length * 100}vh`}}>
      <h2 ref={titleRef} className="text-4xl sm:text-5xl font-bold text-center py-10 md:py-16 sticky top-0 bg-background/70 backdrop-blur-md z-30 mx-auto">
        My Projects
      </h2>

      {projectsData.map((project, index) => (
        <div 
          key={project.id} 
          ref={el => { if(el) projectSlideRefs.current[index] = el; }} // Assign to specific index
          // className is mostly controlled by GSAP (position, opacity, etc.)
        >
          <div className="h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full max-w-6xl">
              <div 
                ref={el => { if(el) textCardContainersRef.current[index] = el; }} // Assign to specific index
                className="project-text-container p-6 sm:p-8 rounded-xl shadow-2xl bg-secondary/90 backdrop-blur-lg order-2 md:order-1"
              >
                <h3 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-accent">{project.title}</h3>
                <p className="text-xl sm:text-2xl font-semibold text-primary mb-2 sm:mb-3">{project.subtitle}</p>
                <p className="text-base sm:text-lg text-primary-muted mb-4 sm:mb-6">{project.description}</p>
                <a 
                  href={project.behanceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block text-accent font-bold hover:underline text-lg sm:text-xl transition-transform duration-200 hover:translate-x-1"
                >
                  View on Behance &rarr;
                </a>
              </div>

              <div 
                ref={el => { if(el) imageContainersRef.current[index] = el; }} // Assign to specific index
                className="project-image-container relative flex items-center justify-center h-[40vh] sm:h-[50vh] md:h-[65vh] order-1 md:order-2"
              >
                <img 
                  src={project.imageUrl} 
                  alt={`${project.title} screenshot`} 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;