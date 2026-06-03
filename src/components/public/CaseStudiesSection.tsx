"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { ProjectMockup } from "./ProjectMockup";
import type { PublicCaseStudy } from "./types";

type CaseStudiesSectionProps = {
  cases?: PublicCaseStudy[];
};

export function CaseStudiesSection({ cases = [] }: CaseStudiesSectionProps) {
  return (
    <section id="casos" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Casos de estudio"
          title="Problema, solución y resultado"
          subtitle="Así transformamos la presencia digital de negocios reales del NEA."
        />

        <div className="space-y-12">
          {cases.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="glass-card overflow-hidden"
            >
              <div
                className={`grid gap-0 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative min-h-[240px] lg:min-h-[320px]">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <ProjectMockup
                      name={item.project?.name ?? item.title}
                      rubro={item.project?.rubro ?? item.systemType ?? undefined}
                      accent={i % 2 === 0 ? "blue" : "violet"}
                      className="h-full min-h-[240px] rounded-none border-0 lg:min-h-[320px]"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  {item.systemType && (
                    <span className="badge-pill mb-3 w-fit">{item.systemType}</span>
                  )}
                  <h3 className="font-heading text-2xl font-bold text-slate-light">
                    {item.title}
                  </h3>
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-red-400/90">
                        Problema
                      </p>
                      <p className="mt-1 text-sm text-slate-muted">{item.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-sky">
                        Solución
                      </p>
                      <p className="mt-1 text-sm text-slate-muted">{item.solution}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-whatsapp">
                        Resultado
                      </p>
                      <p className="mt-1 text-sm text-slate-light">{item.result}</p>
                    </div>
                  </div>
                  {item.features.length > 0 && (
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {item.features.slice(0, 6).map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-slate-muted"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {cases.length === 0 && (
          <p className="text-center text-slate-muted">
            Próximamente publicaremos casos de estudio.
          </p>
        )}
      </div>
    </section>
  );
}
