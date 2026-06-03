"use client";

import { DeleteResourceButton } from "@/components/admin/DeleteResourceButton";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProjectForm, projectToForm } from "@/components/admin/ProjectForm";
import { adminFetch } from "@/lib/admin-fetch";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<ReturnType<typeof projectToForm> | null>(
    null
  );

  useEffect(() => {
    if (!id) return;
    void adminFetch(`/api/admin/projects/${id}`).then((res) => {
      if (res.ok && res.data) {
        setInitial(projectToForm(res.data as Parameters<typeof projectToForm>[0]));
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <p className="text-slate-400">Cargando proyecto...</p>;
  }

  if (!initial) {
    return <p className="text-red-400">Proyecto no encontrado</p>;
  }

  return (
    <div>
      <PageHeader title="Editar proyecto" />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/projects"
          className="text-sm text-slate-400 hover:text-white"
        >
          ← Volver a proyectos
        </Link>
        <DeleteResourceButton
          apiUrl={`/api/admin/projects/${id}`}
          resourceName="proyecto"
          redirectTo="/admin/projects"
        />
      </div>
      <ProjectForm projectId={id} initial={initial} />
    </div>
  );
}
