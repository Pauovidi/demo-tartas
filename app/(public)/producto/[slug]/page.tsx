import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCustomerFacingFormatLabel } from "@/src/data/business"
import { products, getProductBySlug } from "@/src/data/products"
import { ProductDetail } from "@/src/components/product/product-detail"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: "Producto no encontrado" }

  return {
    title: `${product.name} · ${getCustomerFacingFormatLabel(product.format)}`,
    description: product.shortDescription,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return <ProductDetail product={product} />
}
