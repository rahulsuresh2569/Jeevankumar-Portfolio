import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-primary text-secondary p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#hero" className="text-xl font-bold">Jeevan</a>
        <div>
          <a href="#hero" className="px-3 hover:text-accent">Home</a>
          <a href="#about" className="px-3 hover:text-accent">About</a>
          <a href="#projects" className="px-3 hover:text-accent">Projects</a>
          <a href="#contact" className="px-3 hover:text-accent">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 