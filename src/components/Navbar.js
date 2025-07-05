import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoSvg from '../assets/images/navbar/logo.svg';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const navRef = useRef(null);
  const containerRef = useRef(null);
  const resumeButtonRef = useRef(null);
  const navLinksRef = useRef(null);
  
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const navbar = navRef.current;
    const container = containerRef.current;
    const resumeButton = resumeButtonRef.current;
    const navLinks = navLinksRef.current;

    if (navbar && container) {
      // Initial state - Set navbar to full width without glassmorphism
      gsap.set(navbar, {
        width: "100%",
        left: "0",
        right: "0",
        transform: "none",
        position: "fixed",
        top: "0px",
        margin: "0",
        borderRadius: "0rem",
        border: "none",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "none",
        background: "rgba(17, 17, 17, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)"
      });

      // Create ScrollTrigger for navbar shrinking on scroll (similar to reference but reversed)
      ScrollTrigger.create({
        trigger: "#hero",
        start: "bottom top",
        end: "bottom top",
        onEnter: () => {
          setIsCompact(true);
          
          // Animate to compact/shrunk state with glassmorphism effect
          gsap.to(navbar, {
            width: "70%",
            left: "15%",
            right: "15%",
            transform: "none",
            background: "rgba(16, 18, 27, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(113, 119, 144, 0.25)",
            padding: "0.5rem 1rem",
            marginTop: "1rem",
            borderRadius: "2rem",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            duration: 0.4,
            ease: "power2.out"
          });

          gsap.to(container, {
            maxWidth: "900px",
            padding: "0 2rem",
            duration: 0.4,
            ease: "power2.out"
          });

          // Animate navigation links spacing
          if (navLinks) {
            gsap.to(navLinks, {
              gap: "1.5rem",
              duration: 0.4,
              ease: "power2.out"
            });
          }

          // Animate Resume button in
          if (resumeButton) {
            gsap.fromTo(resumeButton, 
              { opacity: 0, scale: 0.8, x: 20 },
              { opacity: 1, scale: 1, x: 0, duration: 0.3, delay: 0.2 }
            );
          }
        },
        onLeaveBack: () => {
          setIsCompact(false);
          
          // Animate back to full width state (remove glassmorphism)
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
            padding: "0 1rem",
            marginTop: "0rem",
            borderRadius: "0rem",
            boxShadow: "none",
            duration: 0.4,
            ease: "power2.out"
          });

          gsap.to(container, {
            maxWidth: "1280px",
            padding: "0 1rem 0 2rem",
            duration: 0.4,
            ease: "power2.out"
          });

          // Animate navigation links spacing back
          if (navLinks) {
            gsap.to(navLinks, {
              gap: "3rem",
              duration: 0.4,
              ease: "power2.out"
            });
          }

          // Animate Resume button out
          if (resumeButton) {
            gsap.to(resumeButton, {
              opacity: 0,
              scale: 0.8,
              x: 20,
              duration: 0.2
            });
          }
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <nav 
      ref={navRef}
      className="bg-primary/95 backdrop-blur-md text-secondary fixed top-0 z-50 border-b border-secondary/10 transition-all duration-300"
      style={{ 
        willChange: 'background, padding, margin-top, border-radius, border, border-bottom, box-shadow, width, left, right, backdrop-filter, -webkit-backdrop-filter',
        width: '100%',
        left: '0',
        right: '0'
      }}
    >
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300"
        style={{ willChange: 'max-width, padding' }}
      >
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isCompact ? 'h-14' : 'h-16 lg:h-20'
        }`}>
          
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <a href="#hero" className="flex items-center">
              <img 
                src={logoSvg} 
                alt="Jeevan Kumar Logo" 
                className={`transition-all duration-300 ${
                  isCompact ? 'h-8 w-8' : 'h-8 w-8 lg:h-10 lg:w-10'
                }`}
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div 
              ref={navLinksRef}
              className="flex items-center"
              style={{ gap: '3rem' }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-sm lg:text-base font-medium text-secondary/80 hover:text-secondary transition-colors duration-300 relative group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-3">
            {/* Contact Me Button */}
            <motion.a
              href="#contact"
              className={`rounded-full font-medium transition-all duration-300 ${
                isCompact 
                  ? 'px-4 py-2 text-sm lg:text-base bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-sm' 
                  : 'px-4 py-2 lg:px-6 lg:py-2.5 text-sm lg:text-base bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20 hover:border-secondary/40 backdrop-blur-sm'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Contact Me
            </motion.a>

            {/* Resume Button - Only visible in compact state */}
            <div 
              ref={resumeButtonRef}
              className={`transition-all duration-300 ${isCompact ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                             <motion.a
                 href="/resume.pdf"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 hover:from-yellow-500/90 hover:to-yellow-600/90 text-black px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm border border-yellow-300/20"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 transition={{ duration: 0.2 }}
               >
                 Resume
               </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-secondary/80 hover:bg-secondary/10 transition-colors duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-secondary/10 mt-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 text-base font-medium text-secondary/80 hover:text-secondary hover:bg-secondary/10 rounded-md transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                {/* Mobile Resume Button */}
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mx-3 mt-4 bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 hover:from-yellow-500/90 hover:to-yellow-600/90 text-black px-4 py-2 rounded-full text-center font-medium transition-all duration-300 backdrop-blur-sm border border-yellow-300/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
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