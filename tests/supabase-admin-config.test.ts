import test from "node:test"
import assert from "node:assert/strict"

import { hasServerSupabaseConfig } from "../lib/supabase/admin"

test("detecta ausencia de configuración server de Supabase", () => {
  const previousUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const previousServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

  delete process.env.NEXT_PUBLIC_SUPABASE_URL
  delete process.env.SUPABASE_SERVICE_ROLE_KEY

  assert.equal(hasServerSupabaseConfig(), false)

  if (previousUrl !== undefined) {
    process.env.NEXT_PUBLIC_SUPABASE_URL = previousUrl
  }

  if (previousServiceRole !== undefined) {
    process.env.SUPABASE_SERVICE_ROLE_KEY = previousServiceRole
  }
})
