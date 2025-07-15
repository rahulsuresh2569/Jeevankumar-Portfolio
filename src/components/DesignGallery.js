import React, { useRef, useLayoutEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import design gallery images
import iPhone1 from '../assets/images/design-gallery/iPhone 14 Plus_1.png';
import iPhone2 from '../assets/images/design-gallery/iPhone 14 Plus_2.png';
import iPhone3 from '../assets/images/design-gallery/iPhone 14 Plus_3.png';
import iPad1 from '../assets/images/design-gallery/iPad_1.png';
import laptop from '../assets/images/design-gallery/Laptop.png';
import surfacePro from '../assets/images/design-gallery/Surface Pro.png';
import tablet from '../assets/images/design-gallery/Tablet.png';
import watch1 from '../assets/images/design-gallery/Watch_1.png';
import watch2 from '../assets/images/design-gallery/Watch_2.png';

const DesignGallery = () => {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);

  // Gallery data with responsive positioning for all screen sizes - memoized
  const galleryItems = useMemo(() => [
    {
      id: 1,
      src: iPad1, // Top left - AI explore tablet (background)
      alt: 'iPad Design',
      position: '-left-[2rem] sm:-left-[2rem] md:-left-[3rem] lg:-left-[4rem] xl:-left-[6rem]',
      spacing: 'top-2 sm:top-4 md:top-6 lg:top-8 xl:top-8',
      zIndex: 1
    },
    {
      id: 2,
      src: laptop, // Top center - dashboard laptop
      alt: 'Laptop Design',
      position: 'left-1/2 transform -translate-x-1/2',
      spacing: 'top-4 sm:top-6 md:top-8 lg:top-10 xl:top-12',
      zIndex: 3
    },
    {
      id: 3,
      src: watch1, // Top right - first watch
      alt: 'Watch Design 1',
      position: 'right-20 sm:right-24 md:right-32 lg:right-36 xl:right-40',
      spacing: 'top-2 sm:top-4 md:top-6 lg:top-16 xl:top-20',
      zIndex: 4
    },
    {
      id: 4,
      src: iPhone3, // Top right - analytics phone
      alt: 'iPhone Design 3',
      position: '-right-[1rem] sm:-right-[1rem] md:-right-[2rem] lg:-right-[3rem] xl:-right-[4rem]',
      spacing: 'top-8 sm:top-12 md:top-16 lg:top-24 xl:top-[9rem]',
      zIndex: 5
    },
    {
      id: 5,
      src: iPhone1, // Overlapping iPad - white phone with cards
      alt: 'iPhone Design 1',
      position: 'left-8 sm:left-12 md:left-14 lg:left-16 xl:left-10',
      spacing: 'top-16 sm:top-20 md:top-24 lg:top-32 xl:top-[22rem]',
      zIndex: 6
    },
    {
      id: 6,
      src: watch2, // Bottom left - second watch
      alt: 'Watch Design 2',
      position: 'left-1 sm:left-2 md:left-4 lg:left-6 xl:left-10',
      spacing: 'top-40 sm:top-52 md:top-[22rem] lg:top-[28rem] xl:top-[50rem]',
      zIndex: 7
    },
    {
      id: 7,
      src: iPhone2, // Bottom center-left - purple/blue phone
      alt: 'iPhone Design 2',
      position: 'left-[3rem] sm:left-[5rem] md:left-[8rem] lg:left-[10rem] xl:left-[14rem]',
      spacing: 'top-[15rem] sm:top-[20rem] md:top-[26rem] lg:top-[32rem] xl:top-[46rem]',
      zIndex: 8
    },
    {
      id: 8,
      src: tablet, // Bottom center-right - AINO tablet
      alt: 'Tablet Design',
      position: 'left-1/2 transform -translate-x-1/2',
      spacing: 'top-44 sm:top-[17rem] md:top-80 lg:top-[26rem] xl:top-[36rem]',
      zIndex: 4
    },
    {
      id: 9,
      src: surfacePro, // Bottom far right - dark analytics surface
      alt: 'Surface Pro Design',
      position: '-right-[7rem] sm:-right-[4rem] md:-right-[6rem] lg:-right-[8rem] xl:-right-[10rem]',
      spacing: 'top-[14rem] sm:top-[17rem] md:top-[24rem] lg:top-[32rem] xl:top-[46rem]',
      zIndex: 9
    }
  ], []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const images = imageRefs.current;

    if (section && images.length > 0) {
      const mm = gsap.matchMedia();

      // Desktop parallax (enhanced)
      mm.add("(min-width: 768px)", () => {
        images.forEach((image, index) => {
          if (image) {
            const item = galleryItems[index];
            const zIndex = item.zIndex;
            
            gsap.set(image, { 
              willChange: 'transform',
              force3D: true
            });

            const parallaxDistance = calculateParallaxDistance(zIndex, false);

            gsap.to(image, {
              y: parallaxDistance,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
                invalidateOnRefresh: true,
                refreshPriority: -1,
              },
            });
          }
        });
      });

      // Mobile parallax (optimized for performance and battery life)
      mm.add("(max-width: 767px)", () => {
        images.forEach((image, index) => {
          if (image) {
            const item = galleryItems[index];
            const zIndex = item.zIndex;
            
            // Enhanced mobile performance settings
            gsap.set(image, { 
              willChange: 'transform',
              force3D: true,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              // Additional mobile optimizations
              perspective: '1000px',
              WebkitTransform: 'translateZ(0)', // Force hardware acceleration
              transform: 'translateZ(0)'
            });

            const parallaxDistance = calculateParallaxDistance(zIndex, true);

            gsap.to(image, {
              y: parallaxDistance,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2.5, // Slower scrub for smoother mobile experience
                invalidateOnRefresh: true,
                refreshPriority: -1,
                fastScrollEnd: true, // Better performance on fast scrolls
                anticipatePin: 1, // Improve performance with pinned elements
              },
            });
          }
        });
      });

      return () => {
        mm.revert();
      };
    }
  }, [galleryItems]);

  const calculateParallaxDistance = (zIndex, isMobile = false) => {
    // Mobile parallax distances (reduced for better performance and subtlety)
    if (isMobile) {
      switch (zIndex) {
        case 9: return -120; // Surface Pro - fastest (reduced from -500)
        case 8: return -100; // iPhone2 - very fast (reduced from -420)
        case 7: return -85;  // Watch2 - fast (reduced from -350)
        case 6: return -70;  // iPhone1 - medium-fast (reduced from -280)
        case 5: return -55;  // iPhone3 - medium (reduced from -220)
        case 4: return -45;  // Watch1 & Tablet - medium-slow (reduced from -170)
        case 3: return -35;  // Laptop - slow (reduced from -120)
        case 1: return -25;  // iPad1 - slowest (reduced from -80)
        default: return -40;
      }
    }
    
    // Desktop parallax distances (original values)
    switch (zIndex) {
      case 9: return -500; // Surface Pro - fastest
      case 8: return -420; // iPhone2 - very fast
      case 7: return -350; // Watch2 - fast
      case 6: return -280; // iPhone1 - medium-fast
      case 5: return -220; // iPhone3 - medium
      case 4: return -170; // Watch1 & Tablet - medium-slow
      case 3: return -120; // Laptop - slow
      case 1: return -80;  // iPad1 - slowest
      default: return -150;
    }
  };

  return (
    <>
      <section 
        id="design-gallery" 
        ref={sectionRef}
        className="relative bg-primary overflow-hidden py-6 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24 min-h-[50vh] sm:min-h-[85vh] md:min-h-[110vh] lg:min-h-[130vh] xl:min-h-[160vh]"
        style={{
          // Mobile-specific optimizations
          WebkitOverflowScrolling: 'touch',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
      {/* Tilted Gallery Container */}
      <div 
        className="relative w-full h-full gallery-container"
        style={{
          transformOrigin: 'center center',
        }}
      >
        {/* Gallery Items Container */}
        <div className="relative w-full h-full">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute ${item.position} ${item.spacing}`}
              style={{ zIndex: item.zIndex || (10 - index) }}
            >
              <img
                ref={el => imageRefs.current[index] = el}
                src={item.src}
                alt={item.alt}
                className="w-auto h-auto object-cover"
                style={{
                  maxWidth: item.src.includes('Watch') ? 
                    'clamp(50px, 13vw, 230px)' : 
                  item.src.includes('iPhone') ? 
                    'clamp(80px, 15vw, 280px)' :
                  item.src.includes('iPad') ? 
                    'clamp(100px, 30vw, 470px)' :
                  item.src.includes('Tablet') ? 
                    'clamp(200px, 50vw, 820px)' :
                  item.src.includes('Laptop') ? 
                    'clamp(300px, 72vw, 1300px)' :
                    'clamp(220px, 35vw, 760px)'
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
    
    {/* Mobile-specific styling */}
    <style jsx>{`
      .gallery-container {
        transform: rotate(-1.5deg) translateY(-4%) scale(1.05);
      }
      
      @media (min-width: 768px) {
        .gallery-container {
          transform: rotate(-2deg) translateY(-8%) scale(1.1);
        }
      }
    `}</style>
    </>
  );
};

export default DesignGallery; 