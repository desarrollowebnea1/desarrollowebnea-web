"use client";

import { DataTable, DataTableColumn } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin-fetch";
import Link from "next/link";
import { useEffect, useState } from "react";

type Faq = { id: string; question: string; active: boolean; order: number };

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void adminFetch<Faq[]>("/api/admin/faq").then((res) => {
      if (res.ok && res.data) setFaqs(res.data);
      setLoading(false);
    });
  }, []);

  const columns: DataTableColumn<Faq>[] = [
    {
      key: "question",
      header: "Pregunta",
      render: (row) => (
        <span className="line-clamp-2 max-w-md text-white">{row.question}</span>
      ),
    },
    { key: "status", header: "Estado", render: (row) => row.active ? <StatusBadge variant="active" /> : <StatusBadge variant="inactive" /> },
    { key: "order", header: "Orden", render: (row) => row.order },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <Link href={`/admin/faq/${row.id}`} className="text-sm text-sky-400 hover:underline">Editar</Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="FAQ" actionHref="/admin/faq/new" actionLabel="Nueva pregunta" />
      <DataTable columns={columns} data={faqs} keyExtractor={(r) => r.id} loading={loading} emptyMessage="No hay preguntas frecuentes" />
    </div>
  );
}
