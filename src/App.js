import React, { useLayoutEffect, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DesignGallery from './components/DesignGallery';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import OtherProjects from './components/OtherProjects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import FieldServiceManagement from './components/FieldServiceManagement';
import ResumePage from './components/ResumePage';
import useDynamicFavicon from './hooks/useDynamicFavicon';
import { initGA, trackPageView, trackScrollDepth } from './utils/analytics';
import './App.css';

// Main Portfolio Component
const Portfolio = () => {
  // Initialize dynamic favicon functionality
  useDynamicFavicon();

  // Initialize Google Analytics
  useEffect(() => {
    // Initialize GA4
    const setupAnalytics = async () => {
      await initGA();
      // Track initial page view after GA is loaded
      trackPageView(window.location.pathname);
    };
    
    setupAnalytics();
    
    // Track scroll depth
    let scrollDepthTracked = {
      25: false,
      50: false,
      75: false,
      100: false
    };
    
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      // Track scroll milestones
      [25, 50, 75, 100].forEach(milestone => {
        if (scrollPercent >= milestone && !scrollDepthTracked[milestone]) {
          scrollDepthTracked[milestone] = true;
          trackScrollDepth(milestone);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
    });

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
      ScrollTrigger.killAll();
      gsap.ticker.remove(lenis.raf);
    };
  }, [])

  return (
    <div className="App font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <DesignGallery />
      <About />
      <Projects />
      <OtherProjects />
      <Experience />
      <Skills />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/field-service-management" element={<FieldServiceManagement />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
