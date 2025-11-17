import React from 'react';
import { SlideHero } from './slides/SlideHero';
import { SlideServicios } from './slides/SlideServicios';
import { SlideBeneficios } from './slides/SlideBeneficios';
import { SlideSectores } from './slides/SlideSectores';
import { SlideCasosUso } from './slides/SlideCasosUso';
import { SlideFormulario } from './slides/SlideFormulario';
import { LeadFormData } from '../types';

export const PresentationContainer: React.FC = () => {
  // Handle scroll to form section
  const handleNavigateToForm = () => {
    const formSection = document.getElementById('formulario');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle form submission
  const handleFormSubmit = async (data: LeadFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="relative bg-slate-900">
      {/* Hero Section */}
      <section id="hero">
        <SlideHero onNavigateToForm={handleNavigateToForm} />
      </section>

      {/* Servicios Section */}
      <section id="servicios">
        <SlideServicios />
      </section>

      {/* Beneficios Section */}
      <section id="beneficios">
        <SlideBeneficios />
      </section>

      {/* Sectores Section */}
      <section id="sectores">
        <SlideSectores />
      </section>

      {/* Casos de Uso Section */}
      <section id="casos-uso">
        <SlideCasosUso />
      </section>

      {/* Formulario Section */}
      <section id="formulario">
        <SlideFormulario onSubmit={handleFormSubmit} />
      </section>
    </div>
  );
};
