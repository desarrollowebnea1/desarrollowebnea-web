"use client";

import { ActiveToggle } from "@/components/admin/ActiveToggle";
import { AlertMessage } from "@/components/admin/AlertMessage";
import { FormField } from "@/components/admin/FormField";
import { LoadingButton } from "@/components/admin/LoadingButton";
import { TextAreaField } from "@/components/admin/TextAreaField";
import { adminFetch } from "@/lib/admin-fetch";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export type ServiceFormData = {
  name: string;
  description: string;
  icon: string;
  idealFor: string;
  priceFrom: string;
  active: boolean;
  order: number;
};

const emptyForm: ServiceFormData = {
  name: "",
  description: "",
  icon: "",
  idealFor: "",
  priceFrom: "",
  active: true,
  order: 0,
};

type ServiceFormProps = {
  serviceId?: string;
  initial?: Partial<ServiceFormData>;
};

export function ServiceForm({ serviceId, initial }: ServiceFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ServiceFormData>({ ...emptyForm, ...initial });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ServiceFormData>(key: K, value: ServiceFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const payload = { ...form, order: Number(form.order) || 0 };
    const result = serviceId
      ? await adminFetch(`/api/admin/services/${serviceId}`, { method: "PUT", body: JSON.stringify(payload) })
      : await adminFetch("/api/admin/services", { method: "POST", body: JSON.stringify(payload) });

    setLoading(false);
    if (!result.ok) {
      setError(result.error || "No se pudo guardar el servicio");
      return;
    }
    setSuccess(serviceId ? "Servicio actualizado" : "Servicio creado");
    if (!serviceId) router.push("/admin/services");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {success && <AlertMessage type="success" message={success} onDismiss={() => setSuccess(null)} />}
      {error && <AlertMessage type="error" message={error} onDismiss={() => setError(null)} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Nombre" name="name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        <FormField label="Icono (Lucide)" name="icon" value={form.icon} onChange={(e) => update("icon", e.target.value)} hint="Ej: Globe, ShoppingCart" />
        <FormField label="Precio desde" name="priceFrom" value={form.priceFrom} onChange={(e) => update("priceFrom", e.target.value)} />
        <FormField label="Orden" name="order" type="number" value={String(form.order)} onChange={(e) => update("order", Number(e.target.value))} />
      </div>
      <TextAreaField label="Descripción" name="description" required rows={5} value={form.description} onChange={(e) => update("description", e.target.value)} />
      <FormField label="Ideal para" name="idealFor" value={form.idealFor} onChange={(e) => update("idealFor", e.target.value)} />
      <ActiveToggle checked={form.active} onChange={(v) => update("active", v)} />
      <LoadingButton type="submit" loading={loading}>{serviceId ? "Guardar cambios" : "Crear servicio"}</LoadingButton>
    </form>
  );
}

export function serviceToForm(s: ServiceFormData & { id?: string }): ServiceFormData {
  return {
    name: s.name,
    description: s.description,
    icon: s.icon || "",
    idealFor: s.idealFor || "",
    priceFrom: s.priceFrom || "",
    active: s.active,
    order: s.order,
  };
}
