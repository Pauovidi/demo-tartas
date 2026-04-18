import Link from "next/link"

import {
  BRAND_NAME,
  BRAND_TAGLINE,
} from "@/src/data/business"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16 lg:pb-32 lg:pt-20">
      <div className="page-shell">
        <div className="grid gap-12 lg:gap-16">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3">
              <span className="inline-flex rounded-full border border-border/50 bg-card/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Artesanía de lento horneado
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight text-balance text-foreground">
                Tartas y cheesecakes para mesas memorables.
              </h1>
            </div>

            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
              {BRAND_NAME} elabora formatos editables para sobremesas, celebraciones y regalos. Cada sabor nace de ingredientes premium y un proceso de horneado meditado que respeta el tiempo.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row pt-2">
              <Link
                href="/productos"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md hover:scale-105"
              >
                Explorar colección
              </Link>
              <Link
                href="#featured"
                className="inline-flex items-center justify-center rounded-lg border border-border/60 bg-card/70 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-card/90"
              >
                Destacadas
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
            <div className="editorial-panel p-6 lg:p-8">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Formato
              </p>
              <p className="text-lg md:text-xl font-display text-foreground">
                Mesa o Petit
              </p>
            </div>

            <div className="editorial-panel p-6 lg:p-8">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Sabores
              </p>
              <p className="text-lg md:text-xl font-display text-foreground">
                Edición semanal
              </p>
            </div>

            <div className="editorial-panel p-6 lg:p-8 col-span-2 lg:col-span-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Entrega
              </p>
              <p className="text-lg md:text-xl font-display text-foreground">
                Recogida concertada
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
