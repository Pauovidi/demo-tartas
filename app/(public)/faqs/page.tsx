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
    <section className="pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="page-shell">
        <div className="paper-panel p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
            Dudas frecuentes
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none text-foreground md:text-6xl">
            FAQ de la demo
          </h1>

          <Accordion type="single" collapsible className="mt-8 w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-muted-foreground">
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
