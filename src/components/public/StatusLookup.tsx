"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

type StatusResult = {
  code: string;
  status: string;
  statusLabel: string;
  statusMessage?: string | null;
  createdAt: string;
  updatedAt: string;
  whatsappLink: string;
};

export function StatusLookup() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<StatusResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/public/budget/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No encontramos ese código");
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al consultar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding relative bg-tech-deep/30">
      <div className="section-container max-w-xl">
        <SectionHeading
          eyebrow="Seguimiento"
          title="Consultá el estado de tu solicitud"
          subtitle="Ingresá tu código DWN (ej: DWN-20250603-1234) para ver el estado actual."
        />

        <form onSubmit={handleSubmit} className="glass-card p-6">
          <label className="label-field" htmlFor="dwn-code">
            Código DWN
          </label>
          <div className="flex gap-2">
            <input
              id="dwn-code"
              className="input-field font-mono uppercase"
              placeholder="DWN-YYYYMMDD-XXXX"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary shrink-0 px-4"
              aria-label="Buscar"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-400">{error}</p>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0 }}
                className="mt-6 border-t border-white/10 pt-6"
              >
                <p className="text-xs text-slate-muted">Código</p>
                <p className="font-mono font-bold text-sky">{result.code}</p>
                <p className="mt-4 text-xs text-slate-muted">Estado</p>
                <p className="font-heading text-lg font-semibold text-slate-light">
                  {result.statusLabel}
                </p>
                {result.statusMessage && (
                  <p className="mt-2 text-sm text-slate-muted">
                    {result.statusMessage}
                  </p>
                )}
                <p className="mt-4 text-xs text-slate-muted">
                  Creada: {formatDate(result.createdAt)}
                </p>
                <p className="text-xs text-slate-muted">
                  Actualizada: {formatDate(result.updatedAt)}
                </p>
                <a
                  href={result.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp mt-6 w-full justify-center"
                >
                  Consultar por WhatsApp
                  <ExternalLink className="h-4 w-4" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
