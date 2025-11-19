import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LegalNoticePage: React.FC = () => {
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
            <Scale className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Aviso <span className="text-primary">Legal</span>
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
            <h2 className="text-2xl font-bold text-white mb-4">1. Datos Identificativos</h2>
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 space-y-3">
              <p className="text-slate-300">
                <strong className="text-white">Denominación social:</strong> lexaia
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Domicilio:</strong> Bogotá, Colombia
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Email:</strong>{' '}
                <a href="mailto:contacto@lexaia.com" className="text-primary hover:text-primary-light underline">
                  contacto@lexaia.com
                </a>
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Teléfono:</strong>{' '}
                <a href="tel:+573165375761" className="text-primary hover:text-primary-light underline">
                  +57 (316) 537-5761
                </a>
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Sitio web:</strong>{' '}
                <a href="https://bryanobando93-cyber.github.io/lexaia-web/" className="text-primary hover:text-primary-light underline">
                  https://bryanobando93-cyber.github.io/lexaia-web/
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Objeto</h2>
            <p className="text-slate-300 leading-relaxed">
              El titular del sitio web pone a disposición de los usuarios el presente documento para dar cumplimiento a las obligaciones dispuestas en la normativa vigente sobre protección de datos y privacidad, así como informar a todos los usuarios del sitio web respecto a las condiciones de uso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Condiciones de Uso</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              El acceso y uso de este sitio web implica la aceptación de las siguientes condiciones:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>El uso del sitio web es responsabilidad exclusiva del usuario.</li>
              <li>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios.</li>
              <li>Queda prohibido el uso del sitio web con fines ilícitos o que perjudiquen a terceros.</li>
              <li>El usuario no debe intentar acceder sin autorización a áreas restringidas del sitio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Propiedad Intelectual e Industrial</h2>
            <p className="text-slate-300 leading-relaxed">
              Todos los contenidos del sitio web, incluyendo textos, imágenes, diseño gráfico, código fuente, logos, marcas y cualquier otro elemento susceptible de protección por la legislación de propiedad intelectual o industrial, son propiedad de <strong className="text-primary">lexaia</strong> o de terceros que han autorizado su uso.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              Queda prohibida la reproducción, distribución, comunicación pública y transformación de cualquier contenido sin la autorización expresa del titular de los derechos correspondientes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Responsabilidad de los Contenidos</h2>
            <p className="text-slate-300 leading-relaxed">
              lexaia se reserva el derecho a modificar, suspender o interrumpir, temporal o permanentemente, el acceso al sitio web o a cualquiera de sus servicios, sin previo aviso y sin asumir responsabilidad alguna por ello.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              lexaia no se hace responsable de los daños y perjuicios que pudieran derivarse de:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-3">
              <li>Fallos técnicos, interrupciones o desconexiones en el funcionamiento del sitio web.</li>
              <li>Retrasos o bloqueos causados por deficiencias en las líneas telefónicas o internet.</li>
              <li>Accesos no autorizados mediante técnicas de hacking por parte de terceros.</li>
              <li>Contenidos transmitidos, difundidos, almacenados o puestos a disposición por terceros.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Enlaces a Terceros</h2>
            <p className="text-slate-300 leading-relaxed">
              El sitio web puede contener enlaces a sitios web de terceros. lexaia no asume responsabilidad alguna por el contenido, políticas de privacidad o prácticas de estos sitios externos. Se recomienda revisar las políticas de cada sitio web que visites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Protección de Datos</h2>
            <p className="text-slate-300 leading-relaxed">
              lexaia cumple con la normativa vigente en materia de protección de datos personales y garantiza un nivel de seguridad adecuado en sus tratamientos de datos. Para más información, consulta nuestra{' '}
              <Link to="/privacidad" className="text-primary hover:text-primary-light underline">
                Política de Privacidad
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Legislación Aplicable y Jurisdicción</h2>
            <p className="text-slate-300 leading-relaxed">
              Este aviso legal se rige por la legislación colombiana. Para la resolución de cualquier controversia relativa a este sitio web o a sus contenidos y servicios, las partes se someten expresamente a los Juzgados y Tribunales de Bogotá, Colombia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Contacto</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Para cualquier consulta o cuestión relacionada con este aviso legal, puedes contactarnos:
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
