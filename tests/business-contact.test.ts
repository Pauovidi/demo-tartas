import test from "node:test"
import assert from "node:assert/strict"

import {
  HUMAN_SUPPORT_PHONE_E164,
  HUMAN_SUPPORT_WHATSAPP_LINK,
  MOBILE_LAUNCHER_WHATSAPP_PHONE_E164,
  MOBILE_LAUNCHER_WHATSAPP_LINK,
  buildHumanSupportMessage,
} from "../src/data/business"

test("mantiene los enlaces demo sincronizados entre launcher y atención humana", () => {
  assert.equal(MOBILE_LAUNCHER_WHATSAPP_PHONE_E164, "+34600000000")
  assert.equal(MOBILE_LAUNCHER_WHATSAPP_LINK, "https://wa.me/34600000000")
  assert.equal(HUMAN_SUPPORT_PHONE_E164, "+34600000000")
  assert.equal(HUMAN_SUPPORT_WHATSAPP_LINK, "https://wa.me/34600000000")
})

test("el copy de derivación humana apunta al contacto demo", () => {
  const message = buildHumanSupportMessage()

  assert.match(message, /https:\/\/wa\.me\/34600000000/)
  assert.match(message, /\+34600000000/)
})
