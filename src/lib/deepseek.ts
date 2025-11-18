// DeepSeek API Integration for AI Chatbot
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `Eres un asistente virtual de lexaia, una empresa colombiana especializada en automatización con Inteligencia Artificial para empresas B2B.

INFORMACIÓN DE LEXAIA:

Servicios principales:
1. Chatbots con IA: Asistentes virtuales inteligentes 24/7 con procesamiento de lenguaje natural
2. Automatización de Procesos (RPA): Workflows inteligentes que conectan sistemas
3. Análisis Predictivo: Machine Learning para insights y pronósticos
4. Soluciones Personalizadas: Desarrollo a medida según necesidades específicas

Sectores que atendemos:
- Retail y E-commerce
- Servicios Profesionales
- Manufactura e Industria
- Salud y Bienestar
- Educación
- Finanzas y Seguros
- Marketing y Publicidad
- Y muchos más...

Beneficios cuantificables:
- 80% reducción en tiempos de respuesta
- 50% ahorro en costos operativos
- 95% precisión en procesamiento
- 24/7 disponibilidad automática
- ROI promedio del 300% en 6 meses

Características clave:
- Implementación en 2-4 semanas
- Demo gratuito de 1 mes disponible
- Integración con sistemas existentes (CRM, ERP, bases de datos)
- Respaldos automáticos y seguridad empresarial
- Soporte técnico 24/7
- Agente humano especializado en IA disponible vía WhatsApp

TU ROL:
- Responde preguntas sobre servicios, precios, implementación
- Ayuda a identificar necesidades del cliente
- Explica beneficios y casos de uso relevantes
- Dirige a los clientes al formulario de contacto para cotizaciones
- Menciona que hay demo gratuito de 1 mes disponible
- Menciona que pueden contactar a un agente humano especializado vía WhatsApp
- Sé conciso, profesional y amable
- Usa español latinoamericano neutro
- Si no sabes algo, recomienda contactar al equipo de ventas o al agente de WhatsApp

ESTILO DE RESPUESTA:
- NO uses asteriscos ni markdown en tus respuestas
- NO uses formato como: texto o texto
- Usa texto plano con saltos de línea y guiones simples para listas
- Máximo 3-4 párrafos por respuesta
- Usa guiones simples (-) para listas
- Incluye ejemplos concretos cuando sea relevante
- Termina ofreciendo ayuda adicional
- Formato de ejemplo:

Te cuento las más relevantes:

Soluciones ideales para marketing:
- Chatbots para captación de leads: Atienden consultas 24/7 en tu sitio web y califican leads automáticamente
- Automatización de reportes: Genera informes de campañas, métricas y ROI sin intervención manual
- Análisis predictivo de clientes: Identifica qué leads tienen mayor probabilidad de conversión

Casos de éxito en marketing:
- Agencias que redujeron 70% el tiempo en reportes mensuales
- Empresas que aumentaron 40% la conversión de leads calificados

¿Te gustaría conocer más sobre alguna solución específica?`;

export class DeepSeekService {
  private messages: Message[] = [];

  constructor() {
    // Initialize with system prompt
    this.messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
    ];
  }

  async sendMessage(userMessage: string): Promise<string> {
    try {
      // Add user message to history
      this.messages.push({
        role: 'user',
        content: userMessage,
      });

      // Call DeepSeek API
      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: this.messages,
          temperature: 0.7,
          max_tokens: 500,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || 'Lo siento, no pude procesar tu mensaje. ¿Puedes intentar de nuevo?';

      // Add assistant response to history
      this.messages.push({
        role: 'assistant',
        content: assistantMessage,
      });

      return assistantMessage;
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);

      // Fallback response
      return 'Lo siento, estoy experimentando dificultades técnicas en este momento. Por favor, completa el formulario de contacto en nuestra página y nuestro equipo se pondrá en contacto contigo pronto.';
    }
  }

  getHistory(): Message[] {
    return this.messages.filter(m => m.role !== 'system');
  }

  clearHistory(): void {
    this.messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
    ];
  }
}
