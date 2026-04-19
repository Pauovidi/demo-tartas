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
  DEMO_DISCLAIMER,
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
      <section className="pb-20 pt-10 md:pb-24 md:pt-14">
        <div className="page-shell">
          <div className="showcase-panel flex flex-col items-center gap-6 py-14 text-center">
            <p className="font-display text-4xl text-foreground md:text-5xl">
              No hay piezas en el pedido.
            </p>
            <p className="max-w-lg text-sm leading-7 text-muted-foreground">
              Añade primero una selección desde catálogo para probar el flujo completo de checkout.
            </p>
            <Link
              href="/productos"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Ir a colección
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
      toast.success(`Pedido demo creado para ${finalDate}. ${PICKUP_ONLY_COPY}`)
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
    <section className="pb-20 pt-8 md:pb-24 md:pt-10">
      <div className="page-shell grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
        <div className="space-y-6">
          <div className="showcase-panel p-6 md:p-8 lg:p-10">
            <p className="editorial-kicker">Checkout demo</p>
            <h1 className="mt-4 font-display text-5xl leading-none text-foreground md:text-6xl xl:text-7xl">
              Reserva tu selección
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground">
              {BRAND_NAME} utiliza aquí el mismo flujo técnico de validación, carrito y creación de
              pedido, pero con marca, datos y copy ficticios.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/75 bg-white/76 p-4">
                <p className="editorial-kicker">Paso 1</p>
                <p className="mt-3 text-sm leading-6 text-foreground">Revisa tu selección y datos.</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/75 bg-white/76 p-4">
                <p className="editorial-kicker">Paso 2</p>
                <p className="mt-3 text-sm leading-6 text-foreground">
                  Valida fecha con antelación mínima y días abiertos.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/75 bg-white/76 p-4">
                <p className="editorial-kicker">Paso 3</p>
                <p className="mt-3 text-sm leading-6 text-foreground">
                  Crea el pedido demo y limpia el carrito local.
                </p>
              </div>
            </div>
          </div>

          <div className="paper-panel p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customer-name">Nombre *</Label>
                <Input
                  id="customer-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nombre para la reserva demo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-phone">Teléfono *</Label>
                <Input
                  id="customer-phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="600 000 000"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="delivery-date">Fecha de recogida *</Label>
                <Input
                  id="delivery-date"
                  type="date"
                  required
                  min={earliestPickupDate}
                  value={deliveryDate}
                  aria-invalid={deliveryDateError ? "true" : "false"}
                  onChange={(e) => handleDeliveryDateChange(e.target.value)}
                />
                <p className={`text-xs ${deliveryDateError ? "text-destructive" : "text-muted-foreground"}`}>
                  {deliveryDateError ?? pickupDateHelpText}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="paper-panel p-6">
              <p className="editorial-kicker">Operativa</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{pickupDateHelpText}</p>
            </div>
            <div className="paper-panel p-6">
              <p className="editorial-kicker">Importante</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{PICKUP_ONLY_COPY}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <div className="showcase-panel p-6 md:p-8">
            <div className="flex items-center justify-between">
              <p className="editorial-kicker">Resumen del pedido</p>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                {items.length} líneas
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="rounded-[1.6rem] border border-white/80 bg-white/82 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-foreground">{item.product.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {getCustomerFacingFormatLabel(item.product.format)} · Cantidad: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {(item.product.priceValue * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="soft-divider mt-6 h-px w-full" />
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">Total</span>
              <span className="text-2xl font-semibold text-foreground">{subtotal.toFixed(2)} €</span>
            </div>

            <button
              onClick={handleConfirmOrder}
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creando pedido demo..." : "Confirmar pedido demo"}
            </button>
          </div>

          <div className="paper-panel p-6 md:p-8">
            <p className="editorial-kicker text-accent">Nota importante</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{PICKUP_ONLY_COPY}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{DEMO_DISCLAIMER}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
