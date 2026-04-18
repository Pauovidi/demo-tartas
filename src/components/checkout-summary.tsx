"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { earliestPickupDateISO, formatDateEs } from "@/lib/chatbot/date-rules"
import { getOrderPickupDateErrorMessage, validateOrderPickupDate } from "@/lib/pickup-date-validation"
import {
  BRAND_NAME,
  CLOSED_PICKUP_DAYS_COPY,
  getCustomerFacingFormatLabel,
  PICKUP_ONLY_COPY,
} from "@/src/data/business"
import { useCart } from "@/src/context/cart-context"

const checkoutSchema = z.object({
  customer_name: z.string().min(1, "El nombre es obligatorio"),
  phone: z.string().min(6, "Teléfono inválido"),
  delivery_date: z
    .string()
    .min(1, "La fecha de recogida es obligatoria")
    .date("Fecha de recogida inválida"),
})

type CheckoutSummaryProps = {
  leadDays: number
  shopTimeZone: string
}

export function CheckoutSummary({ leadDays, shopTimeZone }: CheckoutSummaryProps) {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [deliveryDateError, setDeliveryDateError] = useState<string | null>(null)

  const payloadItems = useMemo(
    () =>
      items.map((item) => ({
        type: item.product.format === "tarta" ? "cake" : "box",
        flavor: item.product.name,
        qty: item.quantity,
      })),
    [items]
  )
  const earliestPickupDate = useMemo(
    () => earliestPickupDateISO(new Date(), leadDays, shopTimeZone),
    [leadDays, shopTimeZone]
  )
  const pickupDateHelpText = `Reserva con mínimo ${leadDays} días de antelación y ten en cuenta que ${CLOSED_PICKUP_DAYS_COPY}. Primera fecha disponible: ${formatDateEs(earliestPickupDate, shopTimeZone)}.`

  if (items.length === 0) {
    return (
      <section className="pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="page-shell">
          <div className="editorial-panel flex flex-col items-center gap-6 py-16 text-center px-6 md:px-8">
            <p className="font-display text-3xl md:text-4xl text-foreground">Sin piezas en el pedido.</p>
            <p className="max-w-lg text-sm leading-7 text-muted-foreground">
              Añade una selección desde la colección para probar el flujo completo de checkout demo.
            </p>
            <Link
              href="/productos"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md hover:scale-105"
            >
              Ir a la colección
            </Link>
          </div>
        </div>
      </section>
    )
  }

  function validateDeliveryDate(value: string) {
    const validation = validateOrderPickupDate(value || undefined, new Date(), leadDays, shopTimeZone)

    if (validation.kind === "valid") {
      setDeliveryDateError(null)
      return validation
    }

    const message = getOrderPickupDateErrorMessage(validation, leadDays, shopTimeZone)
    setDeliveryDateError(message)
    return { ...validation, message }
  }

  function handleDeliveryDateChange(nextValue: string) {
    if (!nextValue) {
      setDeliveryDate("")
      setDeliveryDateError("La fecha de recogida es obligatoria.")
      return
    }

    const validation = validateDeliveryDate(nextValue)
    if (validation.kind !== "valid") {
      setDeliveryDate("")
      toast.error(validation.message)
      return
    }

    setDeliveryDate(validation.pickupDate)
  }

  async function handleConfirmOrder() {
    const parsed = checkoutSchema.safeParse({
      customer_name: customerName.trim(),
      phone,
      delivery_date: deliveryDate,
    })

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revisa el formulario")
      return
    }

    const deliveryDateValidation = validateDeliveryDate(parsed.data.delivery_date)
    if (deliveryDateValidation.kind !== "valid") {
      toast.error(deliveryDateValidation.message)
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          delivery_date: deliveryDateValidation.pickupDate,
          items: payloadItems,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "No se pudo crear el pedido")
      }

      clearCart()
      const finalDate = data.delivery_date_final as string | undefined
      toast.success(`Pedido demo confirmado para ${finalDate}`)
      router.push("/")
      router.refresh()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error al crear pedido"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="pb-20 pt-12 md:pb-28 md:pt-16">
      <div className="page-shell grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <div className="editorial-panel p-6 md:p-8 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Completa tu reserva
              </p>
              <h1 className="mt-3 font-display text-4xl md:text-5xl leading-tight text-foreground">
                Datos de recogida
              </h1>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Proporciona tus datos de contacto y la fecha preferida de recogida. Todos los pedidos requieren confirmación previa.
            </p>
          </div>

          <div className="editorial-panel p-6 md:p-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="customer-name" className="text-sm font-semibold">Nombre *</Label>
              <Input
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Tu nombre"
                className="border-border/60 bg-muted/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-phone" className="text-sm font-semibold">Teléfono *</Label>
              <Input
                id="customer-phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="600 000 000"
                className="border-border/60 bg-muted/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery-date" className="text-sm font-semibold">Fecha de recogida *</Label>
              <Input
                id="delivery-date"
                type="date"
                required
                min={earliestPickupDate}
                value={deliveryDate}
                aria-invalid={deliveryDateError ? "true" : "false"}
                onChange={(e) => handleDeliveryDateChange(e.target.value)}
                className="border-border/60 bg-muted/30"
              />
              <p className={`text-xs leading-relaxed ${deliveryDateError ? "text-destructive" : "text-muted-foreground/80"}`}>
                {deliveryDateError ?? pickupDateHelpText}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="editorial-panel p-6 md:p-8 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Resumen
                </p>
                <h2 className="mt-2 font-display text-2xl text-foreground">Tu pedido</h2>
              </div>
              <span className="rounded-lg bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground">
                {items.length} {items.length === 1 ? "pieza" : "piezas"}
              </span>
            </div>

            <div className="space-y-3 border-t border-border/40 pt-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="editorial-panel border p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground text-sm">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {getCustomerFacingFormatLabel(item.product.format)} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-foreground whitespace-nowrap">
                      €{(item.product.priceValue * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-border/40 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl text-foreground">€{subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground/70">
                Recogida concertada. No hay gastos de envío.
              </p>
            </div>

            <button
              onClick={handleConfirmOrder}
              disabled={loading}
              className="w-full rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "Procesando..." : "Confirmar reserva"}
            </button>
          </div>

          <div className="editorial-panel border-accent/40 border-l-4 p-6 md:p-8 space-y-3 bg-accent/5">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold">Importante</p>
            <div className="space-y-2 text-xs leading-relaxed text-foreground/75">
              <p>{PICKUP_ONLY_COPY}</p>
              <p>Esta es una demostración funcional con datos ficticios.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
