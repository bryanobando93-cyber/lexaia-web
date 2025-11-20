import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Video, Users, Clock } from 'lucide-react';

interface AulaVirtualSectionProps {
  lmsUrl?: string; // URL for Skool community or other LMS platform
  isEnabled?: boolean; // Toggle to show iframe or coming soon
}

export const AulaVirtualSection: React.FC<AulaVirtualSectionProps> = ({
  lmsUrl = '',
  isEnabled = false
}) => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Cursos Interactivos',
      description: 'Accede a contenido educativo de alta calidad diseñado para maximizar tu aprendizaje en IA',
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: 'Clases en Vivo',
      description: 'Participa en sesiones en tiempo real con instructores expertos y resuelve dudas al instante',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Comunidad Activa',
      description: 'Conecta con otros estudiantes, comparte experiencias y colabora en proyectos',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Aprende a tu Ritmo',
      description: 'Acceso 24/7 al contenido para que estudies cuando mejor te convenga',
    },
  ];

  return (
    <section id="aula-virtual" className="relative py-24 overflow-hidden">
      {/* Lighter overlay to show neural network background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/35 via-slate-800/25 to-slate-900/35 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full border border-yellow-500/20 mb-6">
            <GraduationCap className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Educación Continua</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Aula Virtual{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Lexaia
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Aprende a implementar y optimizar soluciones de IA en tu empresa con nuestros cursos especializados
          </p>
        </motion.div>

        {isEnabled && lmsUrl ? (
          /* LMS Iframe - Ready for Moodle or other platforms */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden shadow-2xl"
          >
            <div className="aspect-video w-full">
              <iframe
                src={lmsUrl}
                title="Aula Virtual Lexaia"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ minHeight: '600px' }}
              />
            </div>
          </motion.div>
        ) : (
          /* Coming Soon State with Features */
          <>
            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-yellow-500/50 transition-all duration-300 group"
                >
                  <div className="text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Community Launch Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-8 md:p-12 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500/20 rounded-full mb-6">
                <GraduationCap className="w-10 h-10 text-yellow-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">¡Comunidad Activa!</h3>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Únete a nuestra comunidad exclusiva en Skool. Accede a cursos especializados, participa en sesiones en vivo con expertos, y conecta con otros profesionales implementando IA en sus negocios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.skool.com/lexaia-9467"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <GraduationCap className="w-5 h-5" />
                  Únete a la Comunidad Skool
                </a>
                <button
                  onClick={() => {
                    const element = document.getElementById('formulario');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  ¿Tienes preguntas? Contáctanos
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Integration Instructions (Hidden by default, for developer reference) */}
            {/*
            TO ENABLE SKOOL:
            1. Set up your Skool community at skool.com
            2. Current URL: skool.com/lexaia-9467
            3. Note: Skool does NOT support iframe embedding into external sites
            4. Alternative: Link directly to Skool community

            To link to Skool (recommended approach):
            - Update the button below to link to: https://www.skool.com/lexaia-9467
            - Use target="_blank" to open in new tab

            If using an embeddable LMS instead:
            - Update the component props in MainContainer.tsx:
              <AulaVirtualSection lmsUrl="https://your-lms-site.com" isEnabled={true} />
            - Ensure X-Frame-Options allows embedding
            - Use HTTPS for the LMS URL
            */}
          </>
        )}

        {/* Bottom CTA */}
        {!isEnabled && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mt-12"
          >
            <p className="text-slate-400 text-sm">
              ¿Tienes preguntas sobre nuestros cursos?{' '}
              <button
                onClick={() => {
                  const element = document.getElementById('formulario');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200 underline"
              >
                Contáctanos
              </button>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
