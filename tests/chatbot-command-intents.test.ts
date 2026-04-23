import assert from "node:assert/strict"
import test from "node:test"

import {
  hasCancelOrderHandoffIntent,
  isWhatsappConversationResetCommand,
  resolveConversationCommand,
} from "../lib/chatbot/commands"

test("detecta cancelación de pedido como handoff humano", () => {
  for (const message of [
    "cancelar pedido",
    "quiero cancelar el pedido",
    "eliminar el pedido",
    "quiero eliminar el pedido",
    "anular mi pedido",
  ]) {
    assert.equal(hasCancelOrderHandoffIntent(message), true)
    assert.equal(resolveConversationCommand("web", message), "cancel_order_handoff")
  }
})

test("prioriza cancelación de pedido frente al reset cuando el texto mezcla ambas ideas", () => {
  assert.equal(resolveConversationCommand("whatsapp", "cancelar pedido y reiniciar"), "cancel_order_handoff")
})

test("mantiene reiniciar, reset y empezar de nuevo como reset de conversación en WhatsApp", () => {
  for (const message of ["reiniciar", "reset", "empezar de nuevo"]) {
    assert.equal(isWhatsappConversationResetCommand("whatsapp", message), true)
  }
})

test("no confunde cancelar pedido con reset de conversación", () => {
  for (const message of ["cancelar pedido", "quiero cancelar el pedido", "eliminar el pedido"]) {
    assert.equal(isWhatsappConversationResetCommand("whatsapp", message), false)
  }
})
