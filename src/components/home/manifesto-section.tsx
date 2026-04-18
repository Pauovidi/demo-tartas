import Link from "next/link"

import {
  BRAND_EMAIL,
  BRAND_LOCATION,
  DEMO_DISCLAIMER,
  STORE_HOURS_INLINE_TEXT,
} from "@/src/data/business"

const pillars = [
  {
    title: "Ritmo editorial",
    text: "La home deja la narrativa de galería y se mueve hacia una boutique cálida, con bloques tipo revista, tarjetas de detalle y más aire entre secciones.",
  },
  {
    title: "Operativa visible",
    text: "Se mantiene la base técnica de reserva, catálogo y chatbot, pero el lenguaje comercial se ha reescrito para una colección demo segura y coherente.",
  },
  {
    title: "Datos neutralizados",
    text: "Contacto, legales, FAQ, metadatos, soportes de WhatsApp y copies de atención se han sustituido por placeholders y valores demo no identificables.",
  },
]

export function ManifestoSection() {
  return (
    <section id="atelier-contact" className="pb-14 pt-2 md:pb-20">
      <div className="page-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="paper-panel p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
            Cómo está pensada la demo
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-none text-foreground md:text-5xl">
            Una misma base técnica, otra forma de presentarla.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
            Esta demo prioriza una lectura más comercial y más modular: reserva guiada, piezas
            destacadas, narrativa breve y un pie claro para portfolio sin rastro de identidad real.
          </p>

          <div className="mt-8 space-y-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[1.5rem] border border-foreground/8 bg-white/80 p-5"
              >
                <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="paper-panel p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.75rem] bg-[#2e241f] p-6 text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-white/70">Atención</p>
                <p className="mt-3 font-display text-3xl">Reservas, dudas y sabores</p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  El launcher conversacional y el flujo de checkout siguen activos para demostrar
                  la experiencia de pedido.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-foreground/10 bg-white/85 p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Datos demo
                </p>
                <p className="mt-3 text-sm leading-6 text-foreground">{BRAND_LOCATION}</p>
                <p className="mt-1 text-sm leading-6 text-foreground">{BRAND_EMAIL}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {STORE_HOURS_INLINE_TEXT}
                </p>
              </div>
            </div>
          </div>

          <div className="paper-panel p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Portfolio-safe</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                  {DEMO_DISCLAIMER}
                </p>
              </div>
              <Link
                href="/faqs"
                className="inline-flex items-center justify-center rounded-full border border-foreground/12 bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Revisar preguntas frecuentes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
