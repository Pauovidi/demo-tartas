import test from "node:test"
import assert from "node:assert/strict"

import {
  HUMAN_SUPPORT_PHONE_E164,
  HUMAN_SUPPORT_WHATSAPP_LINK,
  MOBILE_LAUNCHER_WHATSAPP_PHONE_E164,
  MOBILE_LAUNCHER_WHATSAPP_LINK,
  TWILIO_WHATSAPP_SANDBOX_JOIN_CODE,
  buildHumanSupportMessage,
} from "../src/data/business"

test("el launcher mobile usa Twilio WhatsApp Sandbox para la demo", () => {
  assert.equal(MOBILE_LAUNCHER_WHATSAPP_PHONE_E164, "+14155238886")
  assert.equal(
    MOBILE_LAUNCHER_WHATSAPP_LINK,
    `https://wa.me/14155238886?text=join%20${encodeURIComponent(TWILIO_WHATSAPP_SANDBOX_JOIN_CODE)}`
  )
  assert.match(MOBILE_LAUNCHER_WHATSAPP_LINK, /text=join%20/)
  assert.doesNotMatch(MOBILE_LAUNCHER_WHATSAPP_LINK, /wa\.me\/17756551411/)
  assert.doesNotMatch(MOBILE_LAUNCHER_WHATSAPP_LINK, /wa\.me\/19452452962/)
  assert.doesNotMatch(MOBILE_LAUNCHER_WHATSAPP_LINK, /wa\.me\/12292182263/)
})

test("mantiene el contacto humano demo separado del launcher mobile", () => {
  assert.equal(HUMAN_SUPPORT_PHONE_E164, "+34600000000")
  assert.equal(HUMAN_SUPPORT_WHATSAPP_LINK, "https://wa.me/34600000000")
})

test("el copy de derivación humana apunta al contacto demo", () => {
  const message = buildHumanSupportMessage()

  assert.match(message, /https:\/\/wa\.me\/34600000000/)
  assert.match(message, /\+34600000000/)
})
