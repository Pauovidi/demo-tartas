import type { Metadata } from "next"

import { TiendaContent } from "@/src/components/tienda/tienda-content"

export const metadata: Metadata = {
  title: "Colección",
  description: "Catálogo demo de Casa Bruna en formatos Mesa y Petit.",
}

export default function TiendaPage() {
  return (
    <section className="pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="page-shell">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
              Catálogo portfolio
            </p>
            <h1 className="mt-3 font-display text-5xl leading-none text-foreground md:text-6xl">
              Colección completa
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-right">
            Cada pieza usa la misma base de producto y routing del proyecto original, pero con
            naming, copy, visuales y tarjetas completamente reeditados.
          </p>
        </div>
        <TiendaContent />
      </div>
    </section>
  )
}
