"use client"

import { getFlavors } from "@/src/data/products"
import { ProductCard } from "@/src/components/product-card"

export function TiendaContent() {
  const flavors = getFlavors()

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Edición semanal
        </p>
        <h1 className="font-display text-4xl md:text-5xl leading-tight text-foreground">
          Colección completa.
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Cada semana presentamos entre tres y seis sabores disponibles en los dos formatos. Explora la colección, personaliza tu pedido y reserva con antelación.
        </p>
      </div>
      
      <div className="grid gap-6 md:gap-8">
        {flavors.map((flavor) => {
          const primaryProduct = flavor.tarta || flavor.cajita
          if (!primaryProduct) return null
          return <ProductCard key={flavor.category} product={primaryProduct} />
        })}
      </div>
    </div>
  )
}
