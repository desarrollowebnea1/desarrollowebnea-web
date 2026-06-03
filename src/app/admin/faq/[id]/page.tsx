"use client";

import { DeleteResourceButton } from "@/components/admin/DeleteResourceButton";
import { FaqForm, faqToForm } from "@/components/admin/FaqForm";
import { PageHeader } from "@/components/admin/PageHeader";
import { adminFetch } from "@/lib/admin-fetch";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditFaqPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<ReturnType<typeof faqToForm> | null>(null);

  useEffect(() => {
    if (!id) return;
    void adminFetch(`/api/admin/faq/${id}`).then((res) => {
      if (res.ok && res.data) setInitial(faqToForm(res.data as Parameters<typeof faqToForm>[0]));
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-slate-400">Cargando...</p>;
  if (!initial) return <p className="text-red-400">FAQ no encontrada</p>;

  return (
    <div>
      <PageHeader title="Editar FAQ" />
      <div className="mb-6 flex flex-wrap justify-between gap-4">
        <Link href="/admin/faq" className="text-sm text-slate-400 hover:text-white">← Volver</Link>
        <DeleteResourceButton apiUrl={`/api/admin/faq/${id}`} resourceName="pregunta" redirectTo="/admin/faq" />
      </div>
      <FaqForm faqId={id} initial={initial} />
    </div>
  );
}
