import React from 'react';
import { motion } from 'framer-motion';
import { BENEFICIOS_CUANTIFICABLES } from '../../data/constants';
import { TrendingUp, Clock, Shield, Zap, Calculator } from 'lucide-react';
import { DynamicIcon } from '../DynamicIcon';
import { SecondaryCTA } from '../SecondaryCTA';

export const BeneficiosSection: React.FC = () => {

  const additionalBenefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Escalabilidad Automática',
      description: 'Crece sin límites con infraestructura que se adapta a tu demanda'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Implementación Rápida',
      description: 'Resultados visibles desde la primera semana de implementación'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Seguridad Garantizada',
      description: 'Protección de datos de nivel empresarial con respaldos automáticos'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Optimización Continua',
      description: 'IA que aprende y mejora constantemente sus respuestas'
    }
  ];

  return (
    <section id="beneficios" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-6">
      {/* Neural network background visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/35 via-slate-800/25 to-slate-900/35" />

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
            Beneficios{' '}
            <span className="text-yellow-400">Cuantificables</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Resultados medibles que transforman tu operación y mejoran tu rentabilidad
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {BENEFICIOS_CUANTIFICABLES.map((beneficio, index) => (
            <motion.div
              key={beneficio.metric}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover:bg-slate-800/80"
            >
              <div className="text-yellow-400 mb-4 flex justify-center">
                <DynamicIcon name={beneficio.iconName} className="w-6 h-6" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {beneficio.metric}
              </div>
              <div className="text-slate-300 text-lg">
                {beneficio.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {additionalBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 hover:border-yellow-500/20 transition-all duration-300 hover:bg-slate-800/70"
            >
              <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400 flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ROI Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-8 text-center backdrop-blur-sm"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Retorno de Inversión Garantizado
          </h3>
          <p className="text-slate-300 text-lg mb-6 max-w-4xl mx-auto">
            Nuestros clientes experimentan un ROI promedio del 300% en los primeros 6 meses,
            con mejoras continuas en eficiencia operativa y satisfacción del cliente.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">6 meses</div>
              <div className="text-slate-300">Tiempo promedio para ROI positivo</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">300%</div>
              <div className="text-slate-300">ROI promedio en el primer año</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">98%</div>
              <div className="text-slate-300">Satisfacción de clientes</div>
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
            text="Calcular Mi ROI"
            icon={Calculator}
            variant="primary"
            location="beneficios_section"
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
