"use client";

import { DataTable, DataTableColumn } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin-fetch";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  active: boolean;
  order: number;
};

export default function AdminCasesPage() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void adminFetch<CaseStudy[]>("/api/admin/cases").then((res) => {
      if (res.ok && res.data) setCases(res.data);
      setLoading(false);
    });
  }, []);

  const columns: DataTableColumn<CaseStudy>[] = [
    {
      key: "title",
      header: "Título",
      render: (row) => (
        <div>
          <p className="font-medium text-white">{row.title}</p>
          <p className="text-xs text-slate-500">{row.slug}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: (row) =>
        row.active ? <StatusBadge variant="active" /> : <StatusBadge variant="inactive" />,
    },
    { key: "order", header: "Orden", render: (row) => row.order },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <Link href={`/admin/cases/${row.id}`} className="inline-flex items-center gap-1 text-sm text-sky-400 hover:underline">
          <Pencil className="h-3.5 w-3.5" /> Editar
        </Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Casos de estudio" description="Historias detalladas de proyectos" actionHref="/admin/cases/new" actionLabel="Nuevo caso" />
      <DataTable columns={columns} data={cases} keyExtractor={(r) => r.id} loading={loading} emptyMessage="No hay casos de estudio" />
    </div>
  );
}
