import test from "node:test"
import assert from "node:assert/strict"

import { hasGreetingIntent, WELCOME_MESSAGE } from "../lib/chatbot/welcome"

test("expone el nuevo saludo del chatbot demo", () => {
  assert.equal(
    WELCOME_MESSAGE,
    "¡Hola! Soy el asistente de Casa Bruna. Puedo ayudarte con sabores, formatos, horarios y con una reserva demo de recogida."
  )
})

test("reconoce el saludo simple para devolver el mensaje de bienvenida", () => {
  assert.equal(hasGreetingIntent("hola"), true)
  assert.equal(hasGreetingIntent("buenas"), true)
  assert.equal(hasGreetingIntent("quiero una tarta"), false)
})
