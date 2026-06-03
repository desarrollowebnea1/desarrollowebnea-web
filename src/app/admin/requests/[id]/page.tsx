"use client";

import { AlertMessage } from "@/components/admin/AlertMessage";
import { FormField } from "@/components/admin/FormField";
import { LoadingButton } from "@/components/admin/LoadingButton";
import { PageHeader } from "@/components/admin/PageHeader";
import { SelectField } from "@/components/admin/SelectField";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { TextAreaField } from "@/components/admin/TextAreaField";
import { BUDGET_STATUS_LABELS } from "@/lib/constants";
import { adminFetch } from "@/lib/admin-fetch";
import { formatDate } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type BudgetRequest = {
  id: string;
  code: string;
  name: string;
  whatsapp: string;
  email: string;
  businessName: string;
  rubro: string;
  serviceNeeded: string;
  hasLogo?: string | null;
  hasContent?: string | null;
  needsAdmin?: string | null;
  needsWhatsapp?: string | null;
  budgetApprox?: string | null;
  message?: string | null;
  status: string;
  statusMessage?: string | null;
  createdAt: string;
};

const statusOptions = Object.entries(BUDGET_STATUS_LABELS).map(
  ([value, label]) => ({ value, label })
);

export default function RequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<BudgetRequest | null>(null);
  const [status, setStatus] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    void adminFetch<BudgetRequest>(`/api/admin/requests/${id}`)
      .then((res) => {
        if (res.ok && res.data) {
          setRequest(res.data);
          setStatus(res.data.status || "NUEVA");
          setStatusMessage(res.data.statusMessage || "");
        } else if (!res.ok) {
          setError(res.error || "No pudimos cargar la solicitud.");
        }
      })
      .catch(() => setError("No pudimos cargar la solicitud."))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setError(null);
    setSuccess(null);

    const result = await adminFetch(`/api/admin/requests/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status, statusMessage }),
    });

    setSaving(false);
    if (!result.ok) {
      setError(result.error || "No se pudo actualizar el estado");
      return;
    }
    setSuccess("Estado actualizado correctamente");
    if (result.data) setRequest(result.data as BudgetRequest);
  }

  if (loading) return <p className="text-slate-400">Cargando solicitud...</p>;
  if (error && !request) {
    return (
      <div>
        <AlertMessage type="error" message={error} />
        <Link href="/admin/requests" className="mt-4 inline-block text-sm text-slate-400 hover:text-white">
          ← Volver a solicitudes
        </Link>
      </div>
    );
  }
  if (!request) return <p className="text-red-400">Solicitud no encontrada</p>;

  const whatsappLink = request.whatsapp
    ? getWhatsAppLink(
        `Hola ${request.name}, te escribimos desde Desarrollo Web NEA sobre tu solicitud ${request.code}.`,
        request.whatsapp
      )
    : null;

  const fields = [
    ["WhatsApp", request.whatsapp],
    ["Email", request.email],
    ["Negocio", request.businessName],
    ["Rubro", request.rubro],
    ["Servicio", request.serviceNeeded],
    ["¿Tiene logo?", request.hasLogo],
    ["¿Tiene contenido?", request.hasContent],
    ["¿Necesita admin?", request.needsAdmin],
    ["¿Necesita WhatsApp?", request.needsWhatsapp],
    ["Presupuesto aprox.", request.budgetApprox],
  ] as const;

  return (
    <div className="max-w-3xl">
      <PageHeader title={`Solicitud ${request.code}`} />
      <Link href="/admin/requests" className="mb-6 inline-block text-sm text-slate-400 hover:text-white">
        ← Volver a solicitudes
      </Link>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StatusBadge variant="budget" value={request.status} />
        <span className="text-sm text-slate-500">
          Recibida: {formatDate(request.createdAt)}
        </span>
      </div>

      <div className="mb-8 rounded-xl border border-slate-700/80 bg-slate-900/50 p-6">
        <h3 className="mb-4 text-lg font-medium text-white">{request.name || "Sin nombre"}</h3>
        <dl className="grid gap-3 sm:grid-cols-2">
          {fields.map(([label, value]) =>
            value ? (
              <div key={label}>
                <dt className="text-xs text-slate-500">{label}</dt>
                <dd className="text-sm text-slate-200">{value}</dd>
              </div>
            ) : null
          )}
        </dl>
        {request.message && (
          <div className="mt-4 border-t border-slate-800 pt-4">
            <p className="text-xs text-slate-500">Mensaje</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-300">
              {request.message}
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-700/80 bg-slate-900/50 p-6">
        <h3 className="font-medium text-white">Actualizar estado</h3>
        {success && <AlertMessage type="success" message={success} onDismiss={() => setSuccess(null)} />}
        {error && <AlertMessage type="error" message={error} onDismiss={() => setError(null)} />}

        <SelectField
          label="Estado"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={statusOptions}
        />
        <TextAreaField
          label="Mensaje de estado (visible para el cliente)"
          name="statusMessage"
          rows={3}
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
        />
        <LoadingButton type="submit" loading={saving}>
          Guardar estado
        </LoadingButton>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FormField label="WhatsApp" value={request.whatsapp || "—"} readOnly />
        {whatsappLink ? (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="self-end text-sm text-emerald-400 hover:underline"
          >
            Abrir en WhatsApp →
          </a>
        ) : (
          <span className="self-end text-sm text-slate-500">WhatsApp no disponible</span>
        )}
      </div>
    </div>
  );
}
