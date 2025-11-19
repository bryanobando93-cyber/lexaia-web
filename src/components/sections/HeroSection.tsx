import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onNavigateToForm: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToForm }) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-slate-900/40 pointer-events-none" />

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-shadow-lg"
        >
          Transforma tu Empresa con{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
            Soluciones Inteligentes
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-200 mb-8 max-w-4xl mx-auto leading-relaxed text-shadow"
        >
          Acelera el crecimiento de tu negocio con Inteligencia Artificial de última generación, diseñada para optimizar la comunicación y operaciones de tu empresa
        </motion.p>

        {/* Key Benefits Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-12"
        >
          <div className="flex items-center gap-2 text-yellow-400 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-yellow-500/20">
            <Bot className="w-6 h-6" />
            <span className="text-sm md:text-lg font-medium">IA Avanzada</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-yellow-500/20">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm md:text-lg font-medium">24/7 Disponible</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-yellow-500/20">
            <ArrowRight className="w-6 h-6" />
            <span className="text-sm md:text-lg font-medium">Escalable</span>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNavigateToForm}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
        >
          Comienza Tu Transformación
          <ArrowRight className="w-6 h-6" />
        </motion.button>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-300"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">100+</div>
            <div className="text-sm">Empresas Transformadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">300%</div>
            <div className="text-sm">ROI Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">98%</div>
            <div className="text-sm">Satisfacción</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
