import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Remove local logo import and use Cloudinary URL
const cloudinaryImages = {
  logo: "https://res.cloudinary.com/dcua87ney/image/upload/v1752786123/final_logo_ytgxif.svg",
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const navRef = useRef(null);
  const containerRef = useRef(null);
  const resumeButtonCompactRef = useRef(null);
  const resumeButtonNormalRef = useRef(null);
  const logoCompactRef = useRef(null);
  const logoNormalRef = useRef(null);
  const navLinksCompactRef = useRef([]);
  const navLinksNormalRef = useRef(null);
  const contactCompactRef = useRef(null);
  const contactNormalRef = useRef(null);
  
  const navItems = [
    { href: '#about', label: 'About Me' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#testimonials', label: 'Testimonials' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Smooth scroll handler for navigation links
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // --- DESKTOP ANIMATION LOGIC ---
    const navbar = navRef.current;
    const container = containerRef.current;

    let compactAnimationTimeout;
    let normalAnimationTimeout;

    if (navbar && container) {
      gsap.set(navbar, {
        position: 'absolute',
        top: '2rem',
        width: "100%",
        left: "0",
        right: "0",
        background: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        border: 'none',
        boxShadow: 'none',
        padding: '0 0.5rem',
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: navbar,
        start: 'top top',
        onEnter: () => {
          gsap.set(navbar, {
            position: 'fixed',
            top: '0px',
            margin: "0",
            borderRadius: "0rem",
            padding: "0 0.5rem",
            border: "none",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "none",
            background: "rgba(17, 17, 17, 0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          });
        },
        onLeaveBack: () => {
          gsap.set(navbar, {
            position: 'absolute',
            top: '2rem',
            background: 'transparent',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            border: 'none',
          });
        }
      });

      ScrollTrigger.create({
        trigger: "#hero",
        start: "bottom top",
        end: "bottom top",
        onEnter: () => {
          clearTimeout(normalAnimationTimeout);
          setIsCompact(true);
          
            let targetWidth, targetLeft;
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1380) { // xl+
              targetWidth = "46%";
              targetLeft = "26.5%";
            } else if (screenWidth >= 1024) { // lg
              targetWidth = "65%";
              targetLeft = "17.5%";
            } else if (screenWidth >= 768) { // md
              targetWidth = "85%";
              targetLeft = "7.5%";
            } else { // md
              targetWidth = "95%";
              targetLeft = "2.5%";
            }

          gsap.to(navbar, {
              width: targetWidth,
              left: targetLeft,
              right: targetLeft,
            transform: "none",
            background: "rgba(16, 18, 27, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(113, 119, 144, 0.1)",
            padding: "0.25rem 0",
            marginTop: "1rem",
            borderRadius: "1rem",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            duration: 0.6,
            ease: "power3.out"
          });

          gsap.to(container, {
            padding: "0 0.75rem",
            duration: 0.6,
            ease: "power3.out"
          });

          const logoNormal = logoNormalRef.current;
          const navLinksNormal = navLinksNormalRef.current;
          const contactNormal = contactNormalRef.current;
          const resumeButtonNormal = resumeButtonNormalRef.current;

            if (logoNormal) gsap.to(logoNormal, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power3.out" });
            if (navLinksNormal) gsap.to(navLinksNormal, { opacity: 0, y: -20, duration: 0.3, ease: "power3.out" });
            if (contactNormal) gsap.to(contactNormal, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power3.out" });
            if (resumeButtonNormal) gsap.to(resumeButtonNormal, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power3.out" });

          compactAnimationTimeout = setTimeout(() => {
            const logoCompact = logoCompactRef.current;
            const navLinksCompact = navLinksCompactRef.current;
            const contactCompact = contactCompactRef.current;
            const resumeButtonCompact = resumeButtonCompactRef.current;

              if (logoCompact) gsap.fromTo(logoCompact, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" });
              if (navLinksCompact && navLinksCompact.length > 0) gsap.fromTo(navLinksCompact, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.05, stagger: 0.1, ease: "power3.out" });
              if (contactCompact) gsap.fromTo(contactCompact, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.5, ease: "power3.out" });
              if (resumeButtonCompact) gsap.fromTo(resumeButtonCompact, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.55, ease: "power3.out" });
          }, 250);
        },
        onLeaveBack: () => {
          clearTimeout(compactAnimationTimeout);
          setIsCompact(false);
          
          gsap.to(navbar, {
            width: "100%",
            left: "0",
            right: "0",
            transform: "none",
            background: "rgba(17, 17, 17, 0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "none",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "0 0.5rem",
            marginTop: "0rem",
            borderRadius: "0rem",
            boxShadow: "none",
            duration: 0.6,
            ease: "power3.out"
          });

          gsap.to(container, {
            maxWidth: "1152px",
            padding: "0 1.5rem",
            duration: 0.6,
            ease: "power3.out"
          });

          normalAnimationTimeout = setTimeout(() => {
            const logoNormal = logoNormalRef.current;
            const navLinksNormal = navLinksNormalRef.current;
            const contactNormal = contactNormalRef.current;

              if (logoNormal) gsap.to(logoNormal, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" });
              if (navLinksNormal) gsap.to(navLinksNormal, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" });
              if (contactNormal) gsap.to(contactNormal, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" });
          }, 250);
        }
      });

      gsap.to(navbar, { opacity: 1, duration: 0.3, delay: 0.1 });
    }

    return () => {
      clearTimeout(compactAnimationTimeout);
      clearTimeout(normalAnimationTimeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <nav 
      ref={navRef}
      className="bg-primary/95 backdrop-blur-md text-secondary fixed top-0 z-50 w-full md:bg-transparent md:backdrop-filter-none md:border-none"
      style={{ 
        willChange: 'background, padding, margin-top, border-radius, border, border-bottom, box-shadow, width, left, right, backdrop-filter, -webkit-backdrop-filter',
      }}
    >
              <div 
          ref={containerRef}
        className="max-w-6xl mx-auto px-4"
        style={{ willChange: 'max-width, padding' }}
        >
        {/* --- DESKTOP --- */}
        <div className={`hidden md:flex items-center ${
          isCompact ? 'h-12 justify-evenly' : 'h-14'
        }`}>
          
          {isCompact && (
            <>
              {/* Logo */}
              <motion.div 
                ref={logoCompactRef}
                className="flex-shrink-0 opacity-0"
                style={{ transform: 'scale(0.8)' }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')} className="flex items-center cursor-pointer">
                  <img src={cloudinaryImages.logo} alt="Jeevan Kumar Logo" className="h-8 w-8" />
                </a>
              </motion.div>

              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  ref={el => navLinksCompactRef.current[index] = el}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="font-medium text-secondary/80 hover:text-secondary relative group whitespace-nowrap text-sm opacity-0 cursor-pointer"
                  style={{ transform: 'translateY(20px)' }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-[600ms] group-hover:w-full"></span>
                </motion.a>
              ))}
              
              <motion.a
                ref={contactCompactRef}
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="px-5 py-2 text-sm font-medium bg-white/8 hover:bg-white/15 text-white border border-white/15 hover:border-white/30 backdrop-blur-sm rounded-full opacity-0 cursor-pointer"
                style={{ transform: 'scale(0.8)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Contact Me
              </motion.a>
              
              <div ref={resumeButtonCompactRef} className="opacity-0" style={{ transform: 'scale(0.8)' }}>
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-5 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Resume
                </motion.a>
              </div>
            </>
          )}
          
          {!isCompact && (
            <>
               <div className="flex items-center">
                 <motion.div 
                   ref={logoNormalRef}
                   className="flex-shrink-0"
                   whileHover={{ scale: 1.05 }}
                   transition={{ duration: 0.2 }}
                 >
                   <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')} className="flex items-center cursor-pointer">
                    <img src={cloudinaryImages.logo} alt="Jeevan Kumar Logo" className="h-8 w-8 lg:h-10 lg:w-10" />
                   </a>
                 </motion.div>
               </div>

               <div className="hidden md:flex items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                 <div 
                   ref={navLinksNormalRef}
                   className="flex items-center"
                   style={{ gap: '2rem' }}
                 >
                  {navItems.map((item) => (
                     <motion.a
                       key={item.href}
                       href={item.href}
                       onClick={(e) => handleSmoothScroll(e, item.href)}
                       className="font-medium text-secondary/80 hover:text-secondary relative group whitespace-nowrap text-sm cursor-pointer"
                       whileHover={{ y: -2 }}
                       transition={{ duration: 0.2 }}
                     >
                       {item.label}
                       <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-[600ms] group-hover:w-full"></span>
                     </motion.a>
                   ))}
                 </div>
               </div>

               <div className="flex items-center ml-auto">
                 <div 
                   className="flex items-center"
                   style={{ gap: '0.5rem' }}
                 >
                   <motion.a
                     ref={contactNormalRef}
                     href="#contact"
                     onClick={(e) => handleSmoothScroll(e, '#contact')}
                     className="px-6 py-2.5 text-sm font-medium bg-white/8 hover:bg-white/15 text-white border border-white/15 hover:border-white/30 backdrop-blur-sm rounded-full cursor-pointer"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     transition={{ duration: 0.2 }}
                   >
                     Contact Me
                   </motion.a>

                   <div 
                     ref={resumeButtonNormalRef}
                     className="opacity-0 pointer-events-none"
                     style={{ transform: 'scale(0.8)' }}
                   >
                     <motion.a
                       href="/resume.pdf"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-6 py-2.5 rounded-full text-sm font-medium shadow-lg hover:shadow-xl"
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       transition={{ duration: 0.2 }}
                     >
                       Resume
                     </motion.a>
                   </div>
                 </div>
               </div>
            </>
          )}
        </div>

        {/* --- MOBILE --- */}
        <div className="md:hidden flex items-center justify-between h-14">
           <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')} className="flex-shrink-0 cursor-pointer">
             <img src={cloudinaryImages.logo} alt="Jeevan Kumar Logo" className="h-8 w-8" />
           </a>
            <motion.button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-secondary/80 hover:bg-secondary/10 transition-colors duration-[600ms]"
              whileTap={{ scale: 0.95 }}
            >
             <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-secondary/10 mt-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="block px-3 py-2 text-base font-medium text-secondary/80 hover:text-secondary hover:bg-secondary/10 rounded-md transition-colors duration-[600ms] cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 text-base font-medium text-secondary/80 hover:text-secondary hover:bg-secondary/10 rounded-md transition-colors duration-[600ms]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                >
                  Resume
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar; 