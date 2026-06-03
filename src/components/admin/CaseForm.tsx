"use client";

import { ActiveToggle } from "@/components/admin/ActiveToggle";
import { AlertMessage } from "@/components/admin/AlertMessage";
import { FormField } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LoadingButton } from "@/components/admin/LoadingButton";
import { SelectField } from "@/components/admin/SelectField";
import { TextAreaField } from "@/components/admin/TextAreaField";
import { adminFetch, arrayToLines, linesToArray } from "@/lib/admin-fetch";
import { slugify } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export type CaseFormData = {
  projectId: string;
  title: string;
  slug: string;
  problem: string;
  solution: string;
  result: string;
  features: string;
  technologies: string;
  systemType: string;
  learnings: string;
  imageUrl: string;
  webUrl: string;
  active: boolean;
  order: number;
};

const emptyForm: CaseFormData = {
  projectId: "",
  title: "",
  slug: "",
  problem: "",
  solution: "",
  result: "",
  features: "",
  technologies: "",
  systemType: "",
  learnings: "",
  imageUrl: "",
  webUrl: "",
  active: true,
  order: 0,
};

type CaseFormProps = {
  caseId?: string;
  initial?: Partial<CaseFormData>;
};

export function CaseForm({ caseId, initial }: CaseFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<CaseFormData>({ ...emptyForm, ...initial });
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void adminFetch<Array<{ id: string; name: string }>>("/api/admin/projects").then(
      (res) => {
        if (res.ok && res.data) setProjects(res.data);
      }
    );
  }, []);

  function update<K extends keyof CaseFormData>(key: K, value: CaseFormData[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !caseId && typeof value === "string") {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const payload = {
      ...form,
      projectId: form.projectId || null,
      features: linesToArray(form.features),
      technologies: linesToArray(form.technologies),
      order: Number(form.order) || 0,
    };

    const result = caseId
      ? await adminFetch(`/api/admin/cases/${caseId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        })
      : await adminFetch("/api/admin/cases", {
          method: "POST",
          body: JSON.stringify(payload),
        });

    setLoading(false);
    if (!result.ok) {
      setError(result.error || "No se pudo guardar el caso");
      return;
    }
    setSuccess(caseId ? "Caso actualizado correctamente" : "Caso creado correctamente");
    if (!caseId) router.push("/admin/cases");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {success && <AlertMessage type="success" message={success} onDismiss={() => setSuccess(null)} />}
      {error && <AlertMessage type="error" message={error} onDismiss={() => setError(null)} />}

      <SelectField
        label="Proyecto vinculado (opcional)"
        name="projectId"
        value={form.projectId}
        onChange={(e) => update("projectId", e.target.value)}
        options={[
          { value: "", label: "Sin proyecto" },
          ...projects.map((p) => ({ value: p.id, label: p.name })),
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Título" name="title" required value={form.title} onChange={(e) => update("title", e.target.value)} />
        <FormField label="Slug" name="slug" required value={form.slug} onChange={(e) => update("slug", e.target.value)} />
        <FormField label="Tipo de sistema" name="systemType" value={form.systemType} onChange={(e) => update("systemType", e.target.value)} />
        <FormField label="Orden" name="order" type="number" value={String(form.order)} onChange={(e) => update("order", Number(e.target.value))} />
      </div>

      <TextAreaField label="Problema" name="problem" required rows={4} value={form.problem} onChange={(e) => update("problem", e.target.value)} />
      <TextAreaField label="Solución" name="solution" required rows={4} value={form.solution} onChange={(e) => update("solution", e.target.value)} />
      <TextAreaField label="Resultado" name="result" required rows={3} value={form.result} onChange={(e) => update("result", e.target.value)} />
      <TextAreaField label="Características" name="features" rows={4} value={form.features} onChange={(e) => update("features", e.target.value)} hint="Una por línea" />
      <TextAreaField label="Tecnologías" name="technologies" rows={4} value={form.technologies} onChange={(e) => update("technologies", e.target.value)} hint="Una por línea" />
      <TextAreaField label="Aprendizajes" name="learnings" rows={3} value={form.learnings} onChange={(e) => update("learnings", e.target.value)} />

      <FormField label="URL del sitio" name="webUrl" type="url" value={form.webUrl} onChange={(e) => update("webUrl", e.target.value)} />
      <ImageUploadField label="Imagen" value={form.imageUrl} onChange={(url) => update("imageUrl", url)} />
      <ActiveToggle checked={form.active} onChange={(v) => update("active", v)} />

      <LoadingButton type="submit" loading={loading}>
        {caseId ? "Guardar cambios" : "Crear caso"}
      </LoadingButton>
    </form>
  );
}

export function caseToForm(c: {
  projectId?: string | null;
  title: string;
  slug: string;
  problem: string;
  solution: string;
  result: string;
  features: string[];
  technologies: string[];
  systemType?: string | null;
  learnings?: string | null;
  imageUrl?: string | null;
  webUrl?: string | null;
  active: boolean;
  order: number;
}): CaseFormData {
  return {
    projectId: c.projectId || "",
    title: c.title,
    slug: c.slug,
    problem: c.problem,
    solution: c.solution,
    result: c.result,
    features: arrayToLines(c.features),
    technologies: arrayToLines(c.technologies),
    systemType: c.systemType || "",
    learnings: c.learnings || "",
    imageUrl: c.imageUrl || "",
    webUrl: c.webUrl || "",
    active: c.active,
    order: c.order,
  };
}
