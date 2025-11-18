# Guía Completa de Configuración de N8N para lexaia

Esta guía te llevará paso a paso para configurar N8N y automatizar completamente tu flujo de leads.

## 📋 ¿Qué hace este Workflow?

Cuando un usuario llena el formulario en lexaia.ai:

1. ✅ **Webhook** recibe los datos
2. ✅ **Supabase** guarda el lead en la base de datos
3. ✅ **DeepSeek IA** genera una respuesta personalizada
4. ✅ **Email** automático al cliente
5. ✅ **Email** de notificación al equipo
6. ✅ **Slack** notifica al canal de ventas
7. ✅ **Google Sheets** añade una fila con el lead
8. ✅ **WhatsApp** alerta si el lead es urgente
9. ✅ **Cal.com** (opcional) agenda citas automáticamente

---

## 🚀 Paso 1: Instalar N8N

### Opción A: N8N Cloud (Recomendado - Más Fácil)

1. Ve a [https://n8n.io](https://n8n.io)
2. Haz clic en **"Start for free"**
3. Crea tu cuenta
4. Selecciona plan **Free** (incluye 5,000 execuciones/mes)

✅ **Ventajas**: Sin servidor, sin mantenimiento, SSL incluido
❌ **Desventajas**: Limitado a 5,000 execuciones/mes

### Opción B: N8N Self-Hosted (Docker)

```bash
# Crear directorio para N8N
mkdir ~/.n8n

# Ejecutar N8N con Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

Accede a: `http://localhost:5678`

✅ **Ventajas**: Ilimitado, control total
❌ **Desventajas**: Requiere servidor propio, mantenimiento

---

## 📥 Paso 2: Importar el Workflow

### 2.1: Copiar el Workflow JSON

1. Abre el archivo `/n8n/lexaia-workflow.json` de este proyecto
2. Copia **todo el contenido**

### 2.2: Importar en N8N

1. En N8N, haz clic en el menú **≡** (esquina superior izquierda)
2. Selecciona **"Import from file"**
3. Pega el JSON copiado
4. Haz clic en **"Import"**

✅ Deberías ver el workflow con todos los nodos conectados

---

## 🔑 Paso 3: Configurar Credenciales

Ahora necesitas configurar las credenciales de cada servicio.

### 3.1: Supabase API

1. Haz clic en el nodo **"Supabase - Guardar Lead"**
2. En **Credentials**, haz clic en **"Create New"**
3. Completa:
   - **Name**: `Supabase lexaia`
   - **Host**: `https://xxxxx.supabase.co` (de tu proyecto Supabase)
   - **Service Role Secret**: (ve a Supabase → Project Settings → API → `service_role` key)

⚠️ **Importante**: Usa `service_role` (NO `anon`), solo N8N tiene acceso a esto

4. Haz clic en **"Create"**

### 3.2: DeepSeek API (OpenAI Compatible)

1. Haz clic en el nodo **"DeepSeek - Generar Respuesta IA"**
2. En **Credentials**, haz clic en **"Create New"** → **"OpenAI API"**
3. Completa:
   - **Name**: `DeepSeek API`
   - **API Key**: `sk-xxxxx` (tu DeepSeek API key)
   - **Base URL**: `https://api.deepseek.com/v1` (importante: DeepSeek es compatible con OpenAI API)

4. Haz clic en **"Create"**

### 3.3: Email SMTP (Gmail)

1. Haz clic en el nodo **"Email - Respuesta al Cliente"**
2. En **Credentials**, haz clic en **"Create New"** → **"SMTP"**
3. Completa:
   - **Name**: `Gmail SMTP`
   - **User**: `tu-email@gmail.com`
   - **Password**: **App Password** (NO tu contraseña normal)
   - **Host**: `smtp.gmail.com`
   - **Port**: `587`
   - **TLS**: ✅ Activado

#### Obtener App Password de Gmail:

1. Ve a [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Activa **"2-Step Verification"** (si no está activada)
3. Busca **"App passwords"**
4. Genera una contraseña para **"Mail"** → **"Other (Custom name)"**: `N8N lexaia`
5. Copia la contraseña de 16 caracteres
6. Úsala en N8N

4. Haz clic en **"Create"**

### 3.4: Slack Webhook (Opcional)

1. Ve a [https://api.slack.com/apps](https://api.slack.com/apps)
2. Haz clic en **"Create New App"** → **"From scratch"**
3. Nombre: `lexaia Leads`, Workspace: selecciona tu workspace
4. Ve a **"Incoming Webhooks"** → Activa
5. Haz clic en **"Add New Webhook to Workspace"**
6. Selecciona el canal donde quieres recibir notificaciones (ej: `#ventas`)
7. Copia la **Webhook URL**: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX`
8. En N8N, edita el nodo **"Slack - Notificación"**
9. Reemplaza `YOUR/SLACK/WEBHOOK` con tu URL real

### 3.5: Google Sheets OAuth2 (Opcional)

1. Haz clic en el nodo **"Google Sheets - Añadir Fila"**
2. En **Credentials**, haz clic en **"Create New"** → **"Google Sheets OAuth2"**
3. Sigue el flujo de autorización con tu cuenta de Google
4. Crea una hoja de cálculo llamada **"lexaia Leads"**
5. Añade headers en la fila 1: `Fecha | Nombre | Email | Teléfono | Empresa | Sector | Mensaje | Fuente | UTM Source | UTM Campaign`
6. Copia el **Spreadsheet ID** de la URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_AQUI/edit
   ```
7. En N8N, reemplaza `YOUR_SPREADSHEET_ID` con tu ID real

### 3.6: Cal.com API (Opcional)

1. Ve a [https://cal.com/settings/developer/api-keys](https://cal.com/settings/developer/api-keys)
2. Crea una **New API Key**
3. Copia la key
4. En N8N, haz clic en el nodo **"Cal.com - Crear Cita"**
5. En **Credentials**, crea **"HTTP Header Auth"**:
   - **Name**: `Cal.com API`
   - **Header Name**: `Authorization`
   - **Value**: `Bearer tu-api-key-aqui`

6. Obtén tu **Event Type ID**:
   - Ve a Cal.com → Event Types
   - Copia el ID del evento (número en la URL)
7. En el nodo, reemplaza `={{ $json.event_type_id }}` con tu ID

---

## 🔗 Paso 4: Obtener y Configurar Webhook URL

### 4.1: Activar Webhook

1. Haz clic en el nodo **"Webhook - Recibir Lead"**
2. Copia la **Webhook URL** que aparece (algo como):
   ```
   https://n8n.tuservidor.com/webhook/lexaia-lead
   ```

   O si usas N8N Cloud:
   ```
   https://username.app.n8n.cloud/webhook/lexaia-lead
   ```

### 4.2: Conectar con tu Formulario de lexaia

Abre el archivo `/src/lib/supabase.ts` y modifica la función de submit:

```typescript
export const submitLead = async (data: FormData) => {
  try {
    // Enviar a N8N primero (procesamiento automático)
    const n8nResponse = await fetch('TU-WEBHOOK-URL-AQUI', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        empresa: data.empresa,
        sector: data.sector,
        mensaje: data.mensaje,
        source: 'website',
        utm_source: new URLSearchParams(window.location.search).get('utm_source'),
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      }),
    });

    if (!n8nResponse.ok) {
      throw new Error('Error en workflow N8N');
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting lead:', error);

    // Fallback: guardar directamente en Supabase si N8N falla
    const { error: supabaseError } = await supabase.from('leads').insert([data]);

    if (supabaseError) throw supabaseError;
    return { success: true };
  }
};
```

---

## ✅ Paso 5: Probar el Workflow

### 5.1: Test Manual en N8N

1. En N8N, haz clic en **"Execute Workflow"** (botón play arriba)
2. Haz clic en **"Listen for Test Event"** en el nodo Webhook
3. Envía un POST request de prueba:

```bash
curl -X POST https://TU-WEBHOOK-URL \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Usuario",
    "email": "test@ejemplo.com",
    "telefono": "+57 300 123 4567",
    "empresa": "Empresa Test",
    "sector": "Tecnología",
    "mensaje": "Este es un mensaje de prueba"
  }'
```

4. En N8N, verifica que:
   - ✅ Webhook recibió los datos
   - ✅ Supabase guardó el lead
   - ✅ DeepSeek generó respuesta
   - ✅ Emails se enviaron
   - ✅ Slack notificó (si configuraste)
   - ✅ Google Sheets añadió fila (si configuraste)

### 5.2: Test desde tu Aplicación

1. Abre tu aplicación lexaia
2. Llena el formulario de contacto
3. Revisa:
   - 📧 Tu email (deberías recibir respuesta automática)
   - 📧 Email del equipo
   - 📊 Supabase Table Editor → `leads`
   - 📱 Slack (si configuraste)
   - 📄 Google Sheets (si configuraste)

---

## 🎨 Paso 6: Personalizar Mensajes

### Email de Respuesta al Cliente

Edita el nodo **"DeepSeek - Generar Respuesta IA"**:

```
Eres un asistente de ventas de lexaia, especializado en IA y automatización.

Lead recibido:
- Nombre: {{ $json.nombre }}
- Empresa: {{ $json.empresa }}
- Sector: {{ $json.sector }}
- Mensaje: {{ $json.mensaje }}

Genera un email profesional y personalizado que:
1. Agradezca el interés
2. Demuestre que entendiste su necesidad específica
3. Proponga una llamada de descubrimiento
4. Sea breve (máximo 150 palabras)

Tono: Profesional pero cercano, en español.
```

### Email de Notificación al Equipo

Edita el HTML en **"Email - Notificación Equipo"**:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #6366f1;">🎯 Nuevo Lead en lexaia</h2>

  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Nombre:</strong> {{ $('Supabase - Guardar Lead').item.json.nombre }}</p>
    <p><strong>Email:</strong> <a href="mailto:{{ $('Supabase - Guardar Lead').item.json.email }}">{{ $('Supabase - Guardar Lead').item.json.email }}</a></p>
    <p><strong>Teléfono:</strong> <a href="tel:{{ $('Supabase - Guardar Lead').item.json.telefono }}">{{ $('Supabase - Guardar Lead').item.json.telefono }}</a></p>
    <p><strong>Empresa:</strong> {{ $('Supabase - Guardar Lead').item.json.empresa }}</p>
    <p><strong>Sector:</strong> {{ $('Supabase - Guardar Lead').item.json.sector }}</p>
  </div>

  <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
    <p><strong>Mensaje:</strong></p>
    <p style="font-style: italic;">{{ $('Supabase - Guardar Lead').item.json.mensaje }}</p>
  </div>

  <p style="color: #64748b; font-size: 14px;">
    <strong>Acción requerida:</strong> Responder en menos de 24 horas para maximizar conversión.
  </p>

  <a href="https://lexaia.ai/admin/leads" style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px;">
    Ver en Dashboard
  </a>
</div>
```

---

## 🔧 Troubleshooting

### Problema 1: Webhook no recibe datos

**Solución**:
1. Verifica que el workflow esté **activo** (toggle ON en N8N)
2. Revisa que la URL del webhook sea correcta
3. Verifica que no haya firewall bloqueando
4. Prueba con `curl` directamente al webhook

### Problema 2: Error en Supabase node

**Solución**:
1. Verifica que usas `service_role` key (NO `anon`)
2. Revisa que el schema SQL se ejecutó correctamente
3. Verifica que los nombres de columnas coincidan exactamente

### Problema 3: Emails no se envían

**Solución**:
1. Verifica que usas **App Password** de Gmail (NO contraseña normal)
2. Revisa que 2FA esté activado en Gmail
3. Prueba enviando un email de prueba desde N8N
4. Revisa los logs de ejecución en N8N

### Problema 4: DeepSeek no genera respuestas

**Solución**:
1. Verifica tu API key de DeepSeek
2. Revisa que tengas créditos disponibles
3. Verifica que la Base URL sea correcta: `https://api.deepseek.com/v1`
4. Revisa los logs de error en N8N

---

## 📊 Monitoreo y Analytics

### Dashboard de N8N

1. **Executions**: Ver todas las ejecuciones (exitosas/fallidas)
2. **Logs**: Revisar errores en tiempo real
3. **Metrics**: Tiempo de respuesta promedio

### Configurar Alertas

1. Ve a **Settings** → **Community Nodes**
2. Instala `n8n-nodes-error-trigger`
3. Crea un nuevo workflow que:
   - Se active cuando haya un error
   - Envíe notificación a Slack/Email

---

## 🚀 Optimizaciones Avanzadas

### 1. Rate Limiting

Añade un nodo **"Rate Limit"** después del Webhook:

```javascript
// Limitar a 10 submissions por IP por hora
const ip = $input.item.json.headers['x-forwarded-for'];
const key = `ratelimit:${ip}`;
const count = await $redis.get(key) || 0;

if (count > 10) {
  throw new Error('Rate limit exceeded');
}

await $redis.setex(key, 3600, count + 1);
return $input.item;
```

### 2. Detección de Spam

Añade validación después del Webhook:

```javascript
// Detectar emails temporales, palabras spam, etc.
const email = $input.item.json.email;
const mensaje = $input.item.json.mensaje.toLowerCase();

const spamKeywords = ['viagra', 'casino', 'crypto', 'bitcoin'];
const tempEmailDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];

const isSpam = spamKeywords.some(word => mensaje.includes(word)) ||
               tempEmailDomains.some(domain => email.includes(domain));

if (isSpam) {
  // Marcar como spam en Supabase pero no enviar emails
  return { ...input.item.json, status: 'spam' };
}

return $input.item;
```

### 3. Enriquecimiento de Datos

Añade un nodo HTTP Request para enriquecer leads con Clearbit/Hunter.io:

```javascript
// Obtener información de la empresa
const response = await $http.get(`https://company.clearbit.com/v2/companies/find?domain=${empresa_domain}`);

return {
  ...$input.item.json,
  company_size: response.metrics.employees,
  company_industry: response.category.industry,
  company_logo: response.logo
};
```

---

## ✅ Checklist Final

Antes de ir a producción:

- [ ] Todas las credenciales configuradas
- [ ] Webhook URL actualizada en el código
- [ ] Test completo funcionando
- [ ] Emails llegando correctamente
- [ ] Supabase guardando datos
- [ ] Slack notificando (si aplica)
- [ ] Google Sheets sincronizando (si aplica)
- [ ] Workflow activado (toggle ON)
- [ ] Alertas de error configuradas
- [ ] Rate limiting implementado
- [ ] Logs monitoreados

---

## 🎉 ¡Listo!

Ahora tienes un sistema de automatización completo que:

✅ Captura leads 24/7
✅ Responde automáticamente
✅ Notifica a tu equipo
✅ Guarda todo en múltiples lugares
✅ Detecta leads urgentes
✅ Escala sin límites

**Siguiente paso**: Despliega a producción y empieza a recibir leads automatizados.
