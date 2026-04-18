# Chatbot híbrido (Web + WhatsApp) para demo portfolio-safe

## Fuente única de negocio

Los datos operativos visibles viven en `src/data/business.ts`.

- Marca demo: `Casa Bruna`
- WhatsApp / atención humana: `https://wa.me/34600000000`
- Teléfono visible: `+34 600 000 000`
- Formatos customer-facing: `Mesa` y `Petit`
- Recogida: flujo demo sin envío ni pago real

FAQ, launcher, chatbot y metadatos reutilizan esta misma fuente.

## Qué hace el chatbot

- Responde en español sobre sabores, formatos, precios, horarios y reservas.
- Mantiene memoria persistente en Supabase.
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
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL`

## Endpoints

- `POST /api/chat`
- `GET /api/whatsapp/webhook`
- `POST /api/whatsapp/webhook`
- `GET /api/cron/send-reminders`

## Nota de portfolio

Esta versión ha sustituido marca, teléfonos, copy y datos de atención por valores ficticios aptos para demo.
