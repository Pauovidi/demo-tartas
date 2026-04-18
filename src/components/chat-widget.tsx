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
    <div className="fixed bottom-5 right-5 z-50 md:bottom-6 md:right-6">
      {isOpen ? (
        <div className="mb-3 flex h-[600px] w-[360px] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-[#fff9f4] shadow-[0_30px_90px_-28px_rgba(46,36,31,0.48)]">
          <div className="border-b border-foreground/10 bg-[#2e241f] px-5 py-4 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/70">Atelier chat</p>
                <p className="mt-2 font-display text-3xl leading-none">{BRAND_NAME}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetChat}
                  className="inline-flex items-center gap-1 rounded-full border border-white/12 px-3 py-1.5 text-xs text-white/82 hover:bg-white/10"
                >
                  <RotateCcw size={12} />
                  Reiniciar
                </button>
                <button type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar chat">
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 space-y-3 overflow-y-auto bg-[linear-gradient(180deg,#fffaf6_0%,#f8efe6_100%)] p-4"
            onScroll={() => {
              shouldAutoScrollRef.current = isNearBottom()
            }}
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] rounded-[1.4rem] px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "ml-auto bg-foreground text-background"
                    : "border border-foreground/8 bg-white text-foreground"
                } whitespace-pre-line`}
              >
                {renderMessageText(message.text)}
              </div>
            ))}
            {loading ? <p className="text-xs text-muted-foreground">Escribiendo...</p> : null}
            <div ref={bottomRef} aria-hidden="true" />
          </div>

          <div className="border-t border-foreground/10 bg-white/75 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  className="rounded-full border border-foreground/10 bg-white px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
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
                className="h-11 flex-1 rounded-full border border-foreground/10 bg-white px-4 text-sm outline-none"
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
        onClick={() => {
          shouldAutoScrollRef.current = true
          setIsOpen((prev) => !prev)
        }}
        className="inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-lg"
        aria-label="Abrir chat"
      >
        <MessageCircle size={18} />
        Asesor atelier
      </button>
    </div>
  )
}
