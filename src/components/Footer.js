import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    // Add Font Awesome CSS if not already loaded
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  }, []);
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      className="text-white pt-6 pb-16 sm:py-6 px-4 sm:px-6 md:px-8 lg:px-10 relative"
      style={{
        background: `linear-gradient(180deg, 
          rgb(26 26 26) 1%,
          rgb(27, 27, 27) 0.7%,
          rgba(15,15,15,0.99) 30%, 
          rgba(12,12,12,1) 60%,
          rgba(8,8,8,1) 100%
        )`,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:flex md:justify-between md:items-center">
          {/* Copyright Text */}
          <div className="text-left">
            <p className="text-sm lg:text-base font-medium">
              &copy; {currentYear} Jeevankumar. All Rights Reserved.
            </p>
            <p className="text-xs lg:text-sm text-gray-400 mt-1">
              Developed by <a 
                href="https://www.linkedin.com/in/rahulsuresh2569/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white font-medium hover:text-blue-400 transition-colors duration-300"
              >
                Rahul Suresh
              </a>
            </p>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            {/* LinkedIn Icon */}
            <a 
              href="https://www.linkedin.com/in/jeevankumark352-pro/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              aria-label="LinkedIn Profile"
            >
              <i className="fab fa-linkedin-in text-gray-800 text-xl"></i>
            </a>
            
            {/* Behance Icon */}
            <a 
              href="https://www.behance.net/jeevankumar352" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              aria-label="Behance Portfolio"
            >
              <i className="fab fa-behance text-gray-800 text-xl"></i>
            </a>
          </div>
        </div>
        
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Copyright Text - Center Aligned */}
          <div className="text-center mb-4">
            <p className="text-sm font-medium">
              &copy; {currentYear} Jeevankumar. All Rights Reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Developed by <a 
                href="https://www.linkedin.com/in/rahulsuresh2569/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white font-medium hover:text-blue-400 transition-colors duration-300"
              >
                Rahul Suresh
              </a>
            </p>
          </div>
          
          {/* Social Media Icons - Center Aligned */}
          <div className="flex items-center justify-center space-x-6">
            {/* LinkedIn Icon */}
            <a 
              href="https://www.linkedin.com/in/jeevankumark352-pro/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              aria-label="LinkedIn Profile"
            >
              <i className="fab fa-linkedin-in text-gray-800 text-xl"></i>
            </a>
            
            {/* Behance Icon */}
            <a 
              href="https://www.behance.net/jeevankumar352" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              aria-label="Behance Portfolio"
            >
              <i className="fab fa-behance text-gray-800 text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 