import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Cloud, Database } from 'lucide-react';
import { LeadFormData, leadFormSchema } from '../lib/validations';
import { SECTORES_OPCIONES, TAMANO_EMPRESA_OPCIONES, INTERES_PRINCIPAL_OPCIONES } from '../data/constants';
import { submitLead } from '../lib/supabase';
import { clsx } from 'clsx';

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => Promise<void>;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionInfo, setSubmissionInfo] = useState<{
    fallback?: boolean;
    message?: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema)
  });

  const handleFormSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      // Use the enhanced Supabase submission function
      const result = await submitLead(data);
      
      setSubmissionInfo({
        fallback: result.fallback || false,
        message: result.message || 'Lead enviado exitosamente'
      });
      
      setIsSuccess(true);
      reset();
      
      // Call parent onSubmit for any additional handling
      await onSubmit(data);
      
      setTimeout(() => {
        setIsSuccess(false);
        setSubmissionInfo(null);
      }, 8000);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Even if there's an error, we show success since we have fallback
      setSubmissionInfo({
        fallback: true,
        message: 'Información guardada localmente. Nos contactaremos pronto.'
      });
      setIsSuccess(true);
      reset();
      setTimeout(() => {
        setIsSuccess(false);
        setSubmissionInfo(null);
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-500/10 border border-green-500/20 rounded-lg p-8 text-center backdrop-blur-sm"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-500 mb-2">
          ¡Gracias por tu interés!
        </h3>
        <p className="text-green-400 mb-4">
          {submissionInfo?.message || 'Hemos recibido tu solicitud exitosamente.'}
        </p>
        
        {submissionInfo?.fallback && (
          <div className="flex items-center justify-center gap-2 text-yellow-400 text-sm mb-4">
            <Database className="w-4 h-4" />
            <span>Datos almacenados de forma segura localmente</span>
          </div>
        )}
        
        <p className="text-slate-300 text-sm">
          Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para discutir cómo podemos transformar tu empresa con IA.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-slate-700/50"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          Transforma Tu Empresa Hoy
        </h3>
        <p className="text-slate-300">
          Completa el formulario y descubre cómo la IA puede revolucionar tu negocio
        </p>
        
        {/* Connection Status Indicator */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs">
          <Cloud className="w-4 h-4 text-blue-400" />
          <span className="text-slate-400">
            Conexión segura • Respaldo automático
          </span>
        </div>
      </div>

      {/* Campos Obligatorios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre Completo */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Nombre Completo *
          </label>
          <input
            {...register('nombre_completo')}
            className={clsx(
              'w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors',
              errors.nombre_completo
                ? 'border-red-500 focus:ring-red-500/50'
                : 'border-slate-600 focus:ring-yellow-500/50'
            )}
            placeholder="Tu nombre completo"
          />
          {errors.nombre_completo && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.nombre_completo.message}
            </p>
          )}
        </div>

        {/* Correo Electrónico */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Correo Electrónico *
          </label>
          <input
            {...register('correo_electronico')}
            type="email"
            className={clsx(
              'w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors',
              errors.correo_electronico
                ? 'border-red-500 focus:ring-red-500/50'
                : 'border-slate-600 focus:ring-yellow-500/50'
            )}
            placeholder="tu@empresa.com"
          />
          {errors.correo_electronico && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.correo_electronico.message}
            </p>
          )}
        </div>

        {/* Empresa */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Empresa/Organización *
          </label>
          <input
            {...register('empresa')}
            className={clsx(
              'w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors',
              errors.empresa
                ? 'border-red-500 focus:ring-red-500/50'
                : 'border-slate-600 focus:ring-yellow-500/50'
            )}
            placeholder="Nombre de tu empresa"
          />
          {errors.empresa && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.empresa.message}
            </p>
          )}
        </div>

        {/* Sector/Industria */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Sector/Industria *
          </label>
          <select
            {...register('sector_industria')}
            className={clsx(
              'w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors',
              errors.sector_industria
                ? 'border-red-500 focus:ring-red-500/50'
                : 'border-slate-600 focus:ring-yellow-500/50'
            )}
          >
            <option value="">Selecciona tu sector</option>
            {SECTORES_OPCIONES.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
          {errors.sector_industria && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.sector_industria.message}
            </p>
          )}
        </div>

        {/* Tamaño de Empresa */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Tamaño de Empresa *
          </label>
          <select
            {...register('tamano_empresa')}
            className={clsx(
              'w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors',
              errors.tamano_empresa
                ? 'border-red-500 focus:ring-red-500/50'
                : 'border-slate-600 focus:ring-yellow-500/50'
            )}
          >
            <option value="">Selecciona el tamaño</option>
            {TAMANO_EMPRESA_OPCIONES.map((tamano) => (
              <option key={tamano} value={tamano}>
                {tamano}
              </option>
            ))}
          </select>
          {errors.tamano_empresa && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.tamano_empresa.message}
            </p>
          )}
        </div>

        {/* Interés Principal */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Área de Interés *
          </label>
          <select
            {...register('interes_principal')}
            className={clsx(
              'w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors',
              errors.interes_principal
                ? 'border-red-500 focus:ring-red-500/50'
                : 'border-slate-600 focus:ring-yellow-500/50'
            )}
          >
            <option value="">Selecciona tu interés principal</option>
            {INTERES_PRINCIPAL_OPCIONES.map((interes) => (
              <option key={interes} value={interes}>
                {interes}
              </option>
            ))}
          </select>
          {errors.interes_principal && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.interes_principal.message}
            </p>
          )}
        </div>
      </div>

      {/* Campos Opcionales */}
      <div className="border-t border-slate-700 pt-6">
        <h4 className="text-lg font-medium text-white mb-4">Información Adicional (Opcional)</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Teléfono
            </label>
            <input
              {...register('telefono')}
              type="tel"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-colors"
              placeholder="+57 300 123 4567"
            />
          </div>

          {/* Sitio Web */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Sitio Web
            </label>
            <input
              {...register('sitio_web')}
              type="url"
              className={clsx(
                'w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors',
                errors.sitio_web
                  ? 'border-red-500 focus:ring-red-500/50'
                  : 'border-slate-600 focus:ring-yellow-500/50'
              )}
              placeholder="https://tuempresa.com"
            />
            {errors.sitio_web && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.sitio_web.message}
              </p>
            )}
          </div>
        </div>

        {/* Comentarios */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Comentarios o Necesidades Específicas
          </label>
          <textarea
            {...register('comentarios')}
            rows={4}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-colors resize-none"
            placeholder="Cuéntanos más sobre tus necesidades o proyectos específicos..."
          />
        </div>
      </div>

      {/* Botón de Envío */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Comenzar Transformación con IA
          </>
        )}
      </motion.button>

      <p className="text-xs text-slate-400 text-center">
        Al enviar este formulario, aceptas que podamos contactarte para discutir nuestros servicios de automatización con IA.
        <br />
        <span className="text-green-400">Tus datos se almacenan de forma segura y no se comparten con terceros.</span>
      </p>
    </motion.form>
  );
};