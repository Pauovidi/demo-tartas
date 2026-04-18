import type { Metadata } from "next"

import { TiendaContent } from "@/src/components/tienda/tienda-content"

export const metadata: Metadata = {
  title: "Colección",
  description: "Catálogo completo de Casa Bruna en formatos Mesa y Petit.",
}

export default function TiendaPage() {
  return (
    <section className="pb-20 pt-12 md:pb-28 md:pt-16">
      <div className="page-shell">
        <TiendaContent />
      </div>
    </section>
  )
}
