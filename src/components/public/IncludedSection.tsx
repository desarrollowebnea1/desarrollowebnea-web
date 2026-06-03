"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Smartphone,
  Gauge,
  Shield,
  MessageCircle,
  Palette,
  Code2,
  Rocket,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { parseJsonArray } from "./types";

const DEFAULT_FEATURES = [
  { title: "Diseño responsive premium", icon: "Smartphone" },
  { title: "Optimización SEO básica", icon: "Search" },
  { title: "Velocidad y rendimiento", icon: "Gauge" },
  { title: "Seguridad y buenas prácticas", icon: "Shield" },
  { title: "Integración WhatsApp", icon: "MessageCircle" },
  { title: "Identidad visual coherente", icon: "Palette" },
  { title: "Código limpio y escalable", icon: "Code2" },
  { title: "Capacitación de uso", icon: "Rocket" },
];

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Smartphone,
  Search,
  Gauge,
  Shield,
  MessageCircle,
  Palette,
  Code2,
  Rocket,
};

type IncludedItem = { title: string; description?: string | null; icon?: string };

function normalizeIncludedItem(item: unknown): IncludedItem {
  if (typeof item === "string") {
    return { title: item, description: null };
  }
  if (item && typeof item === "object") {
    const obj = item as Record<string, unknown>;
    return {
      title: String(obj.title ?? ""),
      description:
        typeof obj.description === "string" ? obj.description : null,
      icon: typeof obj.icon === "string" ? obj.icon : undefined,
    };
  }
  return { title: String(item ?? ""), description: null };
}

type IncludedSectionProps = {
  features?: unknown;
};

export function IncludedSection({ features }: IncludedSectionProps) {
  const parsed = parseJsonArray<unknown>(features);
  const list: IncludedItem[] =
    parsed.length > 0
      ? parsed.map(normalizeIncludedItem).filter((item) => item.title)
      : DEFAULT_FEATURES.map((f) =>
          normalizeIncludedItem({ title: f.title, icon: f.icon })
        );

  return (
    <section className="section-padding relative bg-tech-deep/30">
      <div className="section-container">
        <SectionHeading
          eyebrow="Qué incluye"
          title="Todo lo que trae una web profesional con nosotros"
          subtitle="No solo entregamos páginas bonitas: entregamos herramientas listas para vender y crecer."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((normalizedItem, i) => {
            const Icon = iconMap[normalizedItem.icon ?? ""] ?? Rocket;
            return (
              <motion.div
                key={`${normalizedItem.title}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className="glass-card p-5"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-violet-accent/15 text-violet-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-slate-light">
                  {normalizedItem.title}
                </h3>
                {normalizedItem.description && (
                  <p className="mt-2 text-xs text-slate-muted">
                    {normalizedItem.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
