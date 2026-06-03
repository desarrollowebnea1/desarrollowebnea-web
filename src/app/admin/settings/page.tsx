"use client";

import { AlertMessage } from "@/components/admin/AlertMessage";
import { FormField } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LoadingButton } from "@/components/admin/LoadingButton";
import { PageHeader } from "@/components/admin/PageHeader";
import { TextAreaField } from "@/components/admin/TextAreaField";
import { adminFetch } from "@/lib/admin-fetch";
import { FormEvent, useEffect, useState } from "react";

type SettingsForm = {
  brandName: string;
  slogan: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  logo: string;
  whatsapp: string;
  email: string;
  instagram: string;
  linkedin: string;
  location: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  whatsappMessage: string;
  aboutText: string;
  processText: string;
  techText: string;
  supportText: string;
  pricingNote: string;
  supportNote: string;
};

const emptySettings: SettingsForm = {
  brandName: "",
  slogan: "",
  heroTitle: "",
  heroSubtitle: "",
  heroImage: "",
  logo: "",
  whatsapp: "",
  email: "",
  instagram: "",
  linkedin: "",
  location: "",
  footerText: "",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  whatsappMessage: "",
  aboutText: "",
  processText: "",
  techText: "",
  supportText: "",
  pricingNote: "",
  supportNote: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsForm>(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void adminFetch<SettingsForm>("/api/admin/settings").then((res) => {
      if (res.ok && res.data) {
        setForm({
          ...emptySettings,
          ...Object.fromEntries(
            Object.entries(res.data).map(([k, v]) => [k, v ?? ""])
          ),
        } as SettingsForm);
      }
      setLoading(false);
    });
  }, []);

  function update<K extends keyof SettingsForm>(key: K, value: SettingsForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const result = await adminFetch("/api/admin/settings", {
      method: "PUT",
      body: JSON.stringify(form),
    });

    setSaving(false);
    if (!result.ok) {
      setError(result.error || "No se pudo guardar la configuración");
      return;
    }
    setSuccess("Configuración guardada correctamente");
  }

  if (loading) {
    return <p className="text-slate-400">Cargando configuración...</p>;
  }

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Configuración del sitio"
        description="Textos, contacto, SEO y branding"
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        {success && <AlertMessage type="success" message={success} onDismiss={() => setSuccess(null)} />}
        {error && <AlertMessage type="error" message={error} onDismiss={() => setError(null)} />}

        <section className="space-y-4 rounded-xl border border-slate-700/80 bg-slate-900/50 p-6">
          <h3 className="font-medium text-white">Marca</h3>
          <FormField label="Nombre de marca" name="brandName" required value={form.brandName} onChange={(e) => update("brandName", e.target.value)} />
          <FormField label="Slogan" name="slogan" value={form.slogan} onChange={(e) => update("slogan", e.target.value)} />
          <ImageUploadField label="Logo" value={form.logo} onChange={(v) => update("logo", v)} />
        </section>

        <section className="space-y-4 rounded-xl border border-slate-700/80 bg-slate-900/50 p-6">
          <h3 className="font-medium text-white">Hero</h3>
          <FormField label="Título" name="heroTitle" value={form.heroTitle} onChange={(e) => update("heroTitle", e.target.value)} />
          <FormField label="Subtítulo" name="heroSubtitle" value={form.heroSubtitle} onChange={(e) => update("heroSubtitle", e.target.value)} />
          <ImageUploadField label="Imagen hero" value={form.heroImage} onChange={(v) => update("heroImage", v)} />
        </section>

        <section className="space-y-4 rounded-xl border border-slate-700/80 bg-slate-900/50 p-6">
          <h3 className="font-medium text-white">Contacto</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
            <FormField label="Email" name="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            <FormField label="Instagram" name="instagram" value={form.instagram} onChange={(e) => update("instagram", e.target.value)} />
            <FormField label="LinkedIn" name="linkedin" value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} />
            <FormField label="Ubicación" name="location" value={form.location} onChange={(e) => update("location", e.target.value)} />
          </div>
          <FormField label="Mensaje WhatsApp predeterminado" name="whatsappMessage" value={form.whatsappMessage} onChange={(e) => update("whatsappMessage", e.target.value)} />
        </section>

        <section className="space-y-4 rounded-xl border border-slate-700/80 bg-slate-900/50 p-6">
          <h3 className="font-medium text-white">Contenido</h3>
          <TextAreaField label="Sobre nosotros" name="aboutText" rows={4} value={form.aboutText} onChange={(e) => update("aboutText", e.target.value)} />
          <TextAreaField label="Proceso" name="processText" rows={4} value={form.processText} onChange={(e) => update("processText", e.target.value)} />
          <TextAreaField label="Tecnología" name="techText" rows={3} value={form.techText} onChange={(e) => update("techText", e.target.value)} />
          <TextAreaField label="Soporte" name="supportText" rows={3} value={form.supportText} onChange={(e) => update("supportText", e.target.value)} />
          <TextAreaField label="Nota de precios" name="pricingNote" rows={2} value={form.pricingNote} onChange={(e) => update("pricingNote", e.target.value)} />
          <TextAreaField label="Nota de soporte" name="supportNote" rows={2} value={form.supportNote} onChange={(e) => update("supportNote", e.target.value)} />
          <FormField label="Texto del footer" name="footerText" value={form.footerText} onChange={(e) => update("footerText", e.target.value)} />
        </section>

        <section className="space-y-4 rounded-xl border border-slate-700/80 bg-slate-900/50 p-6">
          <h3 className="font-medium text-white">SEO</h3>
          <FormField label="Título SEO" name="seoTitle" value={form.seoTitle} onChange={(e) => update("seoTitle", e.target.value)} />
          <TextAreaField label="Descripción SEO" name="seoDescription" rows={2} value={form.seoDescription} onChange={(e) => update("seoDescription", e.target.value)} />
          <FormField label="Palabras clave" name="seoKeywords" value={form.seoKeywords} onChange={(e) => update("seoKeywords", e.target.value)} />
        </section>

        <LoadingButton type="submit" loading={saving}>
          Guardar configuración
        </LoadingButton>
      </form>
    </div>
  );
}
