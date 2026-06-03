"use client";

import { CaseForm, caseToForm } from "@/components/admin/CaseForm";
import { DeleteResourceButton } from "@/components/admin/DeleteResourceButton";
import { PageHeader } from "@/components/admin/PageHeader";
import { adminFetch } from "@/lib/admin-fetch";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCasePage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<ReturnType<typeof caseToForm> | null>(null);

  useEffect(() => {
    if (!id) return;
    void adminFetch(`/api/admin/cases/${id}`).then((res) => {
      if (res.ok && res.data) setInitial(caseToForm(res.data as Parameters<typeof caseToForm>[0]));
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-slate-400">Cargando...</p>;
  if (!initial) return <p className="text-red-400">Caso no encontrado</p>;

  return (
    <div>
      <PageHeader title="Editar caso" />
      <div className="mb-6 flex flex-wrap justify-between gap-4">
        <Link href="/admin/cases" className="text-sm text-slate-400 hover:text-white">← Volver</Link>
        <DeleteResourceButton apiUrl={`/api/admin/cases/${id}`} resourceName="caso" redirectTo="/admin/cases" />
      </div>
      <CaseForm caseId={id} initial={initial} />
    </div>
  );
}
