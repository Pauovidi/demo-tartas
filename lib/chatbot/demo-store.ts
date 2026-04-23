type Channel = "web" | "whatsapp"
type MessageRole = "user" | "assistant" | "system"

type DemoChatUser = {
  id: string
  channel: Channel
  externalId: string
  phone?: string
}

type DemoChatMessage = {
  id: string
  role: MessageRole
  content: string
  createdAt: string
}

type DemoChatUserState = {
  summary: string | null
  botPausedUntil: string | null
  lastOpenAIResponseId: string | null
}

export type DemoOrderItem = {
  type: "cake" | "box"
  flavor: string
  qty: number
}

type DemoOrder = {
  id: string
  createdAt: string
  status: "pending" | "cancelled"
  customerName: string
  customerEmail?: string
  phone: string
  deliveryDate: string
  notes?: string
  items: DemoOrderItem[]
  reminderAt?: string
  cancelledAt?: string
}

type DemoChatStore = {
  userSeq: number
  messageSeq: number
  orderSeq: number
  usersByKey: Map<string, DemoChatUser>
  userMessages: Map<string, DemoChatMessage[]>
  userState: Map<string, DemoChatUserState>
  orders: DemoOrder[]
}

declare global {
  var __chatDemoStore__: DemoChatStore | undefined
}

function createStore(): DemoChatStore {
  return {
    userSeq: 1,
    messageSeq: 1,
    orderSeq: 1,
    usersByKey: new Map(),
    userMessages: new Map(),
    userState: new Map(),
    orders: [],
  }
}

function getStore() {
  globalThis.__chatDemoStore__ ??= createStore()
  return globalThis.__chatDemoStore__
}

function getUserKey(channel: Channel, externalId: string) {
  return `${channel}:${externalId}`
}

function getDefaultUserState(): DemoChatUserState {
  return {
    summary: null,
    botPausedUntil: null,
    lastOpenAIResponseId: null,
  }
}

function ensureUserState(userId: string) {
  const store = getStore()
  const existing = store.userState.get(userId)
  if (existing) return existing

  const next = getDefaultUserState()
  store.userState.set(userId, next)
  return next
}

function ensureUserMessages(userId: string) {
  const store = getStore()
  const existing = store.userMessages.get(userId)
  if (existing) return existing

  const next: DemoChatMessage[] = []
  store.userMessages.set(userId, next)
  return next
}

export function getOrCreateDemoChatUser(input: { channel: Channel; externalId: string; phone?: string }) {
  const store = getStore()
  const key = getUserKey(input.channel, input.externalId)
  const existing = store.usersByKey.get(key)

  if (existing) {
    if (input.phone) {
      existing.phone = input.phone
    }
    return { userId: existing.id }
  }

  const userId = `demo-chat-user-${store.userSeq++}`
  const user: DemoChatUser = {
    id: userId,
    channel: input.channel,
    externalId: input.externalId,
    phone: input.phone,
  }

  store.usersByKey.set(key, user)
  store.userMessages.set(userId, [])
  store.userState.set(userId, getDefaultUserState())

  return { userId }
}

export function loadDemoChatContext(userId: string) {
  const state = ensureUserState(userId)
  const messages = ensureUserMessages(userId)

  return {
    summary: state.summary,
    messagesLastN: messages.slice(-20).map((message) => ({
      role: message.role,
      content: message.content,
    })),
  }
}

export function saveDemoChatMessage(userId: string, role: MessageRole, content: string) {
  const store = getStore()
  const messages = ensureUserMessages(userId)

  messages.push({
    id: `demo-chat-message-${store.messageSeq++}`,
    role,
    content,
    createdAt: new Date().toISOString(),
  })
}

export function updateDemoChatSummary(userId: string, summary: string) {
  const state = ensureUserState(userId)
  state.summary = summary
}

export function getDemoChatPauseState(userId: string) {
  const state = ensureUserState(userId)
  return {
    botPausedUntil: state.botPausedUntil ? new Date(state.botPausedUntil) : null,
  }
}

export function setDemoChatPauseState(userId: string, untilIso: string) {
  const state = ensureUserState(userId)
  state.botPausedUntil = untilIso
}

export function setDemoChatLastOpenAIResponseId(userId: string, responseId: string) {
  const state = ensureUserState(userId)
  state.lastOpenAIResponseId = responseId
}

export function pruneDemoChatMessages(userId: string, keepLast = 20) {
  const messages = ensureUserMessages(userId)
  if (messages.length <= keepLast) return

  const recentMessages = messages.slice(-keepLast)
  getStore().userMessages.set(userId, recentMessages)
}

export function clearDemoConversationState(userId: string) {
  getStore().userMessages.set(userId, [])
  getStore().userState.set(userId, getDefaultUserState())
}

export function createDemoOrder(input: {
  customerName: string
  customerEmail?: string
  phone: string
  deliveryDate: string
  notes?: string
  items: DemoOrderItem[]
  reminderAt?: string
}) {
  const store = getStore()
  const orderId = `demo-order-${store.orderSeq++}`
  const order: DemoOrder = {
    id: orderId,
    createdAt: new Date().toISOString(),
    status: "pending",
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    phone: input.phone,
    deliveryDate: input.deliveryDate,
    notes: input.notes,
    items: input.items,
    reminderAt: input.reminderAt,
  }

  store.orders.push(order)
  return order
}

export function findLatestDemoOrderByPhone(phone: string) {
  const normalizedPhone = phone.replace(/\D/g, "")
  const matchingOrders = getStore()
    .orders.filter((order) => order.phone.replace(/\D/g, "").includes(normalizedPhone))
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))

  return matchingOrders[0]
}

export function cancelDemoOrder(orderId: string) {
  const order = getStore().orders.find((entry) => entry.id === orderId)
  if (!order) return null

  order.status = "cancelled"
  order.cancelledAt = new Date().toISOString()
  return order
}
