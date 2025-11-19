import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookiePolicyPage: React.FC = () => {
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
            <Cookie className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Política de <span className="text-primary">Cookies</span>
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
            <h2 className="text-2xl font-bold text-white mb-4">1. ¿Qué son las Cookies?</h2>
            <p className="text-slate-300 leading-relaxed">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten que el sitio recuerde tus preferencias, mejore tu experiencia y proporcione funcionalidades esenciales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. ¿Cómo Usamos las Cookies?</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              En <strong className="text-primary">lexaia</strong>, utilizamos cookies para:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Mantener tu sesión activa cuando navegas por el sitio.</li>
              <li>Recordar tus preferencias y configuraciones.</li>
              <li>Analizar el tráfico y uso del sitio web (Google Analytics).</li>
              <li>Mejorar la experiencia del usuario y personalizar contenido.</li>
              <li>Recordar conversaciones con nuestros chatbots de IA.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Tipos de Cookies que Utilizamos</h2>

            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Cookies Esenciales</h3>
                <p className="text-slate-300 leading-relaxed mb-2">
                  <strong className="text-white">Propósito:</strong> Necesarias para el funcionamiento básico del sitio.
                </p>
                <p className="text-slate-300 leading-relaxed mb-2">
                  <strong className="text-white">Duración:</strong> Sesión
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-white">Ejemplos:</strong> Autenticación, seguridad, preferencias de idioma.
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Cookies Analíticas</h3>
                <p className="text-slate-300 leading-relaxed mb-2">
                  <strong className="text-white">Propósito:</strong> Recopilar información sobre cómo los visitantes usan nuestro sitio.
                </p>
                <p className="text-slate-300 leading-relaxed mb-2">
                  <strong className="text-white">Duración:</strong> Hasta 2 años
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-white">Proveedor:</strong> Google Analytics (ID: G-5M77D994WV)
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Cookies Funcionales</h3>
                <p className="text-slate-300 leading-relaxed mb-2">
                  <strong className="text-white">Propósito:</strong> Recordar tus elecciones y personalizar tu experiencia.
                </p>
                <p className="text-slate-300 leading-relaxed mb-2">
                  <strong className="text-white">Duración:</strong> Hasta 1 año
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-white">Ejemplos:</strong> Historial del chatbot, preferencias de visualización.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Cookies de Terceros</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Utilizamos servicios de terceros que pueden establecer sus propias cookies:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong className="text-white">Google Analytics:</strong> Para análisis de tráfico y comportamiento del usuario.</li>
              <li><strong className="text-white">Google Fonts:</strong> Para cargar fuentes tipográficas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Gestión de Cookies</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Puedes controlar y gestionar las cookies de varias maneras:
            </p>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-bold text-white mb-3">Configuración del Navegador</h3>
              <p className="text-slate-300 leading-relaxed mb-3">
                La mayoría de los navegadores te permiten:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
                <li>Ver qué cookies tienes y eliminarlas individualmente</li>
                <li>Bloquear cookies de terceros</li>
                <li>Bloquear cookies de sitios específicos</li>
                <li>Bloquear todas las cookies</li>
                <li>Eliminar todas las cookies al cerrar el navegador</li>
              </ul>
            </div>

            <p className="text-slate-300 leading-relaxed">
              <strong className="text-white">Nota:</strong> Ten en cuenta que bloquear todas las cookies puede afectar la funcionalidad del sitio y reducir tu experiencia de usuario.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Actualizaciones de esta Política</h2>
            <p className="text-slate-300 leading-relaxed">
              Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios en las tecnologías que utilizamos o por requisitos legales. Te recomendamos revisar esta página periódicamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Más Información</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Para más información sobre cómo protegemos tu privacidad, consulta nuestra{' '}
              <Link to="/privacidad" className="text-primary hover:text-primary-light underline">
                Política de Privacidad
              </Link>.
            </p>
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
