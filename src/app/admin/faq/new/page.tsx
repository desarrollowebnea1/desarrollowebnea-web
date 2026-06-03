"use client";

import { FaqForm } from "@/components/admin/FaqForm";
import { PageHeader } from "@/components/admin/PageHeader";
import Link from "next/link";

export default function NewFaqPage() {
  return (
    <div>
      <PageHeader title="Nueva FAQ" />
      <Link href="/admin/faq" className="mb-6 inline-block text-sm text-slate-400 hover:text-white">← Volver</Link>
      <FaqForm />
    </div>
  );
}
