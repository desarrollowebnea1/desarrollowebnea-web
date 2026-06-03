"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ExternalLink } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { WhatsAppButton } from "./WhatsAppButton";
import type { PublicService } from "./types";

type BudgetFormProps = {
  services?: PublicService[];
  whatsapp?: string | null;
};

type FormState = {
  name: string;
  whatsapp: string;
  email: string;
  businessName: string;
  rubro: string;
  serviceNeeded: string;
  hasLogo: string;
  hasContent: string;
  needsAdmin: string;
  needsWhatsapp: string;
  budgetApprox: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  whatsapp: "",
  email: "",
  businessName: "",
  rubro: "",
  serviceNeeded: "",
  hasLogo: "",
  hasContent: "",
  needsAdmin: "",
  needsWhatsapp: "",
  budgetApprox: "",
  message: "",
};

const YES_NO = [
  { value: "", label: "Seleccionar..." },
  { value: "si", label: "Sí" },
  { value: "no", label: "No" },
  { value: "parcial", label: "Parcial / en proceso" },
];

export function BudgetForm({ services = [], whatsapp }: BudgetFormProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    code: string;
    whatsappLink: string;
  } | null>(null);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/public/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No se pudo enviar la solicitud");
      }

      setSuccess({
        code: data.data.code,
        whatsappLink: data.data.whatsappLink,
      });
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="presupuesto" className="section-padding relative">
      <div className="section-container max-w-3xl">
        <SectionHeading
          eyebrow="Presupuesto"
          title="Pedí tu presupuesto sin compromiso"
          subtitle="Completá el formulario y te respondemos con una propuesta personalizada. Guardá tu código DWN para consultar el estado."
        />

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-card p-8 text-center"
            >
              <CheckCircle2 className="mx-auto h-12 w-12 text-whatsapp" />
              <h3 className="mt-4 font-heading text-xl font-bold text-slate-light">
                ¡Solicitud registrada!
              </h3>
              <p className="mt-2 text-slate-muted">
                Tu código de seguimiento es:
              </p>
              <p className="mt-2 font-mono text-2xl font-bold text-sky">
                {success.code}
              </p>
              <p className="mt-4 text-sm text-slate-muted">
                Guardalo para consultar el estado. También podés escribirnos por
                WhatsApp con tu código.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={success.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  Abrir WhatsApp
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setSuccess(null)}
                  className="btn-secondary"
                >
                  Enviar otra solicitud
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="glass-card space-y-5 p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-field" htmlFor="name">
                    Nombre *
                  </label>
                  <input
                    id="name"
                    className="input-field"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="label-field" htmlFor="whatsapp">
                    WhatsApp *
                  </label>
                  <input
                    id="whatsapp"
                    className="input-field"
                    required
                    placeholder="3794..."
                    value={form.whatsapp}
                    onChange={(e) => update("whatsapp", e.target.value)}
                  />
                </div>
                <div>
                  <label className="label-field" htmlFor="email">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input-field"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className="label-field" htmlFor="businessName">
                    Nombre del negocio *
                  </label>
                  <input
                    id="businessName"
                    className="input-field"
                    required
                    value={form.businessName}
                    onChange={(e) => update("businessName", e.target.value)}
                  />
                </div>
                <div>
                  <label className="label-field" htmlFor="rubro">
                    Rubro *
                  </label>
                  <input
                    id="rubro"
                    className="input-field"
                    required
                    placeholder="Ej: gastronomía, salud..."
                    value={form.rubro}
                    onChange={(e) => update("rubro", e.target.value)}
                  />
                </div>
                <div>
                  <label className="label-field" htmlFor="serviceNeeded">
                    ¿Qué necesitás? *
                  </label>
                  <select
                    id="serviceNeeded"
                    className="input-field"
                    required
                    value={form.serviceNeeded}
                    onChange={(e) => update("serviceNeeded", e.target.value)}
                  >
                    <option value="">Seleccionar servicio...</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Otro">Otro / A definir</option>
                  </select>
                </div>
                <div>
                  <label className="label-field" htmlFor="hasLogo">
                    ¿Tenés logo?
                  </label>
                  <select
                    id="hasLogo"
                    className="input-field"
                    value={form.hasLogo}
                    onChange={(e) => update("hasLogo", e.target.value)}
                  >
                    {YES_NO.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-field" htmlFor="hasContent">
                    ¿Tenés textos/fotos?
                  </label>
                  <select
                    id="hasContent"
                    className="input-field"
                    value={form.hasContent}
                    onChange={(e) => update("hasContent", e.target.value)}
                  >
                    {YES_NO.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-field" htmlFor="needsAdmin">
                    ¿Panel de administración?
                  </label>
                  <select
                    id="needsAdmin"
                    className="input-field"
                    value={form.needsAdmin}
                    onChange={(e) => update("needsAdmin", e.target.value)}
                  >
                    {YES_NO.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-field" htmlFor="needsWhatsapp">
                    ¿Botón WhatsApp en la web?
                  </label>
                  <select
                    id="needsWhatsapp"
                    className="input-field"
                    value={form.needsWhatsapp}
                    onChange={(e) => update("needsWhatsapp", e.target.value)}
                  >
                    {YES_NO.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label-field" htmlFor="budgetApprox">
                    Presupuesto aproximado (opcional)
                  </label>
                  <input
                    id="budgetApprox"
                    className="input-field"
                    placeholder="Ej: $200.000 - $500.000"
                    value={form.budgetApprox}
                    onChange={(e) => update("budgetApprox", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label-field" htmlFor="message">
                    Mensaje adicional
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Contanos más sobre tu proyecto..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary min-w-[180px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar solicitud"
                  )}
                </button>
                <WhatsAppButton
                  variant="inline"
                  phone={whatsapp}
                  label="O escribinos por WhatsApp"
                  className="flex-1 sm:flex-none"
                />
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
