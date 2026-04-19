import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { BRAND_NAME, BRAND_TAGLINE, PICKUP_ONLY_COPY } from "@/src/data/business"
import { getProductBySlug, type Product } from "@/src/data/products"

type LabelPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right"

const homeProductSlugs = [
  "mesa-vainilla-tostada",
  "mesa-pistacho-verde",
  "mesa-cacao-ahumado",
  "mesa-frambuesa-blanca",
] as const

const labelPositions: LabelPosition[] = ["bottom-right", "top-left", "bottom-left"]

function formatProductType(product: Product) {
  return product.format === "tarta" ? "tarta" : "cajita"
}

function HomeProductLabel({
  product,
  principal = false,
  className,
}: {
  product: Product
  principal?: boolean
  className?: string
}) {
  if (principal) {
    return (
      <div
        className={cn(
          "p-4 bg-white/60 backdrop-blur-md w-fit md:rounded-md flex flex-col md:grid grid-cols-2 gap-y-3",
          className
        )}
      >
        <div className="col-span-2">
          <span className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-black uppercase text-white">
            Destacada
          </span>
        </div>
        <Link
          href={`/producto/${product.slug}`}
          className="col-span-1 text-2xl font-semibold self-start uppercase"
        >
          {product.name}
        </Link>
        <div className="col-span-1 mb-10">
          <p className="italic text-sm font-medium mb-3 capitalize">
            {formatProductType(product)}. colección portfolio-safe.
          </p>
          <p className="text-sm font-medium">{product.description ?? product.shortDescription}</p>
        </div>
        <p className="col-span-1 md:self-end text-2xl font-semibold">{product.priceText}</p>
        <Link
          href={`/producto/${product.slug}`}
          className="col-span-1 inline-flex items-center justify-between gap-6 rounded-full border border-foreground/15 bg-white px-4 py-3 text-sm font-semibold uppercase"
        >
          Ver ficha
          <span>+</span>
        </Link>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "p-2 pl-8 bg-white/60 backdrop-blur-md w-fit rounded-md flex items-center gap-2",
        className
      )}
    >
      <div className="leading-4 pr-6">
        <Link
          href={`/producto/${product.slug}`}
          className="inline-flex text-base font-semibold opacity-80 mb-1.5 uppercase"
        >
          {product.name}
        </Link>
        <p className="text-base font-semibold">{product.priceText}</p>
      </div>
      <Link
        href={`/producto/${product.slug}`}
        className="inline-flex size-12 items-center justify-center rounded-full bg-black text-white"
      >
        +
      </Link>
    </div>
  )
}

function HomeProductCard({
  product,
  principal = false,
  className,
  labelPosition = "bottom-right",
  videoUrl,
}: {
  product: Product
  principal?: boolean
  className?: string
  labelPosition?: LabelPosition
  videoUrl?: string
}) {
  if (principal) {
    return (
      <div className={cn("h-[75svh] md:h-fold flex flex-col relative overflow-hidden", className)}>
        <Link href={`/producto/${product.slug}`} className="size-full">
          {videoUrl ? (
            <video autoPlay loop muted playsInline className="object-cover size-full">
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <Image
              priority
              src={product.images[0]}
              alt={product.name}
              width={1000}
              height={100}
              quality={100}
              className="object-cover size-full"
            />
          )}
        </Link>
        <div className="absolute bottom-0 left-0 grid w-full grid-cols-4 gap-6 pointer-events-none max-md:contents p-sides">
          <HomeProductLabel
            className="col-span-3 col-start-2 pointer-events-auto 2xl:col-start-3 2xl:col-span-2 shrink-0"
            product={product}
            principal
          />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
      <Link href={`/producto/${product.slug}`} className="block w-full aspect-square">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={1000}
          height={1000}
          className="object-cover size-full"
        />
      </Link>

      <div
        className={cn(
          "absolute",
          labelPosition === "top-left" && "left-sides top-sides",
          labelPosition === "top-right" && "right-sides top-sides",
          labelPosition === "bottom-left" && "left-sides bottom-sides",
          labelPosition === "bottom-right" && "right-sides bottom-sides"
        )}
      >
        <HomeProductLabel product={product} />
      </div>
    </div>
  )
}

export function HomeShell() {
  const homeProducts = homeProductSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product))

  const [principalProduct, ...secondaryProducts] = homeProducts

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 w-full relative">
      <aside className="max-md:hidden col-span-4 h-screen sticky top-0 p-sides pt-top-spacing flex flex-col justify-start">
        <div>
          <p className="italic tracking-tighter text-base">{BRAND_TAGLINE}</p>
          <div className="mt-5 text-base leading-tight">
            <p>{BRAND_NAME} trasplanta la shell visual de v0 sobre una demo segura.</p>
            <p>Catálogo, carrito, checkout y chat siguen funcionando.</p>
            <p>{PICKUP_ONLY_COPY}</p>
          </div>
        </div>
      </aside>
      <div className="flex flex-col md:grid md:grid-cols-2 md:col-span-8 w-full relative">
        {principalProduct ? (
          <HomeProductCard
            className="col-span-2"
            product={principalProduct}
            principal
            videoUrl="/videos/hero-tarta.mp4"
          />
        ) : null}
        {secondaryProducts.map((product, index) => (
          <HomeProductCard
            className="col-span-1"
            key={product.id}
            product={product}
            labelPosition={labelPositions[index] ?? "bottom-right"}
          />
        ))}
      </div>
    </div>
  )
}
