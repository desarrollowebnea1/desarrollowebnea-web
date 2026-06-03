"use client";

import { AlertMessage } from "@/components/admin/AlertMessage";
import { FormField } from "@/components/admin/FormField";
import { LoadingButton } from "@/components/admin/LoadingButton";
import { APP_NAME } from "@/lib/constants";
import { adminFetch } from "@/lib/admin-fetch";
import { AlertTriangle, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await adminFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!result.ok) {
      setError(result.error || "No se pudo iniciar sesión");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 ring-1 ring-blue-500/40">
            <Shield className="h-7 w-7 text-sky-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">{APP_NAME}</h1>
          <p className="mt-2 text-sm text-slate-400">Panel de administración</p>
        </div>

        <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-2xl backdrop-blur">
          <div className="mb-6 flex gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <p>
              Por seguridad, cambiá la contraseña por defecto después del
              primer acceso desde la base de datos o el script de seed.
            </p>
          </div>

          {error && (
            <AlertMessage
              type="error"
              message={error}
              onDismiss={() => setError(null)}
              className="mb-4"
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ejemplo.com"
            />
            <FormField
              label="Contraseña"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoadingButton
              type="submit"
              loading={loading}
              className="w-full"
              variant="primary"
            >
              Iniciar sesión
            </LoadingButton>
          </form>
        </div>
      </div>
    </div>
  );
}
