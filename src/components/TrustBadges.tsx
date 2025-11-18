import React from 'react';
import { Shield, Lock, Award, Check } from 'lucide-react';

export const TrustBadges: React.FC = () => (
  <div className="flex justify-center gap-8 flex-wrap py-8">
    <div className="flex items-center gap-2 text-slate-300">
      <Shield className="w-6 h-6 text-primary" />
      <span className="font-medium">Seguridad SSL</span>
    </div>
    <div className="flex items-center gap-2 text-slate-300">
      <Lock className="w-6 h-6 text-primary" />
      <span className="font-medium">Datos Encriptados</span>
    </div>
    <div className="flex items-center gap-2 text-slate-300">
      <Award className="w-6 h-6 text-primary" />
      <span className="font-medium">99.9% Uptime</span>
    </div>
    <div className="flex items-center gap-2 text-slate-300">
      <Check className="w-6 h-6 text-primary" />
      <span className="font-medium">GDPR Compliant</span>
    </div>
  </div>
);
