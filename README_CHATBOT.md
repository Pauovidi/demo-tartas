# Chatbot híbrido (Web + WhatsApp) para demo portfolio-safe

## Fuente única de negocio

Los datos operativos visibles viven en `src/data/business.ts`.

- Marca demo: `Casa Bruna`
- WhatsApp / atención humana: `https://wa.me/34600000000`
- Launcher mobile WhatsApp demo: Twilio Sandbox `https://wa.me/14155238886?text=join%20<codigo>`
- Teléfono visible: `+34 600 000 000`
- Formatos customer-facing: `Mesa` y `Petit`
- Recogida: flujo demo sin envío ni pago real

FAQ, launcher, chatbot y metadatos reutilizan esta misma fuente.

## Qué hace el chatbot

- Responde en español sobre sabores, formatos, precios, horarios y reservas.
- Si hay Supabase configurado, mantiene memoria persistente allí.
- Si faltan variables de Supabase, funciona en modo demo con memoria efímera en servidor y pedidos simulados no persistentes.
- Deriva a atención humana demo si falta un dato confirmado o si el usuario lo pide.
- Reutiliza el mismo motor en web y WhatsApp.

## Variables de entorno principales

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `CRON_SECRET`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_VERIFY_TOKEN`
- `WHATSAPP_TEMPLATE_REMINDER_NAME`
- `WHATSAPP_TEMPLATE_LANG`
- `NEXT_PUBLIC_TWILIO_WHATSAPP_SANDBOX_JOIN_CODE`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL`

## Demo WhatsApp sin Meta Business

Para probar WhatsApp en demo sin Meta Business ni números comprados de Twilio, el launcher mobile usa Twilio WhatsApp Sandbox.

- Configura `NEXT_PUBLIC_TWILIO_WHATSAPP_SANDBOX_JOIN_CODE` con el código real del sandbox.
- En Twilio Sandbox, configura el webhook entrante por `POST` a `/api/twilio/whatsapp`.
- El número sandbox visible es `+1 415 523 8886` y el enlace `wa.me` usa `14155238886`.

## Endpoints

- `POST /api/chat`
- `GET /api/whatsapp/webhook`
- `POST /api/whatsapp/webhook`
- `POST /api/twilio/whatsapp`
- `GET /api/cron/send-reminders`

## Nota de portfolio

Esta versión ha sustituido marca, teléfonos, copy y datos de atención por valores ficticios aptos para demo.
