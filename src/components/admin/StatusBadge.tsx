"use client";

import { BUDGET_STATUS_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  variant: "active" | "inactive" | "budget" | "featured" | "default";
  value?: string;
  label?: string;
};

const budgetColors: Record<string, string> = {
  NUEVA: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  CONTACTADA: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  EN_ANALISIS: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  PRESUPUESTADA: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  CERRADA: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  CANCELADA: "bg-red-500/20 text-red-300 border-red-500/30",
};

export function StatusBadge({ variant, value, label }: StatusBadgeProps) {
  if (variant === "active") {
    return (
      <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
        Activo
      </span>
    );
  }

  if (variant === "inactive") {
    return (
      <span className="inline-flex rounded-full border border-slate-500/40 bg-slate-500/15 px-2.5 py-0.5 text-xs font-medium text-slate-400">
        Inactivo
      </span>
    );
  }

  if (variant === "featured") {
    return (
      <span className="inline-flex rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-300">
        Destacado
      </span>
    );
  }

  if (variant === "budget" && value) {
    const text = label || BUDGET_STATUS_LABELS[value] || value;
    return (
      <span
        className={cn(
          "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
          budgetColors[value] || "bg-slate-500/20 text-slate-300 border-slate-500/30"
        )}
      >
        {text}
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full border border-slate-500/40 bg-slate-500/15 px-2.5 py-0.5 text-xs font-medium text-slate-300">
      {label || value || "—"}
    </span>
  );
}
