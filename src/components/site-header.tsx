"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ShoppingBag, Menu, X } from "lucide-react"

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
    <header className="sticky top-0 z-40 border-b border-white/60 bg-background/88 backdrop-blur-xl">
      <div className="border-b border-foreground/8 bg-white/50 px-5 py-2 text-center text-[11px] font-medium uppercase tracking-[0.26em] text-muted-foreground md:px-8">
        Portfolio demo · rebrand visual, chatbot y checkout preservados
      </div>

      <div className="page-shell flex min-h-[88px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/brand/logo.svg"
            alt="Casa Bruna"
            width={220}
            height={65}
            className="h-12 w-auto md:h-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#atelier-contact"
            className="hidden rounded-full border border-foreground/12 bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary md:inline-flex"
          >
            Reservas demo
          </Link>
          <button
            onClick={openCart}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <ShoppingBag className="h-4 w-4" />
            Pedido ({totalItems})
          </button>
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/12 bg-white text-foreground lg:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-foreground/8 bg-background/96 px-5 py-5 lg:hidden"
          aria-label="Navegación móvil"
        >
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-2xl border border-foreground/10 bg-white/75 px-4 py-3 text-sm font-semibold text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
