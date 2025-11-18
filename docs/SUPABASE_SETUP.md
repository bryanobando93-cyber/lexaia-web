# Guía Completa de Configuración de Supabase para lexaia

Esta guía te ayudará a configurar Supabase paso a paso para almacenar leads, conversaciones del chatbot y posts del blog.

## 📋 Tabla de Contenidos

1. [Crear Proyecto en Supabase](#1-crear-proyecto-en-supabase)
2. [Ejecutar el Schema SQL](#2-ejecutar-el-schema-sql)
3. [Configurar Variables de Entorno](#3-configurar-variables-de-entorno)
4. [Verificar Configuración](#4-verificar-configuración)
5. [Gestionar Datos](#5-gestionar-datos)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Crear Proyecto en Supabase

### Paso 1.1: Registro y Nuevo Proyecto

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en **"Start your project"**
3. Crea una cuenta (puedes usar GitHub, Google, etc.)
4. Una vez dentro, haz clic en **"New Project"**

### Paso 1.2: Configurar Proyecto

Completa los siguientes datos:

- **Name**: `lexaia-production` (o el nombre que prefieras)
- **Database Password**: Genera una contraseña fuerte (¡guárdala en un lugar seguro!)
- **Region**: Selecciona la región más cercana a tus usuarios (ej: `South America (São Paulo)`)
- **Pricing Plan**: Selecciona **Free** para empezar (incluye 500 MB de base de datos)

Haz clic en **"Create new project"**

⏱️ *Espera 2-3 minutos mientras Supabase inicializa tu base de datos*

---

## 2. Ejecutar el Schema SQL

### Paso 2.1: Abrir SQL Editor

1. En el panel izquierdo, haz clic en **SQL Editor** (ícono de consola)
2. Haz clic en **"New query"**

### Paso 2.2: Copiar y Ejecutar Schema

1. Abre el archivo `/supabase/schema.sql` de este proyecto
2. Copia **todo el contenido** del archivo
3. Pégalo en el editor SQL de Supabase
4. Haz clic en **"Run"** (o presiona `Ctrl + Enter`)

✅ Deberías ver: `Success. No rows returned`

Esto significa que se crearon correctamente:
- ✅ Tabla `leads` (formularios de contacto)
- ✅ Tabla `chat_conversations` (conversaciones del chatbot)
- ✅ Tabla `chat_messages` (mensajes del chatbot)
- ✅ Tabla `blog_posts` (opcional - gestión de blog)
- ✅ Políticas RLS (Row Level Security)
- ✅ Triggers automáticos
- ✅ Vistas para analytics

### Paso 2.3: Verificar Tablas Creadas

1. En el panel izquierdo, haz clic en **Table Editor**
2. Deberías ver 4 tablas:
   - `leads`
   - `chat_conversations`
   - `chat_messages`
   - `blog_posts`

---

## 3. Configurar Variables de Entorno

### Paso 3.1: Obtener Credenciales de Supabase

1. En el panel izquierdo, haz clic en **Project Settings** (ícono de engranaje)
2. En el menú lateral, haz clic en **API**
3. Copia las siguientes credenciales:

   - **Project URL**: `https://xxxxx.supabase.co`
   - **API Key (anon public)**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Paso 3.2: Actualizar .env

1. Abre el archivo `.env` en la raíz del proyecto
2. Actualiza las siguientes variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# DeepSeek API (ya configurado)
VITE_DEEPSEEK_API_KEY=sk-xxxxx
```

⚠️ **IMPORTANTE**: Nunca compartas tu archivo `.env` públicamente. Ya está incluido en `.gitignore`.

---

## 4. Verificar Configuración

### Paso 4.1: Probar Conexión Local

1. Inicia tu servidor de desarrollo:
```bash
pnpm dev
```

2. Abre la aplicación en tu navegador: `http://localhost:5173`
3. Llena el formulario de contacto
4. Vuelve a Supabase → **Table Editor** → `leads`
5. ✅ Deberías ver tu registro en la tabla

### Paso 4.2: Probar Chatbot

1. Abre el chatbot en tu aplicación (botón flotante inferior derecho)
2. Envía un mensaje
3. Vuelve a Supabase → **Table Editor**:
   - `chat_conversations` → Deberías ver 1 conversación
   - `chat_messages` → Deberías ver tus mensajes

---

## 5. Gestionar Datos

### 5.1: Ver Leads Recibidos

**Opción A: Table Editor (UI)**
1. Ve a **Table Editor** → `leads`
2. Aquí puedes:
   - Ver todos los leads
   - Filtrar por fecha, email, sector, etc.
   - Editar manualmente (cambiar status)
   - Exportar a CSV

**Opción B: SQL Query**
```sql
-- Ver todos los leads del último mes
SELECT *
FROM leads
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Contar leads por sector
SELECT sector, COUNT(*) as total
FROM leads
GROUP BY sector
ORDER BY total DESC;

-- Ver leads urgentes
SELECT nombre, email, empresa, mensaje
FROM leads
WHERE mensaje ILIKE '%urgent%' OR mensaje ILIKE '%urgente%'
ORDER BY created_at DESC;
```

### 5.2: Ver Conversaciones del Chatbot

```sql
-- Ver conversaciones activas con stats
SELECT * FROM active_conversations;

-- Ver mensajes de una conversación específica
SELECT
  role,
  content,
  created_at,
  response_time_ms
FROM chat_messages
WHERE conversation_id = 'UUID_AQUI'
ORDER BY created_at;

-- Métricas de rendimiento del chatbot
SELECT
  AVG(response_time_ms) as avg_response_time,
  COUNT(*) as total_messages,
  COUNT(DISTINCT conversation_id) as total_conversations
FROM chat_messages
WHERE role = 'assistant'
AND created_at > NOW() - INTERVAL '7 days';
```

### 5.3: Analytics

```sql
-- Leads por día (última semana)
SELECT * FROM leads_per_day
WHERE date > CURRENT_DATE - 7
ORDER BY date DESC;

-- Conversión por fuente
SELECT
  source,
  COUNT(*) as leads,
  COUNT(*) FILTER (WHERE status = 'converted') as conversions,
  ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'converted') / COUNT(*), 2) as conversion_rate
FROM leads
GROUP BY source;
```

---

## 6. Troubleshooting

### Problema 1: "Row Level Security policy violation"

**Causa**: Las políticas RLS están bloqueando la operación

**Solución**:
1. Ve a **Authentication** → **Policies**
2. Verifica que existan las políticas:
   - `Permitir inserción pública de leads`
   - `Permitir creación pública de conversaciones`
3. Si no existen, re-ejecuta el schema SQL

### Problema 2: "Connection refused" o "Network error"

**Causa**: URL o API Key incorrectas

**Solución**:
1. Verifica tu archivo `.env`
2. Asegúrate de que `VITE_SUPABASE_URL` empiece con `https://`
3. Verifica que `VITE_SUPABASE_ANON_KEY` sea el **anon public** (NO el service_role)
4. Reinicia el servidor de desarrollo después de cambiar `.env`

### Problema 3: Los datos no aparecen en Supabase

**Solución**:
1. Abre la consola del navegador (F12)
2. Busca errores en la consola
3. Verifica que no haya errores de CORS
4. Verifica que la tabla existe en **Table Editor**

### Problema 4: "Invalid API Key"

**Solución**:
1. Ve a **Project Settings** → **API**
2. Regenera la **anon public key** si es necesario
3. Actualiza `.env` con la nueva key
4. Reinicia el servidor

---

## 🔒 Seguridad

### Buenas Prácticas

1. ✅ **Nunca** expongas tu `service_role` key en el frontend
2. ✅ Usa solo `anon public` key en variables `VITE_*`
3. ✅ Mantén `.env` en `.gitignore`
4. ✅ Las políticas RLS protegen tus datos automáticamente
5. ✅ Revisa regularmente los logs en **Database** → **Logs**

### Rotación de Keys

Si crees que tu API key fue comprometida:

1. Ve a **Project Settings** → **API**
2. Haz clic en **"Regenerate"** en la key comprometida
3. Actualiza `.env` con la nueva key
4. Redeploya tu aplicación

---

## 📊 Monitoreo

### Dashboard de Supabase

1. **Database**: Uso de storage, conexiones activas
2. **API**: Requests por hora, errores
3. **Auth**: Usuarios registrados (si usas autenticación)
4. **Logs**: Errores en tiempo real

### Alertas Recomendadas

Configura notificaciones en **Project Settings** → **Integrations**:

- ✉️ Email cuando el uso de DB supere el 80%
- ✉️ Email cuando haya 10+ errores en 1 hora
- ✉️ Email cuando API requests superen límite (plan Free: 50,000/mes)

---

## 🚀 Próximos Pasos

1. ✅ Supabase configurado correctamente
2. → Configurar N8N (ver `docs/N8N_SETUP.md`)
3. → Desplegar a producción
4. → Configurar analytics avanzado
5. → Implementar autenticación de usuarios (opcional)

---

## 📞 Soporte

Si tienes problemas:

1. Revisa la [documentación oficial de Supabase](https://supabase.com/docs)
2. Consulta el [Discord de Supabase](https://discord.supabase.com)
3. Revisa los logs en **Database** → **Logs**

---

**¡Listo!** 🎉 Supabase está configurado y listo para recibir datos de producción.
