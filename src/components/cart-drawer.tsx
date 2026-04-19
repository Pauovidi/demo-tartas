"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

import { useCart } from "@/src/context/cart-context"

export function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, subtotal } = useCart()
  const pathname = usePathname()

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

  useEffect(() => {
    if (pathname === "/checkout") closeCart()
  }, [pathname, closeCart])

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 bg-foreground/30 z-50"
          onClick={closeCart}
          aria-hidden="true"
        />
      ) : null}

      <div
        className={`fixed top-0 bottom-0 right-0 flex w-full md:w-[500px] p-modal-sides z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col bg-muted p-3 md:p-4 rounded w-full">
          <div className="pl-2 flex items-baseline justify-between mb-10">
            <p className="text-2xl font-semibold uppercase">Carrito</p>
            <button
              type="button"
              className="text-sm font-medium uppercase"
              aria-label="Cerrar carrito"
              onClick={closeCart}
            >
              Cerrar
            </button>
          </div>

          {!items.length ? (
            <Link
              href="/productos"
              className="bg-background rounded-lg p-2 border border-dashed border-border w-full"
              onClick={closeCart}
            >
              <div className="flex flex-row gap-6">
                <div className="relative size-20 overflow-hidden rounded-sm shrink-0 border border-dashed border-border flex items-center justify-center">
                  <span className="text-3xl text-muted-foreground">+</span>
                </div>
                <div className="flex flex-col gap-2 2xl:gap-3 flex-1 justify-center">
                  <span className="text-lg 2xl:text-xl font-semibold">Carrito vacío</span>
                  <p className="text-sm text-muted-foreground hover:underline">
                    Explora nuestras tartas
                  </p>
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex h-full flex-col justify-between overflow-hidden">
              <div className="flex justify-between text-sm text-muted-foreground px-2">
                <span>Productos</span>
                <span>{items.length} artículos</span>
              </div>

              <div className="grow overflow-auto py-4 space-y-3">
                {items
                  .slice()
                  .sort((a, b) => a.product.name.localeCompare(b.product.name))
                  .map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-background rounded-lg p-2 border border-border"
                    >
                      <div className="flex flex-row gap-4">
                        <div className="relative size-20 overflow-hidden rounded-sm shrink-0 border border-border">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-2 flex-1 justify-center">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-lg font-semibold uppercase">{item.product.name}</p>
                              <p className="text-sm text-muted-foreground">{item.product.priceText}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.product.id)}
                              className="text-sm text-muted-foreground hover:text-foreground"
                            >
                              Eliminar
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full border border-border p-1">
                              <button
                                type="button"
                                className="size-8"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <span className="min-w-8 text-center text-sm font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                className="size-8"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                            <p className="text-base font-semibold">
                              {(item.product.priceValue * item.quantity).toFixed(2)} €
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="py-4 text-sm text-neutral-500">
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                  <p>Total</p>
                  <p className="text-right text-base text-black">{subtotal.toFixed(2)} €</p>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full relative flex items-center justify-between gap-3 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                Realizar Pedido
                <span>→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
