import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { analyticsEvents } from '../lib/analytics';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '573165375761'; // Colombia
  const message = encodeURIComponent(
    '¡Hola! Me interesa conocer más sobre las soluciones de IA de lexaia. ¿Podrías ayudarme?'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleClick = () => {
    analyticsEvents.ctaClick('whatsapp_button', 'Contactar por WhatsApp');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contactar por WhatsApp"
    >
      {/* Pulsing rings */}
      <motion.div
        className="absolute inset-0 bg-green-500 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 bg-green-500 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />

      {/* Main button */}
      <div className="relative bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-2xl transition-colors duration-300">
        <MessageCircle className="w-6 h-6 text-white" />
      </div>

      {/* Tooltip */}
      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-xl border border-slate-700">
          <p className="font-bold">¿Necesitas ayuda?</p>
          <p className="text-xs text-slate-300">Habla con un agente humano especializado en IA</p>
          <div className="absolute right-full top-1/2 -translate-y-1/2">
            <div className="border-8 border-transparent border-r-slate-900" />
          </div>
        </div>
      </div>
    </motion.button>
  );
};
