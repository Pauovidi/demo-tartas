import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import {
  BRAND_NAME,
  BRAND_TAGLINE,
  DEMO_DISCLAIMER,
  FORMAT_SIZE_COPY,
  PICKUP_ONLY_COPY,
  getCustomerFacingFormatLabel,
} from "@/src/data/business"
import { getFeaturedProducts } from "@/src/data/products"

const tastingNotes = [
  "Colección editorial en formato Mesa y Petit",
  "Reserva guiada con fecha mínima validada",
  "Asistente conversacional conectado a datos reales demo",
]

export function HeroSection() {
  const highlightedProducts = getFeaturedProducts().slice(0, 2)

  return (
    <section className="relative overflow-hidden pb-16 pt-6 md:pb-24 md:pt-10">
      <div className="page-shell">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="showcase-panel relative overflow-hidden px-6 py-8 md:px-10 md:py-12 lg:px-14 lg:py-16">
            <div className="absolute left-[-6%] top-[-10%] h-48 w-48 rounded-full bg-accent/18 blur-3xl" />
            <div className="absolute bottom-[-16%] right-[4%] h-56 w-56 rounded-full bg-primary/8 blur-3xl" />

            <div className="relative z-10">
              <span className="glass-pill inline-flex px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Rebrand visual sobre base funcional real
              </span>
              <h1 className="mt-6 max-w-4xl font-display text-5xl leading-none text-balance text-foreground md:text-7xl xl:text-[5.8rem]">
                Una boutique digital más editorial para una demo que sí funciona.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                {BRAND_NAME} reinterpreta la storefront previa con una dirección visual inspirada en
                v0: más aire, más contraste tipográfico y una narrativa más convincente sin tocar
                el flujo real de catálogo, carrito, checkout ni atención conversacional.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/productos"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Ver la colección
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#atelier-contact"
                  className="inline-flex items-center justify-center rounded-full border border-foreground/12 bg-white/72 px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-white"
                >
                  Entender la operativa
                </Link>
              </div>

              <div className="mt-10 grid gap-3 md:grid-cols-3">
                {tastingNotes.map((note, index) => (
                  <div
                    key={note}
                    className={`rounded-[1.6rem] border p-4 text-sm leading-6 ${
                      index === 1
                        ? "border-primary/10 bg-primary text-primary-foreground"
                        : "border-white/70 bg-white/72 text-muted-foreground"
                    }`}
                  >
                    {note}
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-[0.78fr_1.22fr]">
                <div className="rounded-[1.9rem] bg-[#211913] p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/66">Dirección</p>
                  <p className="mt-3 font-display text-3xl leading-tight">{BRAND_TAGLINE}</p>
                  <div className="mt-5 h-px w-full bg-white/10" />
                  <p className="mt-5 text-sm leading-6 text-white/74">{FORMAT_SIZE_COPY}</p>
                  <p className="mt-2 text-sm leading-6 text-white/74">{PICKUP_ONLY_COPY}</p>
                </div>

                <div className="rounded-[1.9rem] border border-white/70 bg-white/76 p-6">
                  <p className="editorial-kicker">Portfolio-safe</p>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                    {DEMO_DISCLAIMER}
                  </p>
                  <p className="mt-5 text-sm leading-7 text-foreground">
                    La nueva lectura visual toma el pulso boutique y modular de v0, pero todo el
                    contenido, branding y copy se ha rehecho para esta marca ficticia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {highlightedProducts.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/producto/${product.slug}`}
                  className={`group paper-panel overflow-hidden p-3 ${index === 0 ? "sm:col-span-2" : ""}`}
                >
                  <div className={`grid gap-4 ${index === 0 ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
                    <div className="relative min-h-[280px] overflow-hidden rounded-[1.7rem] bg-secondary">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        priority={index === 0}
                      />
                    </div>
                    <div className="flex flex-col justify-between p-3">
                      <div>
                        <span className="glass-pill inline-flex px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                          {getCustomerFacingFormatLabel(product.format)}
                        </span>
                        <h2 className="mt-4 font-display text-4xl leading-none text-foreground">
                          {product.name}
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {product.shortDescription}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center justify-between text-sm font-semibold text-foreground">
                        <span>{product.priceText}</span>
                        <span className="inline-flex items-center gap-2">
                          Ver ficha
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="paper-panel p-5">
                <p className="editorial-kicker">Catálogo</p>
                <p className="mt-3 font-display text-3xl leading-none">9 familias</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Cada una con traducción visual consistente entre Mesa y Petit.
                </p>
              </div>
              <div className="paper-panel p-5">
                <p className="editorial-kicker">Checkout</p>
                <p className="mt-3 font-display text-3xl leading-none">Reserva válida</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Mismo endpoint, mismas validaciones de fecha y mismo modelo de pedido.
                </p>
              </div>
              <div className="paper-panel p-5">
                <p className="editorial-kicker">Chat</p>
                <p className="mt-3 font-display text-3xl leading-none">Atención dual</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  En escritorio abre chatbot; en móvil deriva al canal de WhatsApp demo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
