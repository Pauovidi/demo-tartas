import test from "node:test"
import assert from "node:assert/strict"

import {
  buildFlavorsAndSizesMessage,
  FLAVORS_AND_SIZES_MESSAGE,
  hasGreetingIntent,
  WELCOME_MESSAGE,
} from "../lib/chatbot/welcome"

test("expone el saludo portado del chatbot", () => {
  assert.equal(
    WELCOME_MESSAGE,
    "¡Hola! 👋 Puedes reservar tu tarta para una fecha concreta. Si quieres, te ayudo con sabores, tamaños, precios o con una reserva."
  )
})

test("reconoce el saludo simple para devolver el mensaje de bienvenida", () => {
  assert.equal(hasGreetingIntent("hola"), true)
  assert.equal(hasGreetingIntent("buenas"), true)
  assert.equal(hasGreetingIntent("hola qué sabores hay"), false)
  assert.equal(hasGreetingIntent("quiero una tarta"), false)
})

test("usa el copy simplificado de sabores y tamaños adaptado a la DEMO", () => {
  assert.ok(FLAVORS_AND_SIZES_MESSAGE.startsWith("¡Hola! 🍰 Siempre trabajamos con 2 tamaños: Mesa, con un precio de 39 € y Petit, con un precio de 14 €."))
  assert.match(FLAVORS_AND_SIZES_MESSAGE, /- Vainilla tostada/)
  assert.match(FLAVORS_AND_SIZES_MESSAGE, /- Higo y miel/)
  assert.match(FLAVORS_AND_SIZES_MESSAGE, /Plazo mínimo 3 días\./)
})

test("puede responder sabores sin repetir hola en mitad del flujo", () => {
  assert.equal(buildFlavorsAndSizesMessage(false).startsWith("¡Hola!"), false)
  assert.equal(buildFlavorsAndSizesMessage(true), FLAVORS_AND_SIZES_MESSAGE)
})
