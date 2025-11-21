import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

const POPUP_STORAGE_KEY = 'lexaia_exit_popup_shown';
const POPUP_DISMISSED_KEY = 'lexaia_exit_popup_dismissed';

export const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [pageLoadTime] = useState(Date.now());
  const [showDelayTimeout, setShowDelayTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if popup was already shown or dismissed
    const popupShown = localStorage.getItem(POPUP_STORAGE_KEY);
    const popupDismissed = localStorage.getItem(POPUP_DISMISSED_KEY);

    // If shown in last 7 days or dismissed, don't show again
    if (popupShown) {
      const lastShown = parseInt(popupShown);
      const daysSinceShown = (Date.now() - lastShown) / (1000 * 60 * 60 * 24);
      if (daysSinceShown < 7) {
        setHasShown(true);
        return;
      }
    }

    if (popupDismissed === 'true') {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if user has been on page for at least 45 seconds
      const timeOnPage = Date.now() - pageLoadTime;
      const minimumTimeOnPage = 45000; // 45 seconds (increased from 30)

      // Only trigger if:
      // 1. Haven't shown before
      // 2. Mouse leaving through top (exit intent)
      // 3. User has been on page for at least 45 seconds
      if (!hasShown && e.clientY <= 0 && timeOnPage >= minimumTimeOnPage) {
        // Add a 3-second delay before showing popup
        const timeout = setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
          localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString());
        }, 3000); // 3 second delay

        setShowDelayTimeout(timeout);
      }
    };

    const handleMouseEnter = () => {
      // Cancel the delayed popup if mouse comes back
      if (showDelayTimeout) {
        clearTimeout(showDelayTimeout);
        setShowDelayTimeout(null);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (showDelayTimeout) {
        clearTimeout(showDelayTimeout);
      }
    };
  }, [hasShown, pageLoadTime, showDelayTimeout]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(POPUP_DISMISSED_KEY, 'true');
  };

  const handleExplore = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-slate-800 border border-primary/30 rounded-2xl p-8 max-w-md relative shadow-2xl">
          <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
          <div className="flex justify-center mb-4"><Sparkles className="w-16 h-16 text-primary" /></div>
          <h3 className="text-2xl font-bold text-white mb-4 text-center">¿Antes de irte?</h3>
          <p className="text-slate-300 mb-6 text-center">
            Si quieres explorar cómo la IA puede ayudar a tu empresa, estaremos encantados de mostrarte una <span className="text-primary font-semibold">demo personalizada</span>.
          </p>
          <div className="space-y-3">
            <button onClick={handleExplore} className="w-full bg-primary hover:bg-primary-dark text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors">
              Ver Opciones
            </button>
            <button onClick={handleClose} className="w-full text-slate-400 hover:text-white px-6 py-2 rounded-lg font-medium transition-colors">
              No, gracias
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
