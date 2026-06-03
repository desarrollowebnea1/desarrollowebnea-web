"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { FloatingOrbs } from "./FloatingOrbs";
import { getServiceIcon } from "./icon-map";
import type { PublicService } from "./types";

type ServicesSectionProps = {
  services?: PublicService[];
};

export function ServicesSection({ services = [] }: ServicesSectionProps) {
  return (
    <section id="servicios" className="section-padding relative">
      <FloatingOrbs />
      <div className="section-container relative">
        <SectionHeading
          eyebrow="Servicios"
          title="Soluciones digitales para hacer crecer tu negocio"
          subtitle="Desde landing pages hasta e-commerce y sistemas a medida, con diseño premium y enfoque en resultados."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card group flex flex-col p-6 transition-shadow hover:shadow-glow"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric/15 text-sky">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-slate-light">
                  {service.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-muted">
                  {service.description}
                </p>
                {service.idealFor && (
                  <p className="mt-3 text-xs text-sky/90">
                    Ideal para: {service.idealFor}
                  </p>
                )}
                {service.priceFrom && (
                  <p className="mt-4 font-heading text-sm font-semibold text-slate-light">
                    Desde {formatCurrency(service.priceFrom)}
                  </p>
                )}
                <Link
                  href="#presupuesto"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-electric transition-colors group-hover:text-sky"
                >
                  Consultar
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>

        {services.length === 0 && (
          <p className="text-center text-slate-muted">
            Próximamente publicaremos nuestros servicios.
          </p>
        )}
      </div>
    </section>
  );
}
