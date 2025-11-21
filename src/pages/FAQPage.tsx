import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQSection } from '../components/sections/FAQSection';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

// Lazy load heavy three.js background
const NeuralNetworkBackground = lazy(() => import('../components/NeuralNetworkBackground').then(m => ({ default: m.NeuralNetworkBackground })));

export const FAQPage: React.FC = () => {
  return (
    <div className="w-full relative">
      {/* Fixed Neural Network Background - Lazy loaded for performance */}
      <Suspense fallback={<div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />}>
        <NeuralNetworkBackground className="fixed" />
      </Suspense>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="min-h-screen pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-6">
            {/* Header */}
            <div className="mb-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio
              </Link>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="p-3 bg-primary/20 rounded-lg">
                  <HelpCircle className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
                  Preguntas <span className="text-primary">Frecuentes</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-300 max-w-3xl"
              >
                Encuentra respuestas a las preguntas más comunes sobre nuestros servicios de IA
              </motion.p>
            </div>

            {/* FAQ Content */}
            <FAQSection />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};
