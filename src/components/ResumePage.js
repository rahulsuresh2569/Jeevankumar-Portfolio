import React, { useEffect, useState } from 'react';

const ResumePage = () => {
  const [pdfError, setPdfError] = useState(false);

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

  const handleIframeError = () => {
    setPdfError(true);
  };

  if (pdfError) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Resume</h1>
          <p className="text-gray-600 mb-6">Unable to display PDF in browser.</p>
          <a
            href="/Jeevankumar-Resume.pdf"
            download="Jeevankumar-Resume.pdf"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Download Resume PDF
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <iframe
        src="/Jeevankumark-Resume.pdf"
        className="w-full h-full"
        title="Jeevan Kumar Resume"
        frameBorder="0"
        onError={handleIframeError}
      />
    </div>
  );
};

export default ResumePage;
