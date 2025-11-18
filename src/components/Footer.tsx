import React from 'react';
import { Bot, Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary/20 backdrop-blur-sm rounded-lg border border-primary/30">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-heading font-bold text-white">
                lexaia
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Transformamos empresas con soluciones de automatización e inteligencia artificial de última generación.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-primary hover:text-slate-900 text-slate-400 rounded-lg transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-primary hover:text-slate-900 text-slate-400 rounded-lg transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-primary hover:text-slate-900 text-slate-400 rounded-lg transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-primary hover:text-slate-900 text-slate-400 rounded-lg transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-heading font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-slate-400 hover:text-primary transition-colors text-sm"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="text-slate-400 hover:text-primary transition-colors text-sm"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('beneficios')}
                  className="text-slate-400 hover:text-primary transition-colors text-sm"
                >
                  Beneficios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('sectores')}
                  className="text-slate-400 hover:text-primary transition-colors text-sm"
                >
                  Sectores
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('casos-uso')}
                  className="text-slate-400 hover:text-primary transition-colors text-sm"
                >
                  Casos de Uso
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-heading font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/privacidad"
                  className="text-slate-400 hover:text-primary transition-colors text-sm"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="/terminos"
                  className="text-slate-400 hover:text-primary transition-colors text-sm"
                >
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  className="text-slate-400 hover:text-primary transition-colors text-sm"
                >
                  Política de Cookies
                </a>
              </li>
              <li>
                <a
                  href="/aviso-legal"
                  className="text-slate-400 hover:text-primary transition-colors text-sm"
                >
                  Aviso Legal
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-heading font-bold mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="mailto:contacto@automatizaia.com"
                    className="text-slate-400 hover:text-primary transition-colors text-sm block"
                  >
                    contacto@automatizaia.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:+573015550123"
                    className="text-slate-400 hover:text-primary transition-colors text-sm block"
                  >
                    +57 (301) 555-0123
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 text-sm">
                    Bogotá, Colombia
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © {currentYear} lexaia. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-slate-500 text-xs">
                Hecho con ❤️ en Colombia
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
