export interface Product {
  id: string
  name: string
  slug: string
  format: "tarta" | "cajita"
  category: string
  priceText: string
  priceValue: number
  shortDescription: string
  fullDescription?: string
  description?: string
  allergens?: string
  ingredients?: string[]
  portionInfo?: string
  weightInfo?: string
  images: string[]
  featured: boolean
}

export type Flavor = {
  category: string
  label: string
  tarta?: Product
  cajita?: Product
}

const PRODUCT_IMAGE_LIBRARY: Record<
  string,
  {
    tarta: string[]
    cajita: string[]
  }
> = {
  "vainilla-tostada": {
    tarta: ["/images/tarta-clasica-1.jpg", "/images/tarta-clasica-2.jpg", "/images/tarta-clasica-3.jpg"],
    cajita: ["/images/cajita-clasica-1.jpg", "/images/clasica-slice.jpg"],
  },
  "pistacho-verde": {
    tarta: ["/images/tarta-pistacho-1.jpg", "/images/tarta-pistacho-2.jpg", "/images/tarta-pistacho-3.jpg"],
    cajita: ["/images/cajita-pistacho-1.jpg"],
  },
  "cacao-ahumado": {
    tarta: ["/images/tarta-chocolate-1.jpg", "/images/tarta-chocolate-2.jpg", "/images/tarta-chocolate-3.jpg"],
    cajita: ["/images/cajita-chocolate-1.jpg"],
  },
  "limon-crema": {
    tarta: ["/images/tarta-mango-1.jpg", "/images/tarta-matcha-2.jpg", "/images/tarta-frutos-rojos-2.jpg"],
    cajita: ["/images/cajita-mango-1.png"],
  },
  "higo-miel": {
    tarta: ["/images/tarta-lotus-1.jpg", "/images/tarta-lotus-2.jpg", "/images/tarta-lotus-3.jpg"],
    cajita: ["/images/cajita-lotus-1.jpg"],
  },
  "cafe-avellana": {
    tarta: ["/images/tarta-oreo-1.jpg", "/images/tarta-oreo-2.jpg", "/images/tarta-oreo-3.jpg"],
    cajita: ["/images/cajita-oreo-1.jpg"],
  },
  "mandarina-salvia": {
    tarta: ["/images/tarta-matcha-1.jpg", "/images/tarta-matcha-2.jpg", "/images/tarta-matcha-3.jpg"],
    cajita: ["/images/cajita-matcha-1.jpg"],
  },
  "frambuesa-blanca": {
    tarta: ["/images/tarta-frutos-rojos-1.jpg", "/images/tarta-frutos-rojos-2.jpg", "/images/tarta-frutos-rojos-3.jpg"],
    cajita: ["/images/cajita-frutos-rojos-1.jpg"],
  },
  "caramelo-marino": {
    tarta: ["/images/tarta-dulce-leche-1.jpg", "/images/tarta-dulce-leche-2.jpg", "/images/tarta-dulce-leche-3.jpg"],
    cajita: ["/images/cajita-dulce-leche-1.jpg"],
  },
}

function getProductImages(category: string, format: "tarta" | "cajita") {
  return PRODUCT_IMAGE_LIBRARY[category]?.[format] ?? ["/images/placeholder-tarta.jpg"]
}

