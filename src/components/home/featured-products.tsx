"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getFlavors } from "@/src/data/products"
import { ProductCard } from "@/src/components/product-card"

export function FeaturedProducts() {
  const flavors = getFlavors().slice(0, 5)

  return (
    <section id="coleccion" className="pb-20 pt-2 md:pb-28">
      <div className="page-shell">
        <div className="mb-10 grid gap-6 xl:grid-cols-[0.76fr_1.24fr]">
          <div className="paper-panel p-6 md:p-8">
            <p className="editorial-kicker">Selección destacada</p>
            <h2 className="mt-4 font-display text-4xl leading-none text-foreground md:text-5xl xl:text-6xl">
              La home ya no presenta tarjetas sueltas: presenta una colección.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
              Este bloque toma la lógica de composición editorial de v0 y la traduce al dataset de
              Casa Bruna, con cards más altas, overlays más limpios y un ritmo visual más premium.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.6rem] border border-foreground/10 bg-white/76 p-4">
                <p className="editorial-kicker">Visual</p>
                <p className="mt-3 text-sm leading-6 text-foreground">
                  Proporciones más generosas, imagen dominante y tipografía de contraste.
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-foreground/10 bg-white/76 p-4">
                <p className="editorial-kicker">Función</p>
                <p className="mt-3 text-sm leading-6 text-foreground">
                  Formato, ficha y add to cart siguen conectados al mismo estado del proyecto.
                </p>
              </div>
            </div>
            <Link
              href="/productos"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
            >
              Abrir catálogo completo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {flavors.map((flavor, index) => {
              const product = flavor.cajita ?? flavor.tarta
              if (!product) return null

              return (
                <div key={flavor.category} className={index === 0 ? "md:col-span-2 xl:col-span-2" : ""}>
                  <ProductCard product={product} priority={index < 2} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
