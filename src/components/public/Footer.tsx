"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { WhatsAppButton } from "./WhatsAppButton";

type FooterProps = {
  brandName?: string;
  footerText?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  location?: string | null;
};

export function Footer({
  brandName = "DESARROLLO WEB NEA",
  footerText,
  email,
  whatsapp,
  location,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-tech-black pt-12 pb-8">
      <div className="section-container">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="#inicio"
              className="font-heading text-lg font-bold text-slate-light"
            >
              {brandName}
            </Link>
            <p className="mt-3 max-w-md text-sm text-slate-muted">
              {footerText ??
                "Estudio de desarrollo web premium para negocios del NEA. Sitios, tiendas online y sistemas a medida."}
            </p>
            <div className="mt-4">
              <WhatsAppButton variant="inline" phone={whatsapp} label="WhatsApp" />
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-muted">
              Navegación
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-muted transition-colors hover:text-slate-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-muted">
              Contacto
            </p>
            <ul className="space-y-2 text-sm text-slate-muted">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="hover:text-sky">
                    {email}
                  </a>
                </li>
              )}
              {location && <li>{location}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-slate-muted">
            © {year} {brandName}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-muted/70">
            Hecho con Next.js · NEA Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
