# lexaia - Plataforma de Automatización con IA

> Transforma tu negocio con inteligencia artificial y automatización avanzada

lexaia es una plataforma web moderna que ofrece soluciones de automatización empresarial impulsadas por IA. Este repositorio contiene el sitio web completo con chatbot inteligente, blog, sistema de leads y más.

---

## 🚀 Características

### ✨ Funcionalidades Principales

- **🤖 Chatbot con IA** - Asistente virtual powered by DeepSeek con historial persistente
- **📝 Formulario de Contacto** - Multi-step con validación Zod y guardado en Supabase
- **📱 WhatsApp Flotante** - Botón de contacto directo
- **💰 Calculadora ROI** - Interactiva para mostrar ahorros con IA
- **📊 Sección de Precios** - Multi-moneda (USD, COP, MXN, EUR, ARS, CLP)
- **📰 Blog** - Sistema de artículos con React Router
- **🎯 Exit Intent Popup** - Captura leads antes de que abandonen
- **🔒 Seguridad** - Variables de entorno para API keys sensibles
- **📈 Analytics** - Tracking completo de eventos y conversiones

### 🛠️ Stack Tecnológico

- **Frontend**: React 18.3 + TypeScript 5.6
- **Build Tool**: Vite 6.0
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Routing**: React Router DOM
- **Backend**: Supabase (PostgreSQL)
- **AI**: DeepSeek API
- **Automation**: N8N workflows

---

## 📁 Estructura del Proyecto

```
lexaia-web/
├── src/
│   ├── components/          # Componentes React
│   │   ├── blog/           # Componentes del blog
│   │   ├── sections/       # Secciones de la landing page
│   │   ├── AIChatbot.tsx   # Chatbot con historial persistente
│   │   ├── Navbar.tsx      # Navegación con routing
│   │   └── ...
│   ├── pages/              # Páginas (Blog, BlogPost)
│   ├── lib/                # Servicios y utilidades
│   │   ├── supabase.ts    # Cliente Supabase
│   │   ├── deepseek.ts    # Cliente DeepSeek IA
│   │   ├── chatService.ts # Servicio de chat persistente
│   │   └── analytics.ts   # Tracking de eventos
│   ├── data/              # Data estática
│   │   └── blogData.ts    # Artículos del blog
│   └── App.tsx            # App principal con routing
├── public/                # Assets estáticos
├── supabase/             # Schemas SQL
│   └── schema.sql        # Database schema completo
├── n8n/                  # Workflows de automatización
│   └── lexaia-workflow.json
├── docs/                 # Documentación
│   ├── SUPABASE_SETUP.md
│   └── N8N_SETUP.md
├── .env.example          # Template de variables de entorno
└── package.json
```

---

## ⚙️ Instalación y Configuración

### 1. Prerequisitos

- Node.js 18+ y pnpm instalados
- Cuenta de Supabase (gratuita)
- DeepSeek API key ([obtener aquí](https://platform.deepseek.com))

### 2. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/lexaia-web.git
cd lexaia-web
```

### 3. Instalar Dependencias

```bash
pnpm install
```

### 4. Configurar Variables de Entorno

```bash
# Copiar template
cp .env.example .env

# Editar .env con tus credenciales
```

#### Variables Requeridas:

```env
# Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui

# DeepSeek AI
VITE_DEEPSEEK_API_KEY=sk-tu-api-key-aqui
```

### 5. Configurar Supabase

Sigue la guía completa: **[docs/SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md)**

Resumen rápido:
1. Crea un proyecto en Supabase
2. Ejecuta `/supabase/schema.sql` en el SQL Editor
3. Copia URL y API key a `.env`

### 6. Iniciar Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Build para Producción

```bash
# Build optimizado
pnpm build

# Preview del build
pnpm preview
```

El build se genera en `/dist` listo para desplegar.

---

## 🚀 Despliegue

### GitHub Pages (Actual)

El proyecto está configurado para GitHub Pages:

```bash
# Hacer deploy
git push origin main

# GitHub Actions automáticamente:
# 1. Hace build
# 2. Despliega a gh-pages
# 3. Accesible en: https://usuario.github.io/lexaia-web
```

### Otras Opciones

- **Vercel**: `vercel --prod`
- **Netlify**: Conectar repo y auto-deploy
- **Railway**: `railway up`

---

## 📚 Documentación Completa

### Guías de Configuración

1. **[Supabase Setup](./docs/SUPABASE_SETUP.md)** - Configuración completa de base de datos
2. **[N8N Workflows](./docs/N8N_SETUP.md)** - Automatización de leads y notificaciones

### Características Técnicas

#### Chatbot Persistente

El chatbot guarda conversaciones en Supabase automáticamente:

```typescript
// Recupera historial previo
useEffect(() => {
  const conversation = await chatService.getOrCreateConversation();
  const history = await chatService.getMessages(conversation.id);
  setMessages(history);
}, []);

// Guarda cada mensaje
await chatService.saveMessage(conversationId, 'user', message);
```

#### Blog con React Router

Sistema de blog completamente funcional:

- Routing dinámico: `/blog` y `/blog/:slug`
- Markdown rendering con `react-markdown`
- SEO optimizado por artículo
- Categorías y tags

#### Formulario Multi-Step

Validación robusta con Zod:

```typescript
const schema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefono: z.string().regex(/^\+?[0-9\s-]+$/),
  empresa: z.string().optional(),
  sector: z.string(),
  mensaje: z.string().min(10, 'Mínimo 10 caracteres'),
});
```

---

## 🔐 Seguridad

### Variables de Entorno

✅ **NUNCA** commits archivos `.env`
✅ Usa `VITE_` prefix para variables del frontend
✅ API keys sensibles solo en el servidor

### Supabase RLS (Row Level Security)

Todas las tablas tienen políticas RLS habilitadas:

```sql
-- Solo inserción pública permitida
CREATE POLICY "Permitir inserción pública de leads"
  ON public.leads FOR INSERT WITH CHECK (true);

