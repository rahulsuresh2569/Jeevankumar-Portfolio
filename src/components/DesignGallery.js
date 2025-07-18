import React, { useRef, useLayoutEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Remove local image imports and use size-optimized Cloudinary URLs
const cloudinaryImages = {
  iPhone1: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_380,h_760,c_limit,dpr_auto,fl_progressive/v1752850658/iphone-1_uv5sq9",
  iPhone2: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_380,h_760,c_limit,dpr_auto,fl_progressive/v1752850658/iphone-2_to256r",
  iPhone3: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_380,h_760,c_limit,dpr_auto,fl_progressive/v1752850656/iphone-3_navwyk",
  iPad1: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1940,h_1400,c_limit,dpr_auto,fl_progressive/v1752850356/ipad-1-new_pjonf0",
  laptop: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_3200,h_2000,c_limit,dpr_auto,fl_progressive/v1752850357/laptop_o1ysny",
  surfacePro: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1840,h_1200,c_limit,dpr_auto,fl_progressive/v1752850353/surfacepro_artprw",
  tablet: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_1640,h_1100,c_limit,dpr_auto,fl_progressive/v1752739914/Tablet_fu52nj",
  watch1: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_400,h_400,c_limit,dpr_auto,fl_progressive/v1752850659/watch-1_rwnbew",
  watch2: "https://res.cloudinary.com/dcua87ney/image/upload/f_auto,q_auto,w_400,h_400,c_limit,dpr_auto,fl_progressive/v1752850661/watch-2_ebvone",
};

const DesignGallery = () => {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);

  // Gallery data with responsive positioning for all screen sizes - memoized
  const galleryItems = useMemo(() => [
    {
      id: 1,
      src: cloudinaryImages.iPad1, // Top left - AI explore tablet (background)
      alt: 'iPad Design',
      position: '-left-[2rem] sm:-left-[2rem] md:-left-[3rem] lg:-left-[4rem] xl:-left-[6rem]',
      spacing: 'top-2 sm:top-4 md:top-6 lg:top-8 xl:top-8',
      zIndex: 1
    },
    {
      id: 2,
      src: cloudinaryImages.laptop, // Top center - dashboard laptop
      alt: 'Laptop Design',
      position: 'left-1/2 transform -translate-x-1/2',
      spacing: 'top-4 sm:top-6 md:top-8 lg:top-10 xl:top-12',
      zIndex: 3
    },
    {
      id: 3,
      src: cloudinaryImages.watch1, // Top right - first watch
      alt: 'Watch Design 1',
      position: 'right-20 sm:right-24 md:right-32 lg:right-36 xl:right-[18rem]',
      spacing: 'top-2 sm:top-4 md:top-6 lg:top-16 xl:top-20',
      zIndex: 4
    },
    {
      id: 4,
      src: cloudinaryImages.iPhone3, // Top right - analytics phone
      alt: 'iPhone Design 3',
      position: '-right-[0rem] sm:-right-[1rem] md:-right-[2rem] lg:-right-[0rem] xl:right-[3rem]',
      spacing: 'top-8 sm:top-12 md:top-16 lg:top-24 xl:top-[9rem]',
      zIndex: 5
    },
    {
      id: 5,
      src: cloudinaryImages.iPhone1, // Overlapping iPad - white phone with cards
      alt: 'iPhone Design 1',
      position: 'left-8 sm:left-12 md:left-14 lg:left-16 xl:left-24',
      spacing: 'top-16 sm:top-20 md:top-24 lg:top-32 xl:top-[32rem]',
      zIndex: 6
    },
    {
      id: 6,
      src: cloudinaryImages.watch2, // Bottom left - second watch
      alt: 'Watch Design 2',
      position: 'left-1 sm:left-2 md:left-4 lg:left-6 xl:left-10',
      spacing: 'top-40 sm:top-52 md:top-[22rem] lg:top-[28rem] xl:top-[60rem]',
      zIndex: 7
    },
    {
      id: 7,
      src: cloudinaryImages.iPhone2, // Bottom center-left - purple/blue phone
      alt: 'iPhone Design 2',
      position: 'left-[3rem] sm:left-[5rem] md:left-[8rem] lg:left-[10rem] xl:left-[22rem]',
      spacing: 'top-[15rem] sm:top-[20rem] md:top-[26rem] lg:top-[32rem] xl:top-[55rem]',
      zIndex: 8
    },
    {
      id: 8,
      src: cloudinaryImages.tablet, // Bottom center-right - AINO tablet
      alt: 'Tablet Design',
      position: 'left-1/2 transform -translate-x-1/2',
      spacing: 'top-44 sm:top-[17rem] md:top-80 lg:top-[26rem] xl:top-[36rem]',
      zIndex: 4
    },
    {
      id: 9,
      src: cloudinaryImages.surfacePro, // Bottom far right - dark analytics surface
      alt: 'Surface Pro Design',
      position: '-right-[7rem] sm:-right-[4rem] md:-right-[6rem] lg:-right-[8rem] xl:-right-[10rem]',
      spacing: 'top-[14rem] sm:top-[17rem] md:top-[24rem] lg:top-[32rem] xl:top-[54rem]',
      zIndex: 9
    }
  ], []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const images = imageRefs.current;

    if (section && images.length > 0) {
      const mm = gsap.matchMedia();

      // Initialize gallery container with mobile transform as default
      const galleryContainer = section.querySelector('.gallery-container');
      if (galleryContainer) {
        gsap.set(galleryContainer, {
          transform: 'rotate(-1.5deg) translateY(-4%) scale(1.05)'
        });
      }

      // Desktop parallax (enhanced)
      mm.add("(min-width: 768px)", () => {
        // Set desktop transform for gallery container
        const galleryContainer = section.querySelector('.gallery-container');
        if (galleryContainer) {
          gsap.set(galleryContainer, {
            transform: 'rotate(-2deg) translateY(-8%) scale(1.1)'
          });
        }

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
        // Set mobile transform for gallery container
        const galleryContainer = section.querySelector('.gallery-container');
        if (galleryContainer) {
          gsap.set(galleryContainer, {
            transform: 'rotate(-1.5deg) translateY(-4%) scale(1.05)'
          });
        }

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
      case 9: return -340; // Surface Pro - fastest
      case 8: return -320; // iPhone2 - very fast
      case 7: return -350; // Watch2 - fast
      case 6: return -180; // iPhone1 - medium-fast
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
        className="relative bg-primary min-h-[45vh] sm:min-h-[62vh] md:min-h-[70vh] lg:min-h-[85vh] xl:min-h-[140vh]"
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
                  maxWidth: item.src.includes('ipad-1-new') ? 
                    'clamp(100px, 26vw, 970px)' : 
                  item.src.includes('laptop_o1ysny') ? 
                    'clamp(200px, 65vw, 1600px)' :
                  item.src.includes('watch-1_rwnbew') ? 
                    'clamp(45px, 12vw, 200px)' :
                  item.src.includes('iphone-3_navwyk') ? 
                    'clamp(50px, 13vw, 190px)' :
                  item.src.includes('iphone-1_uv5sq9') ? 
                    'clamp(50px, 13vw, 190px)' :
                  item.src.includes('watch-2_ebvone') ? 
                    'clamp(55px, 14vw, 200px)' :
                  item.src.includes('iphone-2_to256r') ? 
                    'clamp(50px, 13vw, 190px)' :
                  item.src.includes('Tablet_fu52nj') ? 
                    'clamp(200px, 50vw, 820px)' :
                  item.src.includes('surfacepro_artprw') ? 
                    'clamp(240px, 34vw, 920px)' :
                    'clamp(220px, 35vw, 260px)'
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default DesignGallery; 