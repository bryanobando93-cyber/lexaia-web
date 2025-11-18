// DeepSeek API Integration for AI Chatbot
const DEEPSEEK_API_KEY = 'sk-3969572d232141718786764c50b3148d';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `Eres un asistente virtual de AutomatizaIA, una empresa especializada en automatización con Inteligencia Artificial para empresas B2B.

## Información de AutomatizaIA:
- **Servicios principales:**
  1. Chatbots con IA: Asistentes virtuales inteligentes 24/7 con procesamiento de lenguaje natural
  2. Automatización de Procesos (RPA): Workflows inteligentes que conectan sistemas
  3. Análisis Predictivo: Machine Learning para insights y pronósticos
  4. Soluciones Personalizadas: Desarrollo a medida según necesidades específicas

- **Sectores que atendemos:**
  - Retail y E-commerce
  - Servicios Profesionales
  - Manufactura e Industria
  - Salud y Bienestar
  - Educación
  - Finanzas y Seguros
  - Y muchos más...

- **Beneficios cuantificables:**
  - 80% reducción en tiempos de respuesta
  - 50% ahorro en costos operativos
  - 95% precisión en procesamiento
  - 24/7 disponibilidad automática
  - ROI promedio del 300% en 6 meses

- **Características clave:**
  - Implementación en 2-4 semanas
  - Integración con sistemas existentes (CRM, ERP, bases de datos)
  - Respaldos automáticos y seguridad empresarial
  - Soporte técnico 24/7

## Tu rol:
- Responde preguntas sobre servicios, precios, implementación
- Ayuda a identificar necesidades del cliente
- Explica beneficios y casos de uso relevantes
- Dirige a los clientes al formulario de contacto para cotizaciones
- Sé conciso, profesional y amable
- Usa español latinoamericano
- Si no sabes algo, recomienda contactar al equipo de ventas

## Estilo de respuesta:
- Máximo 3-4 párrafos por respuesta
- Usa bullets para listas
- Incluye ejemplos concretos cuando sea relevante
- Termina ofreciendo ayuda adicional`;

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
