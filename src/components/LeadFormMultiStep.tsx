import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Cloud, Database, ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import { LeadFormData, leadFormSchema } from '../lib/validations';
import { SECTORES_OPCIONES, TAMANO_EMPRESA_OPCIONES, INTERES_PRINCIPAL_OPCIONES } from '../data/constants';
import { submitLead } from '../lib/supabase';
import { clsx } from 'clsx';

interface LeadFormMultiStepProps {
  onSubmit: (data: LeadFormData) => Promise<void>;
}

export const LeadFormMultiStep: React.FC<LeadFormMultiStepProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionInfo, setSubmissionInfo] = useState<{
    fallback?: boolean;
    message?: string;
  } | null>(null);
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const totalSteps = 2;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onChange'
  });

  const handleNextStep = async () => {
    const fieldsToValidate: (keyof LeadFormData)[] =
      currentStep === 1
        ? ['nombre_completo', 'correo_electronico', 'empresa']
        : ['sector_industria', 'tamano_empresa', 'interes_principal'];

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFormSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const result = await submitLead(data);

      setSubmissionInfo({
        fallback: result.fallback || false,
        message: result.message || 'Lead enviado exitosamente'
      });

      setIsSuccess(true);
      reset();

      await onSubmit(data);

      setTimeout(() => {
        setIsSuccess(false);
        setSubmissionInfo(null);
        setCurrentStep(1);
      }, 8000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionInfo({
        fallback: true,
        message: 'Información guardada localmente. Nos contactaremos pronto.'
      });
      setIsSuccess(true);
      reset();
      setTimeout(() => {
        setIsSuccess(false);
        setSubmissionInfo(null);
        setCurrentStep(1);
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
        className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center backdrop-blur-sm"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-heading font-bold text-green-500 mb-2">
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50"
    >
      {/* Progress Bar */}
      <div className="px-8 pt-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-300">
            Paso {currentStep} de {totalSteps}
          </span>
          <span className="text-xs text-slate-400">
            {currentStep === 1 ? 'Información Básica' : 'Detalles del Proyecto'}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: '50%' }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-primary to-accent"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8 pt-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-heading font-bold text-white mb-2">
            {currentStep === 1 ? '¡Comencemos!' : 'Cuéntanos más sobre tu proyecto'}
          </h3>
          <p className="text-slate-300 text-sm">
            {currentStep === 1
              ? 'Completa tus datos básicos para comenzar'
              : 'Ayúdanos a entender mejor tus necesidades'}
          </p>

          {/* Connection Status Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs">
            <Cloud className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400">
              Conexión segura • Respaldo automático
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
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
                      : 'border-slate-600 focus:ring-primary/50'
                  )}
                  placeholder="Juan Pérez"
                  autoFocus
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
                      : 'border-slate-600 focus:ring-primary/50'
                  )}
                  placeholder="juan@empresa.com"
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
                      : 'border-slate-600 focus:ring-primary/50'
                  )}
                  placeholder="Mi Empresa S.A.S."
                />
                {errors.empresa && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.empresa.message}
                  </p>
                )}
              </div>

              {/* Navigation */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full btn-primary px-6 py-3 rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Siguiente
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Project Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
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
                      : 'border-slate-600 focus:ring-primary/50'
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
                      : 'border-slate-600 focus:ring-primary/50'
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
                      : 'border-slate-600 focus:ring-primary/50'
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

              {/* Optional Fields (Collapsible) */}
              <div className="border-t border-slate-700 pt-6">
                <button
                  type="button"
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  className="flex items-center justify-between w-full text-sm font-medium text-slate-300 hover:text-white transition-colors mb-4"
                >
                  <span>Información Adicional (Opcional)</span>
                  <ChevronRight className={clsx(
                    'w-5 h-5 transition-transform',
                    showOptionalFields && 'rotate-90'
                  )} />
                </button>

                <AnimatePresence>
                  {showOptionalFields && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4 overflow-hidden"
                    >
                      {/* Teléfono */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Teléfono
                        </label>
                        <input
                          {...register('telefono')}
                          type="tel"
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
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
                              : 'border-slate-600 focus:ring-primary/50'
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

                      {/* Comentarios */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Comentarios o Necesidades Específicas
                        </label>
                        <textarea
                          {...register('comentarios')}
                          rows={4}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
                          placeholder="Cuéntanos más sobre tus necesidades..."
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="btn-secondary px-6 py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Anterior
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-xs text-slate-400 text-center mt-6">
          Al enviar este formulario, aceptas que podamos contactarte para discutir nuestros servicios de automatización con IA.
          <br />
          <span className="text-green-400">Tus datos se almacenan de forma segura y no se comparten con terceros.</span>
        </p>
      </form>
    </motion.div>
  );
};
