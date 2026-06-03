"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Award, Clock, Headphones, MapPin, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseJsonArray, type TrustBarItem } from "./types";

const DEFAULT_ITEMS: TrustBarItem[] = [
  { label: "Estudio del NEA", icon: "MapPin" },
  { label: "Soporte post-entrega", icon: "Headphones" },
  { label: "Entregas en plazo", icon: "Clock" },
  { label: "Calidad premium", icon: "Award" },
  { label: "Proyectos seguros", icon: "Shield" },
];

const iconFallback: Record<string, ComponentType<{ className?: string }>> = {
  MapPin,
  Headphones,
  Clock,
  Award,
  Shield,
};

function resolveIcon(name?: string) {
  if (!name) return Shield;
  const Lucide = LucideIcons as unknown as Record<
    string,
    ComponentType<{ className?: string }>
  >;
  return Lucide[name] ?? iconFallback[name] ?? Shield;
}

type TrustBarProps = {
  items?: unknown;
};

function normalizeTrustBarItem(item: unknown): TrustBarItem {
  if (typeof item === "string") {
    return { label: item };
  }
  if (item && typeof item === "object") {
    const obj = item as Record<string, unknown>;
    return {
      label: String(obj.label ?? ""),
      icon: typeof obj.icon === "string" ? obj.icon : undefined,
    };
  }
  return { label: String(item ?? "") };
}

export function TrustBar({ items }: TrustBarProps) {
  const parsed = parseJsonArray<unknown>(items);
  const list =
    parsed.length > 0
      ? parsed.map(normalizeTrustBarItem).filter((item) => item.label)
      : DEFAULT_ITEMS;

  return (
    <section className="relative border-y border-white/5 bg-tech-deep/40 py-6">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:justify-between">
          {list.map((item, i) => {
            const Icon = resolveIcon(item.icon);
            return (
              <motion.div
                key={`${item.label}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "flex items-center gap-2 text-sm text-slate-muted",
                  "min-w-[140px] justify-center sm:justify-start"
                )}
              >
                <Icon className="h-4 w-4 shrink-0 text-sky" />
                <span>{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