-- Solo autenticados pueden ver datos
CREATE POLICY "Solo usuarios autenticados pueden ver leads"
  ON public.leads FOR SELECT
  USING (auth.role() = 'authenticated');
```

---

## 📊 Analytics y Monitoreo

### Google Analytics

Configurado en `index.html`:

```html
<!-- Reemplaza GA_MEASUREMENT_ID con tu ID real -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Custom Analytics

Tracking automático de:

- ✅ Form events (inicio, steps, submit)
- ✅ CTA clicks
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Chat events (abrir, mensaje, cerrar)
- ✅ Section views
- ✅ Exit intent triggers

```typescript
import { analyticsEvents } from './lib/analytics';

// Track manualmente
analyticsEvents.ctaClick('hero', 'Empezar Ahora');
analyticsEvents.formStepComplete('datos-personales', 1);
```

---

## 🧪 Testing (Pendiente)

Actualmente **no hay tests implementados**. Próximas implementaciones:

```bash
# Instalar dependencias de testing
pnpm add -D vitest @testing-library/react @testing-library/jest-dom

# Ejecutar tests
pnpm test
```

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Changelog

### v2.0.0 (2025-01-18)

**🎉 Nuevas Funcionalidades:**
- ✅ Blog con React Router y 1 artículo de IA
- ✅ Chatbot persistente con Supabase
- ✅ Variables de entorno para seguridad
- ✅ N8N workflow completo
- ✅ Documentación exhaustiva

**🔧 Mejoras:**
- Fondo uniforme en toda la página
- Precios reducidos al 50%
- Agentes de voz añadidos a plan Enterprise
- Logo preparado para imagen (comentado)

### v1.0.0 (2025-01-10)

**✨ Lanzamiento Inicial:**
- Landing page completa
- Formulario multi-step
- Chatbot básico (sin persistencia)
- WhatsApp flotante
- ROI Calculator
- Pricing section
- FAQ section
- Exit intent popup

---

## 🐛 Troubleshooting

### Problema: Build falla

```bash
# Limpiar cache y reinstalar
rm -rf node_modules dist
pnpm install
pnpm build
```

### Problema: Chatbot no guarda mensajes

1. Verifica variables en `.env`:
   ```env
   VITE_SUPABASE_URL=https://...
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
2. Verifica que ejecutaste `schema.sql` en Supabase
3. Revisa la consola del navegador (F12) para errores
4. Verifica que las tablas existan en Supabase → Table Editor

### Problema: DeepSeek no responde

1. Verifica tu API key en `.env`
2. Revisa que tengas créditos en DeepSeek
3. Verifica conexión a internet
4. Revisa logs en consola

---

## 📞 Soporte

- **Email**: hola@lexaia.ai
- **WhatsApp**: +57 316 537 5761
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/lexaia-web/issues)

---

## 📜 Licencia

Copyright © 2025 lexaia. Todos los derechos reservados.

---

## 🙏 Agradecimientos

- [DeepSeek](https://deepseek.com) - IA conversacional
- [Supabase](https://supabase.com) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animaciones
- [Lucide Icons](https://lucide.dev) - Iconografía

---

**Hecho con ❤️ por el equipo de lexaia**

🚀 ¿Listo para transformar tu negocio con IA? [Agenda una consulta gratuita](https://lexaia.ai)
