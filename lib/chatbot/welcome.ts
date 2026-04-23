import { PICKUP_ONLY_COPY } from "@/src/data/business"
import { getFlavors } from "@/src/data/products"

export const WELCOME_MESSAGE =
  "¡Hola! 👋 Puedes reservar tu tarta para una fecha concreta. Si quieres, te ayudo con sabores, tamaños, precios o con una reserva."

function buildFlavorsAndSizesBody() {
  const flavorLines = getFlavors()
    .map((flavor) => `- ${flavor.label}`)
    .join("\n")

  return `Siempre trabajamos con 2 tamaños: Mesa, con un precio de 39 € y Petit, con un precio de 14 €.

Sabores:
${flavorLines}

${PICKUP_ONLY_COPY} Plazo mínimo 3 días.`
}

export const FLAVORS_AND_SIZES_MESSAGE = `¡Hola! 🍰 ${buildFlavorsAndSizesBody()}`

export function buildFlavorsAndSizesMessage(includeGreeting = false) {
  const body = `🍰 ${buildFlavorsAndSizesBody()}`
  return includeGreeting ? FLAVORS_AND_SIZES_MESSAGE : body
}

export function hasGreetingIntent(text: string) {
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[!?.,;:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  return /^(hola+|buenas|buenos dias|buenas tardes|buenas noches|hey|hello)$/.test(normalized)
}
