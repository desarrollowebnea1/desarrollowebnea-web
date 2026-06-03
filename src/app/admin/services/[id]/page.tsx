"use client";

import { DeleteResourceButton } from "@/components/admin/DeleteResourceButton";
import { PageHeader } from "@/components/admin/PageHeader";
import { ServiceForm, serviceToForm } from "@/components/admin/ServiceForm";
import { adminFetch } from "@/lib/admin-fetch";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<ReturnType<typeof serviceToForm> | null>(null);

  useEffect(() => {
    if (!id) return;
    void adminFetch(`/api/admin/services/${id}`).then((res) => {
      if (res.ok && res.data) setInitial(serviceToForm(res.data as Parameters<typeof serviceToForm>[0]));
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-slate-400">Cargando...</p>;
  if (!initial) return <p className="text-red-400">Servicio no encontrado</p>;

  return (
    <div>
      <PageHeader title="Editar servicio" />
      <div className="mb-6 flex flex-wrap justify-between gap-4">
        <Link href="/admin/services" className="text-sm text-slate-400 hover:text-white">← Volver</Link>
        <DeleteResourceButton apiUrl={`/api/admin/services/${id}`} resourceName="servicio" redirectTo="/admin/services" />
      </div>
      <ServiceForm serviceId={id} initial={initial} />
    </div>
  );
}
