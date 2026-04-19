"use client"

import { getFlavors } from "@/src/data/products"
import { ProductCard } from "@/src/components/product-card"

export function TiendaContent() {
  const flavors = getFlavors()

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {flavors.map((flavor, index) => {
        const primaryProduct = flavor.cajita ?? flavor.tarta
        if (!primaryProduct) return null
        return (
          <div key={flavor.category} className={index === 0 ? "md:col-span-2 xl:col-span-2" : ""}>
            <ProductCard product={primaryProduct} />
          </div>
        )
      })}
    </div>
  )
}
