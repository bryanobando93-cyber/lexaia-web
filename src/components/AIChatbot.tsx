import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { DeepSeekService, Message } from '../lib/deepseek';
import { analyticsEvents } from '../lib/analytics';
import { chatService, ChatConversation } from '../lib/chatService';

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentConversation, setCurrentConversation] = useState<ChatConversation | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const deepSeekService = useRef(new DeepSeekService());

  // Auto-scroll to bottom when new messages arrive or input is focused
  useEffect(() => {
    // Pequeño delay para asegurar que el DOM se actualizó
    const scrollTimeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);

    return () => clearTimeout(scrollTimeout);
  }, [messages, isInputFocused]);

  // Load or create conversation when chat opens
  useEffect(() => {
    const initializeConversation = async () => {
      if (!isOpen || currentConversation) return;

      setIsLoadingHistory(true);

      try {
        // Intentar obtener o crear conversación en Supabase
        const conversation = await chatService.getOrCreateConversation();

        if (conversation) {
          setCurrentConversation(conversation);

          // Cargar historial de mensajes
          const history = await chatService.getMessages(conversation.id);

          if (history.length > 0) {
            // Convertir mensajes de Supabase al formato del chatbot
            const chatMessages: Message[] = history.map((msg) => ({
              role: msg.role,
              content: msg.content,
            }));
            setMessages(chatMessages);
          } else {
            // Si no hay historial, enviar mensaje de bienvenida
            const welcomeMessage: Message = {
              role: 'assistant',
              content:
                '¡Hola! 👋 Soy el asistente virtual de lexaia. Estoy aquí para ayudarte a descubrir cómo la inteligencia artificial puede transformar tu empresa.\n\n¿En qué puedo ayudarte hoy?',
            };
            setMessages([welcomeMessage]);

            // Guardar mensaje de bienvenida en Supabase
            await chatService.saveMessage(
              conversation.id,
              'assistant',
              welcomeMessage.content,
              { model: 'deepseek-chat' }
            );
          }
        } else {
          // Fallback: usar memoria si Supabase falla
          console.warn('No se pudo conectar con Supabase, usando memoria local');
          if (messages.length === 0) {
            setMessages([
              {
                role: 'assistant',
                content:
                  '¡Hola! 👋 Soy el asistente virtual de lexaia. Estoy aquí para ayudarte a descubrir cómo la inteligencia artificial puede transformar tu empresa.\n\n¿En qué puedo ayudarte hoy?',
              },
            ]);
          }
        }
      } catch (error) {
        console.error('Error inicializando conversación:', error);
        // Fallback a memoria
        if (messages.length === 0) {
          setMessages([
            {
              role: 'assistant',
              content:
                '¡Hola! 👋 Soy el asistente virtual de lexaia. Estoy aquí para ayudarte a descubrir cómo la inteligencia artificial puede transformar tu empresa.\n\n¿En qué puedo ayudarte hoy?',
            },
          ]);
        }
      } finally {
        setIsLoadingHistory(false);
      }
    };

    initializeConversation();
  }, [isOpen]);

  const handleToggleChat = () => {
    if (!isOpen) {
      analyticsEvents.chatOpen();
    }
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message to UI
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // Track message sent
    analyticsEvents.chatMessageSent(userMessage.length);

    // Guardar mensaje del usuario en Supabase
    if (currentConversation) {
      await chatService.saveMessage(currentConversation.id, 'user', userMessage);
    }

    // Show typing indicator
    setIsTyping(true);

    const startTime = Date.now();

    try {
      // Get AI response
      const aiResponse = await deepSeekService.current.sendMessage(userMessage);
      const responseTime = Date.now() - startTime;

      // Add AI response to UI
      const newAIMessage: Message = {
        role: 'assistant',
        content: aiResponse,
      };
      setMessages((prev) => [...prev, newAIMessage]);

      // Guardar respuesta del asistente en Supabase
      if (currentConversation) {
        await chatService.saveMessage(currentConversation.id, 'assistant', aiResponse, {
          model: 'deepseek-chat',
          response_time_ms: responseTime,
        });
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        role: 'assistant' as const,
        content:
          'Disculpa, tuve un problema al procesar tu mensaje. Por favor intenta de nuevo o completa nuestro formulario de contacto.',
      };
      setMessages((prev) => [...prev, errorMessage]);

      // Guardar mensaje de error en Supabase
      if (currentConversation) {
        await chatService.saveMessage(
          currentConversation.id,
          'assistant',
          errorMessage.content,
          { model: 'deepseek-chat' }
        );
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-br from-primary to-accent rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-slate-900" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6 text-slate-900" />
              {/* Pulsing indicator */}
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] sm:h-[600px] max-h-[80vh] bg-slate-900/95 backdrop-blur-xl border-2 border-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center gap-3">
              <div className="relative">
                <div className="p-2 bg-slate-900 rounded-full">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <motion.div
                  className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">Asistente <span className="text-primary">lexaia</span></h3>
                <p className="text-xs text-slate-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Powered by AI
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-primary/20'
                        : 'bg-slate-800 border border-primary/30'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-primary" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary" />
                    )}
                  </div>

                  {/* Message bubble */}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary text-slate-900 rounded-tr-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-primary/30 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-slate-800 border border-slate-700/50 p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-primary/60 rounded-full"
                        animate={{ y: [-3, 0, -3] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary/60 rounded-full"
                        animate={{ y: [-3, 0, -3] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary/60 rounded-full"
                        animate={{ y: [-3, 0, -3] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => {
                    setIsInputFocused(true);
                    // Scroll al final cuando se enfoca el input
                    setTimeout(() => {
                      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    }, 300);
                  }}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="Escribe tu mensaje..."
                  disabled={isTyping}
                  className="flex-1 bg-slate-800 text-slate-200 border border-slate-700/50 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-primary hover:bg-primary-dark text-slate-900 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
