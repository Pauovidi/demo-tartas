"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"

import { useCart } from "@/src/context/cart-context"
import type { Product } from "@/src/data/products"
import { getSibling } from "@/src/data/products"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart()
  const sibling = getSibling(product)
  const [selectedProduct, setSelectedProduct] = useState(product)
  const images = useMemo(() => selectedProduct.images, [selectedProduct])
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false })
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    setSelectedProduct(product)
  }, [product])

  useEffect(() => {
    if (!emblaApi) return
    const sync = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    sync()
    emblaApi.on("select", sync)
  }, [emblaApi])

  const breadcrumbLabel = selectedProduct.format === "tarta" ? "Tartas" : "Cajitas"

  return (
    <div className="bg-muted">
      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-sides">
        <div className="md:hidden col-span-full h-[60vh] min-h-[400px]">
          <div className="relative w-full h-full">
            <div className="overflow-hidden h-full" ref={emblaRef}>
              <div className="flex h-full">
                {images.map((image, index) => (
                  <div key={`${image}-${index}`} className="flex-shrink-0 w-full h-full relative">
                    <Image
                      src={image}
                      alt={selectedProduct.name}
                      fill
                      className="w-full h-full object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
            {images.length > 1 ? (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                <span className="inline-flex rounded-full border border-white/30 bg-black/55 px-3 py-1 text-xs text-white">
                  {selectedIndex + 1}/{images.length}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="col-span-5 flex flex-col 2xl:col-span-4 max-md:col-span-full md:h-screen max-md:p-sides md:pl-sides md:pt-top-spacing sticky max-md:static top-0">
          <div className="col-span-full">
            <div className="col-span-full mb-3 md:mb-8 flex flex-wrap items-center gap-2 text-xs uppercase text-muted-foreground">
              <Link href="/productos">{breadcrumbLabel}</Link>
              <span>/</span>
              <span>{selectedProduct.name}</span>
            </div>

            <div className="flex flex-col gap-4 col-span-full mb-10 max-md:order-2">
              <div className="rounded bg-card py-2 px-3 flex flex-col md:grid grid-cols-2 md:gap-x-4 md:gap-y-10 place-items-baseline">
                <h1 className="text-lg lg:text-xl 2xl:text-2xl font-semibold text-balance max-md:mb-4 uppercase">
                  {selectedProduct.name}
                </h1>
                <p className="text-sm font-medium">
                  {selectedProduct.description ?? selectedProduct.fullDescription ?? selectedProduct.shortDescription}
                </p>
                {(selectedProduct.weightInfo || selectedProduct.portionInfo) && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground col-span-full">
                    {selectedProduct.weightInfo ? (
                      <span className="bg-secondary px-2 py-1 rounded">{selectedProduct.weightInfo}</span>
                    ) : null}
                    {selectedProduct.portionInfo ? (
                      <span className="bg-secondary px-2 py-1 rounded">{selectedProduct.portionInfo}</span>
                    ) : null}
                    <span className="bg-secondary px-2 py-1 rounded capitalize">
                      {selectedProduct.format === "tarta" ? "tarta" : "cajita"}
                    </span>
                  </div>
                )}
                <p className="text-lg lg:text-xl 2xl:text-2xl font-semibold max-md:mt-8">
                  {selectedProduct.priceText}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sibling ? (
                  <div className="flex items-center rounded-full border border-border bg-card p-1">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product.format === "tarta" ? product : sibling)}
                      className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition-colors ${
                        selectedProduct.format === "tarta"
                          ? "bg-black text-white"
                          : "text-muted-foreground"
                      }`}
                    >
                      Tartas
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product.format === "cajita" ? product : sibling)}
                      className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition-colors ${
                        selectedProduct.format === "cajita"
                          ? "bg-black text-white"
                          : "text-muted-foreground"
                      }`}
                    >
                      Cajitas
                    </button>
                  </div>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                  onClick={() => addItem(selectedProduct, 1)}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-full max-md:order-3 max-md:mt-6 flex flex-col gap-4 mb-auto">
            <div className="rounded bg-card p-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                Ficha de producto
              </h3>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="contents">
                  <dt className="text-xs text-muted-foreground">Formato</dt>
                  <dd className="text-xs font-medium text-foreground">
                    {selectedProduct.format === "tarta" ? "Tarta completa" : "Cajita individual"}
                  </dd>
                </div>
                {selectedProduct.weightInfo ? (
                  <div className="contents">
                    <dt className="text-xs text-muted-foreground">Peso</dt>
                    <dd className="text-xs font-medium text-foreground">{selectedProduct.weightInfo}</dd>
                  </div>
                ) : null}
                {selectedProduct.portionInfo ? (
                  <div className="contents">
                    <dt className="text-xs text-muted-foreground">Raciones</dt>
                    <dd className="text-xs font-medium text-foreground">{selectedProduct.portionInfo}</dd>
                  </div>
                ) : null}
                <div className="contents">
                  <dt className="text-xs text-muted-foreground">Conservación</dt>
                  <dd className="text-xs font-medium text-foreground">Refrigerada entre 2-6 °C</dd>
                </div>
                <div className="contents">
                  <dt className="text-xs text-muted-foreground">Consejo</dt>
                  <dd className="text-xs font-medium text-foreground">Sacar 15 min antes de servir</dd>
                </div>
              </dl>
            </div>

            <div className="rounded bg-card p-3 text-sm font-medium opacity-70">
              {selectedProduct.fullDescription ?? selectedProduct.shortDescription}
            </div>
          </div>
        </div>

        <div className="hidden md:block col-start-6 col-span-7 w-full overflow-y-auto relative">
          {images.map((image, index) => (
            <Image
              key={`${image}-${index}`}
              src={image}
              alt={selectedProduct.name}
              width={1600}
              height={1200}
              className="w-full object-cover"
              quality={100}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
