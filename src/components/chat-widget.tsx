"use client"

import { ArrowUpRight, MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react"
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
    <div className="fixed bottom-5 right-5 z-50 md:bottom-6 md:right-6">
      {isOpen ? (
        <div className="mb-3 flex h-[600px] w-[368px] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,#fff9f4_0%,#f5e7da_100%)] shadow-[0_30px_90px_-28px_rgba(46,36,31,0.48)]">
          <div className="border-b border-white/12 bg-[linear-gradient(135deg,#2e241f_0%,#6b5144_100%)] px-5 py-4 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/72">
                  <Sparkles className="h-3 w-3" />
                  Atelier chat
                </div>
                <p className="mt-2 font-display text-3xl leading-none">{BRAND_NAME}</p>
                <p className="mt-3 max-w-[15rem] text-sm leading-6 text-white/72">
                  Asesoría cálida y rápida para formatos, sabores y reservas demo.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetChat}
                  className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-xs text-white/82 hover:bg-white/10"
                >
                  <RotateCcw size={12} />
                  Reiniciar
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar chat"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/6"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 space-y-3 overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_38%),linear-gradient(180deg,#fffaf6_0%,#f3e6d8_100%)] p-4"
            onScroll={() => {
              shouldAutoScrollRef.current = isNearBottom()
            }}
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] rounded-[1.4rem] px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "ml-auto bg-[linear-gradient(135deg,#2e241f,#534038)] text-background shadow-[0_22px_38px_-26px_rgba(46,36,31,0.9)]"
                    : "border border-foreground/8 bg-white/90 text-foreground shadow-[0_20px_38px_-30px_rgba(46,36,31,0.65)]"
                } whitespace-pre-line`}
              >
                {renderMessageText(message.text)}
              </div>
            ))}
            {loading ? (
              <p className="rounded-full border border-foreground/10 bg-white/70 px-3 py-1 text-xs text-muted-foreground">
                Escribiendo...
              </p>
            ) : null}
            <div ref={bottomRef} aria-hidden="true" />
          </div>

          <div className="border-t border-foreground/10 bg-white/58 p-4 backdrop-blur-sm">
            <div className="mb-3 flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  className="rounded-full border border-foreground/10 bg-white/90 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
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
                className="h-11 flex-1 rounded-full border border-foreground/10 bg-white/95 px-4 text-sm outline-none"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Escribe tu consulta"
                disabled={loading}
              />
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2e241f,#5d473d)] text-primary-foreground shadow-[0_18px_30px_-22px_rgba(46,36,31,0.9)]"
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
        className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-[linear-gradient(135deg,#2e241f,#5d473d)] px-5 py-3 text-sm font-semibold text-background shadow-[0_22px_40px_-24px_rgba(46,36,31,0.92)]"
        aria-label="Abrir chat"
      >
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <MessageCircle size={18} />
        </div>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/60">Chat en vivo</span>
          <span>Asesor atelier</span>
        </div>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </div>
  )
}
