"use client";

import { ActiveToggle } from "@/components/admin/ActiveToggle";
import { AlertMessage } from "@/components/admin/AlertMessage";
import { FormField } from "@/components/admin/FormField";
import { LoadingButton } from "@/components/admin/LoadingButton";
import { TextAreaField } from "@/components/admin/TextAreaField";
import { adminFetch, arrayToLines, linesToArray } from "@/lib/admin-fetch";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export type PlanFormData = {
  name: string;
  priceFrom: string;
  description: string;
  features: string;
  featured: boolean;
  active: boolean;
  order: number;
};

const emptyForm: PlanFormData = {
  name: "",
  priceFrom: "",
  description: "",
  features: "",
  featured: false,
  active: true,
  order: 0,
};

type PlanFormProps = {
  planId?: string;
  initial?: Partial<PlanFormData>;
};

export function PlanForm({ planId, initial }: PlanFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<PlanFormData>({ ...emptyForm, ...initial });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof PlanFormData>(key: K, value: PlanFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const payload = {
      ...form,
      features: linesToArray(form.features),
      order: Number(form.order) || 0,
    };

    const result = planId
      ? await adminFetch(`/api/admin/plans/${planId}`, { method: "PUT", body: JSON.stringify(payload) })
      : await adminFetch("/api/admin/plans", { method: "POST", body: JSON.stringify(payload) });

    setLoading(false);
    if (!result.ok) {
      setError(result.error || "No se pudo guardar el plan");
      return;
    }
    setSuccess(planId ? "Plan actualizado" : "Plan creado");
    if (!planId) router.push("/admin/plans");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {success && <AlertMessage type="success" message={success} onDismiss={() => setSuccess(null)} />}
      {error && <AlertMessage type="error" message={error} onDismiss={() => setError(null)} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Nombre" name="name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        <FormField label="Precio desde" name="priceFrom" required value={form.priceFrom} onChange={(e) => update("priceFrom", e.target.value)} />
        <FormField label="Orden" name="order" type="number" value={String(form.order)} onChange={(e) => update("order", Number(e.target.value))} />
      </div>
      <TextAreaField label="Descripción" name="description" required rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} />
      <TextAreaField label="Características incluidas" name="features" rows={6} value={form.features} onChange={(e) => update("features", e.target.value)} hint="Una por línea" />
      <label className="flex items-center gap-3 text-sm text-slate-300">
        <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} className="h-4 w-4 rounded" />
        Plan destacado
      </label>
      <ActiveToggle checked={form.active} onChange={(v) => update("active", v)} />
      <LoadingButton type="submit" loading={loading}>{planId ? "Guardar cambios" : "Crear plan"}</LoadingButton>
    </form>
  );
}

export function planToForm(p: {
  name: string;
  priceFrom: string;
  description: string;
  features: string[];
  featured: boolean;
  active: boolean;
  order: number;
}): PlanFormData {
  return {
    name: p.name,
    priceFrom: p.priceFrom,
    description: p.description,
    features: arrayToLines(p.features),
    featured: p.featured,
    active: p.active,
    order: p.order,
  };
}
