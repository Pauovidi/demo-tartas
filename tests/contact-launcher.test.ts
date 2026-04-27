import test from "node:test"
import assert from "node:assert/strict"

import { getContactLauncherMode } from "../src/components/contact-launcher"
import { MOBILE_LAUNCHER_WHATSAPP_LINK } from "../src/data/business"

test("en mobile web el launcher principal es el contacto externo", () => {
  assert.equal(getContactLauncherMode(true), "whatsapp")
  assert.match(MOBILE_LAUNCHER_WHATSAPP_LINK, /^https:\/\/wa\.me\/14155238886\?text=join%20/)
  assert.match(MOBILE_LAUNCHER_WHATSAPP_LINK, /text=join%20/)
  assert.doesNotMatch(MOBILE_LAUNCHER_WHATSAPP_LINK, /wa\.me\/17756551411/)
  assert.doesNotMatch(MOBILE_LAUNCHER_WHATSAPP_LINK, /wa\.me\/19452452962/)
  assert.doesNotMatch(MOBILE_LAUNCHER_WHATSAPP_LINK, /wa\.me\/12292182263/)
})

test("en desktop se mantiene el chat web como launcher principal", () => {
  assert.equal(getContactLauncherMode(false), "chat")
})
