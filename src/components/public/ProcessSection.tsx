"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { MessageSquare } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { parseJsonArray, type ProcessStep } from "./types";

const DEFAULT_STEPS: ProcessStep[] = [
  {
    title: "Consulta",
    description: "Nos contás tu negocio, objetivos y presupuesto aproximado.",
    icon: "MessageSquare",
  },
  {
    title: "Propuesta",
    description: "Te enviamos alcance, tiempos y presupuesto detallado.",
    icon: "PenTool",
  },
  {
    title: "Desarrollo",
    description: "Diseñamos, desarrollamos y validamos contigo en cada etapa.",
    icon: "Code",
  },
  {
    title: "Lanzamiento",
    description: "Publicamos tu web y te acompañamos en el arranque.",
    icon: "Rocket",
  },
];

function resolveStepIcon(name?: string) {
  const Lucide = LucideIcons as unknown as Record<
    string,
    ComponentType<{ className?: string }>
  >;
  return Lucide[name ?? ""] ?? MessageSquare;
}

type ProcessSectionProps = {
  steps?: unknown;
  processText?: string | null;
};

function normalizeProcessStep(item: unknown): ProcessStep {
  if (typeof item === "string") {
    return { title: item, description: "" };
  }
  if (item && typeof item === "object") {
    const obj = item as Record<string, unknown>;
    return {
      title: String(obj.title ?? ""),
      description:
        typeof obj.description === "string" ? obj.description : "",
      icon: typeof obj.icon === "string" ? obj.icon : undefined,
    };
  }
  return { title: String(item ?? ""), description: "" };
}

export function ProcessSection({ steps, processText }: ProcessSectionProps) {
  const parsed = parseJsonArray<unknown>(steps);
  const list =
    parsed.length > 0
      ? parsed.map(normalizeProcessStep).filter((step) => step.title)
      : DEFAULT_STEPS;

  return (
    <section id="proceso" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Proceso"
          title="De la idea al lanzamiento, sin sorpresas"
          subtitle={
            processText ??
            "Un flujo claro y transparente para que sepas qué esperar en cada momento."
          }
        />

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-electric via-sky to-violet-accent sm:left-1/2 sm:block sm:-translate-x-px lg:left-8" />

          <div className="space-y-8 lg:space-y-12">
            {list.map((step, i) => {
              const Icon = resolveStepIcon(step.icon);
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={`${step.title}-${i}`}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative grid gap-6 sm:grid-cols-2 sm:gap-12 ${
                    !isEven ? "sm:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div
                    className={`${isEven ? "sm:text-right" : ""} flex flex-col ${
                      isEven ? "sm:items-end" : ""
                    }`}
                  >
                    <span className="font-heading text-5xl font-bold text-white/5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-heading text-xl font-semibold text-slate-light">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-slate-muted">
                      {step.description}
                    </p>
                  </div>
                  <div className={`flex items-center ${isEven ? "" : "sm:justify-end"}`}>
                    <div className="glass-card inline-flex items-center gap-4 p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric/20 text-sky">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="hidden text-sm text-slate-muted sm:inline">
                        Paso {i + 1}
                      </span>
                    </div>
                  </div>
                  <div className="absolute left-4 top-8 hidden h-3 w-3 rounded-full border-2 border-electric bg-tech-black sm:left-1/2 sm:-translate-x-1.5 lg:left-8" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
