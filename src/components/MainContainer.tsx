import React, { Suspense, lazy } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgressIndicator } from './ScrollProgressIndicator';
import { BackToTopButton } from './BackToTopButton';
import { WhatsAppButton } from './WhatsAppButton';
import { AIChatbot } from './AIChatbot';
import { HeroSection } from './sections/HeroSection';
import { LoadingSpinner } from './LoadingSpinner';
import { ROICalculator } from './ROICalculator';
import { LiveStats } from './LiveStats';
import { TrustBadges } from './TrustBadges';
import { ExitIntentPopup } from './ExitIntentPopup';
import { LeadFormData } from '../types';

// Lazy load non-critical sections for better performance
const ServiciosSection = lazy(() => import('./sections/ServiciosSection').then(m => ({ default: m.ServiciosSection })));
const BeneficiosSection = lazy(() => import('./sections/BeneficiosSection').then(m => ({ default: m.BeneficiosSection })));
const SectoresSection = lazy(() => import('./sections/SectoresSection').then(m => ({ default: m.SectoresSection })));
const CasosUsoSection = lazy(() => import('./sections/CasosUsoSection').then(m => ({ default: m.CasosUsoSection })));
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const PricingSection = lazy(() => import('./sections/PricingSection').then(m => ({ default: m.PricingSection })));
const FormularioSection = lazy(() => import('./sections/FormularioSection').then(m => ({ default: m.FormularioSection })));

// Lazy load heavy three.js background component for better initial load
const NeuralNetworkBackground = lazy(() => import('./NeuralNetworkBackground').then(m => ({ default: m.NeuralNetworkBackground })));

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
    <div className="w-full relative">
      {/* Fixed Neural Network Background for entire page - Lazy loaded for performance */}
      <Suspense fallback={<div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />}>
        <NeuralNetworkBackground className="fixed" />
      </Suspense>

      {/* All content with relative positioning to appear above background */}
      <div className="relative z-10">
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

      {/* Live Stats */}
      <section className="py-16 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <LiveStats />
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-5xl mx-auto">
          <ROICalculator />
        </div>
      </section>

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
        <PricingSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <FormularioSection onSubmit={handleFormSubmit} />
      </Suspense>

      {/* Trust Badges */}
      <section className="py-8 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <TrustBadges />
        </div>
      </section>

        <Footer />

        {/* Floating Widgets */}
        <WhatsAppButton />
        <AIChatbot />
        <ExitIntentPopup />
      </div>
    </div>
  );
};
