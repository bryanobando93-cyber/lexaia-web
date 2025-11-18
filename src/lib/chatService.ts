import { supabase } from './supabase';

export interface ChatMessage {
  id?: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at?: string;
  tokens_used?: number;
  model?: string;
  response_time_ms?: number;
}

export interface ChatConversation {
  id: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
  session_id?: string;
  status: 'active' | 'closed' | 'archived';
  title?: string;
  message_count: number;
  last_message_at?: string;
}

class ChatService {
  private sessionId: string;

  constructor() {
    // Generar o recuperar session ID del localStorage
    this.sessionId = this.getOrCreateSessionId();
  }

  private getOrCreateSessionId(): string {
    let sessionId = localStorage.getItem('lexaia_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('lexaia_session_id', sessionId);
    }
    return sessionId;
  }

  /**
   * Crear una nueva conversación
   */
  async createConversation(): Promise<ChatConversation | null> {
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          session_id: this.sessionId,
          status: 'active',
          message_count: 0,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creando conversación:', error);
        return null;
      }

      return data as ChatConversation;
    } catch (error) {
      console.error('Error en createConversation:', error);
      return null;
    }
  }

  /**
   * Obtener conversación activa del usuario
   */
  async getActiveConversation(): Promise<ChatConversation | null> {
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('session_id', this.sessionId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned
        console.error('Error obteniendo conversación:', error);
        return null;
      }

      return data as ChatConversation | null;
    } catch (error) {
      console.error('Error en getActiveConversation:', error);
      return null;
    }
  }

  /**
   * Obtener o crear conversación activa
   */
  async getOrCreateConversation(): Promise<ChatConversation | null> {
    let conversation = await this.getActiveConversation();

    if (!conversation) {
      conversation = await this.createConversation();
    }

    return conversation;
  }

  /**
   * Guardar un mensaje en la conversación
   */
  async saveMessage(
    conversationId: string,
    role: 'user' | 'assistant' | 'system',
    content: string,
    metadata?: {
      tokens_used?: number;
      model?: string;
      response_time_ms?: number;
    }
  ): Promise<ChatMessage | null> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          role,
          content,
          tokens_used: metadata?.tokens_used,
          model: metadata?.model,
          response_time_ms: metadata?.response_time_ms,
        })
        .select()
        .single();

      if (error) {
        console.error('Error guardando mensaje:', error);
        return null;
      }

      return data as ChatMessage;
    } catch (error) {
      console.error('Error en saveMessage:', error);
      return null;
    }
  }

  /**
   * Obtener historial de mensajes de una conversación
   */
  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error obteniendo mensajes:', error);
        return [];
      }

      return data as ChatMessage[];
    } catch (error) {
      console.error('Error en getMessages:', error);
      return [];
    }
  }

  /**
   * Cerrar una conversación
   */
  async closeConversation(conversationId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('chat_conversations')
        .update({ status: 'closed' })
        .eq('id', conversationId);

      if (error) {
        console.error('Error cerrando conversación:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error en closeConversation:', error);
      return false;
    }
  }

  /**
   * Obtener todas las conversaciones del usuario (historial completo)
   */
  async getUserConversations(): Promise<ChatConversation[]> {
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('session_id', this.sessionId)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error obteniendo conversaciones:', error);
        return [];
      }

      return data as ChatConversation[];
    } catch (error) {
      console.error('Error en getUserConversations:', error);
      return [];
    }
  }

  /**
   * Dar rating a un mensaje del asistente
   */
  async rateMessage(
    messageId: string,
    rating: number,
    feedback?: string
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .update({
          rating,
          feedback,
        })
        .eq('id', messageId);

      if (error) {
        console.error('Error calificando mensaje:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error en rateMessage:', error);
      return false;
    }
  }

  /**
   * Limpiar session ID (logout virtual)
   */
  clearSession(): void {
    localStorage.removeItem('lexaia_session_id');
    this.sessionId = this.getOrCreateSessionId();
  }
}

// Exportar instancia singleton
export const chatService = new ChatService();
