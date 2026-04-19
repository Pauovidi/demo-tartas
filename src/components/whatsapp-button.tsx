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
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full border border-white/20 bg-[linear-gradient(135deg,#2e241f,#5d473d)] px-5 py-3 text-sm font-semibold text-background shadow-[0_22px_40px_-24px_rgba(46,36,31,0.92)]"
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
        <MessageCircleMore className="h-4 w-4" />
      </div>
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/60">WhatsApp</span>
        <span>Contacto demo</span>
      </div>
    </Link>
  )
}
