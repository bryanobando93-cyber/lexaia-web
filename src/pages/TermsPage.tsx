import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
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
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Términos y <span className="text-primary">Condiciones</span>
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
            <h2 className="text-2xl font-bold text-white mb-4">1. Aceptación de los Términos</h2>
            <p className="text-slate-300 leading-relaxed">
              Al acceder y utilizar los servicios de <strong className="text-primary">lexaia</strong>, aceptas estar legalmente vinculado por estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Descripción de Servicios</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              lexaia proporciona servicios de automatización empresarial e inteligencia artificial, incluyendo pero no limitado a:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Chatbots con inteligencia artificial</li>
              <li>Automatización de procesos empresariales (RPA)</li>
              <li>Agentes de voz con IA</li>
              <li>Soluciones de IA personalizadas</li>
              <li>Consultoría en transformación digital</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Uso de los Servicios</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Al utilizar nuestros servicios, te comprometes a:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Proporcionar información precisa y actualizada.</li>
              <li>Utilizar los servicios solo para fines legales y autorizados.</li>
              <li>No intentar acceder sin autorización a sistemas o datos.</li>
              <li>No utilizar los servicios para actividades fraudulentas o maliciosas.</li>
              <li>Cumplir con todas las leyes y regulaciones aplicables.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Planes y Facturación</h2>
            <p className="text-slate-300 leading-relaxed">
              Ofrecemos diferentes planes de servicio (Starter, Professional, Enterprise). Los precios están sujetos a cambios con previo aviso. La facturación se realiza mensualmente o según lo acordado en tu plan específico. Todos los planes incluyen un demo gratuito de 1 mes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Propiedad Intelectual</h2>
            <p className="text-slate-300 leading-relaxed">
              Todos los derechos de propiedad intelectual sobre nuestros servicios, tecnología, software y contenido pertenecen a lexaia. Se te otorga una licencia limitada, no exclusiva y no transferible para usar nuestros servicios según estos términos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Confidencialidad</h2>
            <p className="text-slate-300 leading-relaxed">
              Ambas partes se comprometen a mantener la confidencialidad de la información sensible compartida durante la prestación de servicios. Esto incluye datos empresariales, estrategias, procesos y cualquier información marcada como confidencial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Limitación de Responsabilidad</h2>
            <p className="text-slate-300 leading-relaxed">
              lexaia no será responsable por daños indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar nuestros servicios. Nuestra responsabilidad máxima estará limitada al monto pagado por los servicios en los últimos 12 meses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Cancelación y Terminación</h2>
            <p className="text-slate-300 leading-relaxed">
              Puedes cancelar tu suscripción en cualquier momento sin permanencia. lexaia se reserva el derecho de suspender o terminar el acceso a los servicios si se violan estos términos o si se detecta un uso indebido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Modificaciones</h2>
            <p className="text-slate-300 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor al ser publicadas en nuestro sitio web. Te notificaremos sobre cambios significativos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Ley Aplicable</h2>
            <p className="text-slate-300 leading-relaxed">
              Estos términos se regirán e interpretarán de acuerdo con las leyes de Colombia. Cualquier disputa se resolverá en los tribunales competentes de Bogotá, Colombia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Contacto</h2>
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
