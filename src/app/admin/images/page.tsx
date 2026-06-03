"use client";

import { AlertMessage } from "@/components/admin/AlertMessage";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { PageHeader } from "@/components/admin/PageHeader";
import { adminFetch } from "@/lib/admin-fetch";
import { formatDate } from "@/lib/utils";
import { Trash2, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type ImageAsset = {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  alt?: string | null;
  createdAt: string;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminImagesPage() {
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    void adminFetch<ImageAsset[]>("/api/admin/images").then((res) => {
      if (res.ok && res.data) setImages(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleUpload(file: File) {
    setError(null);
    setSuccess(null);
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const result = await adminFetch("/api/admin/images", {
      method: "POST",
      body: formData,
    });

    setUploading(false);
    if (!result.ok) {
      setError(result.error || "No se pudo subir la imagen");
      return;
    }
    setSuccess("Imagen subida correctamente");
    load();
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setDeleting(true);
    const result = await adminFetch(`/api/admin/images/${deleteId}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (!result.ok) {
      setError(result.error || "No se pudo eliminar");
      setDeleteId(null);
      return;
    }
    setSuccess("Imagen eliminada");
    setDeleteId(null);
    load();
  }

  return (
    <div>
      <PageHeader
        title="Imágenes"
        description="Biblioteca de medios (JPG, PNG, WEBP — máx. 5 MB)"
      />

      {success && (
        <AlertMessage type="success" message={success} onDismiss={() => setSuccess(null)} className="mb-4" />
      )}
      {error && (
        <AlertMessage type="error" message={error} onDismiss={() => setError(null)} className="mb-4" />
      )}

      <label className="mb-8 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleUpload(file);
            e.target.value = "";
          }}
        />
        {uploading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
        Subir imagen
      </label>

      {loading ? (
        <p className="text-slate-400">Cargando imágenes...</p>
      ) : images.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-700 p-12 text-center text-slate-500">
          No hay imágenes subidas
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900/50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt || img.filename}
                className="h-40 w-full object-cover"
              />
              <div className="space-y-2 p-3">
                <p className="truncate text-sm font-medium text-white">
                  {img.filename}
                </p>
                <p className="text-xs text-slate-500">
                  {formatBytes(img.size)} · {formatDate(img.createdAt)}
                </p>
                <input
                  type="text"
                  readOnly
                  value={img.url}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-400"
                  onFocus={(e) => e.target.select()}
                />
                <button
                  type="button"
                  onClick={() => setDeleteId(img.id)}
                  className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Eliminar imagen"
        message="¿Confirmás eliminar esta imagen? Esta acción no se puede deshacer."
        confirmLabel="Sí, eliminar"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
