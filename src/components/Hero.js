import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center bg-secondary text-primary p-10">
      <h1 className="text-5xl md:text-7xl font-bold mb-4">
        Jeevan Kumar
      </h1>
      <p className="text-xl md:text-2xl mb-8">
        UI/UX Designer & Frontend Developer
      </p>
      <p className="max-w-2xl text-lg md:text-xl mb-10">
        Crafting engaging and user-centric digital experiences. Currently seeking new opportunities to leverage 2 years of expertise in UI/UX design.
      </p>
      <a 
        href="#projects" 
        className="bg-primary text-secondary font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition duration-300 text-lg"
      >
        View My Work
      </a>
    </section>
  );
};

export default Hero; 