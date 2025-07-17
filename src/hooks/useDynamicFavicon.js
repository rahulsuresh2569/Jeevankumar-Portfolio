import { useEffect } from 'react';

// Cloudinary URLs for favicons
const faviconUrls = {
  light: "https://res.cloudinary.com/dcua87ney/image/upload/v1752786500/fav_light_mode_hecvm1.svg", // Light mode favicon
  dark: "https://res.cloudinary.com/dcua87ney/image/upload/v1752786500/fav_dark_mode_geuiyx.svg"   // Dark mode favicon
};

const useDynamicFavicon = () => {
  useEffect(() => {
    // Function to update favicon
    const updateFavicon = (isDarkMode) => {
      const favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
      const faviconUrl = isDarkMode ? faviconUrls.dark : faviconUrls.light;
      
      if (favicon) {
        favicon.href = faviconUrl;
      } else {
        // Create favicon link if it doesn't exist
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = faviconUrl;
        document.head.appendChild(newFavicon);
      }
    };

    // Check initial color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    updateFavicon(mediaQuery.matches);

    // Listen for changes in color scheme preference
    const handleChange = (e) => {
      updateFavicon(e.matches);
    };

    // Add event listener for color scheme changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
};

export default useDynamicFavicon; 