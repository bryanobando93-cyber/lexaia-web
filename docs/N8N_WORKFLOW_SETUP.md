# Guía Rápida: Importar Workflow de N8N para lexaia

## 📋 Paso 1: Copiar el JSON del Workflow

El archivo está en: `/n8n/lexaia-workflow-simple.json`

**Contenido del workflow:**

```json
{
  "name": "lexaia - Lead Management Workflow",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "lexaia-lead",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "webhook-node",
      "name": "Webhook - Recibir Lead",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1.1,
      "position": [240, 300],
      "webhookId": "lexaia-lead-webhook"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $env.SUPABASE_URL }}/rest/v1/leads",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "supabaseApi",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            },
            {
              "name": "Prefer",
              "value": "return=representation"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "nombre",
              "value": "={{ $json.body.nombre }}"
            },
            {
              "name": "email",
              "value": "={{ $json.body.email }}"
            },
            {
              "name": "telefono",
              "value": "={{ $json.body.telefono }}"
            },
            {
              "name": "empresa",
              "value": "={{ $json.body.empresa }}"
            },
            {
              "name": "sector",
              "value": "={{ $json.body.sector }}"
            },
            {
              "name": "mensaje",
              "value": "={{ $json.body.mensaje }}"
            },
            {
              "name": "source",
              "value": "={{ $json.body.source || 'website' }}"
            }
          ]
        }
      },
      "id": "supabase-node",
      "name": "Supabase - Guardar Lead",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [460, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { \"success\": true, \"message\": \"Lead recibido correctamente\" } }}"
      },
      "id": "response-node",
      "name": "Webhook Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [680, 300]
    }
  ],
  "connections": {
    "Webhook - Recibir Lead": {
      "main": [[{ "node": "Supabase - Guardar Lead", "type": "main", "index": 0 }]]
    },
    "Supabase - Guardar Lead": {
      "main": [[{ "node": "Webhook Response", "type": "main", "index": 0 }]]
    }
  }
}
```

---

## 🚀 Paso 2: Importar en N8N

### Opción A: N8N Cloud

