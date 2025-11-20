import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  rating: number;
  testimonial: string;
  result: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Carlos Ramírez',
    role: 'CEO',
    company: 'TechCorp Solutions',
    rating: 5,
    testimonial:
      'lexaia transformó completamente nuestra atención al cliente. El chatbot maneja el 80% de las consultas automáticamente, permitiendo que nuestro equipo se enfoque en casos complejos.',
    result: '80% reducción en tiempo de respuesta',
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    name: 'María González',
    role: 'Directora de Operaciones',
    company: 'Retail Express',
    rating: 5,
    testimonial:
      'La automatización de procesos nos ha permitido escalar sin aumentar costos operativos. ROI del 350% en solo 4 meses. Increíble.',
    result: '350% ROI en 4 meses',
    image: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Jorge Martínez',
    role: 'Gerente General',
    company: 'Seguros Confianza',
    rating: 5,
    testimonial:
      'Implementamos el sistema hace 6 meses y los resultados superaron nuestras expectativas. La IA aprende continuamente y mejora sus respuestas cada día.',
    result: '65% menos consultas manuales',
    image: 'https://i.pravatar.cc/150?img=8',
  },
  {
    name: 'Ana Torres',
    role: 'Directora de Marketing',
    company: 'EduPlatform',
    rating: 5,
    testimonial:
      'La integración con nuestras plataformas fue perfecta. Ahora capturamos y gestionamos leads automáticamente, aumentando nuestras conversiones en un 40%.',
    result: '+40% en conversiones',
    image: 'https://i.pravatar.cc/150?img=9',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonios"
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-6"
    >
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
            Lo Que Dicen Nuestros{' '}
            <span className="text-primary">Clientes</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Empresas de diversos sectores confiaron en nosotros y están viendo
            resultados extraordinarios
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-primary/30 transition-all duration-300 group hover:bg-slate-800/80 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/20 group-hover:text-primary/30 transition-colors">
                <Quote className="w-12 h-12" />
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-primary/50 object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {testimonial.role} - {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-primary fill-primary"
                  />
                ))}
              </div>

              {/* Testimonial */}
              <p className="text-slate-300 mb-6 leading-relaxed italic">
                "{testimonial.testimonial}"
              </p>

              {/* Result Badge */}
              <div className="inline-block bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-lg px-4 py-2">
                <p className="text-primary font-semibold text-sm">
                  {testimonial.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-slate-300">Empresas Satisfechas</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-slate-300">Tasa de Satisfacción</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-slate-300">Soporte Continuo</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
