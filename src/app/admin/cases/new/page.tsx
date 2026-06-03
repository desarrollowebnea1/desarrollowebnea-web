"use client";

import { CaseForm } from "@/components/admin/CaseForm";
import { PageHeader } from "@/components/admin/PageHeader";
import Link from "next/link";

export default function NewCasePage() {
  return (
    <div>
      <PageHeader title="Nuevo caso de estudio" />
      <Link href="/admin/cases" className="mb-6 inline-block text-sm text-slate-400 hover:text-white">← Volver</Link>
      <CaseForm />
    </div>
  );
}
