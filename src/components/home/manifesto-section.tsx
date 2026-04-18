import Link from "next/link"

import {
  BRAND_EMAIL,
  BRAND_LOCATION,
  STORE_HOURS_INLINE_TEXT,
} from "@/src/data/business"

const values = [
  {
    label: "Calidad artesanal",
    description: "Cada pieza horneada lentamente con ingredientes premium, sin prisas.",
  },
  {
    label: "Formatos editables",
    description: "Mesa o Petit. Personaliza sabor, tamaño y cantidad según tu ocasión.",
  },
  {
    label: "Recogida concertada",
    description: "Sin envíos. Coordinamos la retirada con una ventana de producción clara.",
  },
]

export function ManifestoSection() {
  return (
    <section id="about" className="py-16 md:py-24 border-b border-border/40">
      <div className="page-shell space-y-12">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Sobre Casa Bruna
              </p>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-foreground">
                Horneado lento para sobremesas memorables.
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground max-w-xl">
              Casa Bruna es un atelier de pasteles y cheesecakes donde cada fórmula se ha pensado para las mesas que importan. Colección editorial, producción acotada, reserva anticipada.
            </p>
          </div>

          <div className="grid gap-4 md:gap-5">
            {values.map((value) => (
              <div
                key={value.label}
                className="editorial-panel border p-5 md:p-6 space-y-2"
              >
                <p className="font-semibold text-foreground text-sm md:text-base">{value.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          <div className="editorial-panel border-accent/40 border-l-4 p-6 md:p-8 bg-accent/5 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
                Ubicación
              </p>
              <p className="text-sm font-medium text-foreground">{BRAND_LOCATION}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
                Contacto
              </p>
              <p className="text-sm text-foreground/80">{BRAND_EMAIL}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
                Horario
              </p>
              <p className="text-sm text-foreground/80">{STORE_HOURS_INLINE_TEXT}</p>
            </div>
          </div>

          <div className="lg:col-span-2 editorial-panel p-6 md:p-8 space-y-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Acerca de esta demo
              </p>
              <p className="font-display text-2xl md:text-3xl text-foreground">
                Portfolio-safe y completamente funcional
              </p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
              Esta demostración preserva la base técnica de reserva, catálogo y checkout del proyecto original, pero con marca, datos, imágenes y copy completamente neutralizados y reorganizados para un portfolio seguro.
            </p>
            <div className="pt-4 border-t border-border/40">
              <Link
                href="/faqs"
                className="inline-flex items-center justify-center rounded-lg border border-border/60 bg-card px-6 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted/40"
              >
                Leer preguntas frecuentes →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
