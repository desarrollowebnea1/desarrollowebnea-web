"use client";

import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { LoadingButton } from "@/components/admin/LoadingButton";
import { adminFetch } from "@/lib/admin-fetch";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteResourceButtonProps = {
  apiUrl: string;
  resourceName: string;
  redirectTo: string;
  onSuccess?: () => void;
};

export function DeleteResourceButton({
  apiUrl,
  resourceName,
  redirectTo,
  onSuccess,
}: DeleteResourceButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);
    const result = await adminFetch(apiUrl, { method: "DELETE" });
    setLoading(false);

    if (!result.ok) {
      setError(result.error || "No se pudo desactivar");
      return;
    }

    setOpen(false);
    onSuccess?.();
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <>
      <LoadingButton variant="danger" onClick={() => setOpen(true)}>
        <Trash2 className="h-4 w-4" />
        Desactivar
      </LoadingButton>

      <ConfirmDialog
        open={open}
        title={`Desactivar ${resourceName}`}
        message={`¿Confirmás desactivar este ${resourceName}? Dejará de mostrarse en el sitio público. Podés reactivarlo editando el registro.`}
        confirmLabel="Sí, desactivar"
        loading={loading}
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
      />

      {error && (
        <p className="mt-2 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
