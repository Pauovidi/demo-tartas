import type { Product } from "@/src/data/products"

import { ProductCard } from "@/src/components/product-card"

interface RecommendedProductsProps {
  products: Product[]
}

export function RecommendedProducts({ products }: RecommendedProductsProps) {
  return (
    <section className="pb-20">
      <div className="page-shell">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              También encaja aquí
            </p>
            <h2 className="mt-3 font-display text-4xl leading-none text-foreground md:text-5xl">
              Más piezas de la colección
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            Recomendaciones construidas con la misma lógica de familia y formato, pero presentadas
            en una capa visual nueva.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
