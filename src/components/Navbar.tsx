import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  onNavigateToForm?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToForm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { id: 'hero', label: 'Inicio', type: 'scroll' },
    { id: 'servicios', label: 'Servicios', type: 'scroll' },
    { id: 'beneficios', label: 'Beneficios', type: 'scroll' },
    { id: 'pricing', label: 'Precios', type: 'scroll' },
    { id: 'testimonios', label: 'Testimonios', type: 'scroll' },
    { id: 'faq', label: 'FAQ', type: 'scroll' },
    { id: 'blog', label: 'Blog', type: 'route' },
    { id: 'formulario', label: 'Contacto', type: 'scroll' },
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

  const handleNavigation = (link: { id: string; label: string; type: string }) => {
    setIsMobileMenuOpen(false);

    if (link.type === 'route') {
      navigate(`/${link.id}`);
    } else {
      // Si estamos en una ruta diferente, primero navegar a home
      if (location.pathname !== '/') {
        navigate('/');
        // Esperar a que cargue la página antes de hacer scroll
        setTimeout(() => {
          const element = document.getElementById(link.id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        const element = document.getElementById(link.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

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
              className="flex items-center gap-3 group"
            >
              <img
                src="/images/logo.png"
                alt="lexaia"
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
              <span className="text-xl font-heading font-bold text-primary">
                lexaia
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigation(link)}
                  className={`text-sm font-medium transition-all duration-200 hover:text-primary ${
                    (link.type === 'route' && location.pathname.startsWith(`/${link.id}`)) ||
                    (link.type === 'scroll' && activeSection === link.id && location.pathname === '/')
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
                  onClick={() => handleNavigation(link)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    (link.type === 'route' && location.pathname.startsWith(`/${link.id}`)) ||
                    (link.type === 'scroll' && activeSection === link.id && location.pathname === '/')
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
