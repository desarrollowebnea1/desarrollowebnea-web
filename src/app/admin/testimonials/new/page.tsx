"use client";

import { PageHeader } from "@/components/admin/PageHeader";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import Link from "next/link";

export default function NewTestimonialPage() {
  return (
    <div>
      <PageHeader title="Nuevo testimonio" />
      <Link href="/admin/testimonials" className="mb-6 inline-block text-sm text-slate-400 hover:text-white">← Volver</Link>
      <TestimonialForm />
    </div>
  );
}
