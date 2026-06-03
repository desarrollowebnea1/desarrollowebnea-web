"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { parseJsonArray } from "./types";

const DEFAULT_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "PostgreSQL",
  "Prisma",
  "Vercel",
  "WhatsApp API",
];

type TechSectionProps = {
  techStack?: unknown;
  techText?: string | null;
};

export function TechSection({ techStack, techText }: TechSectionProps) {
  const parsed = parseJsonArray<string>(techStack);
  const stack =
    parsed.length > 0
      ? parsed.map((item) =>
          typeof item === "string" ? item : String(item)
        )
      : DEFAULT_STACK;

  return (
    <section className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Tecnología"
          title="Stack moderno y confiable"
          subtitle={
            techText ??
            "Usamos tecnologías actuales para webs rápidas, seguras y fáciles de mantener."
          }
        />

        <div className="flex flex-wrap justify-center gap-3">
          {stack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -3 }}
              className="glass-card px-4 py-2 font-heading text-sm font-medium text-slate-light"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
