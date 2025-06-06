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
      
      gsap.set(texts, { opacity: 0, y: 30 });
      gsap.set(images, { opacity: 0, scale: 0.9, y: 30 });

      if (texts[0]) gsap.to(texts[0], { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      if (images[0]) gsap.to(images[0], { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" });

      const leftColViewportHeight = leftCol.clientHeight;
      const scrollDistance = textList.scrollHeight - leftColViewportHeight;
      
      if (scrollDistance <= 0) {
          return;
      }

      gsap.to(textList, {
          y: -scrollDistance,
          ease: "none",
          scrollTrigger: {
              trigger: stickyEl,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${scrollDistance}`,
              onUpdate: self => {
                  const progress = self.progress;
                  const sectionDuration = 1 / (texts.length - 1);
                  
                  texts.forEach((text, i) => {
                    const sectionStart = i * sectionDuration;
                    const sectionEnd = (i + 1) * sectionDuration;
                    const sectionProgress = (progress - sectionStart) / sectionDuration;

                    if (progress >= sectionStart && progress < sectionEnd) {
                        gsap.set(text, { opacity: 1 - sectionProgress, y: -30 * sectionProgress });
                        gsap.set(images[i], { opacity: 1 - sectionProgress, scale: 1 - (0.1 * sectionProgress), y: -30 * sectionProgress });
                    } else if (progress >= sectionEnd) {
                        gsap.set(text, { opacity: 0, y: -30 });
                        gsap.set(images[i], { opacity: 0, scale: 0.9, y: -30 });
                    } else {
                        gsap.set(text, { opacity: 0, y: 30 });
                        gsap.set(images[i], { opacity: 0, scale: 0.9, y: 30 });
                    }
                    
                    const nextIndex = i + 1;
                    if (nextIndex < texts.length) {
                        const nextText = texts[nextIndex];
                        const nextImage = images[nextIndex];
                        if (progress >= sectionStart && progress < sectionEnd) {
                            gsap.set(nextText, { opacity: sectionProgress, y: 30 * (1 - sectionProgress) });
                            gsap.set(nextImage, { opacity: sectionProgress, scale: 0.9 + (0.1 * sectionProgress), y: 30 * (1 - sectionProgress) });
                        }
                    }
                  });
              }
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

  // Assuming main navbar is approx 4rem (64px) and sticky title is approx 7rem (112px). Total offset = 11rem
  const topOffset = "11rem"; 

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div ref={leftColumnRef} className="md:sticky overflow-hidden" style={{ top: topOffset, height: `calc(100vh - ${topOffset})` }}>
             <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>
            <div ref={textListScrollContainerRef} className="relative">
              {projectsData.map((project, index) => (
                <div 
                  key={project.id} 
                  ref={el => projectTextItemRefs.current[index] = el}
                  className={`project-text-item flex flex-col justify-center p-6 md:p-8 lg:p-12 box-border`}
                  style={{ height: `calc(100vh - ${topOffset})` }}
                >
                  <div>
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

          <div className="md:sticky flex items-center justify-center" style={{ top: topOffset, height: `calc(100vh - ${topOffset})` }}>
            <div className="relative w-full h-full max-w-2xl">
                {projectsData.map((project, index) => (
                    <img 
                        key={project.id} 
                        ref={el => projectImageRefs.current[index] = el}
                        src={project.imageUrl} 
                        alt={`${project.title} screenshot`} 
                        className="absolute inset-0 w-full h-full object-contain rounded-lg"
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