1. Ve a [https://app.n8n.cloud](https://app.n8n.cloud)
2. Inicia sesión
3. Haz clic en el menú **≡** (esquina superior izquierda)
4. Selecciona **"Import from file"**
5. Pega el JSON completo de arriba
6. Haz clic en **"Import"**

### Opción B: N8N Self-Hosted

1. Accede a tu instancia de N8N (ej: `http://localhost:5678`)
2. Haz clic en el menú **≡**
3. Selecciona **"Import from file"**
4. Pega el JSON completo
5. Haz clic en **"Import"**

---

## 🔑 Paso 3: Configurar Credenciales de Supabase

### 3.1: Obtener Credenciales de Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Ve a **Project Settings** → **API**
3. Copia estas 2 credenciales:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (⚠️ NO uses `anon` key)

### 3.2: Configurar en N8N

1. En N8N, haz clic en el nodo **"Supabase - Guardar Lead"**
2. Verás un error de credenciales (es normal)
3. Haz clic en **"Select Credential"** → **"Create New"**
4. Completa:

**Si usas HTTP Request (como en el workflow):**
- **Credential Type**: Generic Credential Type → **Header Auth**
- **Name**: `Supabase lexaia`
- **Header Name**: `apikey`
- **Value**: Tu **Service Role Key** de Supabase

**Agregar también Authorization header:**
- En el nodo HTTP Request
- Ve a **Headers**
- Añade otro header:
  - **Name**: `Authorization`
  - **Value**: `Bearer TU_SERVICE_ROLE_KEY`

5. Haz clic en **"Save"**

### 3.3: Configurar Variable de Entorno (Recomendado)

En N8N, configura variable de entorno:

**N8N Cloud:**
1. Ve a **Settings** → **Environments**
2. Añade variable:
   - **Name**: `SUPABASE_URL`
   - **Value**: `https://xxxxx.supabase.co`

**N8N Self-Hosted (Docker):**
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -e SUPABASE_URL=https://xxxxx.supabase.co \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

---

## 🧪 Paso 4: Probar el Workflow

### 4.1: Activar Webhook

1. En el nodo **"Webhook - Recibir Lead"**, haz clic
2. Verás la **Webhook URL** (algo como):
   ```
   https://tu-instancia.app.n8n.cloud/webhook/lexaia-lead
   ```
   O si es local:
   ```
   http://localhost:5678/webhook/lexaia-lead
   ```
3. **Copia esta URL** (la necesitarás para el frontend)
4. Haz clic en **"Listen for Test Event"** (arriba a la derecha)
5. El webhook ahora está esperando datos

### 4.2: Enviar Request de Prueba

Abre una terminal y ejecuta:

```bash
curl -X POST https://TU-WEBHOOK-URL-AQUI/webhook/lexaia-lead \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Bryan Obando",
    "email": "bryan@ejemplo.com",
    "telefono": "+57 316 537 5761",
    "empresa": "lexaia",
    "sector": "Tecnología",
    "mensaje": "Mensaje de prueba desde N8N",
    "source": "website"
  }'
```

### 4.3: Verificar Resultado

En N8N deberías ver:

1. ✅ **Webhook node** - Recibió datos (muestra el JSON)
2. ✅ **Supabase node** - Guardó en la base de datos (muestra el registro creado)
3. ✅ **Response node** - Envió confirmación `{"success": true}`

En **Supabase Dashboard**:
1. Ve a **Table Editor** → `leads`
2. Deberías ver tu registro de prueba con todos los datos

---

## 🔗 Paso 5: Conectar con tu Frontend

### 5.1: Actualizar Formulario de lexaia

Edita `/src/lib/supabase.ts`:

```typescript
export const submitLead = async (leadData: any) => {
  console.log('Enviando lead a N8N:', leadData);

  try {
    // Enviar directamente a N8N
    const response = await fetch('TU-WEBHOOK-URL-AQUI/webhook/lexaia-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadData)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Lead enviado exitosamente:', result);
    return result;

  } catch (error) {
    console.error('Error enviando lead:', error);

    // Fallback: guardar localmente si N8N falla
    const savedLead = fallbackStorage.saveLead(leadData);
    return {
      success: true,
      data: savedLead,
      fallback: true
    };
  }
};
```

### 5.2: Probar desde la Aplicación

1. Inicia tu app: `pnpm dev`
2. Ve a la sección de contacto
3. Llena el formulario
4. Envía
5. Verifica en:
   - ✅ N8N (deberías ver una nueva ejecución)
   - ✅ Supabase Table Editor (nuevo registro)

---

## ⚙️ Paso 6: Activar el Workflow en Producción

⚠️ **IMPORTANTE**: Por defecto, el workflow solo funciona cuando presionas "Listen for Test Event"

Para que funcione 24/7:

1. En N8N, arriba a la derecha, activa el **toggle** (debe estar en **ON**)
2. El workflow ahora está activo permanentemente
3. Cada vez que tu formulario envíe datos, se ejecutará automáticamente

---

## 🎨 Personalizaciones Opcionales

### Añadir Notificación por Email

1. Añade un nodo **"Send Email"** después de Supabase
2. Conecta: `Supabase → Send Email → Webhook Response`
3. Configura:
   - **To**: `tu-email@lexaia.ai`
   - **Subject**: `🎯 Nuevo Lead: {{ $('Webhook - Recibir Lead').item.json.body.nombre }}`
   - **Body**:
     ```
     Nombre: {{ $('Webhook - Recibir Lead').item.json.body.nombre }}
     Email: {{ $('Webhook - Recibir Lead').item.json.body.email }}
     Empresa: {{ $('Webhook - Recibir Lead').item.json.body.empresa }}
     Mensaje: {{ $('Webhook - Recibir Lead').item.json.body.mensaje }}
     ```

### Añadir Notificación a Slack

1. Añade nodo **"Slack"**
2. Conecta después de Supabase
3. Configura:
   - **Channel**: `#ventas`
   - **Message**:
     ```
     🚀 Nuevo Lead en lexaia:
     - Nombre: {{ $('Webhook - Recibir Lead').item.json.body.nombre }}
     - Email: {{ $('Webhook - Recibir Lead').item.json.body.email }}
     - Empresa: {{ $('Webhook - Recibir Lead').item.json.body.empresa }}
     ```

---

## 🐛 Troubleshooting

### Error: "Webhook not found"

**Solución**:
- Verifica que el workflow esté **activado** (toggle ON)
- Revisa que la URL sea exactamente la que muestra N8N
- Asegúrate de incluir `/webhook/lexaia-lead` al final

### Error: "Invalid credentials"

**Solución**:
- Usa **Service Role Key** (NO `anon` key)
- Verifica que el header `apikey` esté configurado
- Añade header `Authorization: Bearer SERVICE_ROLE_KEY`

### Error: "Column does not exist"

**Solución**:
- Verifica que ejecutaste el `schema.sql` en Supabase
- Revisa que la tabla `leads` exista
- Verifica que las columnas coincidan con el JSON del nodo

### Datos no llegan a Supabase

**Solución**:
1. En N8N, haz clic en **"Executions"** (menú izquierdo)
2. Revisa la última ejecución
3. Haz clic en cada nodo para ver qué datos pasaron
4. Busca errores en rojo

---

## ✅ Checklist Final

- [ ] JSON del workflow importado en N8N
- [ ] Credenciales de Supabase configuradas
- [ ] Variable `SUPABASE_URL` configurada
- [ ] Webhook URL copiada
- [ ] Test con `curl` exitoso
- [ ] Datos aparecen en Supabase
- [ ] Frontend actualizado con webhook URL
- [ ] Test desde formulario web exitoso
- [ ] Workflow activado (toggle ON)

---

**🎉 ¡Listo!** Ahora tienes un sistema completamente automatizado que:

1. ✅ Recibe leads desde tu web
2. ✅ Los guarda en Supabase automáticamente
3. ✅ Responde al formulario instantáneamente
4. ✅ Funciona 24/7 sin intervención

**Siguiente paso**: Añadir notificaciones por email/Slack (opcional)
