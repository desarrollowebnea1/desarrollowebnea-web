"use client";

import { DataTable, DataTableColumn } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin-fetch";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  rubro: string;
  slug: string;
  active: boolean;
  featured: boolean;
  order: number;
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void adminFetch<Project[]>("/api/admin/projects").then((res) => {
      if (res.ok && res.data) setProjects(res.data);
      setLoading(false);
    });
  }, []);

  const columns: DataTableColumn<Project>[] = [
    {
      key: "name",
      header: "Nombre",
      render: (row) => (
        <div>
          <p className="font-medium text-white">{row.name}</p>
          <p className="text-xs text-slate-500">{row.slug}</p>
        </div>
      ),
    },
    { key: "rubro", header: "Rubro", render: (row) => row.rubro },
    {
      key: "status",
      header: "Estado",
      render: (row) =>
        row.active ? (
          <StatusBadge variant="active" />
        ) : (
          <StatusBadge variant="inactive" />
        ),
    },
    {
      key: "featured",
      header: "Destacado",
      render: (row) =>
        row.featured ? <StatusBadge variant="featured" /> : "—",
    },
    { key: "order", header: "Orden", render: (row) => row.order },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <Link
          href={`/admin/projects/${row.id}`}
          className="inline-flex items-center gap-1 text-sm text-sky-400 hover:underline"
        >
          <Pencil className="h-3.5 w-3.5" />
          Editar
        </Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Proyectos"
        description="Portfolio de trabajos publicados en el sitio"
        actionHref="/admin/projects/new"
        actionLabel="Nuevo proyecto"
      />
      <DataTable
        columns={columns}
        data={projects}
        keyExtractor={(r) => r.id}
        loading={loading}
        emptyMessage="No hay proyectos. Creá el primero."
      />
    </div>
  );
}
