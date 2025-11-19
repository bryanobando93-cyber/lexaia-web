# 🔍 Verificación del Chatbot - Guía de Prueba

## ✅ Checklist de Prueba

### **Paso 1: Reiniciar el servidor**

```bash
# Detén el servidor actual (Ctrl+C si está corriendo)
# Luego inicia de nuevo:
pnpm dev
```

**Resultado esperado:**
```
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

### **Paso 2: Verificar que las variables se cargaron**

Abre la consola del navegador (F12 → Console) y ejecuta:

```javascript
console.log('SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('SUPABASE_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ NO configurada')
```

**Resultado esperado:**
```
SUPABASE_URL: https://ypojopocmscftykbdhem.supabase.co
SUPABASE_KEY: ✅ Configurada
```

❌ **Si muestra `undefined`** → El servidor NO se reinició correctamente. Reinicia de nuevo.

---

### **Paso 3: Probar el chatbot**

1. Abre el chatbot (botón flotante en la esquina inferior derecha)
2. Espera a que cargue (verás el mensaje de bienvenida)
3. Envía un mensaje de prueba: **"Hola, esta es una prueba"**
4. Espera la respuesta de la IA

**En la consola del navegador, NO deberías ver:**
```
⚠️ No se pudo conectar con Supabase, usando memoria local
```

Si ves ese warning → Las variables NO se cargaron. Reinicia el servidor.

---

### **Paso 4: Verificar en Supabase**

Ve a [Supabase Dashboard](https://app.supabase.com/project/ypojopocmscftykbdhem)

#### **4.1: Verificar conversación creada**

1. Ve a **Table Editor** → `chat_conversations`
2. Deberías ver **1 nueva fila** con:
   - ✅ `session_id`: algo como `session_1737248xxx_abc123`
   - ✅ `status`: `active`
   - ✅ `message_count`: `2` o más (bienvenida + tu mensaje + respuesta IA)

#### **4.2: Verificar mensajes guardados**

1. Ve a **Table Editor** → `chat_messages`
2. Deberías ver **al menos 3 mensajes**:
   - ✅ **Mensaje 1** (rol: `assistant`): "¡Hola! 👋 Soy el asistente virtual..."
   - ✅ **Mensaje 2** (rol: `user`): "Hola, esta es una prueba"
   - ✅ **Mensaje 3** (rol: `assistant`): La respuesta de la IA

---

## 📊 Queries SQL para Verificación Rápida

Puedes ejecutar estas queries en **SQL Editor** de Supabase:

### **Query 1: Ver última conversación creada**

```sql
SELECT
  id,
  created_at,
  session_id,
  status,
  message_count,
  last_message_at
FROM chat_conversations
ORDER BY created_at DESC
LIMIT 1;
```

**Resultado esperado:**
```
id: [UUID]
created_at: 2025-11-19 XX:XX:XX
session_id: session_173724XXXX_XXXXX
status: active
message_count: 2 o más
last_message_at: 2025-11-19 XX:XX:XX
```

---

### **Query 2: Ver todos los mensajes de la última conversación**

```sql
SELECT
  m.role,
  m.content,
  m.created_at,
  m.model,
  m.response_time_ms
FROM chat_messages m
JOIN chat_conversations c ON m.conversation_id = c.id
WHERE c.id = (
  SELECT id
  FROM chat_conversations
  ORDER BY created_at DESC
  LIMIT 1
)
ORDER BY m.created_at ASC;
```

**Resultado esperado:**
```
role: assistant | content: ¡Hola! 👋 Soy el asistente... | model: deepseek-chat
role: user      | content: Hola, esta es una prueba  | model: NULL
role: assistant | content: [Respuesta de la IA]      | model: deepseek-chat | response_time_ms: [número]
```

---

### **Query 3: Contar mensajes totales**

```sql
SELECT
  COUNT(*) as total_mensajes,
  COUNT(*) FILTER (WHERE role = 'user') as mensajes_usuario,
  COUNT(*) FILTER (WHERE role = 'assistant') as mensajes_ia
FROM chat_messages;
```

**Resultado esperado:**
```
total_mensajes: 3 o más
mensajes_usuario: 1 o más
mensajes_ia: 2 o más
```

---

## 🐛 Troubleshooting

### ❌ Problema: Variables undefined después de reiniciar

**Solución:**
1. Verifica que `.env` existe: `ls -la .env`
2. Verifica el contenido: `cat .env | grep VITE_SUPABASE`
3. IMPORTANTE: Detén completamente el servidor (Ctrl+C)
4. Reinicia: `pnpm dev`

---

### ❌ Problema: Sigue diciendo "usando memoria local"

**Solución:**
1. En la consola del navegador:
```javascript
// Limpiar caché
localStorage.clear()
// Recargar página
location.reload()
```
2. Abre el chatbot de nuevo

---

### ❌ Problema: chat_messages sigue vacía

**Solución:**
1. Verifica que `chat_conversations` tenga registros
2. Si `chat_conversations` está vacía → Problema de RLS o conexión
3. Si `chat_conversations` tiene datos pero `chat_messages` no → Problema en saveMessage()
4. Ejecuta esta query para ver errores:

```sql
-- Verificar políticas RLS
SELECT tablename, policyname, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'chat_messages';
```

Si no aparece la política "Permitir inserción de mensajes", ejecuta:

```sql
CREATE POLICY "Permitir inserción de mensajes"
  ON public.chat_messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.chat_conversations
      WHERE id = conversation_id
    )
  );
```

---

## ✅ Confirmación de Éxito

La prueba es exitosa si:

- ✅ Variables de entorno cargadas correctamente
- ✅ NO aparece warning "usando memoria local"
- ✅ `chat_conversations` tiene 1 nueva fila
- ✅ `chat_messages` tiene 3+ mensajes
- ✅ Los mensajes tienen el contenido correcto
- ✅ El trigger actualizó `message_count` en la conversación

---

**🎉 Si todo funciona:** ¡El problema está resuelto! El chatbot ahora guarda todos los mensajes en Supabase.

**📝 Si algo falla:** Anota el error específico que veas y compártelo para diagnosticar.
