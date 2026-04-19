"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react"

import { useCart } from "@/src/context/cart-context"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Colección" },
  { href: "/faqs", label: "FAQ" },
  { href: "/prensa", label: "Notas" },
]

export function SiteHeader() {
  const { totalItems, openCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-[linear-gradient(180deg,rgba(251,245,239,0.94),rgba(251,245,239,0.74))] px-3 pt-3 backdrop-blur-xl md:px-5">
      <div className="rounded-[2rem] border border-white/65 bg-[linear-gradient(180deg,rgba(255,251,247,0.95),rgba(255,247,240,0.82))] shadow-[0_24px_80px_-44px_rgba(46,36,31,0.72)]">
        <div className="flex items-center justify-between rounded-t-[2rem] border-b border-foreground/8 bg-white/45 px-5 py-2 text-[10px] font-medium uppercase tracking-[0.32em] text-muted-foreground md:px-7">
          <span>Portfolio demo</span>
          <span className="hidden sm:inline">Rebrand visual · checkout y chat preservados</span>
        </div>

        <div className="page-shell">
          <div className="flex min-h-[92px] items-center justify-between gap-4 py-4">
            <Link href="/" className="flex min-w-0 items-center gap-4">
              <div className="hidden rounded-full border border-foreground/10 bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:inline-flex">
                Maison pâtisserie
              </div>
              <div className="min-w-0">
                <Image
                  src="/brand/logo.svg"
                  alt="Casa Bruna"
                  width={220}
                  height={65}
                  className="h-11 w-auto md:h-14"
                  priority
                />
              </div>
            </Link>

            <nav
              className="hidden items-center gap-2 rounded-full border border-foreground/10 bg-white/70 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] lg:flex"
              aria-label="Navegación principal"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-foreground/78 transition-all hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <Link
                href="/#atelier-contact"
                className="hidden items-center gap-2 rounded-full border border-foreground/12 bg-white/72 px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-white md:inline-flex"
              >
                Reservas demo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <button
                onClick={openCart}
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#2e241f,#5d473d)] px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_18px_36px_-24px_rgba(46,36,31,0.85)] transition-all hover:-translate-y-0.5"
              >
                <ShoppingBag className="h-4 w-4" />
                Pedido ({totalItems})
              </button>
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/12 bg-white/80 text-foreground shadow-[0_12px_28px_-22px_rgba(46,36,31,0.8)] lg:hidden"
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="page-shell mt-3 rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,250,246,0.96),rgba(248,238,229,0.92))] px-5 py-5 shadow-[0_28px_60px_-44px_rgba(46,36,31,0.75)] lg:hidden"
          aria-label="Navegación móvil"
        >
          <div className="mb-4 flex items-center justify-between border-b border-foreground/8 pb-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Navegación
            </p>
            <Link
              href="/#atelier-contact"
              onClick={() => setMobileOpen(false)}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground"
            >
              Reservas
            </Link>
          </div>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-[1.5rem] border border-foreground/10 bg-white/80 px-4 py-3.5 text-sm font-semibold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
