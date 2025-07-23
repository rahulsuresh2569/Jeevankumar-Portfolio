import React, { useEffect } from 'react';

const ResumePage = () => {
  useEffect(() => {
    // Set the page title
    document.title = 'Jeevankumar - Resume';
    
    // Update favicon to use your logo
    const existingFavicon = document.querySelector("link[rel*='icon']");
    if (existingFavicon) {
      existingFavicon.remove();
    }
    
    // Create new favicon link using your logo
    const link = document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = 'https://res.cloudinary.com/dcua87ney/image/upload/v1752786123/final_logo_ytgxif.svg';
    document.getElementsByTagName('head')[0].appendChild(link);
    
    // Also add a fallback for browsers that don't support SVG favicons
    const linkFallback = document.createElement('link');
    linkFallback.type = 'image/x-icon';
    linkFallback.rel = 'shortcut icon';
    linkFallback.href = 'https://res.cloudinary.com/dcua87ney/image/upload/v1752786123/final_logo_ytgxif.svg';
    document.getElementsByTagName('head')[0].appendChild(linkFallback);
  }, []);

  return (
    <div className="w-full h-screen">
      <iframe
        src="/Jeevankumark-Resume.pdf"
        className="w-full h-full"
        title="Jeevan Kumar Resume"
        frameBorder="0"
      />
    </div>
  );
};

export default ResumePage;
