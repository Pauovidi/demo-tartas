import type { Metadata } from "next"

import { TiendaContent } from "@/src/components/tienda/tienda-content"

export const metadata: Metadata = {
  title: "Colección",
  description: "Catálogo demo de Casa Bruna en formatos Mesa y Petit.",
}

export default function TiendaPage() {
  return (
    <section className="w-full min-h-full pt-top-spacing">
      <TiendaContent />
    </section>
  )
}
