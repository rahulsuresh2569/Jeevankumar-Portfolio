import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import project1Img from '../assets/images/project-1.png';
import project2Img from '../assets/images/project-2.png';
import project3Img from '../assets/images/project-3.png';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
      id: 1,
    title: 'AIDIT',
    subtitle: 'UI/UX Case Study',
    description: 'A UI/UX case study for a donation application. Focused on intuitive navigation and user engagement, aiming to connect donors with causes seamlessly.',
    imageUrl: project1Img,
    behanceUrl: 'YOUR_BEHANCE_PROJECT_LINK_HERE'
    },
    {
      id: 2,
    title: 'Hospital Management',
    subtitle: 'System UI/UX Design',
    description: 'Comprehensive UI/UX design for a hospital management system, enhancing usability for medical staff and improving patient care coordination.',
    imageUrl: project2Img,
    behanceUrl: 'YOUR_BEHANCE_PROJECT_LINK_HERE'
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    subtitle: 'Full-Stack Development',
    description: 'Designed and developed a responsive e-commerce platform with a focus on seamless user experience and robust backend functionality for inventory and sales.',
    imageUrl: project3Img,
      behanceUrl: 'YOUR_BEHANCE_PROJECT_LINK_HERE'
    },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const mainTitleRef = useRef(null);
  const stickyContainerRef = useRef(null); 
  const leftColumnRef = useRef(null); 
  const textListScrollContainerRef = useRef(null); 
  
  const projectTextItemRefs = useRef([]);
  const projectImageRefs = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      const titleEl = mainTitleRef.current;
      const stickyEl = stickyContainerRef.current; 
      const leftCol = leftColumnRef.current;
      const textList = textListScrollContainerRef.current;
      const texts = projectTextItemRefs.current.filter(Boolean);
      const images = projectImageRefs.current.filter(Boolean);

      if (!section || !titleEl || !stickyEl || !leftCol || !textList || texts.length !== projectsData.length || images.length !== projectsData.length) {
        return;
      }
      
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function() {
          // Initial state
          gsap.set(texts, { opacity: 0, y: 30 });
          gsap.set(images, { opacity: 0, y: 30, scale: 0.9 });
          gsap.set(texts[0], { opacity: 1, y: 0 });
          gsap.set(images[0], { opacity: 1, y: 0, scale: 1 });
          
          const scrollDistance = textList.scrollHeight - leftCol.clientHeight;
          
          if (scrollDistance <= 0) {
              return;
          }
    
          const topNavOffsetValue = 4; // in rem
          const topNavOffsetPixels = topNavOffsetValue * 16; // Assuming 1rem = 16px
    
          gsap.to(textList, {
              y: -scrollDistance,
              ease: "none",
              scrollTrigger: {
                  trigger: stickyEl,
                  pin: true,
                  pinReparent: true,
                  scrub: 1.5,
                  start: `top ${topNavOffsetPixels}px`,
                  end: () => `+=${scrollDistance}`,
                  onUpdate: self => {
                      const progress = self.progress;
                      const sectionDuration = 1 / (texts.length - 1);
                      
                      texts.forEach((text, i) => {
                        const sectionStart = i * sectionDuration;
                        const sectionProgress = (progress - sectionStart) / sectionDuration;
    
                        if (sectionProgress >= 0 && sectionProgress <= 1) {
                            // Current item fades out
                            gsap.set(text, { opacity: 1 - sectionProgress, y: -50 * sectionProgress });
                            gsap.set(images[i], { opacity: 1 - sectionProgress, y: -50 * sectionProgress, scale: 1 - 0.1 * sectionProgress });
    
                            // Next item fades in
                            const nextIndex = i + 1;
                            if (nextIndex < texts.length) {
                                const nextText = texts[nextIndex];
                                const nextImage = images[nextIndex];
                                gsap.set(nextText, { opacity: sectionProgress, y: 50 * (1 - sectionProgress) });
                                gsap.set(nextImage, { opacity: sectionProgress, y: 50 * (1 - sectionProgress), scale: 0.9 + 0.1 * sectionProgress });
                            }
                        }
                      });
                  }
              }
          });
        }
      });
  
      gsap.fromTo(titleEl, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.8, scrollTrigger: {
              trigger: section, start: 'top 80%', toggleActions: 'play none none none'
          }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Set this to the height of your fixed navigation bar
  const topNavOffset = "4rem"; 

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
      <div ref={mainTitleRef} className='max-w-7xl mx-auto px-6 lg:px-8 text-center mb-16 md:mb-20'>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          My Projects
        </h2>
        <p className='mt-4 text-lg md:text-xl text-primary-muted max-w-3xl mx-auto'>
          A selection of my recent work, showcasing my skills in creating intuitive and engaging user experiences from concept to completion.
        </p>
      </div>

      <div ref={stickyContainerRef} className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div ref={leftColumnRef} className="overflow-hidden" style={{ height: `calc(100vh - ${topNavOffset})` }}>
             <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>
            <div ref={textListScrollContainerRef} className="relative">
              {projectsData.map((project, index) => (
                <div 
                  key={project.id} 
                  ref={el => projectTextItemRefs.current[index] = el}
                  className={`project-text-item flex flex-col justify-center p-6 md:p-8 lg:p-12 box-border`}
                  style={{ height: `calc(100vh - ${topNavOffset})` }}
                >
                  <div>
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-accent mb-4">
                      {project.title}
                    </h3>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary mb-4">
                      {project.subtitle}
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl text-primary-muted leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <a 
                      href={project.behanceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block text-accent font-semibold hover:underline text-xl sm:text-2xl transition-transform duration-200 hover:translate-x-1"
                    >
                      View on Behance &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
          </div>

          <div className="flex items-center justify-center" style={{ height: `calc(100vh - ${topNavOffset})` }}>
            <div className="relative w-full h-full max-w-xl">
                {projectsData.map((project, index) => (
                    <img 
                        key={project.id} 
                        ref={el => projectImageRefs.current[index] = el}
                        src={project.imageUrl} 
                        alt={`${project.title} screenshot`} 
                        className="absolute inset-0 w-full h-full object-contain"
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