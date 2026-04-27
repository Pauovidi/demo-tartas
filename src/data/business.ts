export const BRAND_NAME = "Casa Bruna"
export const BRAND_TAGLINE = "Horneado lento para sobremesas memorables."
export const BRAND_TONE = "Mediterráneo elegante, cálido y sereno."
export const BRAND_URL = "https://casabruna.example"
export const BRAND_EMAIL = "atelier@casabruna.example"
export const BRAND_LOCATION = "Atelier demo en Madrid"
export const BRAND_SUPPORT_LABEL = "Equipo Casa Bruna"
export const DEMO_DISCLAIMER =
  "Demo portfolio: los datos de contacto, disponibilidad y pedidos son ficticios."

export const HUMAN_SUPPORT_PHONE_RAW = "600000000"
export const HUMAN_SUPPORT_PHONE_E164 = "+34600000000"
export const HUMAN_SUPPORT_PHONE_DISPLAY = "+34 600 000 000"
export const HUMAN_SUPPORT_WHATSAPP_LINK = "https://wa.me/34600000000"
export const TWILIO_WHATSAPP_SANDBOX_WA_ME_NUMBER = "14155238886"
export const TWILIO_WHATSAPP_SANDBOX_PHONE_E164 = "+14155238886"
// TODO demo WhatsApp Sandbox: set NEXT_PUBLIC_TWILIO_WHATSAPP_SANDBOX_JOIN_CODE to the real Twilio join code.
export const TWILIO_WHATSAPP_SANDBOX_JOIN_CODE =
  process.env.NEXT_PUBLIC_TWILIO_WHATSAPP_SANDBOX_JOIN_CODE ?? "PON_AQUI_EL_CODIGO_SANDBOX"
export const MOBILE_LAUNCHER_WHATSAPP_PHONE_E164 = TWILIO_WHATSAPP_SANDBOX_PHONE_E164
export const MOBILE_LAUNCHER_WHATSAPP_LINK = `https://wa.me/${TWILIO_WHATSAPP_SANDBOX_WA_ME_NUMBER}?text=join%20${encodeURIComponent(
  TWILIO_WHATSAPP_SANDBOX_JOIN_CODE
)}`

export const PICKUP_ONLY_COPY =
  "Recogida concertada en atelier. Esta demo no ofrece envíos ni pagos online reales."
export const FORMAT_SIZE_COPY = "Trabajamos con dos formatos: Mesa y Petit."
export const CLOSED_PICKUP_DAYS_COPY = "martes y miércoles permanecemos cerrados"

export type ProductFormat = "tarta" | "cajita"
export type OrderItemType = "cake" | "box"

const CUSTOMER_FACING_FORMAT_LABELS: Record<ProductFormat, string> = {
  tarta: "Mesa",
  cajita: "Petit",
}

const ORDER_ITEM_TYPE_LABELS: Record<OrderItemType, string> = {
  cake: CUSTOMER_FACING_FORMAT_LABELS.tarta,
  box: CUSTOMER_FACING_FORMAT_LABELS.cajita,
}

export const STORE_HOURS_LINES = [
  "Horario del atelier:",
  "Jueves: 16:00–20:00",
  "Viernes: 16:00–20:00",
  "Sábado: 11:00–14:30 y 17:00–20:30",
  "Domingo: 11:00–14:30",
  "Lunes: 16:00–19:30",
  "Martes y miércoles: cerrado.",
  PICKUP_ONLY_COPY,
] as const

export const STORE_HOURS_TEXT = STORE_HOURS_LINES.join("\n")
export const STORE_HOURS_INLINE_TEXT = STORE_HOURS_LINES.join(" ")
export const OPEN_PICKUP_WEEKDAY_INDEXES = [0, 1, 4, 5, 6] as const

export function getCustomerFacingFormatLabel(format: ProductFormat) {
  return CUSTOMER_FACING_FORMAT_LABELS[format]
}

export function getOrderItemTypeLabel(type: OrderItemType) {
  return ORDER_ITEM_TYPE_LABELS[type]
}

export function isPickupWeekdayOpen(weekday: number) {
  return OPEN_PICKUP_WEEKDAY_INDEXES.includes(
    weekday as (typeof OPEN_PICKUP_WEEKDAY_INDEXES)[number]
  )
}

export function buildHumanSupportMessage(
  prefix = "Te atiende una persona del atelier aquí:",
  channel: "web" | "whatsapp" = "web"
) {
  if (channel === "whatsapp") {
    return `${prefix} ${HUMAN_SUPPORT_PHONE_DISPLAY}`
  }

  return `${prefix} ${HUMAN_SUPPORT_WHATSAPP_LINK} o escribe al ${HUMAN_SUPPORT_PHONE_E164}`
}

export function buildUnconfirmedProductInfoMessage(channel: "web" | "whatsapp" = "web") {
  return `No tengo ese dato confirmado en esta demo ahora mismo. ${buildHumanSupportMessage(
    "Si quieres, te lo revisa una persona del atelier aquí:",
    channel
  )}`
}
