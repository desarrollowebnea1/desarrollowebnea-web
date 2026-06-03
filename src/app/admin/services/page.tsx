"use client";

import { DataTable, DataTableColumn } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin-fetch";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Service = { id: string; name: string; priceFrom?: string | null; active: boolean; order: number };

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void adminFetch<Service[]>("/api/admin/services").then((res) => {
      if (res.ok && res.data) setServices(res.data);
      setLoading(false);
    });
  }, []);

  const columns: DataTableColumn<Service>[] = [
    { key: "name", header: "Servicio", render: (row) => <span className="font-medium text-white">{row.name}</span> },
    { key: "price", header: "Desde", render: (row) => row.priceFrom || "—" },
    { key: "status", header: "Estado", render: (row) => row.active ? <StatusBadge variant="active" /> : <StatusBadge variant="inactive" /> },
    { key: "order", header: "Orden", render: (row) => row.order },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <Link href={`/admin/services/${row.id}`} className="text-sm text-sky-400 hover:underline">
          <Pencil className="inline h-3.5 w-3.5" /> Editar
        </Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Servicios" actionHref="/admin/services/new" actionLabel="Nuevo servicio" />
      <DataTable columns={columns} data={services} keyExtractor={(r) => r.id} loading={loading} emptyMessage="No hay servicios" />
    </div>
  );
}
