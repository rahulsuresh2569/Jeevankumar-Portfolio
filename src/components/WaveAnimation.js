import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const WaveAnimation = ({ 
  height = '140px', 
  containerHeight = 'h-32',
  gradientColors = {
    wave1: {
      start: 'rgba(255,255,255,0.15)',
      middle: 'rgba(255,255,255,0.08)',
      end: 'rgba(255, 255, 255, 0.03)'
    },
    wave2: {
      start: 'rgba(245,245,247,0.12)',
      middle: 'rgba(245,245,247,0.06)',
      end: 'rgba(255, 255, 255, 0.03)'
    }
  },
  waveConfig = {
    wave1: { amplitude: 15, frequency: 0.01, speed: 0.02, baseY: 60 },
    wave2: { amplitude: 20, frequency: 0.008, speed: 0.015, baseY: 80 }
  }
}) => {
  const waveRef = useRef(null);
  const wave1Ref = useRef(null);
  const wave2Ref = useRef(null);

  useLayoutEffect(() => {
    const wave = waveRef.current;
    const wave1 = wave1Ref.current;
    const wave2 = wave2Ref.current;

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
        const wave1Path = createWavePath(
          waveConfig.wave1.amplitude, 
          waveConfig.wave1.frequency, 
          time * waveConfig.wave1.speed, 
          waveConfig.wave1.baseY
        );
        const wave2Path = createWavePath(
          waveConfig.wave2.amplitude, 
          waveConfig.wave2.frequency, 
          time * waveConfig.wave2.speed + Math.PI, 
          waveConfig.wave2.baseY
        );
        
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
      };
    }
  }, [waveConfig, gradientColors]);

  return (
    <div className={`absolute bottom-0 left-0 w-full ${containerHeight} overflow-hidden`}>
      <svg 
        ref={waveRef}
        className="absolute bottom-0 left-0 w-full h-full opacity-0"
        style={{
          width: '100%',
          height: height,
          overflow: 'visible'
        }}
        viewBox={`0 0 ${typeof window !== 'undefined' ? window.innerWidth : 1200} 120`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.wave1.start} />
            <stop offset="50%" stopColor={gradientColors.wave1.middle} />
            <stop offset="100%" stopColor={gradientColors.wave1.end} />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.wave2.start} />
            <stop offset="50%" stopColor={gradientColors.wave2.middle} />
            <stop offset="100%" stopColor={gradientColors.wave2.end} />
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
  );
};

export default WaveAnimation;
