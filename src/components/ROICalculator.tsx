import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp } from 'lucide-react';

export const ROICalculator: React.FC = () => {
  const [employees, setEmployees] = useState(5);
  const [tickets, setTickets] = useState(1000);
  const [hourlyRate, setHourlyRate] = useState(15);
  const [repetitiveHours, setRepetitiveHours] = useState(20);

  const calculateROI = () => {
    const monthlyCost = employees * hourlyRate * repetitiveHours * 4;
    const savings = monthlyCost * 0.5;
    const annualSavings = savings * 12;
    const implementationCost = 599;
    const roi = ((annualSavings - implementationCost * 12) / (implementationCost * 12)) * 100;

    return {
      monthlySavings: Math.round(savings),
      annualSavings: Math.round(annualSavings),
      roi: Math.round(roi),
      breakEven: Math.round(implementationCost / savings),
    };
  };

  const results = calculateROI();

  return (
    <div id="roi-calculator" className="bg-slate-800/50 backdrop-blur-sm border border-primary/30 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/20 rounded-lg">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-white">Calculadora de ROI</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="text-slate-300 text-sm block mb-2">Empleados de soporte:</label>
            <input type="range" min="1" max="50" value={employees} onChange={(e) => setEmployees(Number(e.target.value))} className="w-full" />
            <span className="text-primary font-bold">{employees}</span>
          </div>

          <div>
            <label className="text-slate-300 text-sm block mb-2">Tickets mensuales:</label>
            <input type="range" min="100" max="10000" step="100" value={tickets} onChange={(e) => setTickets(Number(e.target.value))} className="w-full" />
            <span className="text-primary font-bold">{tickets.toLocaleString()}</span>
          </div>

          <div>
            <label className="text-slate-300 text-sm block mb-2">Costo por hora (USD):</label>
            <input type="range" min="5" max="50" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} className="w-full" />
            <span className="text-primary font-bold">${hourlyRate}</span>
          </div>

          <div>
            <label className="text-slate-300 text-sm block mb-2">Horas repetitivas/semana:</label>
            <input type="range" min="5" max="40" value={repetitiveHours} onChange={(e) => setRepetitiveHours(Number(e.target.value))} className="w-full" />
            <span className="text-primary font-bold">{repetitiveHours}h</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h4 className="text-xl font-bold text-white">Resultados</h4>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-slate-400">Ahorro Mensual</div>
              <div className="text-3xl font-bold text-primary">${results.monthlySavings.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">Ahorro Anual</div>
              <div className="text-2xl font-bold text-white">${results.annualSavings.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">ROI en 12 meses</div>
              <div className="text-2xl font-bold text-green-400">{results.roi}%</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">Punto de equilibrio</div>
              <div className="text-xl font-bold text-white">{results.breakEven} meses</div>
            </div>
          </div>

          <button onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })} className="w-full mt-6 bg-primary hover:bg-primary-dark text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors">
            Comenzar Demo Gratuito
          </button>
        </div>
      </div>
    </div>
  );
};
