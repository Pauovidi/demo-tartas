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
          className="fixed inset-0 z-50 bg-[#2e241f]/30 backdrop-blur-sm"
          onClick={closeCart}
          aria-hidden
        />
      ) : null}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col bg-[#fff8f2] shadow-[0_30px_90px_-28px_rgba(46,36,31,0.55)] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Pedido"
        aria-modal={isOpen}
      >
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Pedido demo</p>
            <h2 className="mt-2 font-display text-3xl leading-none text-foreground">
              Selección actual
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 bg-white text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-4xl text-foreground">Aún no hay piezas.</p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                Añade una selección desde catálogo o ficha para ver aquí el resumen de compra.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="rounded-[1.6rem] border border-foreground/10 bg-white/85 p-4"
                >
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-[1.3rem] bg-secondary">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold text-foreground">{item.product.name}</p>
                          <span className="mt-2 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                            {getCustomerFacingFormatLabel(item.product.format)}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          aria-label={`Eliminar ${item.product.name}`}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-foreground/10 bg-white p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            aria-label="Reducir cantidad"
                            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[2rem] text-center text-sm font-semibold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            aria-label="Aumentar cantidad"
                            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          {(item.product.priceValue * item.quantity).toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <div className="border-t border-foreground/10 px-6 py-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">Total</span>
              <span className="text-xl font-semibold text-foreground">{subtotal.toFixed(2)} €</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Pasar al checkout demo
            </Link>
          </div>
        ) : null}
      </aside>
    </>
  )
}
