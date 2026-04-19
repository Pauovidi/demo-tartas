"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { useCart } from "@/src/context/cart-context"
import type { Product } from "@/src/data/products"
import { getSibling } from "@/src/data/products"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const sibling = getSibling(product)
  const [selectedProduct, setSelectedProduct] = useState<Product>(product)

  return (
    <div className="relative w-full aspect-[3/4] md:aspect-square bg-muted group overflow-hidden">
      <Link
        href={`/producto/${selectedProduct.slug}`}
        className="block size-full focus-visible:outline-none"
        aria-label={`View details for ${selectedProduct.name}, price ${selectedProduct.priceText}`}
      >
        <Image
          src={selectedProduct.images[0]}
          alt={selectedProduct.name}
          width={1000}
          height={1000}
          className="object-cover size-full"
        />
      </Link>

      <div className="absolute inset-0 w-full p-2 pointer-events-none">
        <div className="max-md:hidden w-full flex gap-6 justify-between items-baseline font-semibold px-3 py-1 group-hover:opacity-0 translate-y-0 group-hover:-translate-y-full transition-all duration-300">
          <p className="text-sm 2xl:text-base uppercase text-balance">{selectedProduct.name}</p>
          <p className="text-sm 2xl:text-base uppercase">{selectedProduct.priceText}</p>
        </div>

        <div className="absolute bottom-3 inset-x-3 px-2 py-3 rounded-md bg-card flex flex-col gap-8 md:opacity-0 group-hover:opacity-100 md:translate-y-1/3 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto max-md:pointer-events-auto">
          <div className="grid grid-cols-2 items-end gap-y-8 gap-x-4">
            <div>
              <p className="text-lg font-semibold text-pretty uppercase">{selectedProduct.name}</p>
              {(selectedProduct.weightInfo || selectedProduct.portionInfo) && (
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedProduct.weightInfo}
                  {selectedProduct.weightInfo && selectedProduct.portionInfo ? " · " : ""}
                  {selectedProduct.portionInfo}
                </p>
              )}
            </div>
            <p className="text-lg font-semibold place-self-end">{selectedProduct.priceText}</p>

            {sibling ? (
              <div className="self-center inline-flex rounded-full border border-border p-1">
                <button
                  type="button"
                  className={cnSwitch(selectedProduct.format === "tarta")}
                  onClick={() => setSelectedProduct(product.format === "tarta" ? product : sibling)}
                >
                  Tartas
                </button>
                <button
                  type="button"
                  className={cnSwitch(selectedProduct.format === "cajita")}
                  onClick={() => setSelectedProduct(product.format === "cajita" ? product : sibling)}
                >
                  Cajitas
                </button>
              </div>
            ) : (
              <div />
            )}

            <button
              type="button"
              className="col-start-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              onClick={() => addItem(selectedProduct, 1)}
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function cnSwitch(active: boolean) {
  return active
    ? "rounded-full bg-foreground text-background px-4 py-2 text-xs font-semibold"
    : "rounded-full px-4 py-2 text-xs font-semibold text-muted-foreground"
}
