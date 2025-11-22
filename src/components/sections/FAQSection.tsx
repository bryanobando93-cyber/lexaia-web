import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: '¿Cuánto tiempo toma implementar lexaia en mi empresa?',
    answer:
      'La implementación típica toma entre 2-4 semanas dependiendo de la complejidad. Incluye: análisis inicial (3-5 días), desarrollo y configuración (1-2 semanas), pruebas y ajustes (3-5 días), y capacitación del equipo (2 días). Además, ofrecemos un demo gratuito de 1 mes para que pruebes la plataforma sin compromiso.',
  },
  {
    question: '¿Se integra con mi CRM o ERP actual?',
    answer:
      'Absolutamente. Nos adaptamos al CRM que ya uses (Salesforce, HubSpot, Zoho, SAP, Microsoft Dynamics) sin que tengas que cambiar nada. Además, ofrecemos nuestro propio CRM marca blanca basado en Krayin CRM (open source), totalmente personalizable con tu marca. Tú decides: usamos tu sistema actual o implementamos nuestra solución según lo que mejor se adapte a tu negocio.',
  },
  {
    question: '¿Cuál es el costo aproximado para una pequeña empresa?',
    answer:
      'Nuestro plan Starter comienza desde $149 USD mensuales ($600,000 COP), diseñado específicamente para pequeñas empresas. Incluye chatbot IA, integración web/WhatsApp, y demo gratuito de 1 mes. Sin costos de setup ni permanencia mínima.',
  },
  {
    question: '¿Ofrecen soporte post-implementación?',
    answer:
      'Absolutamente. Todos los planes incluyen soporte 24/7: ticket por email (Starter), chat prioritario (Professional), y account manager dedicado (Enterprise). También ofrecemos un agente humano especializado en IA disponible vía WhatsApp para consultas inmediatas.',
  },
  {
    question: '¿Qué modelos de IA utilizan para los agentes?',
    answer:
      'Usamos diversos modelos según el requerimiento real de cada agente: desde modelos chinos como DeepSeek hasta OpenAI (GPT-4, GPT-3.5), Claude, y otros. La clave está en que cada automatización es diferente y cada negocio tiene necesidades únicas. Por eso analizamos tu caso específico y recomendamos el modelo que mejor se adapte a tus procesos, volumen de consultas, presupuesto y objetivos. No hay una solución única para todos.',
  },
  {
    question: '¿Cómo funciona el demo gratuito de 1 mes?',
    answer:
      'El demo gratuito te permite probar todas las funcionalidades de tu plan seleccionado durante 30 días sin costo ni compromiso. Incluye: configuración inicial, integración básica, capacitación del equipo, y soporte completo. Si decides continuar, tus datos y configuraciones se mantienen.',
  },
  {
    question: '¿Puedo cambiar de plan o cancelar en cualquier momento?',
    answer:
      'Sí, no hay permanencia mínima. Puedes actualizar, degradar o cancelar tu plan en cualquier momento. Los cambios se aplican en el siguiente ciclo de facturación. Todos tus datos se exportan si decides cancelar.',
  },
  {
    question: '¿Qué sectores industriales atienden?',
    answer:
      'Trabajamos con todos los sectores: retail, e-commerce, servicios profesionales, manufactura, salud, educación, finanzas, marketing, logística y más. Cada implementación se personaliza según las necesidades específicas de tu industria.',
  },
  {
    question: '¿Qué ROI puedo esperar?',
    answer:
      'Nuestros clientes experimentan un ROI promedio del 300% en los primeros 6 meses. Beneficios típicos: 80% reducción en tiempos de respuesta, 50% ahorro en costos operativos, y 95% precisión en procesamiento automatizado. Ofrecemos una calculadora de ROI personalizada.',
  },
  {
    question: '¿Los datos de mi empresa están seguros?',
    answer:
      'La seguridad es nuestra prioridad. Cumplimos con estándares internacionales, encriptación end-to-end, respaldos automáticos diarios, servidores en la nube con alta disponibilidad (99.9% uptime), y cumplimiento con regulaciones de privacidad de datos.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleContactClick = () => {
    // Si estamos en la página principal, hacer scroll
    if (location.pathname === '/') {
      const formularioElement = document.getElementById('formulario');
      if (formularioElement) {
        formularioElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si estamos en otra página (como /faq), navegar a la página principal y luego hacer scroll
      navigate('/');
      setTimeout(() => {
        const formularioElement = document.getElementById('formulario');
        if (formularioElement) {
          formularioElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
      {/* Schema.org FAQPage markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <section
        id="faq"
        className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-6"
      >
        {/* Background - Lighter overlay to show neural network */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/35 via-slate-800/25 to-slate-900/35" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary/20 rounded-full">
                <HelpCircle className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Respuestas a las dudas más comunes sobre <span className="text-primary">lexaia</span>
            </p>
          </motion.div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 group"
                >
                  <span className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-primary" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-slate-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
              <p className="text-slate-300 mb-4">
                ¿No encontraste tu respuesta?
              </p>
              <button
                onClick={handleContactClick}
                className="bg-primary hover:bg-primary-dark text-slate-900 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Contáctanos
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
