"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import type { PublicFaq } from "./types";

type FAQSectionProps = {
  faqs?: PublicFaq[];
};

export function FAQSection({ faqs = [] }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(
    faqs[0]?.id ?? null
  );

  return (
    <section id="faq" className="section-padding relative">
      <div className="section-container max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Preguntas frecuentes"
          subtitle="Resolvemos las dudas más comunes antes de que nos escribas."
        />

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm font-semibold text-slate-light sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-sky transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="border-t border-white/5 px-5 pb-5 pt-0 text-sm leading-relaxed text-slate-muted">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {faqs.length === 0 && (
          <p className="text-center text-slate-muted">
            Próximamente agregaremos preguntas frecuentes.
          </p>
        )}
      </div>
    </section>
  );
}
