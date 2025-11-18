import React from 'react';
import { motion } from 'framer-motion';
import { SERVICIOS_PRINCIPALES } from '../../data/constants';
import { CheckCircle, Eye } from 'lucide-react';
import { DynamicIcon } from '../DynamicIcon';
import { SecondaryCTA } from '../SecondaryCTA';

export const ServiciosSection: React.FC = () => {
  return (
    <section id="servicios" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-6">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/automation-process.jpg)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Servicios de Automatización con{' '}
            <span className="text-yellow-400">IA</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Soluciones integrales que transforman la manera en que tu empresa opera, comunica y escala
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICIOS_PRINCIPALES.map((servicio, index) => (
            <motion.div
              key={servicio.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-yellow-500/30 transition-all duration-300 group hover:bg-slate-800/80"
            >
              {/* Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400 group-hover:bg-yellow-500/30 transition-colors">
                  <DynamicIcon name={servicio.iconName} className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {servicio.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                {servicio.description}
              </p>

              {/* Benefits */}
              <div className="space-y-3">
                {servicio.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">
              Infraestructura Tecnológica Avanzada
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300">
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg mb-2">Base de Datos</div>
                <p>Gestión completa con respaldos automáticos y CRM integrado</p>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg mb-2">Automatización</div>
                <p>Flujos inteligentes que conectan todas tus plataformas</p>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg mb-2">Tecnología</div>
                <p>IA avanzada con aprendizaje continuo y alta disponibilidad</p>
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
            text="Ver Casos de Éxito"
            icon={Eye}
            variant="outlined"
            location="servicios_section"
            onClick={() => {
              const casosUsoElement = document.getElementById('casos-uso');
              if (casosUsoElement) {
                casosUsoElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};
