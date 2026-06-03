"use client";

import { PageHeader } from "@/components/admin/PageHeader";
import { ServiceForm } from "@/components/admin/ServiceForm";
import Link from "next/link";

export default function NewServicePage() {
  return (
    <div>
      <PageHeader title="Nuevo servicio" />
      <Link href="/admin/services" className="mb-6 inline-block text-sm text-slate-400 hover:text-white">← Volver</Link>
      <ServiceForm />
    </div>
  );
}
