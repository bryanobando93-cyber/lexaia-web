import React from 'react';
import { motion } from 'framer-motion';
import { LeadFormMultiStep } from '../LeadFormMultiStep';
import { LeadFormData } from '../../types';
import { Mail, Phone, MessageSquare } from 'lucide-react';

interface FormularioSectionProps {
  onSubmit: (data: LeadFormData) => Promise<void>;
}

export const FormularioSection: React.FC<FormularioSectionProps> = ({ onSubmit }) => {
  return (
    <section id="formulario" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-6">
      {/* Neural network background visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/35 via-slate-800/25 to-slate-900/35" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Comienza Tu{' '}
            <span className="text-primary">Transformación</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Completa el formulario y nuestro equipo de expertos se pondrá en contacto contigo
            para diseñar una solución personalizada de IA para tu empresa
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                ¿Por qué elegirnos?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-slate-300">
                    <strong className="text-white">Experiencia Comprobada:</strong> Más de 100 empresas transformadas exitosamente
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-slate-300">
                    <strong className="text-white">Tecnología Avanzada:</strong> IA de última generación con aprendizaje continuo
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-slate-300">
                    <strong className="text-white">Soporte Completo:</strong> Acompañamiento desde implementación hasta optimización
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-slate-300">
                    <strong className="text-white">ROI Garantizado:</strong> Resultados medibles desde la primera semana
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-4">
                Otros Canales de Contacto
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-slate-300">contacto@lexaia.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-slate-300">+57 (316) 537-5761</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span className="text-slate-300">WhatsApp: +57 (316) 537-5761</span>
                </div>
              </div>
            </div>

            {/* Process Timeline */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="text-xl font-bold text-white mb-4">
                Qué pasa después de enviar el formulario:
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <span className="text-slate-300">Contacto en menos de 24 horas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span className="text-slate-300">Análisis gratuito de tus necesidades</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <span className="text-slate-300">Propuesta personalizada</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <span className="text-slate-300">Implementación y transformación</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <LeadFormMultiStep onSubmit={onSubmit} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
