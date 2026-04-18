import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Condiciones demo",
}

export default function TerminosPage() {
  return (
    <section className="pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="page-shell">
        <div className="paper-panel max-w-4xl p-6 md:p-8">
          <h1 className="font-display text-5xl leading-none text-foreground md:text-6xl">
            Términos y condiciones demo
          </h1>
          <div className="mt-8 flex flex-col gap-6 text-sm leading-7 text-muted-foreground">
            <p>
              Esta experiencia muestra un flujo de compra y reserva con fines de demostración. Los
              pedidos creados en esta versión no implican venta real, cobro real ni entrega física.
            </p>
            <p>
              Los textos, precios, sabores y datos de contacto han sido neutralizados para crear una
              marca ficticia apta para portfolio y libre de referencias identificables del proyecto original.
            </p>
            <p>
              Cualquier uso de esta demo debe entenderse como demostración técnica y visual.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
