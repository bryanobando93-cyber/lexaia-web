import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Users, BarChart3, Calendar, Headphones, Cog, CheckCircle } from 'lucide-react';
import { useLazyBackground } from '../../hooks/useLazyBackground';

const casosDeUso = [
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: 'Automatización de Ventas y Leads',
    description: 'Captura, califica y nutre leads automáticamente',
    features: [
      'Chatbots que califican leads 24/7',
      'Seguimiento automático de prospectos',
      'Integración con CRM existente',
      'Análisis predictivo de conversión'
    ],
    metrics: { primary: '300%', secondary: 'Aumento en leads calificados' }
  },
  {
    icon: <Cog className="w-8 h-8" />,
    title: 'Gestión de Inventarios Inteligente',
    description: 'Optimiza stock y reduce costos de almacenamiento',
    features: [
      'Predicción de demanda con IA',
      'Alertas automáticas de reposición',
      'Optimización de niveles de stock',
      'Integración con proveedores'
    ],
    metrics: { primary: '40%', secondary: 'Reducción en costos de inventario' }
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: 'Atención al Cliente Automatizada',
    description: 'Soporte inteligente multiplataforma 24/7',
    features: [
      'Respuestas instantáneas a consultas comunes',
      'Escalación inteligente a agentes humanos',
      'Historial completo de conversaciones',
      'Análisis de sentimientos en tiempo real'
    ],
    metrics: { primary: '90%', secondary: 'Reducción en tiempo de respuesta' }
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Análisis de Datos y Reportes',
    description: 'Insights accionables de tus datos empresariales',
    features: [
      'Dashboards automáticos en tiempo real',
      'Reportes personalizados por departamento',
      'Identificación de patrones y tendencias',
      'Alertas proactivas de anomalías'
    ],
    metrics: { primary: '75%', secondary: 'Mejora en toma de decisiones' }
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Programación y Recordatorios',
    description: 'Automatiza citas, reuniones y seguimientos',
    features: [
      'Programación inteligente de citas',
      'Recordatorios automáticos por múltiples canales',
      'Reprogramación automática en caso de conflictos',
      'Sincronización con calendarios existentes'
    ],
    metrics: { primary: '80%', secondary: 'Reducción en citas perdidas' }
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Gestión de Citas y Reservas',
    description: 'Sistema completo de reservas automatizado',
    features: [
      'Reservas online las 24 horas',
      'Gestión automática de disponibilidad',
      'Confirmaciones y recordatorios automáticos',
      'Integración con sistemas de pago'
    ],
    metrics: { primary: '60%', secondary: 'Aumento en reservas online' }
  }
];

export const CasosUsoSection: React.FC = () => {
  const { elementRef, isLoaded } = useLazyBackground('/images/customer-service.jpg');

  return (
    <section id="casos-uso" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-6">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          ref={elementRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{
            backgroundImage: isLoaded ? 'url(/images/customer-service.jpg)' : 'none',
            backgroundColor: isLoaded ? 'transparent' : '#1e293b',
            opacity: isLoaded ? 1 : 0.5
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
            Casos de Uso{' '}
            <span className="text-yellow-400">Específicos</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Soluciones probadas que generan resultados inmediatos en áreas críticas de tu negocio
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {casosDeUso.map((caso, index) => (
            <motion.div
              key={caso.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-yellow-500/30 transition-all duration-300 group hover:bg-slate-800/80"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400 group-hover:bg-yellow-500/30 transition-colors">
                  {caso.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {caso.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 mb-4 leading-relaxed">
                {caso.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {caso.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  {caso.metrics.primary}
                </div>
                <div className="text-slate-300 text-sm">
                  {caso.metrics.secondary}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-slate-800/70 to-slate-700/70 backdrop-blur-sm border border-slate-600/50 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Implementación Personalizada
              </h3>
              <p className="text-slate-300 text-lg max-w-3xl mx-auto">
                Cada caso de uso se adapta a tus procesos existentes y se integra perfectamente
                con tus sistemas actuales para maximizar el impacto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg mb-2">1. Análisis</div>
                <p className="text-slate-300 text-sm">Evaluamos tus necesidades específicas</p>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg mb-2">2. Configuración</div>
                <p className="text-slate-300 text-sm">Personalizamos la solución</p>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg mb-2">3. Integración</div>
                <p className="text-slate-300 text-sm">Conectamos con tus sistemas</p>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg mb-2">4. Optimización</div>
                <p className="text-slate-300 text-sm">Mejoramos continuamente</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
