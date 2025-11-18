import React, { Suspense, lazy } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgressIndicator } from './ScrollProgressIndicator';
import { BackToTopButton } from './BackToTopButton';
import { AIChatbot } from './AIChatbot';
import { HeroSection } from './sections/HeroSection';
import { LoadingSpinner } from './LoadingSpinner';
import { LeadFormData } from '../types';

// Lazy load non-critical sections for better performance
const ServiciosSection = lazy(() => import('./sections/ServiciosSection').then(m => ({ default: m.ServiciosSection })));
const BeneficiosSection = lazy(() => import('./sections/BeneficiosSection').then(m => ({ default: m.BeneficiosSection })));
const SectoresSection = lazy(() => import('./sections/SectoresSection').then(m => ({ default: m.SectoresSection })));
const CasosUsoSection = lazy(() => import('./sections/CasosUsoSection').then(m => ({ default: m.CasosUsoSection })));
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FormularioSection = lazy(() => import('./sections/FormularioSection').then(m => ({ default: m.FormularioSection })));

export const MainContainer: React.FC = () => {
  // Handle form submission
  const handleFormSubmit = async (data: LeadFormData) => {
    // The form component handles Supabase submission internally
    console.log('Form submitted through MainContainer:', data);
  };

  // Handle scroll to form section
  const handleScrollToForm = () => {
    const formElement = document.getElementById('formulario');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <Navbar onNavigateToForm={handleScrollToForm} />
      <ScrollProgressIndicator />
      <BackToTopButton />
      <HeroSection onNavigateToForm={handleScrollToForm} />

      {/* Lazy-loaded sections with loading fallback */}
      <Suspense fallback={<LoadingSpinner />}>
        <ServiciosSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <BeneficiosSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <SectoresSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <CasosUsoSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <FormularioSection onSubmit={handleFormSubmit} />
      </Suspense>

      <Footer />

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};
