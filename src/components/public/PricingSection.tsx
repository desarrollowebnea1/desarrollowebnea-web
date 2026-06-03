"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import type { PublicPlan } from "./types";

type PricingSectionProps = {
  plans?: PublicPlan[];
  pricingNote?: string | null;
};

export function PricingSection({ plans = [], pricingNote }: PricingSectionProps) {
  return (
    <section id="precios" className="section-padding relative bg-tech-deep/30">
      <div className="section-container">
        <SectionHeading
          eyebrow="Precios"
          title="Planes claros, sin letra chica"
          subtitle={
            pricingNote ??
            "Precios orientativos desde. Cada proyecto se cotiza según alcance real."
          }
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={cn(
                "glass-card relative flex flex-col p-6 sm:p-8",
                plan.featured &&
                  "border-electric/40 shadow-glow ring-1 ring-electric/30"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-electric px-3 py-0.5 text-xs font-semibold text-white">
                  Más elegido
                </span>
              )}
              <h3 className="font-heading text-xl font-bold text-slate-light">
                {plan.name}
              </h3>
              <p className="mt-2 font-heading text-3xl font-bold text-gradient">
                Desde {formatCurrency(plan.priceFrom)}
              </p>
              <p className="mt-3 text-sm text-slate-muted">{plan.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-slate-muted"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="#presupuesto"
                className={cn(
                  "mt-8 w-full justify-center",
                  plan.featured ? "btn-primary" : "btn-secondary"
                )}
              >
                Pedir este plan
              </Link>
            </motion.article>
          ))}
        </div>

        {plans.length === 0 && (
          <p className="text-center text-slate-muted">
            Contactanos para recibir una cotización personalizada.
          </p>
        )}
      </div>
    </section>
  );
}
