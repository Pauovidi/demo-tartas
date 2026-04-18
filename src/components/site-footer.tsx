"use client"

import Link from "next/link"

import {
  BRAND_EMAIL,
  BRAND_LOCATION,
  BRAND_NAME,
  BRAND_TAGLINE,
} from "@/src/data/business"

const legalLinks = [
  { href: "/legal/aviso-legal", label: "Aviso legal" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/terminos", label: "Condiciones" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="page-shell py-16 md:py-20">
        <div className="grid gap-12 md:gap-16 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                {BRAND_NAME}
              </p>
              <p className="font-display text-3xl md:text-4xl leading-tight text-foreground">
                {BRAND_TAGLINE}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-foreground/80">{BRAND_LOCATION}</p>
              <p className="text-sm text-foreground/80">{BRAND_EMAIL}</p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Navegación
              </p>
              <nav
                className="space-y-2.5"
                aria-label="Enlaces del pie de página"
              >
                <Link href="/" className="block text-sm text-foreground/75 hover:text-foreground transition-colors">
                  Inicio
                </Link>
                <Link href="/productos" className="block text-sm text-foreground/75 hover:text-foreground transition-colors">
                  Colección
                </Link>
                <Link href="/faqs" className="block text-sm text-foreground/75 hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </nav>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Legal
              </p>
              <nav className="space-y-2.5">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-foreground/75 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="soft-divider mt-12 md:mt-16 h-px w-full" />
        <p className="pt-6 text-xs uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} {BRAND_NAME} · Portfolio-safe demo
        </p>
      </div>
    </footer>
  )
}
