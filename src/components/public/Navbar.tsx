"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "./WhatsAppButton";

type NavbarProps = {
  brandName?: string;
  logo?: string | null;
  whatsapp?: string | null;
  whatsappMessage?: string | null;
};

export function Navbar({
  brandName = "DESARROLLO WEB NEA",
  logo,
  whatsapp,
  whatsappMessage,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass-nav" : "bg-transparent"
        )}
      >
        <nav className="section-container flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link
            href="#inicio"
            className="flex items-center gap-2 font-heading text-sm font-bold tracking-tight text-slate-light sm:text-base"
          >
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={brandName} className="h-8 w-auto" />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-violet-accent text-xs font-bold">
                DWN
              </span>
            )}
            <span className="hidden sm:inline">{brandName}</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-slate-muted transition-colors hover:bg-white/5 hover:text-slate-light"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <WhatsAppButton
              variant="icon"
              phone={whatsapp}
              message={whatsappMessage ?? undefined}
            />
            <Link href="#presupuesto" className="btn-primary text-sm">
              Pedir presupuesto
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-light lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-tech-black/80 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[min(100%,320px)] flex-col glass-card rounded-none border-l border-white/10 lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <span className="font-heading text-sm font-bold">{brandName}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-slate-light hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3 border-t border-white/10 p-4">
                <WhatsAppButton
                  variant="inline"
                  phone={whatsapp}
                  message={whatsappMessage ?? undefined}
                  label="Escribinos por WhatsApp"
                  className="w-full justify-center"
                />
                <Link
                  href="#presupuesto"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Pedir presupuesto
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
