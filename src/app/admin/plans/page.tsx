"use client";

import { DataTable, DataTableColumn } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin-fetch";
import Link from "next/link";
import { useEffect, useState } from "react";

type Plan = { id: string; name: string; priceFrom: string; active: boolean; featured: boolean; order: number };

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void adminFetch<Plan[]>("/api/admin/plans").then((res) => {
      if (res.ok && res.data) setPlans(res.data);
      setLoading(false);
    });
  }, []);

  const columns: DataTableColumn<Plan>[] = [
    { key: "name", header: "Plan", render: (row) => <span className="font-medium text-white">{row.name}</span> },
    { key: "price", header: "Precio", render: (row) => row.priceFrom },
    { key: "featured", header: "Destacado", render: (row) => row.featured ? <StatusBadge variant="featured" /> : "—" },
    { key: "status", header: "Estado", render: (row) => row.active ? <StatusBadge variant="active" /> : <StatusBadge variant="inactive" /> },
    { key: "order", header: "Orden", render: (row) => row.order },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <Link href={`/admin/plans/${row.id}`} className="text-sm text-sky-400 hover:underline">Editar</Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Planes y precios" actionHref="/admin/plans/new" actionLabel="Nuevo plan" />
      <DataTable columns={columns} data={plans} keyExtractor={(r) => r.id} loading={loading} emptyMessage="No hay planes" />
    </div>
  );
}
