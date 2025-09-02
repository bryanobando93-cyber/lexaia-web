import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, ArrowRight } from 'lucide-react';

interface SlideHeroProps {
  onNavigateToForm: () => void;
}

export const SlideHero: React.FC<SlideHeroProps> = ({ onNavigateToForm }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/hero-bg.jpg)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-yellow-500/20 backdrop-blur-sm rounded-xl border border-yellow-500/30">
              <Bot className="w-12 h-12 text-yellow-400" />
            </div>
            <span className="text-3xl font-bold text-white">AutomatizaIA</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-shadow-lg"
        >
          Transforma tu Empresa con{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
            Automatización Inteligente
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-200 mb-8 max-w-4xl mx-auto leading-relaxed text-shadow"
        >
          Revoluciona la comunicación y operaciones de tu negocio con tecnología de Inteligencia Artificial de última generación, diseñada para impulsar el éxito en cualquier industria
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
    </div>
  );
};