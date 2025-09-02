import React from 'react';
import {
  Settings,
  Bot,
  BarChart3,
  MessageSquare,
  ChevronRight,
  Users,
  Heart,
  DollarSign,
  ShoppingCart,
  Building2,
  Factory,
  GraduationCap
} from 'lucide-react';

interface IconProps {
  className?: string;
}

const iconComponents: Record<string, React.ComponentType<IconProps>> = {
  Settings,
  Bot,
  BarChart3,
  MessageSquare,
  ChevronRight,
  Users,
  Heart,
  DollarSign,
  ShoppingCart,
  Building2,
  Factory,
  GraduationCap
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = "w-6 h-6" }) => {
  const IconComponent = iconComponents[name];
  
  if (!IconComponent) {
    // Fallback icon
    return <Settings className={className} />;
  }
  
  return <IconComponent className={className} />;
};