"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Minus, Plus, Trash2 } from "lucide-react"

import { getCustomerFacingFormatLabel } from "@/src/data/business"
import { useCart } from "@/src/context/cart-context"

export function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, subtotal } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
          onClick={closeCart}
          aria-hidden
        />
      ) : null}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card/95 backdrop-blur shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Pedido"
        aria-modal={isOpen}
      >
        <div className="flex items-center justify-between border-b border-border/40 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Pedido</p>
            <h2 className="mt-2 font-display text-2xl leading-tight text-foreground">
              Tu selección
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card text-foreground hover:bg-muted/40 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <p className="font-display text-3xl text-foreground">Aún vacío.</p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                Añade piezas desde la colección para ver aquí el resumen de tu pedido.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="editorial-panel border p-4"
                >
                  <div className="flex gap-3">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted/40">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="font-semibold text-foreground text-sm leading-tight">{item.product.name}</p>
                        <span className="mt-1.5 inline-flex rounded-md bg-muted/60 px-2 py-1 text-xs font-medium text-muted-foreground">
                          {getCustomerFacingFormatLabel(item.product.format)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-lg border border-border/60 bg-muted/30">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            aria-label="Reducir cantidad"
                            className="flex h-7 w-7 items-center justify-center text-foreground hover:bg-muted transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            aria-label="Aumentar cantidad"
                            className="flex h-7 w-7 items-center justify-center text-foreground hover:bg-muted transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          aria-label={`Eliminar ${item.product.name}`}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <div className="border-t border-border/40 px-6 py-5 bg-card/60 backdrop-blur-sm">
            <div className="mb-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-sm font-medium text-foreground">{subtotal.toFixed(2)} €</span>
              </div>
              <p className="text-xs text-muted-foreground/70">Recogida concertada, sin gastos de envío.</p>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md hover:scale-105"
            >
              Ir al checkout
            </Link>
          </div>
        ) : null}
      </aside>
    </>
  )
}
