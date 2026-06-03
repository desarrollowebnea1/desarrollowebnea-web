"use client";

import { motion } from "framer-motion";
import { Globe, Layout, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectMockupProps = {
  name: string;
  rubro?: string;
  accent?: "blue" | "sky" | "green" | "violet";
  className?: string;
  compact?: boolean;
};

const accentMap = {
  blue: "from-electric/30 to-electric/5 border-electric/30",
  sky: "from-sky/30 to-sky/5 border-sky/30",
  green: "from-whatsapp/30 to-whatsapp/5 border-whatsapp/30",
  violet: "from-violet-accent/30 to-violet-accent/5 border-violet-accent/30",
};

export function ProjectMockup({
  name,
  rubro,
  accent = "blue",
  className,
  compact = false,
}: ProjectMockupProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-gradient-to-br",
        accentMap[accent],
        compact ? "aspect-[4/3]" : "aspect-[16/10]",
        className
      )}
    >
      <div className="absolute inset-0 bg-grid-premium opacity-40" />
      <div className="absolute left-3 right-3 top-3 flex items-center gap-2">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-whatsapp/80" />
        </div>
        <div className="flex-1 rounded-md bg-tech-black/40 px-2 py-0.5 text-[10px] text-slate-muted truncate">
          {name.toLowerCase().replace(/\s+/g, "")}.com
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 pt-10">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-tech-black/50 font-heading text-2xl font-bold text-slate-light shadow-glow">
          {initial}
        </div>
        <p className="font-heading text-sm font-semibold text-slate-light text-center">
          {name}
        </p>
        {rubro && (
          <p className="mt-1 text-xs text-slate-muted">{rubro}</p>
        )}
        <div className="mt-4 flex gap-2">
          <Layout className="h-3.5 w-3.5 text-sky/70" />
          <Globe className="h-3.5 w-3.5 text-electric/70" />
          <Sparkles className="h-3.5 w-3.5 text-violet-accent/70" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-tech-black/60 to-transparent" />
    </motion.div>
  );
}
