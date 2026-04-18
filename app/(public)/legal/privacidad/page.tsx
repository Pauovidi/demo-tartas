import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacidad demo",
}

export default function PrivacidadPage() {
  return (
    <section className="pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="page-shell">
        <div className="paper-panel max-w-4xl p-6 md:p-8">
          <h1 className="font-display text-5xl leading-none text-foreground md:text-6xl">
            Política de privacidad demo
          </h1>
          <div className="mt-8 flex flex-col gap-6 text-sm leading-7 text-muted-foreground">
            <p>
              Esta demo procesa únicamente los datos necesarios para enseñar el flujo técnico de
              formulario, reserva y chatbot dentro del proyecto.
            </p>
            <p>
              Los datos visibles en esta versión son ficticios. Si la demo se conecta a un backend
              durante una prueba local, su finalidad es exclusivamente validar la mecánica del
              producto, no operar un negocio real.
            </p>
            <p>
              Para cualquier revisión de portfolio o del propio proyecto, el contacto de referencia
              mostrado es <strong>atelier@casabruna.example</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
