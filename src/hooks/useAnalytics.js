import { useCallback } from 'react';
import {
  trackEvent,
  trackContactInteraction,
  trackProjectView,
  trackSocialClick,
  trackResumeDownload
} from '../utils/analytics';

const useAnalytics = () => {
  // Track button clicks
  const trackButtonClick = useCallback((buttonName, location = null) => {
    trackEvent('button_click', 'engagement', `${buttonName}${location ? `_${location}` : ''}`);
  }, []);

  // Track navigation clicks
  const trackNavigation = useCallback((destination) => {
    trackEvent('navigation', 'engagement', destination);
  }, []);

  // Track form submissions
  const trackFormSubmission = useCallback((formName, success = true) => {
    trackContactInteraction(
      success ? 'form_submit_success' : 'form_submit_error',
      formName
    );
  }, []);

  // Track form field interactions
  const trackFormInteraction = useCallback((action, fieldName) => {
    trackContactInteraction(action, fieldName);
  }, []);

  // Track project interactions
  const trackProject = useCallback((projectName, action = 'view') => {
    if (action === 'view') {
      trackProjectView(projectName);
    } else {
      trackEvent(`project_${action}`, 'portfolio', projectName);
    }
  }, []);

  // Track social media interactions
  const trackSocial = useCallback((platform, action = 'click') => {
    if (action === 'click') {
      trackSocialClick(platform);
    } else {
      trackEvent(`social_${action}`, 'social_media', platform);
    }
  }, []);

  // Track resume/CV downloads
  const trackResume = useCallback((action = 'download') => {
    if (action === 'download') {
      trackResumeDownload();
    } else {
      trackEvent(`resume_${action}`, 'engagement');
    }
  }, []);

  // Track section views (for single-page apps)
  const trackSectionView = useCallback((sectionName) => {
    trackEvent('section_view', 'engagement', sectionName);
  }, []);

  // Track external link clicks
  const trackExternalLink = useCallback((url, linkText = null) => {
    trackEvent('external_link_click', 'engagement', linkText || url);
  }, []);

  // Track file downloads
  const trackFileDownload = useCallback((fileName, fileType = null) => {
    trackEvent('file_download', 'engagement', `${fileName}${fileType ? `.${fileType}` : ''}`);
  }, []);

  return {
    trackButtonClick,
    trackNavigation,
    trackFormSubmission,
    trackFormInteraction,
    trackProject,
    trackSocial,
    trackResume,
    trackSectionView,
    trackExternalLink,
    trackFileDownload
  };
};

export default useAnalytics; 