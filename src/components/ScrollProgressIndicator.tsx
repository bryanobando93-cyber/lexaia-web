import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'beneficios', label: 'Beneficios' },
  { id: 'sectores', label: 'Sectores' },
  { id: 'casos-uso', label: 'Casos de Uso' },
  { id: 'formulario', label: 'Contacto' },
];

export const ScrollProgressIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show indicator after scrolling down a bit
      setIsVisible(window.scrollY > 200);

      // Detect active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is considered active if its top is in the upper half of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeIndex = sections.findIndex(s => s.id === activeSection);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
      transition={{ duration: 0.3 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="flex flex-col gap-3 bg-slate-800/80 backdrop-blur-md rounded-full py-4 px-2 border border-slate-700/50 shadow-xl">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative"
            aria-label={`Ir a ${section.label}`}
          >
            {/* Dot */}
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-primary scale-125'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />

            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-slate-700">
                {section.label}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="border-8 border-transparent border-l-slate-900" />
                </div>
              </div>
            </div>
          </button>
        ))}

        {/* Progress Bar */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-slate-700 -z-10">
          <motion.div
            className="w-full bg-primary origin-top"
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: activeIndex / (sections.length - 1),
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};
