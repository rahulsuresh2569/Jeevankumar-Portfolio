import React, { useRef, useLayoutEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import workSuitcaseImg from '../assets/images/work_suitcase.png';
import backgroundImg from '../assets/images/experience/background.png';

const Experience = () => {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const descriptionsRef = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, threshold: 0.3 });

  const experienceData = {
    company: 'Risolutor Technologies Pvt Ltd',
    position: 'UI UX Designer',
    period: 'Oct,2023 - Jun,2025',
    descriptions: [
      'I worked on web & mobile applications, websites, and various design projects (logos, posters, banners), delivering effective solutions while continuously learning and improving.',
      'Ensuring designs align with client requirements while maintaining a user-friendly and intuitive design system',
      'Collaborating with team and adept at delivering user-friendly designs while maintaining technical constraints.'
    ]
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const background = backgroundRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    const descriptions = descriptionsRef.current;

    if (section && background && heading && content && descriptions) {
      // Background zoom animation - Independent and tied to overall page scroll
      gsap.fromTo(background,
        {
          scale: 1.8, // Much larger initial scale for dramatic effect
        },
        {
          scale: 0.8, // Smaller final scale for dramatic zoom out
          ease: "none",
          scrollTrigger: {
            trigger: "body", // Tied to entire page scroll
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          }
        }
      );

      // Create a master timeline for all content reveals
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=500vh", // Much longer sticky duration for slow reveals
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            // Debug: Log scroll progress
            console.log("Scroll progress:", self.progress);
          }
        }
      });

      // Phase 1: Heading fade-in (0% to 30% of scroll) - Very slow reveal
      masterTimeline.fromTo(heading,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 3, // Much longer duration for slow reveal
        }, 0 // Start at beginning
      );

      // Phase 2: Company info and timeline fade-in (30% to 60% of scroll) - Slow reveal
      masterTimeline.fromTo(content,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 3, // Much longer duration for slow reveal
        }, 3 // Start after heading animation with smooth transition
      );

      // Phase 3: Description blocks fade-in (60% to 90% of scroll) - Slow reveal
      masterTimeline.fromTo(descriptions,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 3, // Much longer duration for slow reveal
        }, 6 // Start after content animation with smooth transition
      );

      // Add a longer pause at the end to ensure all content is fully visible
      masterTimeline.to({}, { duration: 2 }, 9); // Extra time to view all content
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="relative h-screen overflow-hidden z-10"
    >
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundAttachment: 'fixed',
          transform: 'scale(1.2)',
          transformOrigin: 'center center'
        }}
      />

      {/* Dark Overlay for Better Text Contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Window */}
      <div className="relative z-20 h-full flex items-center justify-center px-10 overflow-y-auto">
        <div className="text-center text-white max-w-6xl mx-auto py-20">
          
          {/* Main Heading - Initially Hidden */}
          <div ref={headingRef} className="opacity-0 mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none">
              Experience
            </h2>
          </div>

          {/* Company Info & Timeline - Initially Hidden */}
          <div ref={contentRef} className="opacity-0 space-y-8 mb-16">
            {/* Company Info */}
            <div className="flex flex-col items-center">
              
              {/* Company Name with Icon */}
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src={workSuitcaseImg} 
                  alt="Work briefcase"
                  className="w-12 h-12 filter brightness-0 invert"
                />
                <h3 className="text-2xl lg:text-3xl font-bold">
                  {experienceData.company}
                </h3>
              </div>
              
              {/* Animated Timeline */}
              <div ref={timelineRef} className="w-full max-w-2xl">
                
                {/* Timeline Container */}
                <div className="relative flex items-center w-full">
                  
                  {/* Start Dot */}
                  <motion.div 
                    className="w-4 h-4 bg-white rounded-full z-10 relative flex-shrink-0"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.2,
                      ease: "easeOut"
                    }}
                  />
                  
                  {/* Connecting Line Container */}
                  <div className="flex-1 h-0.5 relative overflow-hidden mx-0">
                    {/* Background Dotted Line */}
                    <div 
                      className="absolute top-0 left-0 w-full h-0.5"
                      style={{ 
                        borderTop: '2px dotted #9ca3af',
                        top: '-1px'
                      }}
                    />
                    {/* Animated Dotted Line */}
                    <motion.div 
                      className="absolute h-0.5"
                      style={{ 
                        borderTop: '2px dotted #ffffff',
                        top: '-1px',
                        left: 0
                      }}
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: "100%" } : { width: "0%" }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 0.8,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  
                  {/* End Dot */}
                  <motion.div 
                    className="w-4 h-4 bg-white rounded-full z-10 relative flex-shrink-0"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 2.0,
                      ease: "easeOut"
                    }}
                  />
                </div>
                
                {/* Date Labels */}
                <div className="relative w-full mt-3">
                  <motion.span
                    className="absolute left-0 transform -translate-x-1/2 text-sm text-white/70"
                    style={{ left: '8px' }}
                    initial={{ y: 10, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.5,
                      ease: "easeOut"
                    }}
                  >
                    {experienceData.period.split(' - ')[0]}
                  </motion.span>
                  <motion.span
                    className="absolute right-0 transform translate-x-1/2 text-sm text-white/70"
                    style={{ right: '8px' }}
                    initial={{ y: 10, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 2.3,
                      ease: "easeOut"
                    }}
                  >
                    {experienceData.period.split(' - ')[1]}
                  </motion.span>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Description Blocks - Initially Hidden */}
          <div ref={descriptionsRef} className="opacity-0 space-y-8 max-w-4xl mx-auto">
            {experienceData.descriptions.map((desc, index) => (
              <div
                key={index}
                className="text-center"
              >
                <p className="text-lg text-white/80 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 