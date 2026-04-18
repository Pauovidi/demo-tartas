export interface OrderItem {
  date: string
  flavor: string
  format: "tarta" | "cajita"
  quantity: number
}

export interface ProductionLine {
  flavor: string
  units: number
}

export interface ProductionResult {
  tartas: ProductionLine[]
  cajitas: ProductionLine[]
  totalTartas: number
  totalCajitas: number
}

const flavorEmojis: Record<string, string> = {
  "Vainilla tostada": "🤍",
  "Pistacho verde": "🟢",
  "Cacao ahumado": "🍫",
  "Limón crema": "🍋",
  "Higo y miel": "🍯",
  "Café avellana": "☕",
  "Mandarina y salvia": "🍊",
  "Frambuesa blanca": "🍓",
  "Caramelo marino": "✨",
}

export function getFlavorEmoji(flavor: string): string {
  return flavorEmojis[flavor] ?? ""
}

const mockOrders: OrderItem[] = [
  { date: "2026-02-18", flavor: "Vainilla tostada", format: "tarta", quantity: 3 },
  { date: "2026-02-18", flavor: "Pistacho verde", format: "tarta", quantity: 2 },
  { date: "2026-02-18", flavor: "Cacao ahumado", format: "cajita", quantity: 5 },
  { date: "2026-02-18", flavor: "Mandarina y salvia", format: "cajita", quantity: 4 },
  { date: "2026-02-18", flavor: "Higo y miel", format: "tarta", quantity: 1 },
  { date: "2026-02-18", flavor: "Vainilla tostada", format: "cajita", quantity: 6 },
  { date: "2026-02-19", flavor: "Vainilla tostada", format: "tarta", quantity: 2 },
  { date: "2026-02-19", flavor: "Pistacho verde", format: "tarta", quantity: 4 },
  { date: "2026-02-19", flavor: "Limón crema", format: "cajita", quantity: 3 },
  { date: "2026-02-19", flavor: "Café avellana", format: "cajita", quantity: 7 },
  { date: "2026-02-19", flavor: "Caramelo marino", format: "cajita", quantity: 2 },
  { date: "2026-02-20", flavor: "Mandarina y salvia", format: "tarta", quantity: 5 },
  { date: "2026-02-20", flavor: "Frambuesa blanca", format: "cajita", quantity: 3 },
  { date: "2026-02-20", flavor: "Higo y miel", format: "cajita", quantity: 4 },
  { date: "2026-02-20", flavor: "Caramelo marino", format: "tarta", quantity: 1 },
  { date: "2026-02-20", flavor: "Vainilla tostada", format: "cajita", quantity: 8 },
  { date: "2026-02-21", flavor: "Pistacho verde", format: "tarta", quantity: 3 },
  { date: "2026-02-21", flavor: "Café avellana", format: "tarta", quantity: 2 },
  { date: "2026-02-21", flavor: "Limón crema", format: "tarta", quantity: 1 },
  { date: "2026-02-21", flavor: "Vainilla tostada", format: "cajita", quantity: 5 },
  { date: "2026-02-21", flavor: "Caramelo marino", format: "tarta", quantity: 2 },
  { date: "2026-02-22", flavor: "Vainilla tostada", format: "tarta", quantity: 4 },
  { date: "2026-02-22", flavor: "Higo y miel", format: "tarta", quantity: 3 },
  { date: "2026-02-22", flavor: "Pistacho verde", format: "cajita", quantity: 6 },
  { date: "2026-02-22", flavor: "Mandarina y salvia", format: "cajita", quantity: 2 },
  { date: "2026-02-22", flavor: "Frambuesa blanca", format: "tarta", quantity: 1 },
]

function aggregate(items: OrderItem[]): ProductionLine[] {
  const map = new Map<string, number>()
  for (const item of items) {
    map.set(item.flavor, (map.get(item.flavor) ?? 0) + item.quantity)
  }
  return Array.from(map.entries())
    .map(([flavor, units]) => ({ flavor, units }))
    .sort((a, b) => b.units - a.units)
}

export function calculateProduction(
  from: Date,
  to: Date,
  types: { tartas: boolean; cajitas: boolean }
): ProductionResult {
  const fromStr = formatDateISO(from)
  const toStr = formatDateISO(to)

  const filtered = mockOrders.filter(
    (o) => o.date >= fromStr && o.date <= toStr
  )

  const tartaItems = types.tartas ? filtered.filter((o) => o.format === "tarta") : []
  const cajitaItems = types.cajitas ? filtered.filter((o) => o.format === "cajita") : []

  const tartas = aggregate(tartaItems)
  const cajitas = aggregate(cajitaItems)

  return {
    tartas,
    cajitas,
    totalTartas: tartas.reduce((sum, l) => sum + l.units, 0),
    totalCajitas: cajitas.reduce((sum, l) => sum + l.units, 0),
  }
}

function formatDateISO(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}
