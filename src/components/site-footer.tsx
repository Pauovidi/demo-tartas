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
    <footer className="border-t border-white/60 bg-[#f4e7da]">
      <div className="page-shell py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
              {BRAND_NAME}
            </p>
            <p className="mt-3 max-w-xl font-display text-4xl leading-none text-foreground">
              {BRAND_TAGLINE}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
              {DEMO_DISCLAIMER}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Contacto demo
              </p>
              <p className="mt-3 text-sm text-foreground">{BRAND_LOCATION}</p>
              <p className="mt-2 text-sm text-foreground">{BRAND_EMAIL}</p>
              <p className="mt-2 text-sm text-foreground">{HUMAN_SUPPORT_PHONE_DISPLAY}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Navegación
              </p>
              <nav
                className="mt-3 flex flex-col gap-2"
                aria-label="Enlaces del pie de página"
              >
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="soft-divider mt-10 h-px w-full" />
        <p className="pt-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          © {new Date().getFullYear()} {BRAND_NAME}. Portfolio-safe demo.
        </p>
      </div>
    </footer>
  )
}
