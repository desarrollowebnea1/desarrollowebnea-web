"use client";

import { DataTable, DataTableColumn } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin-fetch";
import Link from "next/link";
import { useEffect, useState } from "react";

type Testimonial = { id: string; name: string; business: string; active: boolean; order: number };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void adminFetch<Testimonial[]>("/api/admin/testimonials").then((res) => {
      if (res.ok && res.data) setItems(res.data);
      setLoading(false);
    });
  }, []);

  const columns: DataTableColumn<Testimonial>[] = [
    { key: "name", header: "Cliente", render: (row) => <span className="font-medium text-white">{row.name}</span> },
    { key: "business", header: "Negocio", render: (row) => row.business },
    { key: "status", header: "Estado", render: (row) => row.active ? <StatusBadge variant="active" /> : <StatusBadge variant="inactive" /> },
    { key: "order", header: "Orden", render: (row) => row.order },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <Link href={`/admin/testimonials/${row.id}`} className="text-sm text-sky-400 hover:underline">Editar</Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Testimonios" actionHref="/admin/testimonials/new" actionLabel="Nuevo testimonio" />
      <DataTable columns={columns} data={items} keyExtractor={(r) => r.id} loading={loading} emptyMessage="No hay testimonios" />
    </div>
  );
}
