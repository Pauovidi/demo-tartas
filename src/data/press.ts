export interface PressArticle {
  id: string
  title: string
  slug: string
  outlet: string
  date: string
  excerpt: string
  image: string
  content: string
}

export const pressArticles: PressArticle[] = [
  {
    id: "1",
    title: "Cómo convertir una tienda real en una demo portfolio-safe",
    slug: "demo-portfolio-safe-rebrand",
    outlet: "Studio Notes",
    date: "2026-03-18",
    excerpt:
      "Esta pieza resume cómo se rehízo identidad, layout y copy sin desmontar catálogo, checkout ni chatbot.",
    image: "/brand/journal.svg",
    content:
      "Casa Bruna funciona aquí como una marca ficticia construida sobre una base técnica ya existente. El objetivo de la demo no es simular una empresa concreta, sino enseñar la capacidad de rebrand, estructura de catálogo, experiencia de compra y atención conversacional dentro de una misma aplicación.",
  },
  {
    id: "2",
    title: "Un sistema visual cálido para una experiencia de reserva",
    slug: "sistema-visual-calido-reserva",
    outlet: "Portfolio Journal",
    date: "2026-03-10",
    excerpt:
      "La interfaz se mueve hacia una estética mediterránea elegante con tarjetas editoriales, fondos suaves y tipografía de contraste.",
    image: "/brand/journal.svg",
    content:
      "El rediseño abandona la silueta original y reorganiza hero, catálogo, ficha de producto, checkout y launcher conversacional. La nueva dirección visual trabaja con crema, terracota, arena y verde apagado para crear un tono más sereno y cálido.",
  },
  {
    id: "3",
    title: "Chatbot, checkout y catálogo: qué se mantiene y qué cambia",
    slug: "chatbot-checkout-catalogo-demo",
    outlet: "Build Log",
    date: "2026-02-28",
    excerpt:
      "La demo conserva rutas, flujo de pedido y lógica de ayuda, pero sustituye completamente marca, datos y microcopy.",
    image: "/brand/journal.svg",
    content:
      "El chatbot sigue resolviendo sabores, tamaños, horarios y handoff humano; el checkout mantiene validaciones y creación de pedido; y el catálogo conserva agrupación por familia y formato. Lo que cambia es la capa visible, los activos gráficos, la narrativa comercial y cualquier rastro sensible.",
  },
]

export function getArticleBySlug(slug: string): PressArticle | undefined {
  return pressArticles.find((a) => a.slug === slug)
}
