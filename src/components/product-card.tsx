"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { useCart } from "@/src/context/cart-context"
import { getCustomerFacingFormatLabel } from "@/src/data/business"
import type { Product } from "@/src/data/products"
import { getSibling } from "@/src/data/products"

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart()
  const sibling = getSibling(product)
  const hasBothFormats = !!sibling
  const [selectedFormat, setSelectedFormat] = useState<"tarta" | "cajita">(
    hasBothFormats ? "tarta" : product.format
  )

  const displayProduct = selectedFormat === product.format ? product : sibling ?? product

  return (
    <article className="editorial-panel h-full overflow-hidden flex flex-col md:flex-row">
      <Link
        href={`/producto/${displayProduct.slug}`}
        className="relative min-h-[280px] w-full md:w-1/2 overflow-hidden bg-muted/30 flex-shrink-0"
      >
        {displayProduct.images.length > 0 ? (
          <Image
            src={displayProduct.images[0]}
            alt={displayProduct.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
            Imagen en preparación
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-lg bg-card/90 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground">
          {getCustomerFacingFormatLabel(displayProduct.format)}
        </span>
      </Link>

      <div className="flex flex-col p-6 md:p-7 flex-1 justify-between">
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Colección semanal
            </p>
            <Link href={`/producto/${displayProduct.slug}`} className="block group">
              <h3 className="font-display text-2xl md:text-3xl leading-tight text-foreground group-hover:text-primary transition-colors">
                {displayProduct.name}
              </h3>
            </Link>
          </div>

          <p className="text-sm leading-relaxed text-foreground/75">
            {displayProduct.description ?? displayProduct.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 text-xs">
            {displayProduct.weightInfo && (
              <span className="rounded-full bg-muted/60 px-3 py-1.5 text-muted-foreground">
                {displayProduct.weightInfo}
              </span>
            )}
            {displayProduct.portionInfo && (
              <span className="rounded-full bg-muted/60 px-3 py-1.5 text-muted-foreground">
                {displayProduct.portionInfo}
              </span>
            )}
          </div>
        </div>

        {hasBothFormats && (
          <div className="mt-5 inline-flex w-fit rounded-lg border border-border/60 bg-muted/40 p-1">
            <button
              onClick={() => setSelectedFormat("tarta")}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedFormat === "tarta"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mesa
            </button>
            <button
              onClick={() => setSelectedFormat("cajita")}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedFormat === "cajita"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Petit
            </button>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/producto/${displayProduct.slug}`}
            className="inline-flex items-center justify-center rounded-lg border border-border/60 bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted/40"
          >
            Ver detalles
          </Link>
          <button
            onClick={() => addItem(displayProduct, 1)}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md hover:scale-105"
          >
            Añadir ({displayProduct.priceText})
          </button>
        </div>
      </div>
    </article>
  )
}
