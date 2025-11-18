// Google Analytics 4 Configuration and Event Tracking

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize gtag if not already present
export const initGA = (measurementId: string) => {
  if (typeof window === 'undefined') return;

  // Create gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
  });
};

// Event tracking functions
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// Specific event trackers
export const analyticsEvents = {
  // Form events
  formStart: (formType: string) => {
    trackEvent('form_start', { form_type: formType });
  },

  formStepComplete: (step: number) => {
    trackEvent('form_step_complete', { step });
  },

  formSubmit: (formType: string) => {
    trackEvent('form_submit', { form_type: formType });
  },

  // CTA events
  ctaClick: (ctaLocation: string, ctaText: string) => {
    trackEvent('cta_click', {
      cta_location: ctaLocation,
      cta_text: ctaText,
    });
  },

  // Navigation events
  navigationClick: (destination: string) => {
    trackEvent('navigation_click', { destination });
  },

  // Scroll events
  scrollDepth: (depth: string) => {
    trackEvent('scroll_depth', { depth });
  },

  // Section view events
  sectionView: (sectionName: string) => {
    trackEvent('section_view', { section_name: sectionName });
  },

  // Download events
  downloadClick: (fileName: string) => {
    trackEvent('file_download', { file_name: fileName });
  },

  // Video events
  videoPlay: (videoTitle: string) => {
    trackEvent('video_play', { video_title: videoTitle });
  },

  // External link clicks
  externalLinkClick: (url: string, linkText: string) => {
    trackEvent('external_link_click', { url, link_text: linkText });
  },

  // Chat events
  chatOpen: () => {
    trackEvent('chat_open');
  },

  chatMessageSent: (messageLength: number) => {
    trackEvent('chat_message_sent', { message_length: messageLength });
  },

  chatClosed: () => {
    trackEvent('chat_closed');
  },
};

// Scroll depth tracking
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  const trackedDepths = new Set<number>();
  const depths = [25, 50, 75, 100];

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;

    depths.forEach((depth) => {
      if (scrolled >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth);
        analyticsEvents.scrollDepth(`${depth}%`);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};
