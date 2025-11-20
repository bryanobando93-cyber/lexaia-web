import React from 'react';
import { motion } from 'framer-motion';
import { SECTORES_OBJETIVO } from '../../data/constants';
import { ShoppingCart, Building2, Factory, Heart, GraduationCap, DollarSign, ArrowRight, Lightbulb } from 'lucide-react';
import { SecondaryCTA } from '../SecondaryCTA';

const sectorIcons = {
  'Retail y E-commerce': <ShoppingCart className="w-8 h-8" />,
  'Servicios Profesionales': <Building2 className="w-8 h-8" />,
  'Manufactura e Industria': <Factory className="w-8 h-8" />,
  'Salud y Bienestar': <Heart className="w-8 h-8" />,
  'Educación': <GraduationCap className="w-8 h-8" />,
  'Finanzas y Seguros': <DollarSign className="w-8 h-8" />
};

export const SectoresSection: React.FC = () => {
  return (
    <section id="sectores" className="min-h-screen flex items-center justify-center relative py-20 px-6">
      {/* Lighter overlay to show neural network background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/35 via-slate-800/25 to-slate-900/35 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sectores que{' '}
            <span className="text-yellow-400">Transformamos</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Soluciones especializadas de IA adaptadas a las necesidades únicas de cada industria
          </p>
        </motion.div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SECTORES_OBJETIVO.map((sector, index) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-yellow-500/30 transition-all duration-300 group cursor-pointer"
            >
              {/* Icon and Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400 group-hover:bg-yellow-500/30 transition-colors">
                  {sectorIcons[sector.name as keyof typeof sectorIcons] || <Building2 className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {sector.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-slate-300 mb-4 leading-relaxed">
                {sector.description}
              </p>

              {/* Use Cases */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-yellow-400 uppercase tracking-wide">
                  Casos de Uso:
                </h4>
                {sector.useCases.map((useCase, useCaseIndex) => (
                  <div key={useCaseIndex} className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{useCase}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Sectors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿Tu Sector No Está Listado?
          </h3>
          <p className="text-slate-300 text-lg mb-6 max-w-3xl mx-auto">
            Trabajamos con empresas de todas las industrias. Nuestras soluciones de IA se adaptan
            a cualquier modelo de negocio y necesidad operativa.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-slate-300 text-sm">
            <div>Turismo</div>
            <div>Logística</div>
            <div>Agricultura</div>
            <div>Entretenimiento</div>
            <div>Deportes</div>
            <div>Gobierno</div>
            <div>ONGs</div>
            <div>Consultoría</div>
            <div>Marketing</div>
            <div>Arquitectura</div>
            <div>Legal</div>
            <div>Y muchos más...</div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Solución Personalizada para Tu Industria
            </h3>
            <p className="text-slate-300 text-lg mb-6">
              Cada sector tiene desafíos únicos. Desarrollamos soluciones de IA especializadas
              que abordan tus necesidades específicas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg mb-2">Análisis</div>
                <p className="text-slate-300">Evaluamos tus procesos actuales</p>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg mb-2">Diseño</div>
                <p className="text-slate-300">Creamos solución personalizada</p>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg mb-2">Implementación</div>
                <p className="text-slate-300">Desplegamos y optimizamos</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-8"
        >
          <SecondaryCTA
            text="Ver Solución para Mi Sector"
            icon={Lightbulb}
            variant="accent"
            location="sectores_section"
            onClick={() => {
              const formularioElement = document.getElementById('formulario');
              if (formularioElement) {
                formularioElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};
