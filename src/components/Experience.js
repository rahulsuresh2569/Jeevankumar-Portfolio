import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import workSuitcaseImg from '../assets/images/work_suitcase.png';
import backgroundImg from '../assets/images/experience/background.png';

const Experience = () => {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const overlayRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const timelineStructureRef = useRef(null);
  const startDotRef = useRef(null);
  const endDotRef = useRef(null);
  const dottedLineRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const descriptionsRef = useRef(null);
  const descriptionRefs = useRef([]);

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
    const overlay = overlayRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    const timelineStructure = timelineStructureRef.current;
    const startDot = startDotRef.current;
    const endDot = endDotRef.current;
    const dottedLine = dottedLineRef.current;
    const startDate = startDateRef.current;
    const endDate = endDateRef.current;
    const descriptions = descriptionsRef.current;
    const individualDescriptions = descriptionRefs.current;

    if (section && background && overlay && heading && content && timelineStructure && startDot && endDot && dottedLine && startDate && endDate && descriptions && individualDescriptions.length > 0) {
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

      // Dark overlay animation - Tied to sticky section scroll progress
      gsap.fromTo(overlay,
        {
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Start at light overlay (40% black)
        },
        {
          backgroundColor: "#111111", // End at primary color (matching design system)
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1000vh", // Match the master timeline duration
            scrub: 1,
            onUpdate: (self) => {
              // Debug: Log overlay color progress
              console.log("Overlay color progress:", self.progress);
            }
          }
        }
      );

      // Create a master timeline for all content reveals
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1000vh", // Further extended for slower description reveals
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            // Debug: Log scroll progress
            console.log("Scroll progress:", self.progress);
          }
        }
      });

      // Phase 1: Heading fade-in (0% to 25% of scroll) - Slower
      masterTimeline.fromTo(heading,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 4.0, // Increased duration
        }, 0
      );

      // Phase 2: Company info fade-in (25% to 45% of scroll) - Slower
      masterTimeline.fromTo(content,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 3.2, // Increased duration
        }, 4.0
      );

      // Phase 3: Timeline structure fade-in (45% to 55% of scroll) - Slower
      masterTimeline.fromTo(timelineStructure,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 1.6, // Increased duration
        }, 7.2
      );

      // Phase 4: Timeline dots appear (55% to 60% of scroll) - Slower
      masterTimeline.fromTo([startDot, endDot],
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          ease: "back.out(1.7)",
          duration: 0.8, // Increased duration
          stagger: 0.4 // Increased stagger
        }, 8.8
      );

      // Phase 5: Date labels appear (60% to 65% of scroll) - Slower
      masterTimeline.fromTo([startDate, endDate],
        {
          y: 10,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 0.8, // Increased duration
          stagger: 0.3 // Increased stagger
        }, 10.0
      );

      // Phase 6: Dotted line animation (65% to 75% of scroll) - Much slower
      masterTimeline.fromTo(dottedLine,
        {
          width: "0%"
        },
        {
          width: "100%",
          ease: "power2.out",
          duration: 1.6, // Increased duration for slower line draw
        }, 11.1
      );

      // Phase 7: Description container fade-in (75% to 77% of scroll)
      masterTimeline.fromTo(descriptions,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.4,
        }, 12.7
      );

      // Phase 8: First description paragraph (75% to 80% of scroll) - Much slower
      masterTimeline.fromTo(individualDescriptions[0],
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 1.6, // Doubled duration for slower reveal
        }, 13.1
      );

      // Phase 9: Second description paragraph (80% to 85% of scroll) - Much slower
      masterTimeline.fromTo(individualDescriptions[1],
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 1.6, // Doubled duration for slower reveal
        }, 15.1
      );

      // Phase 10: Third description paragraph (85% to 90% of scroll) - Much slower
      masterTimeline.fromTo(individualDescriptions[2],
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 1.6, // Doubled duration for slower reveal
        }, 17.1
      );

      // Add a longer pause at the end to ensure all content is fully visible
      masterTimeline.to({}, { duration: 2.0 }, 18.7);
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
      <div ref={overlayRef} className="absolute inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} />

      {/* Content Window */}
      <div className="relative z-20 h-full flex items-center justify-center px-10 overflow-y-auto">
        <div className="text-center text-white max-w-6xl mx-auto py-20">
          
          {/* Main Heading - Initially Hidden */}
          <div ref={headingRef} className="opacity-0 mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-none">
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
              <div ref={timelineStructureRef} className="w-full max-w-2xl opacity-0">
                
                {/* Timeline Container */}
                <div className="relative flex items-center w-full">
                  
                  {/* Start Dot */}
                  <div 
                    ref={startDotRef}
                    className="w-4 h-4 bg-white rounded-full z-10 relative flex-shrink-0"
                    style={{ transform: 'scale(0)', opacity: 0 }}
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
                    <div 
                      ref={dottedLineRef}
                      className="absolute h-0.5"
                      style={{ 
                        borderTop: '2px dotted #ffffff',
                        top: '-1px',
                        left: 0,
                        width: '0%'
                      }}
                    />
                  </div>
                  
                  {/* End Dot */}
                  <div 
                    ref={endDotRef}
                    className="w-4 h-4 bg-white rounded-full z-10 relative flex-shrink-0"
                    style={{ transform: 'scale(0)', opacity: 0 }}
                  />
                </div>
                
                {/* Date Labels */}
                <div className="relative w-full mt-3">
                  <span
                    ref={startDateRef}
                    className="absolute left-0 transform -translate-x-1/2 text-sm text-white/70"
                    style={{ left: '8px', transform: 'translateY(10px)', opacity: 0 }}
                  >
                    {experienceData.period.split(' - ')[0]}
                  </span>
                  <span
                    ref={endDateRef}
                    className="absolute right-0 transform translate-x-1/2 text-sm text-white/70"
                    style={{ right: '8px', transform: 'translateY(10px)', opacity: 0 }}
                  >
                    {experienceData.period.split(' - ')[1]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Description Blocks - Initially Hidden */}
          <div ref={descriptionsRef} className="opacity-0 space-y-8 max-w-4xl mx-auto">
            {experienceData.descriptions.map((desc, index) => (
              <div
                key={index}
                ref={el => descriptionRefs.current[index] = el}
                className="text-center opacity-0"
                style={{ transform: 'translateY(20px)' }}
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