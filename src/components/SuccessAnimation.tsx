import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';

interface SuccessAnimationProps {
  isVisible: boolean;
  message?: string;
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  isVisible,
  message = '¡Formulario enviado exitosamente!',
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="bg-slate-800/90 backdrop-blur-md border-2 border-primary/50 rounded-2xl p-8 max-w-md mx-4 relative overflow-hidden"
          >
            {/* Background sparkles */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="absolute top-4 right-4 w-6 h-6 text-primary/30" />
              <Sparkles className="absolute bottom-8 left-6 w-4 h-4 text-accent/30" />
              <Sparkles className="absolute top-12 left-12 w-5 h-5 text-primary/20" />
            </motion.div>

            {/* Success icon with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <CheckCircle className="w-20 h-20 text-primary relative z-10" />
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-3">
                ¡Éxito!
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {message}
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-primary text-sm mt-4"
              >
                Nos pondremos en contacto contigo pronto
              </motion.p>
            </motion.div>

            {/* Animated progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3, ease: 'linear' }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
