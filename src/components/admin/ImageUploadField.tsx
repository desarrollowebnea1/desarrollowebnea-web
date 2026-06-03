"use client";

import { adminFetch } from "@/lib/admin-fetch";
import { cn } from "@/lib/utils";
import { ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import { AlertMessage } from "./AlertMessage";
import { FormField } from "./FormField";

type ImageUploadFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
};

export function ImageUploadField({
  label,
  value,
  onChange,
  hint,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const result = await adminFetch<{ url: string }>("/api/admin/images", {
      method: "POST",
      body: formData,
    });

    setUploading(false);
    if (!result.ok) {
      setError(result.error || "No se pudo subir la imagen");
      return;
    }
    if (result.data?.url) {
      onChange(result.data.url);
    }
  }

  return (
    <div className="space-y-3">
      <FormField
        label={label}
        name="imageUrl"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        hint={hint || "URL de imagen o subí un archivo"}
      />

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-block cursor-pointer">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
              e.target.value = "";
            }}
          />
          <span className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700">
            {uploading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Subir imagen
          </span>
        </label>
      </div>

      {error && <AlertMessage type="error" message={error} onDismiss={() => setError(null)} />}

      {value ? (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border border-slate-700 bg-slate-900"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Vista previa"
            className="h-40 w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/50 text-slate-500">
          <ImageIcon className="mr-2 h-5 w-5" />
          Sin imagen
        </div>
      )}
    </div>
  );
}
