"use client"

import { getFlavors } from "@/src/data/products"
import { ProductCard } from "@/src/components/product-card"

export function TiendaContent() {
  const flavors = getFlavors()

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {flavors.map((flavor) => {
        const primaryProduct = flavor.cajita ?? flavor.tarta
        if (!primaryProduct) return null
        return <ProductCard key={flavor.category} product={primaryProduct} />
      })}
    </div>
  )
}
