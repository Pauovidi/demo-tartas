import type { Metadata } from "next"

import { TiendaContent } from "@/src/components/tienda/tienda-content"
import {
  BRAND_TONE,
  FORMAT_SIZE_COPY,
  PICKUP_ONLY_COPY,
} from "@/src/data/business"

export const metadata: Metadata = {
  title: "Colección",
  description: "Catálogo demo de Casa Bruna en formatos Mesa y Petit.",
}

export default function TiendaPage() {
  return (
    <section className="pb-20 pt-8 md:pb-24 md:pt-10">
      <div className="page-shell space-y-8">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="showcase-panel p-6 md:p-8 lg:p-10">
            <p className="editorial-kicker">Catálogo portfolio-safe</p>
            <h1 className="mt-4 font-display text-5xl leading-none text-foreground md:text-6xl xl:text-7xl">
              Colección completa
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground md:text-base">
              La nueva dirección visual reorganiza las piezas como una boutique digital: imagen más
              dominante, mejor jerarquía de formato y calls to action más claros, sin romper la
              estructura real de catálogo, ficha y compra.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-[1.6rem] border border-white/75 bg-white/78 p-4">
                <p className="editorial-kicker">Formatos</p>
                <p className="mt-3 text-sm leading-6 text-foreground">{FORMAT_SIZE_COPY}</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/75 bg-white/78 p-4">
                <p className="editorial-kicker">Operativa</p>
                <p className="mt-3 text-sm leading-6 text-foreground">{PICKUP_ONLY_COPY}</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/75 bg-white/78 p-4">
                <p className="editorial-kicker">Tono</p>
                <p className="mt-3 text-sm leading-6 text-foreground">{BRAND_TONE}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <div className="paper-panel p-5">
              <p className="editorial-kicker">Rutas</p>
              <p className="mt-3 font-display text-3xl leading-none">Intactas</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                `/productos` y `/producto/[slug]` siguen siendo la base pública real.
              </p>
            </div>
            <div className="paper-panel p-5">
              <p className="editorial-kicker">Carrito</p>
              <p className="mt-3 font-display text-3xl leading-none">Persistente</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Las acciones de add to cart siguen conectadas al mismo contexto local.
              </p>
            </div>
            <div className="paper-panel p-5">
              <p className="editorial-kicker">Checkout</p>
              <p className="mt-3 font-display text-3xl leading-none">Listo</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Cada selección desemboca en el mismo flujo de reserva y pedido demo.
              </p>
            </div>
          </div>
        </div>

        <TiendaContent />
      </div>
    </section>
  )
}
