import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideNavigation } from './SlideNavigation';
import { SlideHero } from './slides/SlideHero';
import { SlideServicios } from './slides/SlideServicios';
import { SlideBeneficios } from './slides/SlideBeneficios';
import { SlideSectores } from './slides/SlideSectores';
import { SlideCasosUso } from './slides/SlideCasosUso';
import { SlideFormulario } from './slides/SlideFormulario';
import { LeadFormData } from '../types';

const SLIDE_DURATION = 8000; // 8 seconds per slide

const slides = [
  {
    id: 0,
    title: 'Hero',
    component: SlideHero
  },
  {
    id: 1,
    title: 'Servicios',
    component: SlideServicios
  },
  {
    id: 2,
    title: 'Beneficios',
    component: SlideBeneficios
  },
  {
    id: 3,
    title: 'Sectores',
    component: SlideSectores
  },
  {
    id: 4,
    title: 'Casos de Uso',
    component: SlideCasosUso
  },
  {
    id: 5,
    title: 'Contacto',
    component: SlideFormulario
  }
];

export const PresentationContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState(0);

  // Handle automatic slide progression
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        if (prev === slides.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        setDirection(1);
        return prev + 1;
      });
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle slide change
  const handleSlideChange = useCallback((newSlide: number) => {
    if (newSlide === currentSlide) return;
    
    setDirection(newSlide > currentSlide ? 1 : -1);
    setCurrentSlide(newSlide);
    setIsPlaying(false);
  }, [currentSlide]);

  // Navigate to form slide
  const handleNavigateToForm = useCallback(() => {
    handleSlideChange(slides.length - 1);
  }, [handleSlideChange]);

  // Handle form submission
  const handleFormSubmit = async (data: LeadFormData) => {
    // The form component now handles Supabase submission internally
    // This is just for any additional processing if needed
    console.log('Form submitted through PresentationContainer:', data);
  };

  // Toggle play/pause
  const handleTogglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          handleSlideChange(Math.max(0, currentSlide - 1));
          break;
        case 'ArrowRight':
          handleSlideChange(Math.min(slides.length - 1, currentSlide + 1));
          break;
        case ' ':
          event.preventDefault();
          handleTogglePlay();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, handleSlideChange, handleTogglePlay]);

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const transition = {
    x: { type: 'spring' as const, stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Slide Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 w-full h-full"
          >
            {currentSlide === 0 && <SlideHero onNavigateToForm={handleNavigateToForm} />}
            {currentSlide === 1 && <SlideServicios />}
            {currentSlide === 2 && <SlideBeneficios />}
            {currentSlide === 3 && <SlideSectores />}
            {currentSlide === 4 && <SlideCasosUso />}
            {currentSlide === 5 && <SlideFormulario onSubmit={handleFormSubmit} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <SlideNavigation
          currentSlide={currentSlide}
          totalSlides={slides.length}
          onSlideChange={handleSlideChange}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 z-50">
        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg px-3 py-2">
          <span className="text-white text-sm font-medium">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="absolute bottom-4 left-4 z-50">
        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg px-3 py-2">
          <div className="text-slate-300 text-xs space-y-1">
            <div>← → Navegar</div>
            <div>Espacio: Play/Pausa</div>
          </div>
        </div>
      </div>
    </div>
  );
};