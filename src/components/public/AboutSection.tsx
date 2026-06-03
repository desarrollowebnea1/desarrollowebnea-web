"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Target } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { FloatingOrbs } from "./FloatingOrbs";

type AboutSectionProps = {
  aboutText?: string | null;
  location?: string | null;
  brandName?: string | null;
};

export function AboutSection({
  aboutText,
  location,
  brandName = "DESARROLLO WEB NEA",
}: AboutSectionProps) {
  return (
    <section className="section-padding relative">
      <FloatingOrbs />
      <div className="section-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow="Nosotros"
            title={`Conocé a ${brandName}`}
            subtitle={
              aboutText ??
              "Somos un estudio de desarrollo web del NEA enfocado en negocios locales que quieren verse profesionales y vender más online. Combinamos diseño premium, tecnología moderna y acompañamiento cercano."
            }
            className="mb-0 lg:max-w-none"
          />

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              {
                icon: MapPin,
                title: "Del NEA, para el NEA",
                desc: location ?? "Corrientes y zona NEA",
              },
              {
                icon: Users,
                title: "Trato directo",
                desc: "Hablás con quien diseña y desarrolla tu proyecto.",
              },
              {
                icon: Target,
                title: "Enfoque en resultados",
                desc: "Webs pensadas para convertir visitas en clientes.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -4 }}
                className={`glass-card p-5 ${i === 2 ? "sm:col-span-2" : ""}`}
              >
                <card.icon className="mb-3 h-6 w-6 text-sky" />
                <h3 className="font-heading font-semibold text-slate-light">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-slate-muted">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
