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
]

export function SiteHeader() {
  const { totalItems, openCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/92 backdrop-blur-sm">
      <div className="page-shell flex min-h-[72px] items-center justify-between gap-6 md:gap-10">
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/brand/logo.svg"
            alt="Casa Bruna"
            width={200}
            height={60}
            className="h-10 w-auto md:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4 ml-auto">
          <button
            onClick={openCart}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs md:text-sm font-semibold text-primary-foreground transition-all hover:shadow-md hover:scale-105"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">({totalItems})</span>
          </button>
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card text-foreground lg:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-border/40 bg-card/50 px-6 py-4 lg:hidden"
          aria-label="Navegación móvil"
        >
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground/75 hover:bg-muted/40 transition-colors"
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
