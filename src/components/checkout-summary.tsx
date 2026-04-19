"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { earliestPickupDateISO, formatDateEs } from "@/lib/chatbot/date-rules"
import { getOrderPickupDateErrorMessage, validateOrderPickupDate } from "@/lib/pickup-date-validation"
import { BRAND_NAME, CLOSED_PICKUP_DAYS_COPY } from "@/src/data/business"
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
  const [submitted, setSubmitted] = useState(false)
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

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 pt-top-spacing">
        <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-3xl text-green-600">✓</span>
        </div>
        <h1 className="text-2xl font-semibold text-center text-balance">Pedido recibido</h1>
        <p className="text-muted-foreground text-center max-w-md text-balance">
          Hemos registrado tu pedido demo y la fecha validada de recogida.
        </p>
        <div className="flex gap-3">
          <Link href="/productos" className="inline-flex rounded-md border border-border px-4 py-3 text-sm font-semibold">
            Seguir comprando
          </Link>
          <Link href="/" className="inline-flex rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 pt-top-spacing">
        <h1 className="text-2xl font-semibold">Tu carrito está vacío</h1>
        <Link href="/productos" className="inline-flex rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
          Ver tartas
        </Link>
      </div>
    )
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
      setSubmitted(true)
      router.refresh()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error al crear pedido"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-top-spacing pb-12 px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-2">Finalizar pedido</h1>
      <p className="text-muted-foreground mb-8 text-sm">
        {BRAND_NAME}. Reserva con mínimo {leadDays} días de antelación; {CLOSED_PICKUP_DAYS_COPY}.
        Primera fecha disponible: {formatDateEs(earliestPickupDate, shopTimeZone)}.
      </p>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-4 bg-card rounded-lg p-3 border border-border"
          >
            <div className="relative size-16 shrink-0 rounded overflow-hidden bg-secondary">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate uppercase">{item.product.name}</p>
              <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
            </div>
            <p className="font-semibold shrink-0">
              {(item.product.priceValue * item.quantity).toFixed(2)} €
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-8">
        <div className="space-y-2">
          <Label htmlFor="customer-name">Nombre *</Label>
          <Input
            id="customer-name"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            placeholder="Nombre para la reserva demo"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="customer-phone">Teléfono *</Label>
          <Input
            id="customer-phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="600 000 000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="delivery-date">Fecha de recogida *</Label>
          <Input
            id="delivery-date"
            type="date"
            min={earliestPickupDate}
            value={deliveryDate}
            aria-invalid={deliveryDateError ? "true" : "false"}
            onChange={(event) => {
              const value = event.target.value
              setDeliveryDate(value)
              if (value) validateDeliveryDate(value)
            }}
          />
          <p className={`text-xs ${deliveryDateError ? "text-destructive" : "text-muted-foreground"}`}>
            {deliveryDateError ?? `Reserva con mínimo ${leadDays} días de antelación.`}
          </p>
        </div>
      </div>

      <div className="border-t border-border pt-4 space-y-2 mb-8">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{subtotal.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Recogida</span>
          <span className="text-muted-foreground">Se coordina tras confirmar</span>
        </div>
        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
          <span>Total</span>
          <span>{subtotal.toFixed(2)} €</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          disabled={loading}
          className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          onClick={() => void handleConfirmOrder()}
        >
          {loading ? "Procesando..." : "Confirmar pedido"}
        </button>
        <p className="text-xs text-center text-muted-foreground">
          El pedido demo sigue usando la validación real de fecha y el endpoint `/api/orders`.
        </p>
      </div>
    </div>
  )
}
