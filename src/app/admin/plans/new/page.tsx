"use client";

import { PageHeader } from "@/components/admin/PageHeader";
import { PlanForm } from "@/components/admin/PlanForm";
import Link from "next/link";

export default function NewPlanPage() {
  return (
    <div>
      <PageHeader title="Nuevo plan" />
      <Link href="/admin/plans" className="mb-6 inline-block text-sm text-slate-400 hover:text-white">← Volver</Link>
      <PlanForm />
    </div>
  );
}