export const products: Product[] = [
  {
    id: "petit-vainilla-tostada",
    name: "Vainilla tostada",
    slug: "petit-vainilla-tostada",
    format: "cajita",
    category: "vainilla-tostada",
    priceText: "14 €",
    priceValue: 14,
    shortDescription: "Nuestro formato Petit de queso horneado con vainilla y acabado tostado.",
    fullDescription: "Formato Petit de 450 g. Textura cremosa, vainilla natural y final tostado.",
    portionInfo: "2-3 raciones",
    weightInfo: "450 g",
    images: getProductImages("vainilla-tostada", "cajita"),
    featured: true,
  },
  {
    id: "petit-pistacho-verde",
    name: "Pistacho verde",
    slug: "petit-pistacho-verde",
    format: "cajita",
    category: "pistacho-verde",
    priceText: "14 €",
    priceValue: 14,
    shortDescription: "Petit cremoso con pasta de pistacho tostado y punto salino.",
    fullDescription: "Formato Petit de 450 g. Intensidad de pistacho y acabado suave.",
    portionInfo: "2-3 raciones",
    weightInfo: "450 g",
    images: getProductImages("pistacho-verde", "cajita"),
    featured: true,
  },
  {
    id: "petit-cacao-ahumado",
    name: "Cacao ahumado",
    slug: "petit-cacao-ahumado",
    format: "cajita",
    category: "cacao-ahumado",
    priceText: "14 €",
    priceValue: 14,
    shortDescription: "Petit de cacao oscuro con notas tostadas y base de galleta fina.",
    fullDescription: "Formato Petit de 450 g. Queso cremoso, cacao intenso y acabado ahumado.",
    portionInfo: "2-3 raciones",
    weightInfo: "450 g",
    images: getProductImages("cacao-ahumado", "cajita"),
    featured: true,
  },
  {
    id: "petit-limon-crema",
    name: "Limón crema",
    slug: "petit-limon-crema",
    format: "cajita",
    category: "limon-crema",
    priceText: "14 €",
    priceValue: 14,
    shortDescription: "Petit fresco con crema de limón confitado y punto lácteo limpio.",
    fullDescription: "Formato Petit de 450 g. Más cítrico, ligero y muy cremoso.",
    portionInfo: "2-3 raciones",
    weightInfo: "450 g",
    images: getProductImages("limon-crema", "cajita"),
    featured: false,
  },
  {
    id: "petit-higo-miel",
    name: "Higo y miel",
    slug: "petit-higo-miel",
    format: "cajita",
    category: "higo-miel",
    priceText: "14 €",
    priceValue: 14,
    shortDescription: "Petit sedoso con notas de miel suave e higo maduro.",
    fullDescription: "Formato Petit de 450 g. Dulzor delicado y fondo floral.",
    portionInfo: "2-3 raciones",
    weightInfo: "450 g",
    images: getProductImages("higo-miel", "cajita"),
    featured: false,
  },
  {
    id: "petit-cafe-avellana",
    name: "Café avellana",
    slug: "petit-cafe-avellana",
    format: "cajita",
    category: "cafe-avellana",
    priceText: "14 €",
    priceValue: 14,
    shortDescription: "Petit de café suave con crema de avellana tostada.",
    fullDescription: "Formato Petit de 450 g. Perfil redondo y tostado.",
    portionInfo: "2-3 raciones",
    weightInfo: "450 g",
    images: getProductImages("cafe-avellana", "cajita"),
    featured: false,
  },
  {
    id: "petit-mandarina-salvia",
    name: "Mandarina y salvia",
    slug: "petit-mandarina-salvia",
    format: "cajita",
    category: "mandarina-salvia",
    priceText: "14 €",
    priceValue: 14,
    shortDescription: "Petit aromático con mandarina fresca y un fondo herbal.",
    fullDescription: "Formato Petit de 450 g. Brillante, cítrico y elegante.",
    portionInfo: "2-3 raciones",
    weightInfo: "450 g",
    images: getProductImages("mandarina-salvia", "cajita"),
    featured: false,
  },
  {
    id: "petit-frambuesa-blanca",
    name: "Frambuesa blanca",
    slug: "petit-frambuesa-blanca",
    format: "cajita",
    category: "frambuesa-blanca",
    priceText: "14 €",
    priceValue: 14,
    shortDescription: "Petit con frambuesa y crema blanca de acabado delicado.",
    fullDescription: "Formato Petit de 450 g. Fruta roja, dulzor fino y textura densa.",
    portionInfo: "2-3 raciones",
    weightInfo: "450 g",
    images: getProductImages("frambuesa-blanca", "cajita"),
    featured: false,
  },
  {
    id: "petit-caramelo-marino",
    name: "Caramelo marino",
    slug: "petit-caramelo-marino",
    format: "cajita",
    category: "caramelo-marino",
    priceText: "14 €",
    priceValue: 14,
    shortDescription: "Petit de caramelo suave con un final ligeramente salino.",
    fullDescription: "Formato Petit de 450 g. Dulzor envolvente y textura de horno lento.",
    portionInfo: "2-3 raciones",
    weightInfo: "450 g",
    images: getProductImages("caramelo-marino", "cajita"),
    featured: false,
  },
  {
    id: "mesa-vainilla-tostada",
    name: "Vainilla tostada",
    slug: "mesa-vainilla-tostada",
    format: "tarta",
    category: "vainilla-tostada",
    priceText: "39 €",
    priceValue: 39,
    shortDescription: "Formato Mesa de queso horneado con vainilla natural.",
    description: "Nuestra versión más equilibrada: cremosa, tostada y pensada para compartir.",
    allergens: "Leche, huevo, gluten",
    ingredients: ["queso crema", "nata", "huevo", "vainilla", "harina de trigo", "azúcar"],
    fullDescription: "Formato Mesa de 1,8 kg. 10-12 raciones. Vainilla natural y borde tostado.",
    portionInfo: "10-12 raciones",
    weightInfo: "1,8 kg",
    images: getProductImages("vainilla-tostada", "tarta"),
    featured: true,
  },
  {
    id: "mesa-pistacho-verde",
    name: "Pistacho verde",
    slug: "mesa-pistacho-verde",
    format: "tarta",
    category: "pistacho-verde",
    priceText: "39 €",
    priceValue: 39,
    shortDescription: "Formato Mesa de queso horneado con pistacho tostado.",
    description: "Cremosa y ligeramente salina, con un perfil de fruto seco muy definido.",
    allergens: "Leche, huevo, gluten, frutos de cáscara (pistacho)",
    ingredients: ["queso crema", "nata", "huevo", "pasta de pistacho", "harina de trigo", "azúcar"],
    fullDescription: "Formato Mesa de 1,8 kg. 10-12 raciones. Pistacho tostado y textura aterciopelada.",
    portionInfo: "10-12 raciones",
    weightInfo: "1,8 kg",
    images: getProductImages("pistacho-verde", "tarta"),
    featured: true,
  },
  {
    id: "mesa-cacao-ahumado",
    name: "Cacao ahumado",
    slug: "mesa-cacao-ahumado",
    format: "tarta",
    category: "cacao-ahumado",
    priceText: "39 €",
    priceValue: 39,
    shortDescription: "Formato Mesa de cacao oscuro y queso cremoso.",
    description: "Más intenso y profundo, con un final ligeramente ahumado.",
    allergens: "Leche, huevo, gluten",
    ingredients: ["queso crema", "nata", "huevo", "cacao puro", "harina de trigo", "azúcar"],
    fullDescription: "Formato Mesa de 1,8 kg. 10-12 raciones. Cacao intenso y tostado fino.",
    portionInfo: "10-12 raciones",
    weightInfo: "1,8 kg",
    images: getProductImages("cacao-ahumado", "tarta"),
    featured: true,
  },
  {
    id: "mesa-limon-crema",
    name: "Limón crema",
    slug: "mesa-limon-crema",
    format: "tarta",
    category: "limon-crema",
    priceText: "39 €",
    priceValue: 39,
    shortDescription: "Formato Mesa cítrico, luminoso y muy fresco.",
    description: "Ideal para sobremesas ligeras: equilibrio entre cremosidad y acidez.",
    allergens: "Leche, huevo, gluten",
    ingredients: ["queso crema", "nata", "huevo", "limón", "harina de trigo", "azúcar"],
    fullDescription: "Formato Mesa de 1,8 kg. 10-12 raciones. Limón confitado y base fina.",
    portionInfo: "10-12 raciones",
    weightInfo: "1,8 kg",
    images: getProductImages("limon-crema", "tarta"),
    featured: false,
  },
  {
    id: "mesa-higo-miel",
    name: "Higo y miel",
    slug: "mesa-higo-miel",
    format: "tarta",
    category: "higo-miel",
    priceText: "39 €",
    priceValue: 39,
    shortDescription: "Formato Mesa con matiz floral y fondo cálido.",
    description: "Perfil suave, envolvente y muy de final de comida larga.",
    allergens: "Leche, huevo, gluten",
    ingredients: ["queso crema", "nata", "huevo", "miel", "compota de higo", "harina de trigo"],
    fullDescription: "Formato Mesa de 1,8 kg. 10-12 raciones. Miel floral e higo maduro.",
    portionInfo: "10-12 raciones",
    weightInfo: "1,8 kg",
    images: getProductImages("higo-miel", "tarta"),
    featured: false,
  },
  {
    id: "mesa-cafe-avellana",
    name: "Café avellana",
    slug: "mesa-cafe-avellana",
    format: "tarta",
    category: "cafe-avellana",
    priceText: "39 €",
    priceValue: 39,
    shortDescription: "Formato Mesa con café tostado y crema de avellana.",
    description: "Densa, aromática y especialmente pensada para sobremesas largas.",
    allergens: "Leche, huevo, gluten, frutos de cáscara (avellana)",
    ingredients: ["queso crema", "nata", "huevo", "café", "crema de avellana", "harina de trigo"],
    fullDescription: "Formato Mesa de 1,8 kg. 10-12 raciones. Café suave y fondo tostado.",
    portionInfo: "10-12 raciones",
    weightInfo: "1,8 kg",
    images: getProductImages("cafe-avellana", "tarta"),
    featured: false,
  },
  {
    id: "mesa-mandarina-salvia",
    name: "Mandarina y salvia",
    slug: "mesa-mandarina-salvia",
    format: "tarta",
    category: "mandarina-salvia",
    priceText: "39 €",
    priceValue: 39,
    shortDescription: "Formato Mesa cítrico con un toque herbal elegante.",
    description: "Una lectura más fresca y mediterránea del queso horneado.",
    allergens: "Leche, huevo, gluten",
    ingredients: ["queso crema", "nata", "huevo", "mandarina", "salvia", "harina de trigo"],
    fullDescription: "Formato Mesa de 1,8 kg. 10-12 raciones. Mandarina fresca y salvia suave.",
    portionInfo: "10-12 raciones",
    weightInfo: "1,8 kg",
    images: getProductImages("mandarina-salvia", "tarta"),
    featured: false,
  },
  {
    id: "mesa-frambuesa-blanca",
    name: "Frambuesa blanca",
    slug: "mesa-frambuesa-blanca",
    format: "tarta",
    category: "frambuesa-blanca",
    priceText: "39 €",
    priceValue: 39,
    shortDescription: "Formato Mesa con fruta roja y acabado muy delicado.",
    description: "El más suave visualmente y uno de los más aromáticos en boca.",
    allergens: "Leche, huevo, gluten",
    ingredients: ["queso crema", "nata", "huevo", "frambuesa", "chocolate blanco", "harina de trigo"],
    fullDescription: "Formato Mesa de 1,8 kg. 10-12 raciones. Frambuesa y crema blanca.",
    portionInfo: "10-12 raciones",
    weightInfo: "1,8 kg",
    images: getProductImages("frambuesa-blanca", "tarta"),
    featured: false,
  },
  {
    id: "mesa-caramelo-marino",
    name: "Caramelo marino",
    slug: "mesa-caramelo-marino",
    format: "tarta",
    category: "caramelo-marino",
    priceText: "39 €",
    priceValue: 39,
    shortDescription: "Formato Mesa de caramelo suave con un final salino muy fino.",
    description: "Redondo, cálido y perfecto para quien busca un perfil más goloso.",
    allergens: "Leche, huevo, gluten",
    ingredients: ["queso crema", "nata", "huevo", "caramelo", "sal marina", "harina de trigo"],
    fullDescription: "Formato Mesa de 1,8 kg. 10-12 raciones. Caramelo delicado y sal marina.",
    portionInfo: "10-12 raciones",
    weightInfo: "1,8 kg",
    images: getProductImages("caramelo-marino", "tarta"),
    featured: false,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getProductsByFormat(format: string): Product[] {
  if (format === "todos") return products
  return products.filter((p) => p.format === format)
}

export function getFlavors(): Flavor[] {
  const map = new Map<string, Flavor>()
  for (const p of products) {
    if (!map.has(p.category)) {
      map.set(p.category, { category: p.category, label: p.name })
    }
    const f = map.get(p.category)!
    if (p.format === "tarta") f.tarta = p
    else f.cajita = p
  }
  return Array.from(map.values())
}

export function getSibling(product: Product): Product | undefined {
  const otherFormat = product.format === "tarta" ? "cajita" : "tarta"
  return products.find(
    (p) => p.category === product.category && p.format === otherFormat
  )
}

export function getCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.category)))
}

export function parseProductList(value?: string) {
  return (
    value
      ?.split(",")
      .map((entry) => entry.trim())
      .filter(Boolean) ?? []
  )
}

export function getFlavorFacts(category: string) {
  const flavorProducts = getProductsByCategory(category)
  if (!flavorProducts.length) return null

  return {
    category,
    label: flavorProducts[0].name,
    allergens: Array.from(
      new Set(flavorProducts.flatMap((product) => parseProductList(product.allergens)))
    ),
    ingredients: Array.from(
      new Set(flavorProducts.flatMap((product) => product.ingredients ?? []))
    ),
    sourceProduct:
      flavorProducts.find(
        (product) =>
          parseProductList(product.allergens).length || (product.ingredients?.length ?? 0) > 0
      ) ?? flavorProducts[0],
  }
}
