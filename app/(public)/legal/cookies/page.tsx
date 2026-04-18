import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookies demo",
}

export default function CookiesPage() {
  return (
    <section className="pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="page-shell">
        <div className="paper-panel max-w-4xl p-6 md:p-8">
          <h1 className="font-display text-5xl leading-none text-foreground md:text-6xl">
            Política de cookies demo
          </h1>
          <div className="mt-8 flex flex-col gap-6 text-sm leading-7 text-muted-foreground">
            <p>
              Esta demo puede utilizar cookies técnicas o almacenamiento local para simular
              funcionalidades de carrito y persistencia de estado.
            </p>
            <p>
              No se incorporan aquí fines comerciales reales ni plataformas de seguimiento asociadas
              a una marca cliente. El objetivo es demostrar comportamiento de interfaz y flujo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
