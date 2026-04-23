"use client"

import { RotateCcw, Send, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { splitMessageLinks } from "@/src/components/chat-message-links"
import { BRAND_NAME } from "@/src/data/business"
import { WELCOME_MESSAGE } from "@/lib/chatbot/welcome"

type ChatMessage = { role: "user" | "assistant"; text: string }

const QUICK_ACTIONS = [
  "¿Qué sabores y tamaños hay?",
  "¿Cuál es el horario?",
  "Quiero hacer un pedido",
  "Quiero hablar con una persona",
]

function getInitialMessages(): ChatMessage[] {
  return [{ role: "assistant", text: WELCOME_MESSAGE }]
}

function createWebExternalId() {
  if (typeof window === "undefined") return "server"
  return crypto.randomUUID()
}

function renderMessageText(text: string) {
  return splitMessageLinks(text).map((part, index) => {
    if (part.type === "link") {
      return (
        <a
          key={`${part.type}-${index}`}
          href={part.value}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          {part.value}
        </a>
      )
    }

    return <span key={`${part.type}-${index}`}>{part.value}</span>
  })
}

export function ChatWidget() {
  const pendingRequestRef = useRef<AbortController | null>(null)
  const externalIdRef = useRef<string>(createWebExternalId())
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages())

  useEffect(() => {
    return () => {
      pendingRequestRef.current?.abort()
      pendingRequestRef.current = null
    }
  }, [])

  function resetChat() {
    pendingRequestRef.current?.abort()
    pendingRequestRef.current = null
    externalIdRef.current = createWebExternalId()
    setLoading(false)
    setInput("")
    setMessages(getInitialMessages())
  }

  async function sendMessage(text: string) {
    if (loading || !text.trim()) return

    setMessages((prev) => [...prev, { role: "user", text }])
    setInput("")
    setLoading(true)
    const controller = new AbortController()
    pendingRequestRef.current = controller

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ external_id: externalIdRef.current, message: text }),
      })

      const data = (await response.json()) as {
        ok?: boolean
        reply?: string
        error?: string
        external_id?: string
      }

      if (!response.ok || data.ok === false) {
        throw new Error(data.error ?? "No pude responder ahora.")
      }

      if (typeof data.external_id === "string" && data.external_id) {
        externalIdRef.current = data.external_id
      }

      setMessages((prev) => [...prev, { role: "assistant", text: data.reply ?? "No pude responder ahora." }])
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return
      }

      const errorText = error instanceof Error ? error.message : "Error de red. Inténtalo de nuevo."
      setMessages((prev) => [...prev, { role: "assistant", text: errorText }])
    } finally {
      if (pendingRequestRef.current === controller) {
        pendingRequestRef.current = null
        setLoading(false)
      }
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="mb-3 flex h-[560px] w-[360px] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-xs uppercase text-muted-foreground">Atelier chat</p>
              <p className="text-lg font-semibold">{BRAND_NAME}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetChat}
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs"
              >
                <RotateCcw size={12} />
                Reiniciar
              </button>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar chat">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "ml-auto bg-foreground text-background"
                    : "border border-border bg-background text-foreground"
                } whitespace-pre-line`}
              >
                {renderMessageText(message.text)}
              </div>
            ))}
            {loading ? <p className="text-xs text-muted-foreground">Escribiendo...</p> : null}
          </div>

          <div className="border-t border-border bg-card p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
                  onClick={() => sendMessage(action)}
                  disabled={loading}
                >
                  {action}
                </button>
              ))}
            </div>

            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault()
                void sendMessage(input)
              }}
            >
              <input
                className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Escribe tu consulta"
                disabled={loading}
              />
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground"
                disabled={loading}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Abrir chat"
        className="flex items-center justify-center size-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform duration-200 hover:shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zm-1 11H5v-2h14v2zm0-3H5V8h14v2zm0-3H5V5h14v2z" />
        </svg>
      </button>
    </div>
  )
}
