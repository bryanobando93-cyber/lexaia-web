export interface LeadFormData {
  nombre_completo: string;
  correo_electronico: string;
  empresa: string;
  sector_industria: string;
  tamano_empresa: string;
  interes_principal: string;
  telefono?: string;
  sitio_web?: string;
  comentarios?: string;
}

export interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

export interface Sector {
  name: string;
  description: string;
  useCases: string[];
}