import test from "node:test"
import assert from "node:assert/strict"

import {
  ADD_ANOTHER_CAKE_PROMPT,
  buildContextualOrderReplyText,
  buildMissingFieldsPrompt,
  MULTIPLE_CAKES_INTRO,
  ORDER_LOW_CONFIDENCE_RECOVERY,
} from "../lib/chatbot/order-prompts"

test("pide solo el teléfono una vez cuando es el único dato faltante", () => {
  assert.equal(
    buildMissingFieldsPrompt({
      flavor: "pistacho",
      format: "tarta",
      customerName: "Lucía",
    }, "web"),
    "Solo me falta tu teléfono para confirmarlo."
  )
})

test("incluye nombre y teléfono cuando faltan varios campos en web", () => {
  assert.equal(
    buildMissingFieldsPrompt({}, "web"),
    "Para dejarlo confirmado necesito el sabor, el formato, tu nombre y tu teléfono."
  )
})

test("no duplica campos aunque el helper se evalúe varias veces sobre el mismo estado", () => {
  assert.equal(
    buildMissingFieldsPrompt({
      flavor: "vainilla tostada",
    }, "web"),
    "Para dejarlo confirmado necesito el formato, tu nombre y tu teléfono."
  )
})

test("usa copy de continuidad natural cuando ya hay fecha y entra un sabor válido", () => {
  const missingPrompt = buildMissingFieldsPrompt(
    {
      flavor: "higo-miel",
    },
    "web",
    { preferContinuationTone: true }
  )

  assert.equal(
    buildContextualOrderReplyText({
      itemLabel: "una tarta de Higo y miel",
      dateLabel: "viernes 24/04",
      missingPrompt,
    }),
    "De acuerdo. Te apunto una tarta de Higo y miel para el viernes 24/04. Para dejarlo confirmado me faltan el formato, tu nombre y tu teléfono."
  )
})

test("expone un fallback corto para entradas ambiguas dentro del flujo", () => {
  assert.equal(ORDER_LOW_CONFIDENCE_RECOVERY, "No lo he entendido bien. ¿Puedes repetírmelo?")
})

test("mantiene el copy mínimo para varias tartas en un mismo pedido", () => {
  assert.equal(MULTIPLE_CAKES_INTRO, "Perfecto. Te las voy apuntando una a una para no equivocarme. Vamos con la primera.")
  assert.equal(ADD_ANOTHER_CAKE_PROMPT, "¿Quieres cerrar el pedido o añadir otra tarta?")
})
