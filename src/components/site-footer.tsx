"use client"

import Link from "next/link"

import {
  BRAND_EMAIL,
  BRAND_LOCATION,
  BRAND_NAME,
  BRAND_TAGLINE,
  DEMO_DISCLAIMER,
  HUMAN_SUPPORT_PHONE_DISPLAY,
} from "@/src/data/business"

const legalLinks = [
  { href: "/legal/aviso-legal", label: "Aviso legal" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/terminos", label: "Condiciones" },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/60 bg-[linear-gradient(180deg,#f2e3d5_0%,#ead8c8_100%)]">
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_72%)]" />
      <div className="page-shell relative py-12 md:py-16">
        <div className="rounded-[2.25rem] border border-white/65 bg-[linear-gradient(145deg,rgba(255,250,246,0.84),rgba(250,239,229,0.68))] p-7 shadow-[0_28px_90px_-50px_rgba(46,36,31,0.76)] md:p-10">
          <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex rounded-full border border-foreground/10 bg-white/65 px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                {BRAND_NAME}
              </div>
              <p className="mt-4 max-w-2xl font-display text-4xl leading-none text-foreground md:text-5xl">
                {BRAND_TAGLINE}
              </p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
                {DEMO_DISCLAIMER}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-foreground/10 bg-white/58 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Contacto demo
                </p>
                <p className="mt-4 text-sm leading-6 text-foreground">{BRAND_LOCATION}</p>
                <p className="mt-3 text-sm text-foreground">{BRAND_EMAIL}</p>
                <p className="mt-3 text-sm text-foreground">{HUMAN_SUPPORT_PHONE_DISPLAY}</p>
              </div>

              <div className="rounded-[1.75rem] border border-foreground/10 bg-[#2e241f] p-5 text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-white/60">Navegación</p>
                <nav
                  className="mt-4 flex flex-col gap-3"
                  aria-label="Enlaces del pie de página"
                >
                  {legalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-white/86 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <div className="soft-divider mt-10 h-px w-full" />
          <div className="flex flex-col gap-3 pt-5 text-xs uppercase tracking-[0.18em] text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} {BRAND_NAME}. Portfolio-safe demo.</p>
            <p>Editorial storefront · boutique interface demo</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
