import Link from "next/link"

import {
  BRAND_NAME,
  BRAND_TAGLINE,
  DEMO_DISCLAIMER,
  FORMAT_SIZE_COPY,
  PICKUP_ONLY_COPY,
} from "@/src/data/business"

const tastingNotes = [
  "Colección semanal en formato Mesa y Petit",
  "Recogida concertada con ventana de producción",
  "Chat asistido para sabores, formatos y reservas",
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-14 pt-8 md:pb-20 md:pt-12">
      <div className="page-shell">
        <div className="paper-panel relative overflow-hidden px-6 py-8 md:px-10 md:py-12 lg:px-14 lg:py-16">
          <div className="absolute right-[-6%] top-[-14%] h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-[-12%] left-[-2%] h-44 w-44 rounded-full bg-accent/30 blur-3xl" />

          <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative z-10">
              <span className="inline-flex rounded-full border border-foreground/10 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Pastry atelier moderno
              </span>
              <h1 className="mt-5 max-w-3xl font-display text-5xl leading-none text-balance text-foreground md:text-7xl lg:text-[5.5rem]">
                Cheesecakes pensados para mesas largas y finales lentos.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                {BRAND_NAME} presenta una demo portfolio con colección editable, flujo de pedido,
                checkout y asistente conversacional. La identidad visual, los textos y los datos se
                han rehecho por completo para esta versión segura.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/productos"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Explorar la colección
                </Link>
                <Link
                  href="#atelier-contact"
                  className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-white/70 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white"
                >
                  Ver cómo se reserva
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {tastingNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-[1.4rem] border border-white/70 bg-white/70 p-4 text-sm leading-6 text-muted-foreground"
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 space-y-5">
              <div className="rounded-[2rem] border border-foreground/10 bg-[#2e241f] p-6 text-white shadow-xl">
                <p className="text-xs uppercase tracking-[0.24em] text-white/70">Tagline</p>
                <p className="mt-3 font-display text-3xl leading-tight">{BRAND_TAGLINE}</p>
                <div className="mt-5 h-px w-full bg-white/10" />
                <p className="mt-5 text-sm leading-6 text-white/72">{FORMAT_SIZE_COPY}</p>
                <p className="mt-2 text-sm leading-6 text-white/72">{PICKUP_ONLY_COPY}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[1.8rem] border border-foreground/10 bg-white/75 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Sistema verbal
                  </p>
                  <p className="mt-3 text-lg font-semibold text-foreground">
                    Sereno, cálido y muy orientado a sobremesa.
                  </p>
                </div>
                <div className="rounded-[1.8rem] border border-dashed border-primary/40 bg-primary/8 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-primary">Demo safe</p>
                  <p className="mt-3 text-sm leading-6 text-foreground">{DEMO_DISCLAIMER}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
