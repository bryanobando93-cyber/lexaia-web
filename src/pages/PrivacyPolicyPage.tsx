import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
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
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Política de <span className="text-primary">Privacidad</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm mb-12"
        >
          Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 space-y-8"
        >
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introducción</h2>
            <p className="text-slate-300 leading-relaxed">
              En <strong className="text-primary">lexaia</strong>, valoramos y respetamos tu privacidad. Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos tu información personal cuando utilizas nuestros servicios de automatización e inteligencia artificial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Información que Recopilamos</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Recopilamos los siguientes tipos de información:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong className="text-white">Información de contacto:</strong> Nombre, correo electrónico, teléfono, empresa.</li>
              <li><strong className="text-white">Información de uso:</strong> Datos sobre cómo interactúas con nuestros servicios (chatbots, formularios).</li>
              <li><strong className="text-white">Datos técnicos:</strong> Dirección IP, tipo de navegador, sistema operativo, cookies.</li>
              <li><strong className="text-white">Conversaciones:</strong> Mensajes intercambiados con nuestros chatbots impulsados por IA.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Cómo Usamos tu Información</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Utilizamos tu información personal para:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Proporcionar y mejorar nuestros servicios de IA y automatización.</li>
              <li>Responder a tus consultas y solicitudes de contacto.</li>
              <li>Personalizar tu experiencia y ofrecer recomendaciones relevantes.</li>
              <li>Enviar comunicaciones sobre actualizaciones, promociones y noticias (con tu consentimiento).</li>
              <li>Cumplir con obligaciones legales y proteger nuestros derechos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Compartir tu Información</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              <strong className="text-primary">No vendemos</strong> tu información personal a terceros. Podemos compartir tu información únicamente con:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong className="text-white">Proveedores de servicios:</strong> Empresas que nos ayudan a operar nuestros servicios (hosting, análisis, CRM).</li>
              <li><strong className="text-white">Cumplimiento legal:</strong> Cuando sea requerido por ley o para proteger nuestros derechos.</li>
              <li><strong className="text-white">Consentimiento expreso:</strong> Cuando hayas autorizado expresamente compartir tu información.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Seguridad de Datos</h2>
            <p className="text-slate-300 leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra acceso no autorizado, pérdida, alteración o divulgación. Estas incluyen cifrado, control de acceso, auditorías de seguridad y cumplimiento con estándares de la industria.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Tus Derechos</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Tienes derecho a:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong className="text-white">Acceder</strong> a tu información personal.</li>
              <li><strong className="text-white">Rectificar</strong> datos inexactos o incompletos.</li>
              <li><strong className="text-white">Eliminar</strong> tu información (derecho al olvido).</li>
              <li><strong className="text-white">Oponerte</strong> al procesamiento de tus datos.</li>
              <li><strong className="text-white">Portabilidad</strong> de tus datos a otro proveedor.</li>
              <li><strong className="text-white">Revocar consentimiento</strong> en cualquier momento.</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-4">
              Para ejercer estos derechos, contáctanos en:{' '}
              <a href="mailto:contacto@lexaia.com" className="text-primary hover:text-primary-light underline">
                contacto@lexaia.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contacto</h2>
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 mb-2">
                <strong className="text-white">Email:</strong>{' '}
                <a href="mailto:contacto@lexaia.com" className="text-primary hover:text-primary-light underline">
                  contacto@lexaia.com
                </a>
              </p>
              <p className="text-slate-300 mb-2">
                <strong className="text-white">Teléfono:</strong>{' '}
                <a href="tel:+573165375761" className="text-primary hover:text-primary-light underline">
                  +57 (316) 537-5761
                </a>
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Ubicación:</strong> Bogotá, Colombia
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};
