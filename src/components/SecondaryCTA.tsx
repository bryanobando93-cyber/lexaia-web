import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { analyticsEvents } from '../lib/analytics';

interface SecondaryCTAProps {
  text: string;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: 'primary' | 'accent' | 'outlined';
  location: string; // For analytics tracking
}

export const SecondaryCTA: React.FC<SecondaryCTAProps> = ({
  text,
  onClick,
  icon: Icon,
  variant = 'primary',
  location,
}) => {
  const handleClick = () => {
    analyticsEvents.ctaClick(location, text);
    onClick();
  };

  const variantClasses = {
    primary:
      'bg-primary hover:bg-primary-dark text-primary-foreground border-primary',
    accent:
      'bg-accent hover:bg-accent-dark text-accent-foreground border-accent',
    outlined:
      'bg-transparent hover:bg-primary/10 text-primary border-primary hover:border-primary-dark',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${variantClasses[variant]}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{text}</span>
      <ArrowRight className="w-5 h-5" />
    </motion.button>
  );
};
