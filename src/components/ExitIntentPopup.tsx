import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';

export const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (!hasShown && e.clientY <= 0) {
        setIsVisible(true);
        setHasShown(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

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
