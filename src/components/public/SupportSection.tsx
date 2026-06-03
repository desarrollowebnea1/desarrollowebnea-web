"use client";

import { motion } from "framer-motion";
import { Wrench, RefreshCw, Headphones } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { parseJsonArray, type MaintenancePlan } from "./types";

const DEFAULT_PLANS: MaintenancePlan[] = [
  {
    name: "Básico",
    price: "Consultar",
    description: "Actualizaciones menores y soporte por WhatsApp.",
    features: ["Monitoreo básico", "Correcciones menores", "Respuesta en 48hs"],
  },
  {
    name: "Profesional",
    price: "Consultar",
    description: "Ideal para negocios que actualizan contenido seguido.",
    features: [
      "Cambios de contenido",
      "Backups",
      "Soporte prioritario",
      "Mejoras mensuales",
    ],
  },
];

type SupportSectionProps = {
  maintenancePlans?: unknown;
  supportText?: string | null;
  supportNote?: string | null;
};

export function SupportSection({
  maintenancePlans,
  supportText,
  supportNote,
}: SupportSectionProps) {
  const parsed = parseJsonArray<MaintenancePlan>(maintenancePlans);
  const plans = parsed.length > 0 ? parsed : DEFAULT_PLANS;

  return (
    <section className="section-padding relative bg-tech-deep/30">
      <div className="section-container">
        <SectionHeading
          eyebrow="Soporte"
          title="No te dejamos solo después del lanzamiento"
          subtitle={
            supportText ??
            "Planes de mantenimiento y soporte para que tu web siga funcionando perfecto."
          }
        />

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card p-6 sm:p-8"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-whatsapp/15 text-whatsapp">
                {i === 0 ? (
                  <Wrench className="h-5 w-5" />
                ) : (
                  <RefreshCw className="h-5 w-5" />
                )}
              </div>
              <h3 className="font-heading text-lg font-semibold text-slate-light">
                {plan.name}
              </h3>
              {plan.price && (
                <p className="mt-1 text-sm text-sky">{plan.price}</p>
              )}
              {plan.description && (
                <p className="mt-3 text-sm text-slate-muted">{plan.description}</p>
              )}
              {plan.features && plan.features.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-slate-muted"
                    >
                      <Headphones className="h-3.5 w-3.5 text-electric" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>

        {supportNote && (
          <p className="mt-8 text-center text-sm text-slate-muted">{supportNote}</p>
        )}
      </div>
    </section>
  );
}
