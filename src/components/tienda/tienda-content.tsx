"use client"

import { useMemo, useState } from "react"

import { cn } from "@/lib/utils"
import { ProductCard } from "@/src/components/product-card"
import { getProductsByFormat, type ProductFormat } from "@/src/data/products"

const sortOptions = [
  { label: "Precio-Bajo", value: "price-asc" },
  { label: "Precio-Alto", value: "price-desc" },
  { label: "Nombre A-Z", value: "name-asc" },
] as const

const typeOptions: { value: ProductFormat; label: string }[] = [
  { value: "tarta", label: "Tartas" },
  { value: "cajita", label: "Cajitas" },
]

export function TiendaContent() {
  const [productType, setProductType] = useState<ProductFormat>("tarta")
  const [sort, setSort] = useState<(typeof sortOptions)[number]["value"]>("price-asc")

  const products = useMemo(() => {
    const filtered = getProductsByFormat(productType)

    return [...filtered].sort((a, b) => {
      if (sort === "price-desc") return b.priceValue - a.priceValue
      if (sort === "name-asc") return a.name.localeCompare(b.name)
      return a.priceValue - b.priceValue
    })
  }, [productType, sort])

  return (
    <>
      <div className="col-span-full pt-6 pb-4">
        <div className="flex items-center justify-center w-full">
          <div className="flex bg-neutral-800 rounded-full p-1">
            {typeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setProductType(option.value)}
                className={cn(
                  "relative py-3 px-10 text-sm font-semibold rounded-full transition-colors duration-200 text-center tracking-wide whitespace-nowrap",
                  productType === option.value
                    ? "bg-neutral-600 text-white"
                    : "text-neutral-400 hover:text-neutral-300"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between w-full mb-1 px-sides">
        <span className="text-foreground/50 text-sm">{products.length} resultados</span>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as (typeof sortOptions)[number]["value"])}
          className="bg-transparent border-none shadow-none hover:bg-muted/50 font-medium justify-self-end text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
