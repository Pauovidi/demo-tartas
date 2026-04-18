import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { pressArticles, getArticleBySlug } from "@/src/data/press"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return pressArticles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: "Artículo no encontrado" }
  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function PressArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <section className="pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="page-shell">
        <Link
          href="/prensa"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a notas
        </Link>

        <article className="paper-panel overflow-hidden p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span>{article.outlet}</span>
            <span>{article.date}</span>
          </div>
          <h1 className="mt-4 font-display text-5xl leading-none text-foreground md:text-6xl">
            {article.title}
          </h1>

          <div className="relative mt-8 aspect-video overflow-hidden rounded-[1.8rem] bg-secondary">
            <Image src={article.image} alt={article.title} fill className="object-cover" priority />
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-8 text-muted-foreground md:text-base">
            {article.content}
          </p>
        </article>
      </div>
    </section>
  )
}
