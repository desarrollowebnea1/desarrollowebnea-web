"use client";

import { ActiveToggle } from "@/components/admin/ActiveToggle";
import { AlertMessage } from "@/components/admin/AlertMessage";
import { FormField } from "@/components/admin/FormField";
import { LoadingButton } from "@/components/admin/LoadingButton";
import { TextAreaField } from "@/components/admin/TextAreaField";
import { adminFetch } from "@/lib/admin-fetch";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export type FaqFormData = {
  question: string;
  answer: string;
  active: boolean;
  order: number;
};

const emptyForm: FaqFormData = {
  question: "",
  answer: "",
  active: true,
  order: 0,
};

type FaqFormProps = {
  faqId?: string;
  initial?: Partial<FaqFormData>;
};

export function FaqForm({ faqId, initial }: FaqFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FaqFormData>({ ...emptyForm, ...initial });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FaqFormData>(key: K, value: FaqFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const payload = { ...form, order: Number(form.order) || 0 };
    const result = faqId
      ? await adminFetch(`/api/admin/faq/${faqId}`, { method: "PUT", body: JSON.stringify(payload) })
      : await adminFetch("/api/admin/faq", { method: "POST", body: JSON.stringify(payload) });

    setLoading(false);
    if (!result.ok) {
      setError(result.error || "No se pudo guardar la pregunta");
      return;
    }
    setSuccess(faqId ? "FAQ actualizada" : "FAQ creada");
    if (!faqId) router.push("/admin/faq");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {success && <AlertMessage type="success" message={success} onDismiss={() => setSuccess(null)} />}
      {error && <AlertMessage type="error" message={error} onDismiss={() => setError(null)} />}

      <FormField label="Pregunta" name="question" required value={form.question} onChange={(e) => update("question", e.target.value)} />
      <TextAreaField label="Respuesta" name="answer" required rows={6} value={form.answer} onChange={(e) => update("answer", e.target.value)} />
      <FormField label="Orden" name="order" type="number" value={String(form.order)} onChange={(e) => update("order", Number(e.target.value))} />
      <ActiveToggle checked={form.active} onChange={(v) => update("active", v)} />
      <LoadingButton type="submit" loading={loading}>{faqId ? "Guardar cambios" : "Crear FAQ"}</LoadingButton>
    </form>
  );
}

export function faqToForm(f: FaqFormData): FaqFormData {
  return f;
}
