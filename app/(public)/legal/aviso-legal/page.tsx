import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aviso legal demo",
}

export default function AvisoLegalPage() {
  return (
    <section className="pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="page-shell">
        <div className="paper-panel max-w-4xl p-6 md:p-8">
          <h1 className="font-display text-5xl leading-none text-foreground md:text-6xl">
            Aviso legal demo
          </h1>
          <div className="mt-8 flex flex-col gap-6 text-sm leading-7 text-muted-foreground">
            <p>
              Este sitio forma parte de una demo portfolio-safe creada para mostrar capacidades de
              rebrand, catálogo, checkout y chatbot sobre una base técnica real.
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li><strong>Titular demo:</strong> Casa Bruna Atelier Demo</li>
              <li><strong>Uso:</strong> demostración de producto y diseño</li>
              <li><strong>Contacto demo:</strong> atelier@casabruna.example</li>
            </ul>
            <p>
              La información comercial, la identidad visual y los datos de contacto que aparecen en
              esta versión son ficticios y se han incorporado únicamente con fines de portfolio.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
