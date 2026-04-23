import test from "node:test"
import assert from "node:assert/strict"

import {
  extractCustomerName,
  extractPhoneFromText,
  getAdditionalCakeDecisionIntent,
  hasExplicitNewOrderIntent,
  hasMultipleCakeOrderIntent,
  hasRecentOrderGuard,
  parseOrderFormat,
} from "../lib/chatbot/order-intake"

test("captura varios datos en una sola intervención", () => {
  const message = "higo y miel, mesa. Pau. 645290441"

  assert.equal(parseOrderFormat(message), "tarta")
  assert.equal(extractCustomerName(message), "Pau")
  assert.equal(extractPhoneFromText(message), "645290441")
})

test("trata cajita, pequeña y petit como formato y no como sabor", () => {
  assert.equal(parseOrderFormat("cajita"), "cajita")
  assert.equal(parseOrderFormat("pequeña"), "cajita")
  assert.equal(parseOrderFormat("petit"), "cajita")
})

test("prioriza un sabor válido como sabor y no como nombre", () => {
  assert.equal(extractCustomerName("Higo y miel", { blockedNormalizedTerms: ["higo y miel"] }), undefined)
})

test("solo permite otro pedido reciente cuando la intención es explícita", () => {
  assert.equal(hasExplicitNewOrderIntent("nuevo pedido higo y miel cajita"), true)
  assert.equal(hasExplicitNewOrderIntent("quiero otro"), true)
  assert.equal(hasExplicitNewOrderIntent("higo y miel cajita"), false)
  assert.equal(
    hasRecentOrderGuard("2026-04-20T10:00:00.000Z", new Date("2026-04-20T10:20:00.000Z")),
    true
  )
})

test("detecta cuando el usuario quiere varias tartas en el mismo pedido", () => {
  assert.equal(hasMultipleCakeOrderIntent("quiero dos tartas para el viernes"), true)
  assert.equal(hasMultipleCakeOrderIntent("quiero varias cajitas"), true)
  assert.equal(hasMultipleCakeOrderIntent("quiero una tarta"), false)
})

test("distingue entre añadir otra tarta y cerrar el pedido", () => {
  assert.equal(getAdditionalCakeDecisionIntent("añadir otra"), "add")
  assert.equal(getAdditionalCakeDecisionIntent("otra tarta de higo y miel"), "add")
  assert.equal(getAdditionalCakeDecisionIntent("cerrar el pedido"), "close")
  assert.equal(getAdditionalCakeDecisionIntent("eso es todo"), "close")
})

test("trata 'ya está', 'vale', 'ok' y 'listo' como cierre y no como nombre", () => {
  for (const message of ["ya está", "vale", "ok", "listo", "cerrar pedido"]) {
    assert.equal(getAdditionalCakeDecisionIntent(message), "close")
    assert.equal(extractCustomerName(message, { allowSegmentExtraction: false }), undefined)
  }
})

test("no acepta texto basura como nombre y deja espacio al recovery corto", () => {
  assert.equal(extractCustomerName("blabla", { allowSegmentExtraction: false }), undefined)
  assert.equal(extractCustomerName("asdf", { allowSegmentExtraction: false }), undefined)
  assert.equal(extractCustomerName("zzzz", { allowSegmentExtraction: false }), undefined)
})
