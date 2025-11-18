-- ============================================
-- LEXAIA - SUPABASE DATABASE SCHEMA
-- ============================================
-- Este archivo contiene todos los schemas necesarios para lexaia
-- Ejecutar en orden en el SQL Editor de Supabase

-- ============================================
-- 1. TABLA: leads (formularios de contacto)
-- ============================================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Información de contacto
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50),
  empresa VARCHAR(255),

  -- Información adicional
  sector VARCHAR(100),
  mensaje TEXT,

  -- Metadata
  source VARCHAR(100) DEFAULT 'website',
  status VARCHAR(50) DEFAULT 'new',
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),

  -- Índices para búsqueda rápida
  CONSTRAINT leads_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);

-- RLS (Row Level Security)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Permitir INSERT público (desde formulario web)
CREATE POLICY "Permitir inserción pública de leads"
  ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Policy: Solo usuarios autenticados pueden ver leads
CREATE POLICY "Solo usuarios autenticados pueden ver leads"
  ON public.leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: Solo usuarios autenticados pueden actualizar
CREATE POLICY "Solo usuarios autenticados pueden actualizar leads"
  ON public.leads
  FOR UPDATE
  USING (auth.role() = 'authenticated');


-- ============================================
-- 2. TABLA: chat_conversations (historial de chatbot)
-- ============================================
CREATE TABLE IF NOT EXISTS public.chat_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Identificador del usuario (puede ser anónimo con session ID)
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id VARCHAR(255), -- Para usuarios anónimos

  -- Metadata
  status VARCHAR(50) DEFAULT 'active', -- active, closed, archived
  title VARCHAR(500), -- Título auto-generado del primer mensaje

  -- Stats
  message_count INTEGER DEFAULT 0,
  last_message_at TIMESTAMP WITH TIME ZONE,

  -- Contexto
  user_agent TEXT,
  ip_address INET,
  page_url TEXT,

  CONSTRAINT chat_conversations_user_check CHECK (
    user_id IS NOT NULL OR session_id IS NOT NULL
  )
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON public.chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session_id ON public.chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_created_at ON public.chat_conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_status ON public.chat_conversations(status);

-- RLS
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

-- Policy: Usuarios pueden ver sus propias conversaciones
CREATE POLICY "Usuarios pueden ver sus conversaciones"
  ON public.chat_conversations
  FOR SELECT
  USING (
    auth.uid() = user_id OR
    session_id IS NOT NULL
  );

-- Policy: Permitir inserción pública
CREATE POLICY "Permitir creación pública de conversaciones"
  ON public.chat_conversations
  FOR INSERT
  WITH CHECK (true);

-- Policy: Usuarios pueden actualizar sus conversaciones
CREATE POLICY "Usuarios pueden actualizar sus conversaciones"
  ON public.chat_conversations
  FOR UPDATE
  USING (auth.uid() = user_id OR session_id IS NOT NULL);


-- ============================================
-- 3. TABLA: chat_messages (mensajes del chatbot)
-- ============================================
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Relación con conversación
  conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,

  -- Contenido del mensaje
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,

  -- Metadata
  tokens_used INTEGER,
  model VARCHAR(100),
  response_time_ms INTEGER,

  -- Feedback del usuario
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON public.chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_role ON public.chat_messages(role);

-- RLS
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Usuarios pueden ver mensajes de sus conversaciones
CREATE POLICY "Usuarios pueden ver mensajes de sus conversaciones"
  ON public.chat_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_conversations
      WHERE id = conversation_id
      AND (auth.uid() = user_id OR session_id IS NOT NULL)
    )
  );

-- Policy: Permitir inserción de mensajes
CREATE POLICY "Permitir inserción de mensajes"
  ON public.chat_messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.chat_conversations
      WHERE id = conversation_id
    )
  );

-- Policy: Usuarios pueden actualizar (dar rating) a mensajes de sus conversaciones
CREATE POLICY "Usuarios pueden actualizar mensajes de sus conversaciones"
  ON public.chat_messages
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_conversations
      WHERE id = conversation_id
      AND (auth.uid() = user_id OR session_id IS NOT NULL)
    )
  );


