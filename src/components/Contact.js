import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const emailRef = useRef(null);
  const waveRef = useRef(null);
  const wave1Ref = useRef(null);
  const wave2Ref = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const email = emailRef.current;
    const wave = waveRef.current;
    const wave1 = wave1Ref.current;
    const wave2 = wave2Ref.current;

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

    // Wave Animation
    if (wave && wave1 && wave2) {
      const waveWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      
      // Create wave path data
      const createWavePath = (amplitude, frequency, phase, baseY) => {
        let path = `M 0 ${baseY}`;
        
        for (let x = 0; x <= waveWidth; x += 4) {
          const y = baseY + amplitude * Math.sin((x * frequency) + phase);
          path += ` L ${x} ${y}`;
        }
        
        // Close the path to create filled area
        path += ` L ${waveWidth} 120 L 0 120 Z`;
        return path;
      };

      // Set initial wave paths
      const updateWavePaths = (time = 0) => {
        const wave1Path = createWavePath(15, 0.01, time * 0.02, 60);
        const wave2Path = createWavePath(20, 0.008, time * 0.015 + Math.PI, 80);
        
        wave1.setAttribute('d', wave1Path);
        wave2.setAttribute('d', wave2Path);
      };

      // Set initial visibility
      gsap.set(wave, { opacity: 1 });

      // Create continuous wave animation
      let animationTime = 0;
      let animationId;
      const animateWaves = () => {
        animationTime += 1;
        updateWavePaths(animationTime);
        animationId = requestAnimationFrame(animateWaves);
      };

      // Start the wave animation
      animateWaves();

      // Create opacity animation for depth effect
      let fadeTimeline = gsap.timeline();
      fadeTimeline.to(wave1, {
        opacity: 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 4
      })
      .to(wave2, {
        opacity: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 3
      }, 0.5);

      // Handle window resize
      const handleResize = () => {
        const newWidth = window.innerWidth;
        wave.setAttribute('viewBox', `0 0 ${newWidth} 120`);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        fadeTimeline.kill();
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === section) {
            trigger.kill();
          }
        });
      };
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
      className="bg-primary text-secondary px-10 flex flex-col items-center relative overflow-hidden py-24 md:py-32"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        
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
            href="mailto:jeevankumarkr352@gmail.com"
            className="text-xl md:text-2xl lg:text-3xl font-medium text-secondary hover:text-accent transition-colors duration-300 underline decoration-secondary/30 hover:decoration-accent underline-offset-4"
          >
            jeevankumarkr352@gmail.com
          </a>
        </div>
        
      </div>

      {/* Animated Wave SVG */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
        <svg 
          ref={waveRef}
          className="absolute bottom-0 left-0 w-full h-full opacity-0"
          style={{
            width: '100%',
            height: '120px',
            overflow: 'visible'
          }}
          viewBox={`0 0 ${typeof window !== 'undefined' ? window.innerWidth : 1200} 120`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(245,245,247,0.12)" />
              <stop offset="50%" stopColor="rgba(245,245,247,0.06)" />
              <stop offset="100%" stopColor="rgba(245,245,247,0.01)" />
            </linearGradient>
          </defs>
          
          {/* First Wave Layer - Back */}
          <path 
            ref={wave2Ref}
            className="wave-shape"
            style={{
              fill: 'url(#waveGradient2)',
              opacity: 0.8
            }}
          />
          
          {/* Second Wave Layer - Front */}
          <path 
            ref={wave1Ref}
            className="wave-shape"
            style={{
              fill: 'url(#waveGradient1)',
              opacity: 0.9
            }}
          />
        </svg>
      </div>
    </section>
  );
};

export default Contact; 