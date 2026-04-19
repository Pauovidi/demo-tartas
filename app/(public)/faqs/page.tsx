import type { Metadata } from "next"

import { faqs } from "@/src/data/faqs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "FAQ demo sobre catálogo, reservas y chatbot de Casa Bruna.",
}

export default function FaqPage() {
  return (
    <div className="pt-top-spacing p-sides pb-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">
          Preguntas Frecuentes
        </h1>
        <p className="text-muted-foreground mb-10 text-sm">
          Todo lo que necesitas saber sobre nuestra demo, reservas y recogida.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-sm font-semibold leading-relaxed">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pr-8">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
