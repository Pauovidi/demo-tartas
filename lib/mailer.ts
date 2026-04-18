import nodemailer from "nodemailer"

type OrderMailItem = {
  type: "cake" | "box"
  flavor: string
  qty: number
}

type SendOrderConfirmationInput = {
  to: string
  orderId: string
  deliveryDate: string
  items: OrderMailItem[]
  name?: string
  phone?: string
}

function createTransporter() {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM
  const port = Number(process.env.SMTP_PORT ?? "465")
  const secure = process.env.SMTP_SECURE === "true"

  if (!host || !user || !pass || !from) {
    throw new Error("Faltan variables SMTP para enviar confirmaciones")
  }

  return {
    transporter: nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    }),
    from,
  }
}

export async function sendOrderConfirmation(input: SendOrderConfirmationInput) {
  const { transporter, from } = createTransporter()

  const itemsText = input.items
    .map((item) => `- ${item.type === "cake" ? "Mesa" : "Petit"} · ${item.flavor} · x${item.qty}`)
    .join("\n")

  const text = [
    "Gracias por tu reserva demo en Casa Bruna.",
    "",
    `Pedido: ${input.orderId}`,
    `Fecha programada: ${input.deliveryDate}`,
    `Nombre: ${input.name || "No indicado"}`,
    `Teléfono: ${input.phone || "No indicado"}`,
    "",
    "Piezas:",
    itemsText,
  ].join("\n")

  const html = `
    <h2>Confirmación de pedido demo – Casa Bruna</h2>
    <p><strong>Pedido:</strong> ${input.orderId}</p>
    <p><strong>Fecha programada:</strong> ${input.deliveryDate}</p>
    <p><strong>Nombre:</strong> ${input.name || "No indicado"}</p>
    <p><strong>Teléfono:</strong> ${input.phone || "No indicado"}</p>
    <p><strong>Piezas:</strong></p>
    <ul>
      ${input.items
        .map(
          (item) =>
            `<li>${item.type === "cake" ? "Mesa" : "Petit"} · ${item.flavor} · x${item.qty}</li>`
        )
        .join("")}
    </ul>
  `

  await transporter.sendMail({
    from,
    to: input.to,
    subject: "Confirmación de pedido demo – Casa Bruna",
    text,
    html,
  })
}
