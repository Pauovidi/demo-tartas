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
      <div className="page-shell grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="showcase-panel p-6 md:p-8 lg:p-10">
          <p className="editorial-kicker">Cómo está pensada la demo</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-none text-foreground md:text-5xl xl:text-6xl">
            Misma base técnica. Otra portada. Otro tono. Mucha más presencia.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground md:text-base">
            Aquí no se desmonta la lógica de negocio: se reorganiza el relato visual. La reserva,
            el lanzamiento a WhatsApp, el chat, el checkout y los datos de producto siguen vivos
            bajo una identidad ficticia mejor empaquetada para portfolio.
          </p>

          <div className="mt-8 grid gap-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[1.6rem] border border-white/70 bg-white/78 p-5"
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
              <div className="rounded-[1.9rem] bg-[#211913] p-6 text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-white/70">Atención</p>
                <p className="mt-3 font-display text-3xl leading-none">Reservas, dudas y sabores</p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  El launcher conversacional y el flujo de checkout siguen activos para demostrar
                  la experiencia de pedido.
                </p>
              </div>
              <div className="rounded-[1.9rem] border border-foreground/10 bg-white/85 p-6">
                <p className="editorial-kicker">Datos demo</p>
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
                <p className="editorial-kicker text-accent">Portfolio-safe</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                  {DEMO_DISCLAIMER}
                </p>
              </div>
              <Link
                href="/faqs"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
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
