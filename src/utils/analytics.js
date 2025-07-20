// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

// Helper function to access gtag
const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Load Google Analytics script dynamically
const loadGAScript = (measurementId) => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !measurementId) {
      resolve();
      return;
    }

    // Check if script is already loaded
    if (window.gtag) {
      resolve();
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    
    script.onload = () => {
      // Initialize dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      resolve();
    };

    script.onerror = () => {
      console.warn('Failed to load Google Analytics');
      resolve();
    };

    document.head.appendChild(script);
  });
};

// Initialize Google Analytics
export const initGA = async () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    try {
      await loadGAScript(GA_MEASUREMENT_ID);
      gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
      });
    } catch (error) {
      console.warn('Google Analytics initialization failed:', error);
    }
  }
};

// Track page views
export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID && window.gtag) {
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track custom events
export const trackEvent = (action, category = 'engagement', label = null, value = null) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID && window.gtag) {
    const eventParams = {
      event_category: category,
      event_label: label,
      value: value,
    };

    // Remove null values
    Object.keys(eventParams).forEach(key => {
      if (eventParams[key] === null) {
        delete eventParams[key];
      }
    });

    gtag('event', action, eventParams);
  }
};

// Track scroll depth
export const trackScrollDepth = (percentage) => {
  trackEvent('scroll_depth', 'engagement', `${percentage}%`, percentage);
};

// Track contact form interactions
export const trackContactInteraction = (action, method = null) => {
  trackEvent(action, 'contact', method);
};

// Track project views
export const trackProjectView = (projectName) => {
  trackEvent('project_view', 'portfolio', projectName);
};

// Track social media clicks
export const trackSocialClick = (platform) => {
  trackEvent('social_click', 'social_media', platform);
};

// Track resume download
export const trackResumeDownload = () => {
  trackEvent('resume_download', 'engagement', 'pdf_download');
};