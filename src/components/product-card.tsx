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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-[rgba(251,246,238,0.92)] shadow-[0_28px_80px_-52px_rgba(34,26,20,0.46)]">
      <Link
        href={`/producto/${displayProduct.slug}`}
        className="relative block aspect-[4/4.8] overflow-hidden bg-secondary"
      >
        {displayProduct.images.length > 0 ? (
          <Image
            src={displayProduct.images[0]}
            alt={displayProduct.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
            Imagen editorial en preparación
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#221a14]/55 via-[#221a14]/8 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground">
          {getCustomerFacingFormatLabel(displayProduct.format)}
        </span>
      </Link>

      <div className="relative z-10 mx-4 -mt-12 flex flex-1 flex-col rounded-[1.8rem] border border-white/85 bg-[rgba(255,250,244,0.95)] p-5 shadow-[0_18px_50px_-32px_rgba(34,26,20,0.4)] backdrop-blur md:mx-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="editorial-kicker">Colección editorial</p>
            <Link href={`/producto/${displayProduct.slug}`}>
              <h3 className="mt-2 font-display text-3xl leading-none text-foreground">
                {displayProduct.name}
              </h3>
            </Link>
          </div>
          <p className="text-sm font-semibold text-accent">{displayProduct.priceText}</p>
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

      <div className="px-5 pb-5 pt-4 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        Routing, formato y add to cart conectados al estado real
      </div>
    </article>
  )
}
