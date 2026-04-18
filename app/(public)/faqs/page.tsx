import type { Metadata } from "next"

import { faqs } from "@/src/data/faqs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Preguntas frecuentes sobre Casa Bruna: sabores, formatos, reservas y envios.",
}

export default function FaqPage() {
  return (
    <section className="pb-20 pt-12 md:pb-28 md:pt-16">
      <div className="page-shell">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Preguntas y respuestas
            </p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-foreground">
              Dudas frecuentes.
            </h1>
            <p className="text-base text-foreground/75 leading-relaxed">
              Todo lo que necesitas saber sobre sabores, formatos, reservas y entregas en Casa Bruna.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={faq.question} 
                value={`faq-${index}`}
                className="editorial-panel border px-6 py-4 md:px-7 md:py-5"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:text-primary transition-colors py-0">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-foreground/75 pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
