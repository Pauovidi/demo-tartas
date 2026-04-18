# Supabase setup para Admin + Checkout demo

## Variables de entorno

### Local (`.env.local`)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
ADMIN_EMAIL=admin@demo.example
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=tu-cuenta@gmail.com
SMTP_PASS=<app-password>
SMTP_FROM="Casa Bruna Demo <atelier@casabruna.example>"
```

### Vercel

Configura:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

## Flujo técnico

1. El checkout crea `orders` y `order_items`.
2. El panel admin consulta producción y pedidos.
3. El chatbot puede crear pedidos y guardar memoria.
4. Los recordatorios usan cron y plantilla WhatsApp si la integración está configurada.

## Nota de demo

La documentación visible usa una marca ficticia y datos de contacto demo para evitar rastros del proyecto original.
