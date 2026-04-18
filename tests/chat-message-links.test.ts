import test from "node:test"
import assert from "node:assert/strict"

import { splitMessageLinks } from "../src/components/chat-message-links"

test("convierte el wa.me demo del handoff web en un segmento de enlace", () => {
  const parts = splitMessageLinks("Te atiende una persona del atelier aquí: https://wa.me/34600000000 o escribe al +34600000000")

  assert.deepEqual(parts, [
    { type: "text", value: "Te atiende una persona del atelier aquí: " },
    { type: "link", value: "https://wa.me/34600000000" },
    { type: "text", value: " o escribe al +34600000000" },
  ])
})

test("no altera mensajes sin urls", () => {
  assert.deepEqual(splitMessageLinks("He reiniciado la conversación. Te ayudo con una nueva reserva."), [
    { type: "text", value: "He reiniciado la conversación. Te ayudo con una nueva reserva." },
  ])
})
