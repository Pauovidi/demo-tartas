import type { Metadata } from "next"

import { Toaster } from "@/components/ui/sonner"
import { CheckoutSummary } from "@/src/components/checkout-summary"

export const metadata: Metadata = {
  title: "Checkout demo",
}

const LEAD_DAYS_RAW = Number.parseInt(process.env.CHATBOT_LEAD_DAYS ?? "3", 10)
const LEAD_DAYS = Number.isFinite(LEAD_DAYS_RAW) && LEAD_DAYS_RAW > 0 ? LEAD_DAYS_RAW : 3
const SHOP_TZ = process.env.SHOP_TZ ?? "Europe/Madrid"

export default function CheckoutPage() {
  return (
    <>
      <CheckoutSummary leadDays={LEAD_DAYS} shopTimeZone={SHOP_TZ} />
      <Toaster position="bottom-center" />
    </>
  )
}
