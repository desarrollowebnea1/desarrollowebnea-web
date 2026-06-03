"use client";

import { PageHeader } from "@/components/admin/PageHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";
import Link from "next/link";

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader
        title="Nuevo proyecto"
        description="Completá los datos del trabajo para el portfolio"
      />
      <Link
        href="/admin/projects"
        className="mb-6 inline-block text-sm text-slate-400 hover:text-white"
      >
        ← Volver a proyectos
      </Link>
      <ProjectForm />
    </div>
  );
}
