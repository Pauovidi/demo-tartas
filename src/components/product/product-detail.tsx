"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Minus, Plus } from "lucide-react"

import { useCart } from "@/src/context/cart-context"
import { getCustomerFacingFormatLabel, PICKUP_ONLY_COPY } from "@/src/data/business"
import type { Product } from "@/src/data/products"
import { getSibling } from "@/src/data/products"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ProductDetailProps {
  product: Product
}

const ALLERGEN_BADGES = [
  { key: "leche", label: "Leche" },
  { key: "huevo", label: "Huevo" },
  { key: "gluten", label: "Gluten" },
  { key: "frutos", label: "Frutos de cáscara" },
  { key: "soja", label: "Soja" },
] as const

function getAllergenBadges(allergens?: string) {
  if (!allergens) return []

  const normalized = allergens
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

  return ALLERGEN_BADGES.filter((item) => normalized.includes(item.key))
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const router = useRouter()
  const sibling = getSibling(product)
  const hasBothFormats = !!sibling
  const allergenBadges = getAllergenBadges(product.allergens)

  useEffect(() => {
    if (hasBothFormats && product.format === "cajita" && sibling) {
      router.replace(`/producto/${sibling.slug}`)
    }
  }, [hasBothFormats, product.format, router, sibling])

  function switchFormat(format: "tarta" | "cajita") {
    if (format === product.format) return
    if (sibling) router.push(`/producto/${sibling.slug}`)
  }

  const tastingNotes = [
    product.weightInfo,
    product.portionInfo,
    product.allergens ? "Consulta alérgenos en detalle abajo" : "Perfil clásico de queso horneado",
  ].filter(Boolean)

  return (
    <section className="pb-16 pt-10 md:pb-24 md:pt-14">
      <div className="page-shell grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="paper-panel overflow-hidden p-4 md:p-5">
          <div className="relative aspect-square overflow-hidden rounded-[1.8rem] bg-secondary">
            {product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
                Imagen editorial en preparación
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground">
              {getCustomerFacingFormatLabel(product.format)}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="paper-panel p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
              Colección Casa Bruna
            </p>
            <h1 className="mt-3 font-display text-5xl leading-none text-foreground md:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              {product.description || product.fullDescription || product.shortDescription}
            </p>

            {hasBothFormats && (
              <div className="mt-6 inline-flex rounded-full border border-foreground/10 bg-white p-1">
                <button
                  onClick={() => switchFormat("tarta")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    product.format === "tarta" ? "bg-foreground text-background" : "text-muted-foreground"
                  }`}
                >
                  Mesa
                </button>
                <button
                  onClick={() => switchFormat("cajita")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    product.format === "cajita" ? "bg-foreground text-background" : "text-muted-foreground"
                  }`}
                >
                  Petit
                </button>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {tastingNotes.map((note) => (
                <span
                  key={note}
                  className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground"
                >
                  {note}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 rounded-[1.8rem] bg-[#2e241f] p-5 text-white md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/70">Precio demo</p>
                <p className="mt-2 text-2xl font-semibold">{product.priceText}</p>
              </div>
              <div className="flex items-center rounded-full bg-white/8 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Reducir cantidad"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[3rem] text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar cantidad"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                addItem(product, quantity)
                setQuantity(1)
              }}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Añadir esta pieza al pedido
            </button>
          </div>

          <div className="paper-panel p-6 md:p-8">
            {product.allergens ? (
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Alergias y composición
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  <strong className="font-semibold text-foreground">Alérgenos confirmados:</strong>{" "}
                  {product.allergens}
                </p>
                {allergenBadges.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {allergenBadges.map((badge) => (
                      <span
                        key={badge.key}
                        className="rounded-full border border-foreground/10 bg-white px-3 py-1.5 text-xs font-medium text-foreground"
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className={product.allergens ? "mt-8" : ""}>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="formatos">
                  <AccordionTrigger className="text-sm font-semibold text-foreground">
                    Formatos disponibles
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-muted-foreground">
                    <p><strong>Mesa:</strong> 1,8 kg y 10-12 raciones.</p>
                    <p><strong>Petit:</strong> 450 g y 2-3 raciones.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="recogida">
                  <AccordionTrigger className="text-sm font-semibold text-foreground">
                    Recogida y conservación
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-muted-foreground">
                    {`${PICKUP_ONLY_COPY} Mantén la pieza refrigerada y sácala 15 minutos antes de servir.`}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="demo">
                  <AccordionTrigger className="text-sm font-semibold text-foreground">
                    Nota de demo
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-muted-foreground">
                    Esta ficha mantiene la lógica de producto, rutas y carrito, pero el naming,
                    los visuales y los textos pertenecen a una marca ficticia creada para portfolio.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
