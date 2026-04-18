"use client"

import { MessageCircle, RotateCcw, Send, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { splitMessageLinks } from "@/src/components/chat-message-links"
import { BRAND_NAME } from "@/src/data/business"
import { WELCOME_MESSAGE } from "@/lib/chatbot/welcome"

type ChatMessage = { role: "user" | "assistant"; text: string }

const QUICK_ACTIONS = [
  "¿Qué formatos hay?",
  "Enséñame sabores",
  "Quiero hacer una reserva",
  "¿Cuál es el horario?",
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
  const messagesContainerRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const shouldAutoScrollRef = useRef(true)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages())

  function isNearBottom() {
    const container = messagesContainerRef.current
    if (!container) return true

    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight
    return distanceFromBottom <= 72
  }

  function scrollToBottom(behavior: ScrollBehavior = "smooth") {
    bottomRef.current?.scrollIntoView({ behavior, block: "end" })
  }

  useEffect(() => {
    return () => {
      pendingRequestRef.current?.abort()
      pendingRequestRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    if (!shouldAutoScrollRef.current && !loading) return

    const frame = window.requestAnimationFrame(() => {
      scrollToBottom(messages.length <= 1 && !loading ? "auto" : "smooth")
    })

    return () => window.cancelAnimationFrame(frame)
  }, [isOpen, loading, messages])

  function resetChat() {
    pendingRequestRef.current?.abort()
    pendingRequestRef.current = null
    externalIdRef.current = createWebExternalId()
    shouldAutoScrollRef.current = true
    setLoading(false)
    setInput("")
    setMessages(getInitialMessages())
  }

  async function sendMessage(text: string) {
    if (loading || !text.trim()) return

    shouldAutoScrollRef.current = true
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

      const data = (await response.json()) as { ok?: boolean; reply?: string; error?: string; external_id?: string }

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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen ? (
        <div className="mb-2 flex h-[600px] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/95 backdrop-blur shadow-2xl">
          <div className="border-b border-border/40 bg-primary px-6 py-4 text-primary-foreground">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary-foreground/80">Asesor</p>
                <p className="mt-2 font-display text-2xl leading-tight">{BRAND_NAME}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={resetChat}
                  className="inline-flex items-center gap-1 rounded-lg border border-primary-foreground/20 px-2.5 py-1.5 text-xs text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors"
                  title="Reiniciar chat"
                >
                  <RotateCcw size={14} />
                </button>
                <button type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar chat" className="p-1">
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 space-y-3 overflow-y-auto bg-background/50 p-4"
            onScroll={() => {
              shouldAutoScrollRef.current = isNearBottom()
            }}
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[82%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "border border-border/60 bg-card text-foreground"
                } whitespace-pre-line`}
              >
                {renderMessageText(message.text)}
              </div>
            ))}
            {loading ? <p className="text-xs text-muted-foreground italic">Escribiendo...</p> : null}
            <div ref={bottomRef} aria-hidden="true" />
          </div>

          <div className="border-t border-border/40 bg-card/70 backdrop-blur-sm p-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  className="rounded-lg border border-border/60 bg-card px-3 py-1.5 text-xs text-foreground transition-all hover:bg-muted/40 text-center"
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
                className="h-10 flex-1 rounded-lg border border-border/60 bg-muted/30 px-4 text-sm outline-none placeholder-muted-foreground focus:border-border transition-colors"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Tu consulta..."
                disabled={loading}
              />
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:shadow-md transition-all disabled:opacity-50"
                disabled={loading}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <button
        onClick={() => {
          shouldAutoScrollRef.current = true
          setIsOpen((prev) => !prev)
        }}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
        aria-label="Abrir chat"
      >
        <MessageCircle size={18} />
        <span className="hidden sm:inline">Asesor</span>
      </button>
    </div>
  )
}
