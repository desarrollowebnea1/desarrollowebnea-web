"use client";

import { ActiveToggle } from "@/components/admin/ActiveToggle";
import { AlertMessage } from "@/components/admin/AlertMessage";
import { FormField } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LoadingButton } from "@/components/admin/LoadingButton";
import { TextAreaField } from "@/components/admin/TextAreaField";
import { adminFetch } from "@/lib/admin-fetch";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export type TestimonialFormData = {
  name: string;
  business: string;
  text: string;
  imageUrl: string;
  active: boolean;
  order: number;
};

const emptyForm: TestimonialFormData = {
  name: "",
  business: "",
  text: "",
  imageUrl: "",
  active: true,
  order: 0,
};

type TestimonialFormProps = {
  testimonialId?: string;
  initial?: Partial<TestimonialFormData>;
};

export function TestimonialForm({ testimonialId, initial }: TestimonialFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<TestimonialFormData>({ ...emptyForm, ...initial });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof TestimonialFormData>(key: K, value: TestimonialFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const payload = { ...form, order: Number(form.order) || 0 };
    const result = testimonialId
      ? await adminFetch(`/api/admin/testimonials/${testimonialId}`, { method: "PUT", body: JSON.stringify(payload) })
      : await adminFetch("/api/admin/testimonials", { method: "POST", body: JSON.stringify(payload) });

    setLoading(false);
    if (!result.ok) {
      setError(result.error || "No se pudo guardar el testimonio");
      return;
    }
    setSuccess(testimonialId ? "Testimonio actualizado" : "Testimonio creado");
    if (!testimonialId) router.push("/admin/testimonials");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {success && <AlertMessage type="success" message={success} onDismiss={() => setSuccess(null)} />}
      {error && <AlertMessage type="error" message={error} onDismiss={() => setError(null)} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Nombre" name="name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        <FormField label="Negocio" name="business" required value={form.business} onChange={(e) => update("business", e.target.value)} />
        <FormField label="Orden" name="order" type="number" value={String(form.order)} onChange={(e) => update("order", Number(e.target.value))} />
      </div>
      <TextAreaField label="Testimonio" name="text" required rows={5} value={form.text} onChange={(e) => update("text", e.target.value)} />
      <ImageUploadField label="Foto (opcional)" value={form.imageUrl} onChange={(url) => update("imageUrl", url)} />
      <ActiveToggle checked={form.active} onChange={(v) => update("active", v)} />
      <LoadingButton type="submit" loading={loading}>{testimonialId ? "Guardar cambios" : "Crear testimonio"}</LoadingButton>
    </form>
  );
}

export function testimonialToForm(t: {
  name: string;
  business: string;
  text: string;
  imageUrl?: string | null;
  active: boolean;
  order: number;
}): TestimonialFormData {
  return {
    name: t.name,
    business: t.business,
    text: t.text,
    imageUrl: t.imageUrl || "",
    active: t.active,
    order: t.order,
  };
}
