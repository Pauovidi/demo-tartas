export const WELCOME_MESSAGE =
  "¡Hola! Soy el asistente de Casa Bruna. Puedo ayudarte con sabores, formatos, horarios y con una reserva demo de recogida."

export function hasGreetingIntent(text: string) {
  return /^(hola|hola!|holaa|buenas|buenos dias|buenas tardes|buenas noches|hey|hello)\b/i.test(
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
  )
}
