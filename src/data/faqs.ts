import {
  buildHumanSupportMessage,
  FORMAT_SIZE_COPY,
  PICKUP_ONLY_COPY,
  STORE_HOURS_TEXT,
} from "@/src/data/business"

export interface FAQ {
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    question: "¿Cómo puedo hacer una reserva?",
    answer: `Puedes preparar tu selección desde la web demo o escribirnos directamente. ${buildHumanSupportMessage(
      "También te atendemos aquí:"
    )}`,
  },
  {
    question: "¿Qué formatos hay disponibles?",
    answer: `${FORMAT_SIZE_COPY} Petit: 450 g y 2-3 raciones. Mesa: 1,8 kg y 10-12 raciones.`,
  },
  {
    question: "¿Se envía a domicilio?",
    answer: PICKUP_ONLY_COPY,
  },
  {
    question: "¿Cuál es el horario?",
    answer: STORE_HOURS_TEXT,
  },
  {
    question: "¿Cómo debo conservar la pieza?",
    answer:
      "Mantén la pieza refrigerada entre 2 y 4 °C. Sáquela 15 minutos antes de servir para recuperar textura y aroma.",
  },
  {
    question: "¿Dónde veo los alérgenos?",
    answer:
      "Cada ficha muestra alérgenos confirmados. Si necesitas validar un caso concreto, el asistente o el contacto humano demo te remiten a la información disponible.",
  },
  {
    question: "¿Puedo encargar una selección para evento?",
    answer:
      "Sí. En esta demo el texto se ha neutralizado, pero la base técnica sigue preparada para gestionar reservas, atención y seguimiento de pedidos.",
  },
  {
    question: "¿Hay pago real en esta demo?",
    answer:
      "No. El checkout demuestra el flujo funcional, pero esta versión portfolio-safe no procesa pagos reales ni envíos.",
  },
  {
    question: "¿Qué hace el chatbot?",
    answer:
      "Te ayuda a revisar sabores, formatos, horarios y reservas. Si falta un dato confirmado, te deriva a atención humana demo sin inventar respuestas.",
  },
]
