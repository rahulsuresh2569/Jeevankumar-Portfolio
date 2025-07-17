import React, { useLayoutEffect } from 'react';
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
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useDynamicFavicon from './hooks/useDynamicFavicon';
import './App.css'; // Keep App.css for any global App-specific styles if needed

function App() {
  // Initialize dynamic favicon functionality
  useDynamicFavicon();

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
      <Experience />
      <Skills />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
