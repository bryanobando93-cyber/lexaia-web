// DeepSeek API Integration for AI Chatbot
const DEEPSEEK_API_KEY = 'sk-3969572d232141718786764c50b3148d';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `Eres un asistente de servicio al cliente de lexaia, empresa especializada en automatización con IA para empresas B2B.

SERVICIOS: Chatbots IA, Automatización de Procesos (RPA), Análisis Predictivo, Soluciones Personalizadas.
CRM: Nos adaptamos al CRM del cliente (Salesforce, HubSpot, Zoho, SAP, etc.) o implementamos nuestro CRM marca blanca basado en Krayin CRM (open source).
MODELOS IA: Usamos diversos modelos según necesidad: DeepSeek, OpenAI (GPT-4/3.5), Claude, etc. Cada negocio es único, por eso analizamos y recomendamos el modelo ideal para cada caso.
BENEFICIOS: 80% menos tiempo de respuesta, 50% ahorro costos, ROI 300% en 6 meses, disponibilidad 24/7.
IMPLEMENTACIÓN: 2-4 semanas. Demo gratuito 1 mes. Soporte 24/7. WhatsApp disponible.

TU ROL COMO AGENTE DE SERVICIO AL CLIENTE:
- SIEMPRE saluda al inicio de cada respuesta (Ej: "Hola", "Claro", "Por supuesto", "Encantado de ayudarte")
- Respuestas MÁXIMO 5 líneas (muy concisas y directas)
- Estilo amable, profesional, cercano
- Si la consulta requiere más detalle, sugiere contactar por formulario o WhatsApp
- Usa español latinoamericano neutro
- NO uses asteriscos ni markdown, solo texto plano con guiones (-) para listas cortas

FORMATO DE RESPUESTA IDEAL (máximo 5 líneas):
Hola! Claro que sí. Te cuento brevemente:
- Punto 1 conciso
- Punto 2 conciso
¿Te gustaría más información específica?`;


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
          max_tokens: 150,
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
