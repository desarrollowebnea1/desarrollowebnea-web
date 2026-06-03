"use client";

import { DeleteResourceButton } from "@/components/admin/DeleteResourceButton";
import { PageHeader } from "@/components/admin/PageHeader";
import { PlanForm, planToForm } from "@/components/admin/PlanForm";
import { adminFetch } from "@/lib/admin-fetch";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPlanPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<ReturnType<typeof planToForm> | null>(null);

  useEffect(() => {
    if (!id) return;
    void adminFetch(`/api/admin/plans/${id}`).then((res) => {
      if (res.ok && res.data) setInitial(planToForm(res.data as Parameters<typeof planToForm>[0]));
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-slate-400">Cargando...</p>;
  if (!initial) return <p className="text-red-400">Plan no encontrado</p>;

  return (
    <div>
      <PageHeader title="Editar plan" />
      <div className="mb-6 flex flex-wrap justify-between gap-4">
        <Link href="/admin/plans" className="text-sm text-slate-400 hover:text-white">← Volver</Link>
        <DeleteResourceButton apiUrl={`/api/admin/plans/${id}`} resourceName="plan" redirectTo="/admin/plans" />
      </div>
      <PlanForm planId={id} initial={initial} />
    </div>
  );
}
