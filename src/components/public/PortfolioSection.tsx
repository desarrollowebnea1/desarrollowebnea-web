"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { ProjectMockup } from "./ProjectMockup";
import { FloatingOrbs } from "./FloatingOrbs";
import type { PublicProject } from "./types";

const accentCycle = ["blue", "sky", "green", "violet"] as const;

type PortfolioSectionProps = {
  projects?: PublicProject[];
};

export function PortfolioSection({ projects = [] }: PortfolioSectionProps) {
  return (
    <section id="trabajos" className="section-padding relative bg-tech-deep/30">
      <FloatingOrbs />
      <div className="section-container relative">
        <SectionHeading
          eyebrow="Portfolio"
          title="Trabajos que hablan por nosotros"
          subtitle="Proyectos reales para negocios del NEA: gastronomía, salud, retail y más."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const accent = accentCycle[i % accentCycle.length];
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="glass-card overflow-hidden group"
              >
                <div className="relative">
                  {project.imageUrl ? (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : (
                    <ProjectMockup
                      name={project.name}
                      rubro={project.rubro}
                      accent={accent}
                      className="rounded-none border-0"
                    />
                  )}
                  {project.featured && (
                    <span className="absolute right-3 top-3 badge-pill bg-electric/20 text-sky">
                      Destacado
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-sky">
                    {project.rubro}
                  </span>
                  <h3 className="mt-1 font-heading text-lg font-semibold text-slate-light">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-muted line-clamp-2">
                    {project.shortDesc}
                  </p>
                  {project.technologies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.webUrl && (
                    <a
                      href={project.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm text-electric hover:text-sky"
                    >
                      Ver sitio
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-slate-muted">
            Estamos preparando nuestro portfolio.
          </p>
        )}

        <div className="mt-10 text-center">
          <Link href="#presupuesto" className="btn-primary">
            Quiero un proyecto así
          </Link>
        </div>
      </div>
    </section>
  );
}
