import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigateToForm?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToForm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { id: 'hero', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'beneficios', label: 'Beneficios' },
    { id: 'sectores', label: 'Sectores' },
    { id: 'casos-uso', label: 'Casos de Uso' },
    { id: 'testimonios', label: 'Testimonios' },
    { id: 'formulario', label: 'Contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = navLinks.map(link => link.id);
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 group"
            >
              <div className="p-2 bg-primary/20 backdrop-blur-sm rounded-lg border border-primary/30 group-hover:bg-primary/30 transition-colors">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-heading font-bold text-white">
                AutomatizaIA
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium transition-all duration-200 hover:text-primary ${
                    activeSection === link.id
                      ? 'text-primary font-semibold'
                      : 'text-slate-300'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Button (Desktop) */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection('formulario')}
                className="btn-primary px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl"
              >
                Empezar Ahora
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-slate-900/98 backdrop-blur-lg border-b border-slate-800 md:hidden"
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === link.id
                      ? 'bg-primary/20 text-primary font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('formulario')}
                className="w-full btn-primary px-6 py-3 rounded-lg shadow-lg mt-4"
              >
                Empezar Ahora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from going under navbar */}
      <div className="h-[72px]" />
    </>
  );
};
