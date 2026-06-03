"use client";

import { DeleteResourceButton } from "@/components/admin/DeleteResourceButton";
import { PageHeader } from "@/components/admin/PageHeader";
import { TestimonialForm, testimonialToForm } from "@/components/admin/TestimonialForm";
import { adminFetch } from "@/lib/admin-fetch";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTestimonialPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<ReturnType<typeof testimonialToForm> | null>(null);

  useEffect(() => {
    if (!id) return;
    void adminFetch(`/api/admin/testimonials/${id}`).then((res) => {
      if (res.ok && res.data) setInitial(testimonialToForm(res.data as Parameters<typeof testimonialToForm>[0]));
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-slate-400">Cargando...</p>;
  if (!initial) return <p className="text-red-400">Testimonio no encontrado</p>;

  return (
    <div>
      <PageHeader title="Editar testimonio" />
      <div className="mb-6 flex flex-wrap justify-between gap-4">
        <Link href="/admin/testimonials" className="text-sm text-slate-400 hover:text-white">← Volver</Link>
        <DeleteResourceButton apiUrl={`/api/admin/testimonials/${id}`} resourceName="testimonio" redirectTo="/admin/testimonials" />
      </div>
      <TestimonialForm testimonialId={id} initial={initial} />
    </div>
  );
}
