"use client"

import Link from "next/link"

import { getFlavors } from "@/src/data/products"
import { ProductCard } from "@/src/components/product-card"

export function FeaturedProducts() {
  const flavors = getFlavors().slice(0, 4)

  return (
    <section id="coleccion" className="pb-20 pt-2 md:pb-28">
      <div className="page-shell">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Colección destacada
            </p>
            <h2 className="mt-3 font-display text-4xl leading-none text-foreground md:text-5xl">
              Cuatro piezas para mostrar catálogo, ficha y compra.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-right">
            El catálogo mantiene la lógica original de sabores y formatos, pero la tarjeta, la
            jerarquía y las microcopias cambian para que la experiencia se lea como otra marca.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {flavors.map((flavor, index) => {
            const product = flavor.cajita ?? flavor.tarta
            if (!product) return null

            return (
              <div
                key={flavor.category}
                className={index === 0 ? "md:col-span-2" : undefined}
              >
                <ProductCard product={product} priority={index < 2} />
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-muted-foreground">
            El resto de la colección conserva rutas y utilidades, pero con producto demo y assets
            vectoriales propios.
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
          >
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  )
}
