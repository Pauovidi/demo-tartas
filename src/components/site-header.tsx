"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { useCart } from "@/src/context/cart-context"

const navItems = [
  { label: "inicio", href: "/" },
  { label: "nuestras tartas y cajitas", href: "/productos" },
]

const mobileItems = [...navItems, { label: "preguntas frecuentes", href: "/faqs" }, { label: "notas", href: "/prensa" }]

export function SiteHeader() {
  const { totalItems, openCart } = useCart()
  const [logoHidden, setLogoHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setLogoHidden(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-sides grid grid-cols-3 md:grid-cols-12 md:gap-sides z-50 items-start">
        <div className="block flex-none md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold uppercase"
          >
            Menu
          </button>
        </div>

        <Link
          href="/"
          className={cn(
            "md:col-span-2 transition-opacity duration-300 flex justify-center md:justify-start",
            logoHidden ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <Image
            src="/brand/logo.svg"
            alt="Casa Bruna"
            width={320}
            height={88}
            priority
            className="h-6 w-auto md:h-auto md:max-w-[320px]"
          />
        </Link>

        <nav className="flex items-center md:col-span-10 justify-end gap-2">
          <ul className="items-center gap-5 py-0.5 px-3 bg-background/10 rounded-sm backdrop-blur-md hidden md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-semibold text-base transition-colors duration-200 uppercase text-foreground/70 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-label="Abrir carrito"
            onClick={openCart}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold uppercase text-primary-foreground"
          >
            carrito <span>({totalItems})</span>
          </button>
        </nav>
      </header>

      {mobileOpen ? (
        <>
          <div
            className="fixed inset-0 bg-foreground/30 z-50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-0 bottom-0 left-0 flex w-full md:w-[400px] p-modal-sides z-50">
            <div className="flex flex-col bg-muted p-3 md:p-4 rounded w-full">
              <div className="pl-2 flex items-baseline justify-between mb-10">
                <p className="text-2xl font-semibold uppercase">Menu</p>
                <button
                  type="button"
                  className="text-sm font-medium uppercase"
                  onClick={() => setMobileOpen(false)}
                >
                  Close
                </button>
              </div>

              <nav className="grid grid-cols-2 gap-x-6 gap-y-4 mb-10">
                {mobileItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex rounded-md bg-background/50 px-3 py-2 text-sm font-semibold uppercase"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto mb-6">
                <p className="italic tracking-tighter text-base">
                  Horneado lento para sobremesas memorables.
                </p>
                <div className="mt-5 text-base leading-tight">
                  <p>Shell público basado en v0.</p>
                  <p>Catálogo, carrito y checkout demo intactos.</p>
                  <p>Branding portfolio-safe sin rastros de la marca original.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
