"use client";

import { ActiveToggle } from "@/components/admin/ActiveToggle";
import { AlertMessage } from "@/components/admin/AlertMessage";
import { FormField } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LoadingButton } from "@/components/admin/LoadingButton";
import { TextAreaField } from "@/components/admin/TextAreaField";
import { adminFetch, arrayToLines, linesToArray } from "@/lib/admin-fetch";
import { slugify } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export type ProjectFormData = {
  name: string;
  slug: string;
  rubro: string;
  shortDesc: string;
  longDesc: string;
  problem: string;
  solution: string;
  result: string;
  webUrl: string;
  imageUrl: string;
  technologies: string;
  features: string;
  featured: boolean;
  active: boolean;
  order: number;
};

const emptyForm: ProjectFormData = {
  name: "",
  slug: "",
  rubro: "",
  shortDesc: "",
  longDesc: "",
  problem: "",
  solution: "",
  result: "",
  webUrl: "",
  imageUrl: "",
  technologies: "",
  features: "",
  featured: false,
  active: true,
  order: 0,
};

type ProjectFormProps = {
  projectId?: string;
  initial?: Partial<ProjectFormData>;
};

export function ProjectForm({ projectId, initial }: ProjectFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectFormData>({
    ...emptyForm,
    ...initial,
    technologies: initial?.technologies ?? "",
    features: initial?.features ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K]
  ) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && !projectId && typeof value === "string") {
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
      technologies: linesToArray(form.technologies),
      features: linesToArray(form.features),
      order: Number(form.order) || 0,
    };

    const result = projectId
      ? await adminFetch(`/api/admin/projects/${projectId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        })
      : await adminFetch("/api/admin/projects", {
          method: "POST",
          body: JSON.stringify(payload),
        });

    setLoading(false);

    if (!result.ok) {
      setError(result.error || "No se pudo guardar el proyecto");
      return;
    }

    setSuccess(projectId ? "Proyecto actualizado correctamente" : "Proyecto creado correctamente");
    if (!projectId) {
      router.push("/admin/projects");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {success && (
        <AlertMessage type="success" message={success} onDismiss={() => setSuccess(null)} />
      )}
      {error && (
        <AlertMessage type="error" message={error} onDismiss={() => setError(null)} />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Nombre" name="name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        <FormField label="Slug" name="slug" required value={form.slug} onChange={(e) => update("slug", e.target.value)} hint="URL amigable única" />
        <FormField label="Rubro" name="rubro" required value={form.rubro} onChange={(e) => update("rubro", e.target.value)} />
        <FormField label="Orden" name="order" type="number" value={String(form.order)} onChange={(e) => update("order", Number(e.target.value))} />
      </div>

      <TextAreaField label="Descripción corta" name="shortDesc" required rows={2} value={form.shortDesc} onChange={(e) => update("shortDesc", e.target.value)} />
      <TextAreaField label="Descripción larga" name="longDesc" rows={4} value={form.longDesc} onChange={(e) => update("longDesc", e.target.value)} />
      <TextAreaField label="Problema" name="problem" rows={3} value={form.problem} onChange={(e) => update("problem", e.target.value)} />
      <TextAreaField label="Solución" name="solution" rows={3} value={form.solution} onChange={(e) => update("solution", e.target.value)} />
      <TextAreaField label="Resultado" name="result" rows={3} value={form.result} onChange={(e) => update("result", e.target.value)} />

      <TextAreaField
        label="Tecnologías"
        name="technologies"
        rows={4}
        value={form.technologies}
        onChange={(e) => update("technologies", e.target.value)}
        hint="Una tecnología por línea"
      />
      <TextAreaField
        label="Características"
        name="features"
        rows={4}
        value={form.features}
        onChange={(e) => update("features", e.target.value)}
        hint="Una característica por línea"
      />

      <FormField label="URL del sitio" name="webUrl" type="url" value={form.webUrl} onChange={(e) => update("webUrl", e.target.value)} />
      <ImageUploadField label="Imagen" value={form.imageUrl} onChange={(url) => update("imageUrl", url)} />

      <label className="flex items-center gap-3 text-sm text-slate-300">
        <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} className="h-4 w-4 rounded" />
        Destacado en el portfolio
      </label>

      <ActiveToggle checked={form.active} onChange={(v) => update("active", v)} />

      <LoadingButton type="submit" loading={loading} variant="primary">
        {projectId ? "Guardar cambios" : "Crear proyecto"}
      </LoadingButton>
    </form>
  );
}

export function projectToForm(project: {
  name: string;
  slug: string;
  rubro: string;
  shortDesc: string;
  longDesc?: string | null;
  problem?: string | null;
  solution?: string | null;
  result?: string | null;
  webUrl?: string | null;
  imageUrl?: string | null;
  technologies: string[];
  features: string[];
  featured: boolean;
  active: boolean;
  order: number;
}): ProjectFormData {
  return {
    name: project.name,
    slug: project.slug,
    rubro: project.rubro,
    shortDesc: project.shortDesc,
    longDesc: project.longDesc || "",
    problem: project.problem || "",
    solution: project.solution || "",
    result: project.result || "",
    webUrl: project.webUrl || "",
    imageUrl: project.imageUrl || "",
    technologies: arrayToLines(project.technologies),
    features: arrayToLines(project.features),
    featured: project.featured,
    active: project.active,
    order: project.order,
  };
}
