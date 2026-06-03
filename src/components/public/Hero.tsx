"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FloatingOrbs } from "./FloatingOrbs";
import { ProjectMockup } from "./ProjectMockup";
import type { PublicProject } from "./types";

const HERO_PREVIEWS = [
  { name: "Parry Burger", rubro: "Gastronomía", accent: "green" as const },
  { name: "Clínica del Niño", rubro: "Salud", accent: "sky" as const },
  { name: "Mueblería Premium", rubro: "Retail", accent: "violet" as const },
];

type HeroProps = {
  title?: string | null;
  subtitle?: string | null;
  slogan?: string | null;
  projects?: PublicProject[];
};

export function Hero({ title, subtitle, slogan, projects = [] }: HeroProps) {
  const previews =
    projects.length >= 3
      ? projects.slice(0, 3).map((p, i) => ({
          name: p.name,
          rubro: p.rubro,
          accent: (["green", "sky", "violet"] as const)[i % 3],
        }))
      : HERO_PREVIEWS;

  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden pt-24 lg:pt-28"
    >
      <FloatingOrbs variant="hero" />
      <div className="absolute inset-0 bg-mesh-glow" />
      <div className="absolute inset-0 bg-grid-premium opacity-30" />

      <div className="section-container relative pb-20 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {slogan && (
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="badge-pill mb-6"
              >
                <Sparkles className="h-3.5 w-3.5 text-sky" />
                {slogan}
              </motion.span>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl text-balance"
            >
              <span className="text-slate-light">
                {title ?? "Tu negocio merece una web"}
              </span>{" "}
              <span className="text-gradient">premium</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-muted sm:text-lg"
            >
              {subtitle ??
                "Diseñamos y desarrollamos sitios web profesionales, tiendas online y sistemas a medida para negocios del NEA que quieren crecer."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href="#presupuesto" className="btn-primary">
                Pedir presupuesto
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#trabajos" className="btn-secondary">
                Ver trabajos
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {[
                { icon: Zap, label: "Entrega ágil" },
                { icon: Shield, label: "Soporte real" },
                { icon: TrendingUp, label: "Enfocado en conversión" },
                { icon: Star, label: "Diseño premium" },
              ].map((badge) => (
                <span key={badge.label} className="badge-pill">
                  <badge.icon className="h-3.5 w-3.5 text-electric" />
                  {badge.label}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="relative perspective-1000"
          >
            <div className="relative preserve-3d mockup-tilt">
              <div className="glass-card overflow-hidden p-2 shadow-glow">
                <div className="relative rounded-xl bg-tech-deep p-4">
                  <div className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-whatsapp/70" />
                    </div>
                    <div className="flex-1 rounded-md bg-tech-black/60 px-3 py-1 text-xs text-slate-muted">
                      desarrollowebnea.com
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {previews.map((preview, i) => (
                      <motion.div
                        key={preview.name}
                        className={cn(
                          i === 1 && "sm:-mt-4",
                          i === 2 && "sm:mt-2"
                        )}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 4 + i,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ProjectMockup
                          name={preview.name}
                          rubro={preview.rubro}
                          accent={preview.accent}
                          compact
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -left-4 top-8 glass-card px-4 py-3 shadow-glass sm:-left-8"
              >
                <p className="text-xs text-slate-muted">Proyectos entregados</p>
                <p className="font-heading text-xl font-bold text-sky">+50</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                className="absolute -right-2 bottom-12 glass-card px-4 py-3 sm:-right-6"
              >
                <p className="text-xs text-slate-muted">Satisfacción</p>
                <p className="font-heading text-xl font-bold text-whatsapp">
                  100%
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
