import test from "node:test"
import assert from "node:assert/strict"

import {
  cancelDemoOrder,
  clearDemoConversationState,
  createDemoOrder,
  getDemoChatPauseState,
  getOrCreateDemoChatUser,
  loadDemoChatContext,
  pruneDemoChatMessages,
  saveDemoChatMessage,
  setDemoChatPauseState,
  updateDemoChatSummary,
} from "../lib/chatbot/demo-store"

test("mantiene memoria conversacional efímera por sesión", () => {
  const { userId } = getOrCreateDemoChatUser({ channel: "web", externalId: "session-demo-store" })

  clearDemoConversationState(userId)
  saveDemoChatMessage(userId, "user", "hola")
  saveDemoChatMessage(userId, "assistant", "¡Hola!")
  updateDemoChatSummary(userId, "Usuario quiere reservar")

  const context = loadDemoChatContext(userId)

  assert.equal(context.summary, "Usuario quiere reservar")
  assert.deepEqual(context.messagesLastN, [
    { role: "user", content: "hola" },
    { role: "assistant", content: "¡Hola!" },
  ])
})

test("puede pausar el bot y limpiar la conversación en modo demo", () => {
  const { userId } = getOrCreateDemoChatUser({ channel: "web", externalId: "session-demo-pause" })

  clearDemoConversationState(userId)
  setDemoChatPauseState(userId, "2030-01-01T10:00:00.000Z")
  assert.equal(getDemoChatPauseState(userId).botPausedUntil?.toISOString(), "2030-01-01T10:00:00.000Z")

  saveDemoChatMessage(userId, "assistant", "texto")
  pruneDemoChatMessages(userId, 1)
  clearDemoConversationState(userId)

  const context = loadDemoChatContext(userId)
  assert.equal(context.summary, null)
  assert.deepEqual(context.messagesLastN, [])
})

test("crea y cancela pedidos demo sin persistencia real", () => {
  const order = createDemoOrder({
    customerName: "Pau",
    phone: "645290441",
    deliveryDate: "2026-05-01",
    items: [{ type: "cake", flavor: "higo-miel", qty: 1 }],
  })

  assert.match(order.id, /^demo-order-/)
  assert.equal(order.status, "pending")

  const cancelled = cancelDemoOrder(order.id)
  assert.equal(cancelled?.status, "cancelled")
  assert.ok(cancelled?.cancelledAt)
})
