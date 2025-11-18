import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Crown, MessageCircle } from 'lucide-react';

type Currency = 'USD' | 'COP' | 'MXN' | 'EUR' | 'ARS' | 'CLP';

interface PricingPlan {
  name: string;
  description: string;
  prices: Record<Currency, number>;
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
  cta: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'Perfecto para pequeñas empresas que inician con IA',
    prices: {
      USD: 149,
      COP: 600000,
      MXN: 2700,
      EUR: 137,
      ARS: 135000,
      CLP: 135000,
    },
    icon: <Sparkles className="w-8 h-8" />,
    features: [
      'Chatbot IA para hasta 500 consultas/mes',
      'Integración con 1 plataforma (Web o WhatsApp)',
      'Dashboard de métricas básico',
      'Soporte por email',
      'Demo gratuito de 1 mes',
      'Actualizaciones automáticas',
    ],
    cta: 'Comenzar Demo Gratuito',
  },
  {
    name: 'Professional',
    description: 'Ideal para empresas en crecimiento',
    prices: {
      USD: 299,
      COP: 1200000,
      MXN: 5400,
      EUR: 275,
      ARS: 270000,
      CLP: 270000,
    },
    icon: <Zap className="w-8 h-8" />,
    features: [
      'Chatbot IA para hasta 2,000 consultas/mes',
      'Integración con 3 plataformas',
      'Automatización de procesos (RPA básico)',
      'Dashboard avanzado con reportes',
      'Soporte prioritario 24/7',
      'Demo gratuito de 1 mes',
      'Integración con CRM existente',
      'Análisis predictivo básico',
    ],
    popular: true,
    cta: 'Plan Más Popular',
  },
  {
    name: 'Enterprise',
    description: 'Soluciones a medida para grandes empresas',
    prices: {
      USD: 749,
      COP: 3000000,
      MXN: 13500,
      EUR: 687,
      ARS: 675000,
      CLP: 675000,
    },
    icon: <Crown className="w-8 h-8" />,
    features: [
      'Consultas ilimitadas',
      'Integraciones ilimitadas',
      'Automatización completa (RPA avanzado)',
      'Agentes de voz de llamadas con IA',
      'IA personalizada entrenada para tu negocio',
      'Soporte dedicado 24/7 + Account Manager',
      'Demo gratuito de 1 mes',
      'Análisis predictivo avanzado',
      'Desarrollo de funcionalidades custom',
      'SLA garantizado 99.9%',
    ],
    cta: 'Contactar Ventas',
  },
];

const currencyInfo: Record<Currency, { symbol: string; name: string }> = {
  USD: { symbol: '$', name: 'Dólares' },
  COP: { symbol: '$', name: 'Pesos Colombianos' },
  MXN: { symbol: '$', name: 'Pesos Mexicanos' },
  EUR: { symbol: '€', name: 'Euros' },
  ARS: { symbol: '$', name: 'Pesos Argentinos' },
  CLP: { symbol: '$', name: 'Pesos Chilenos' },
};

export const PricingSection: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('COP');

  const formatPrice = (price: number, currency: Currency) => {
    const info = currencyInfo[currency];
    if (currency === 'COP' || currency === 'ARS' || currency === 'CLP' || currency === 'MXN') {
      return `${info.symbol}${price.toLocaleString('es-CO')}`;
    }
    return `${info.symbol}${price.toLocaleString('en-US')}`;
  };

  const handlePlanClick = (planName: string) => {
    const formElement = document.getElementById('formulario');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="pricing"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Planes <span className="text-primary">lexaia</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Soluciones accesibles para pequeñas y medianas empresas. Comienza con un demo gratuito de 1 mes.
          </p>

          {/* Currency Selector */}
          <div className="flex justify-center gap-2 flex-wrap">
            {(Object.keys(currencyInfo) as Currency[]).map((currency) => (
              <button
                key={currency}
                onClick={() => setSelectedCurrency(currency)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCurrency === currency
                    ? 'bg-primary text-slate-900'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {currencyInfo[currency].symbol} {currency}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Precios en {currencyInfo[selectedCurrency].name} • Facturación mensual
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border-2 ${
                plan.popular
                  ? 'border-primary shadow-2xl shadow-primary/20 scale-105'
                  : 'border-slate-700/50'
              } hover:border-primary/50 transition-all duration-300`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-slate-900 px-6 py-1 rounded-full text-sm font-bold">
                  Más Popular
                </div>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/20 rounded-xl text-primary">
                  {plan.icon}
                </div>
              </div>

              {/* Plan name */}
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                {plan.name}
              </h3>
              <p className="text-slate-400 text-center mb-6 text-sm">
                {plan.description}
              </p>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-white mb-2">
                  {formatPrice(plan.prices[selectedCurrency], selectedCurrency)}
                  <span className="text-lg text-slate-400 font-normal">/mes</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handlePlanClick(plan.name)}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary-dark text-slate-900'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 inline-block">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-slate-300">Demo gratuito 1 mes</span>
              </div>
              <div className="w-px h-6 bg-slate-700" />
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span className="text-slate-300">Soporte 24/7</span>
              </div>
              <div className="w-px h-6 bg-slate-700" />
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-slate-300">Sin permanencia</span>
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-sm mt-4">
            ¿Necesitas un plan personalizado?{' '}
            <button
              onClick={() => handlePlanClick('Custom')}
              className="text-primary hover:text-primary-light underline"
            >
              Contáctanos
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
