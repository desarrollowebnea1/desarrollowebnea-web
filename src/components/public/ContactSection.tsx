"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, MapPin, Share2, Link2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { WhatsAppButton } from "./WhatsAppButton";

type ContactSectionProps = {
  email?: string | null;
  whatsapp?: string | null;
  location?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  whatsappMessage?: string | null;
};

export function ContactSection({
  email,
  whatsapp,
  location,
  instagram,
  linkedin,
  whatsappMessage,
}: ContactSectionProps) {
  const items = [
    email && {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    location && {
      icon: MapPin,
      label: "Ubicación",
      value: location,
    },
    instagram && {
      icon: Share2,
      label: "Instagram",
      value: "Instagram",
      href: instagram.startsWith("http") ? instagram : `https://instagram.com/${instagram.replace("@", "")}`,
    },
    linkedin && {
      icon: Link2,
      label: "LinkedIn",
      value: "Perfil",
      href: linkedin.startsWith("http") ? linkedin : `https://linkedin.com/in/${linkedin}`,
    },
  ].filter(Boolean) as {
    icon: ComponentType<{ className?: string }>;
    label: string;
    value: string;
    href?: string;
  }[];

  return (
    <section id="contacto" className="section-padding relative bg-tech-deep/30">
      <div className="section-container">
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos de tu proyecto"
          subtitle="Escribinos por WhatsApp, email o completá el formulario de presupuesto."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 sm:p-8"
          >
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric/15 text-sky">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-muted">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.label !== "Email" ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-slate-light hover:text-sky"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-slate-light">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton
                variant="inline"
                phone={whatsapp}
                message={whatsappMessage ?? undefined}
              />
              <Link href="#presupuesto" className="btn-primary">
                Formulario de presupuesto
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card flex flex-col items-center justify-center p-8 text-center"
          >
            <p className="font-heading text-2xl font-bold text-slate-light">
              ¿Listo para dar el salto?
            </p>
            <p className="mt-3 max-w-sm text-sm text-slate-muted">
              Tu competencia ya está online. Nosotros te ayudamos a destacar con
              una web profesional que convierte.
            </p>
            <Link href="#presupuesto" className="btn-primary mt-8">
              Empezar ahora
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
