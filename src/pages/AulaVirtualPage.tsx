import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AulaVirtualSection } from '../components/sections/AulaVirtualSection';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { NeuralNetworkBackground } from '../components/NeuralNetworkBackground';

export const AulaVirtualPage: React.FC = () => {
  return (
    <div className="w-full relative">
      {/* Fixed Neural Network Background */}
      <NeuralNetworkBackground className="fixed" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="min-h-screen pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
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
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
                  Aula <span className="text-primary">Virtual</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-300 max-w-3xl"
              >
                Aprende a implementar IA en tu negocio con nuestra comunidad exclusiva en Skool
              </motion.p>
            </div>

            {/* Aula Virtual Content */}
            <AulaVirtualSection />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};
