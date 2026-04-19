import type { Metadata } from "next"

import { faqs } from "@/src/data/faqs"
import { BRAND_NAME, DEMO_DISCLAIMER, PICKUP_ONLY_COPY } from "@/src/data/business"
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
    <section className="pb-20 pt-8 md:pb-24 md:pt-10">
      <div className="page-shell grid gap-6 xl:grid-cols-[0.84fr_1.16fr]">
        <div className="showcase-panel p-6 md:p-8 lg:p-10">
          <p className="editorial-kicker">Dudas frecuentes</p>
          <h1 className="mt-4 font-display text-5xl leading-none text-foreground md:text-6xl xl:text-7xl">
            FAQ de la demo
          </h1>
          <p className="mt-5 text-sm leading-8 text-muted-foreground md:text-base">
            Estas respuestas siguen conectadas al lenguaje operativo de {BRAND_NAME}: horarios,
            formatos, reserva, conservación y handoff humano sin rastros de la marca original.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-[1.7rem] bg-[#211913] p-6 text-white">
              <p className="text-xs uppercase tracking-[0.24em] text-white/70">Operativa</p>
              <p className="mt-3 text-sm leading-7 text-white/74">{PICKUP_ONLY_COPY}</p>
            </div>
            <div className="rounded-[1.7rem] border border-white/75 bg-white/76 p-6">
              <p className="editorial-kicker">Portfolio-safe</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{DEMO_DISCLAIMER}</p>
            </div>
          </div>
        </div>

        <div className="paper-panel p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
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
