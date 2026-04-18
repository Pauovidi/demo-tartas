"use client"

import Link from "next/link"
import { MessageCircleMore } from "lucide-react"

import { MOBILE_LAUNCHER_WHATSAPP_LINK } from "@/src/data/business"

export function WhatsAppButton() {
  return (
    <Link
      href={MOBILE_LAUNCHER_WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir contacto demo"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-lg"
    >
      <MessageCircleMore className="h-4 w-4" />
      Contacto demo
    </Link>
  )
}