-- ============================================
-- 4. TABLA: blog_posts (opcional - gestión de blog desde Supabase)
-- ============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Contenido
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,

  -- Metadata
  author VARCHAR(255) NOT NULL DEFAULT 'lexaia Team',
  published_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),

  -- SEO
  category VARCHAR(100),
  tags TEXT[], -- Array de tags
  image_url TEXT,
  read_time VARCHAR(20),

  -- Stats
  view_count INTEGER DEFAULT 0,

  CONSTRAINT blog_posts_slug_format CHECK (slug ~* '^[a-z0-9-]+$')
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);

-- RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Todos pueden leer posts publicados
CREATE POLICY "Todos pueden leer posts publicados"
  ON public.blog_posts
  FOR SELECT
  USING (status = 'published' AND published_at <= now());

-- Policy: Solo autenticados pueden crear/editar
CREATE POLICY "Solo autenticados pueden crear posts"
  ON public.blog_posts
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Solo autenticados pueden actualizar posts"
  ON public.blog_posts
  FOR UPDATE
  USING (auth.role() = 'authenticated');


-- ============================================
-- 5. FUNCTIONS: Auto-actualizar updated_at
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para auto-actualizar updated_at
CREATE TRIGGER set_updated_at_chat_conversations
  BEFORE UPDATE ON public.chat_conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_blog_posts
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();


-- ============================================
-- 6. FUNCTION: Auto-actualizar message_count en conversaciones
-- ============================================
CREATE OR REPLACE FUNCTION public.update_conversation_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.chat_conversations
  SET
    message_count = message_count + 1,
    last_message_at = NEW.created_at,
    updated_at = now(),
    title = CASE
      WHEN title IS NULL AND NEW.role = 'user'
      THEN LEFT(NEW.content, 100)
      ELSE title
    END
  WHERE id = NEW.conversation_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_conversation_stats_on_message
  AFTER INSERT ON public.chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_conversation_stats();


-- ============================================
-- 7. VIEWS: Vistas útiles para analytics
-- ============================================

-- Vista: Leads por día
CREATE OR REPLACE VIEW public.leads_per_day AS
SELECT
  DATE(created_at) as date,
  COUNT(*) as count,
  status
FROM public.leads
GROUP BY DATE(created_at), status
ORDER BY date DESC;

-- Vista: Conversaciones activas con stats
CREATE OR REPLACE VIEW public.active_conversations AS
SELECT
  c.id,
  c.created_at,
  c.updated_at,
  c.session_id,
  c.title,
  c.message_count,
  c.last_message_at,
  COUNT(m.id) as actual_message_count,
  MAX(m.created_at) as latest_message_at
FROM public.chat_conversations c
LEFT JOIN public.chat_messages m ON c.id = m.conversation_id
WHERE c.status = 'active'
GROUP BY c.id, c.created_at, c.updated_at, c.session_id, c.title, c.message_count, c.last_message_at
ORDER BY c.updated_at DESC;


-- ============================================
-- 8. SAMPLE DATA (opcional - para testing)
-- ============================================

-- Insertar un lead de ejemplo (comentado por defecto)
/*
INSERT INTO public.leads (nombre, email, telefono, empresa, sector, mensaje, source)
VALUES
  ('Juan Pérez', 'juan@ejemplo.com', '+57 300 123 4567', 'Ejemplo S.A.', 'Tecnología', 'Interesado en automatización con IA', 'website');
*/

-- ============================================
-- FIN DEL SCHEMA
-- ============================================
-- Para ejecutar este schema:
-- 1. Abre Supabase Dashboard
-- 2. Ve a SQL Editor
-- 3. Crea una nueva query
-- 4. Pega este contenido
-- 5. Ejecuta (Run)
--
-- Notas importantes:
-- - Todas las tablas tienen RLS habilitado para seguridad
-- - Los leads se pueden insertar públicamente (formulario web)
-- - Las conversaciones de chat se pueden crear sin autenticación
-- - Solo usuarios autenticados pueden ver/gestionar datos
-- ============================================
