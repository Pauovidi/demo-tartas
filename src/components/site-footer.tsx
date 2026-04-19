"use client"

import Link from "next/link"

import {
  BRAND_EMAIL,
  BRAND_LOCATION,
  BRAND_NAME,
  HUMAN_SUPPORT_PHONE_DISPLAY,
  HUMAN_SUPPORT_WHATSAPP_LINK,
} from "@/src/data/business"

const legalLinks = [
  { label: "Aviso Legal", href: "/legal/aviso-legal" },
  { label: "Política de Privacidad", href: "/legal/privacidad" },
  { label: "Política de Cookies", href: "/legal/cookies" },
  { label: "Términos y Condiciones", href: "/legal/terminos" },
]

export function SiteFooter() {
  return (
    <footer className="p-sides pb-6">
      <div className="w-full bg-neutral-900 text-neutral-100 rounded-[12px] overflow-hidden">
        <div className="px-8 py-10 flex flex-col md:flex-row gap-10 md:gap-0">
          <div className="md:w-1/3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
              Páginas Legales
            </h4>
            <ul className="flex flex-col gap-1.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-1/3 flex flex-col items-center text-center gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">
              Más info
            </h4>
            <Link
              href="/faqs"
              className="text-sm text-neutral-400 hover:text-white transition-colors uppercase"
            >
              Preguntas frecuentes
            </Link>
            <Link
              href={HUMAN_SUPPORT_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors text-sm uppercase"
            >
              WhatsApp
            </Link>
            <p className="text-sm text-neutral-400">{BRAND_EMAIL}</p>
            <p className="text-sm text-neutral-400">{HUMAN_SUPPORT_PHONE_DISPLAY}</p>
            <p className="text-xs text-neutral-600 mt-auto pt-4">
              {new Date().getFullYear()} — {BRAND_NAME}
            </p>
          </div>

          <div className="md:w-[36%] md:ml-auto">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-neutral-400 leading-relaxed mb-5 italic">
              {BRAND_LOCATION}. Demo portfolio-safe con shell visual basada en v0 y wiring real de
              carrito, checkout y atención conversacional.
            </p>
            <form action="#" className="relative">
              <input
                type="email"
                name="email"
                required
                placeholder="Tu correo electrónico"
                className="w-full rounded-full border border-neutral-700 bg-neutral-800 pl-4 pr-[120px] py-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 rounded-full bg-neutral-100 text-neutral-900 px-4 text-xs font-bold uppercase tracking-wide hover:bg-white transition-colors"
              >
                Suscríbete
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}
