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
    <article className="paper-panel h-full overflow-hidden">
      <div className="grid h-full gap-0 md:grid-cols-[0.92fr_1.08fr]">
        <Link
          href={`/producto/${displayProduct.slug}`}
          className="relative min-h-[280px] overflow-hidden bg-secondary"
        >
          {displayProduct.images.length > 0 ? (
            <Image
              src={displayProduct.images[0]}
              alt={displayProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              priority={priority}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
              Imagen editorial en preparación
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground">
            {getCustomerFacingFormatLabel(displayProduct.format)}
          </span>
        </Link>

        <div className="flex flex-col p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Colección semanal
              </p>
              <Link href={`/producto/${displayProduct.slug}`}>
                <h3 className="mt-2 font-display text-3xl leading-none text-foreground">
                  {displayProduct.name}
                </h3>
              </Link>
            </div>
            <p className="text-sm font-semibold text-primary">{displayProduct.priceText}</p>
          </div>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {displayProduct.description ?? displayProduct.shortDescription}
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {displayProduct.weightInfo ? (
              <span className="rounded-full bg-secondary px-3 py-1.5">{displayProduct.weightInfo}</span>
            ) : null}
            {displayProduct.portionInfo ? (
              <span className="rounded-full bg-secondary px-3 py-1.5">{displayProduct.portionInfo}</span>
            ) : null}
          </div>

          {hasBothFormats && (
            <div className="mt-5 inline-flex w-fit rounded-full border border-foreground/10 bg-white p-1">
              <button
                onClick={() => setSelectedFormat("tarta")}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  selectedFormat === "tarta"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground"
                }`}
              >
                Mesa
              </button>
              <button
                onClick={() => setSelectedFormat("cajita")}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  selectedFormat === "cajita"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground"
                }`}
              >
                Petit
              </button>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/producto/${displayProduct.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-foreground/12 bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Ver ficha
            </Link>
            <button
              onClick={() => addItem(displayProduct, 1)}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Añadir al pedido
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
