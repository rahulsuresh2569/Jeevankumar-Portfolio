import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WaveAnimation from './WaveAnimation';

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const emailRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const email = emailRef.current;

    if (section && heading && subtitle && email) {
      // Animate elements on scroll
      gsap.fromTo([heading, subtitle, email], 
        { 
          opacity: 0,
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="bg-primary text-secondary px-10 flex flex-col items-center relative overflow-hidden py-24 md:pb-40"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 mb-20">
        
        {/* Main Heading with Gochi Hand font */}
        <h1 
          ref={headingRef}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-tight"
          style={{
            fontFamily: "'Gochi Hand', cursive",
            color: '#ffffff'
          }}
        >
          Interested to<br />
          Work Together
        </h1>
        
        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl font-medium text-secondary/80 mt-8"
        >
          Contact me
        </p>
        
        {/* Email Address */}
        <div ref={emailRef} className="mt-6">
      <a 
            href="mailto:jeevankumarr352@gmail.com"
            className="text-xl md:text-2xl lg:text-3xl font-medium text-secondary hover:text-accent transition-colors duration-300 underline decoration-secondary/30 hover:decoration-accent underline-offset-4"
          >
            jeevankumarr352@gmail.com
          </a>
        </div>
        
      </div>

      {/* Animated Wave Component */}
      <WaveAnimation />
    </section>
  );
};

export default Contact; 