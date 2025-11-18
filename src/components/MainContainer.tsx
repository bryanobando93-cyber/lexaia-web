import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgressIndicator } from './ScrollProgressIndicator';
import { HeroSection } from './sections/HeroSection';
import { ServiciosSection } from './sections/ServiciosSection';
import { BeneficiosSection } from './sections/BeneficiosSection';
import { SectoresSection } from './sections/SectoresSection';
import { CasosUsoSection } from './sections/CasosUsoSection';
import { FormularioSection } from './sections/FormularioSection';
import { LeadFormData } from '../types';

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
      <HeroSection onNavigateToForm={handleScrollToForm} />
      <ServiciosSection />
      <BeneficiosSection />
      <SectoresSection />
      <CasosUsoSection />
      <FormularioSection onSubmit={handleFormSubmit} />
      <Footer />
    </div>
  );
};
