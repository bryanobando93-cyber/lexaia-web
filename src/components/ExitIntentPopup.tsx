import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';

export const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [pageLoadTime] = useState(Date.now());
  const [showDelayTimeout, setShowDelayTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Check if user has been on page for at least 30 seconds
      const timeOnPage = Date.now() - pageLoadTime;
      const minimumTimeOnPage = 30000; // 30 seconds

      // Only trigger if:
      // 1. Haven't shown before
      // 2. Mouse leaving through top (exit intent)
      // 3. User has been on page for at least 30 seconds
      if (!hasShown && e.clientY <= 0 && timeOnPage >= minimumTimeOnPage) {
        // Add a 3-second delay before showing popup
        const timeout = setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
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

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-slate-800 border-2 border-primary rounded-2xl p-8 max-w-md relative">
          <button onClick={() => setIsVisible(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
          <div className="flex justify-center mb-4"><Gift className="w-16 h-16 text-primary" /></div>
          <h3 className="text-2xl font-bold text-white mb-4 text-center">¡Espera! Oferta Especial</h3>
          <p className="text-slate-300 mb-6 text-center">Obtén un <span className="text-primary font-bold">demo gratuito de 1 mes</span> sin compromiso. Prueba todas las funcionalidades de lexaia.</p>
          <button onClick={() => { document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' }); setIsVisible(false); }} className="w-full bg-primary hover:bg-primary-dark text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors">Comenzar Demo Gratuito</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
