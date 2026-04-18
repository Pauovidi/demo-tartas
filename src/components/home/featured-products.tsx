"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { getFlavors } from "@/src/data/products"

export function FeaturedProducts() {
  const flavors = getFlavors().slice(0, 3)

  return (
    <section id="featured" className="py-16 md:py-24 border-b border-border/40">
      <div className="page-shell">
        <div className="mb-12 space-y-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Destacadas esta semana
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-foreground">
            Sabores en rotación.
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
            La colección semanal presenta entre tres y seis sabores disponibles en formato Mesa (∅ 20cm) y Petit (∅ 14cm). Cada fórmula equilibra cremosidad, sabor y presentación para las mesas más exigentes.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {flavors.map((flavor, index) => {
            const product = flavor.tarta || flavor.cajita
            if (!product) return null

            const flavorMap: Record<string, { label: string; accent: string; description: string }> = {
              "vainilla-tostada": { label: "Subtil y cálida", accent: "text-amber-700", description: "Vainilla de Madagascar con nota tostada" },
              "pistacho-verde": { label: "Fresco y mineral", accent: "text-emerald-700", description: "Pistachio natural con limón siciliano" },
              "cacao-ahumado": { label: "Intenso y profundo", accent: "text-amber-900", description: "Cacao Ecuador con humo y sal" },
              "limon-crema": { label: "Cítrico y equilibrado", accent: "text-yellow-700", description: "Limón Amalfi con cobertura cremosa" },
              "avellana-praline": { label: "Suave y adictivo", accent: "text-amber-600", description: "Praliné de avellana con caramelo" },
              "cafe-suave": { label: "Aromático y elegante", accent: "text-amber-900", description: "Espresso italiano con matices de cacao" },
            }

            const info = flavorMap[flavor.category] || { label: "Premium", accent: "text-primary", description: "Sabor premium editado" }

            return (
              <Link
                key={flavor.category}
                href={`/producto/${flavor.category}`}
                className="group"
              >
                <Card className="editorial-panel overflow-hidden border-border/50 h-full flex flex-col transition-all hover:shadow-md hover:border-accent/40">
                  <div className="h-48 md:h-56 bg-muted/40 flex items-center justify-center border-b border-border/40">
                    <div className="text-center space-y-2">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Formato Mesa
                      </p>
                      <p className="font-display text-3xl text-foreground">
                        ∅ 20cm
                      </p>
                    </div>
                  </div>
                  <div className="p-6 md:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="font-display text-xl md:text-2xl text-foreground capitalize">
                        {product.nombre}
                      </p>
                      <p className={`text-sm ${info.accent} italic font-medium`}>
                        {info.label}
                      </p>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {info.description}
                      </p>
                    </div>
                    <div className="flex items-end justify-between pt-2 border-t border-border/40">
                      <p className="font-display text-lg text-foreground pt-3">
                        €{product.precioUnitario}
                      </p>
                      <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                        Ver →
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/productos"
            className="inline-flex items-center justify-center rounded-lg border border-border/60 bg-card/70 px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-card hover:shadow-sm"
          >
            Explorar colección completa
          </Link>
        </div>
      </div>
    </section>
  )
}
