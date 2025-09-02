import { z } from 'zod';

export const leadFormSchema = z.object({
  nombre_completo: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  correo_electronico: z.string().email('Ingrese un correo electrónico válido'),
  empresa: z.string().min(2, 'El nombre de la empresa debe tener al menos 2 caracteres'),
  sector_industria: z.string().min(1, 'Seleccione un sector'),
  tamano_empresa: z.string().min(1, 'Seleccione el tamaño de empresa'),
  interes_principal: z.string().min(1, 'Seleccione su interés principal'),
  telefono: z.string().optional(),
  sitio_web: z.string().url('Ingrese una URL válida').optional().or(z.literal('')),
  comentarios: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;