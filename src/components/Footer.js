import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-10 text-center">
      <p>&copy; {currentYear} Jeevan Kumar. All rights reserved.</p>
      <p className="text-sm mt-2">Aspiring to create impactful digital experiences.</p>
      {/* Add social media links here later */}
    </footer>
  );
};

export default Footer; 