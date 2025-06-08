import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-secondary text-primary p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#hero" className="text-xl font-bold">Jeevan</a>
        <div>
          <a href="#hero" className="px-3 hover:text-gray-300">Home</a>
          <a href="#about" className="px-3 hover:text-gray-300">About</a>
          <a href="#projects" className="px-3 hover:text-gray-300">Projects</a>
          <a href="#contact" className="px-3 hover:text-gray-300">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 