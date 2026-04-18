import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { pressArticles } from "@/src/data/press"

export const metadata: Metadata = {
  title: "Notas",
  description: "Contexto editorial y notas sobre el rebrand portfolio-safe.",
}

export default function PrensaPage() {
  return (
    <section className="pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="page-shell">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
              Editorial
            </p>
            <h1 className="mt-3 font-display text-5xl leading-none text-foreground md:text-6xl">
              Notas del proyecto
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-right">
            Estas piezas explican cómo se transformó una base real en una demo segura para portfolio.
          </p>
        </div>

        <div className="space-y-5">
          {pressArticles.map((article) => (
            <article key={article.id} className="paper-panel overflow-hidden">
              <div className="grid gap-0 md:grid-cols-[0.34fr_0.66fr]">
                <div className="relative min-h-[220px]">
                  <Image src={article.image} alt={article.title} fill className="object-cover" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    <span>{article.outlet}</span>
                    <span>{article.date}</span>
                  </div>
                  <h2 className="mt-4 font-display text-4xl leading-none text-foreground">
                    {article.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{article.excerpt}</p>
                  <Link
                    href={`/prensa/${article.slug}`}
                    className="mt-6 inline-flex items-center justify-center rounded-full border border-foreground/12 bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    Leer nota
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
