"use client";

import { PageHeader } from "@/components/admin/PageHeader";
import type { LucideIcon } from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";
import { APP_NAME } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import {
  Activity,
  CheckCircle2,
  Cloud,
  Database,
  Server,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

type HealthData = {
  status: string;
  app: string;
  timestamp: string;
  environment: string;
  database: boolean;
  blobConfigured: boolean;
};

function StatusRow({
  label,
  ok,
  detail,
  icon: Icon,
}: {
  label: string;
  ok: boolean;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-700/80 bg-slate-900/50 px-4 py-4">
      <div
        className={`rounded-lg p-2.5 ${
          ok ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-white">{label}</p>
        <p className="text-sm text-slate-500">{detail}</p>
      </div>
      {ok ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
      ) : (
        <XCircle className="h-5 w-5 text-red-400" />
      )}
    </div>
  );
}

export default function AdminHealthPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void adminFetch<HealthData>("/api/health").then((res) => {
      if (res.ok && res.data) setHealth(res.data);
      setLoading(false);
    });
  }, []);

  const systemOk = health?.status === "ok";

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Estado del sistema"
        description="Monitoreo de servicios y conexiones"
      />

      <div
        className={`mb-8 flex items-center gap-4 rounded-xl border p-6 ${
          systemOk
            ? "border-emerald-500/30 bg-emerald-500/10"
            : "border-amber-500/30 bg-amber-500/10"
        }`}
      >
        <Activity
          className={`h-8 w-8 ${systemOk ? "text-emerald-400" : "text-amber-400"}`}
        />
        <div>
          <p className="text-lg font-semibold text-white">
            {loading
              ? "Verificando..."
              : systemOk
                ? "Sistema operativo"
                : "Sistema degradado"}
          </p>
          <p className="text-sm text-slate-400">
            {health?.app || APP_NAME}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <StatusRow
          label="Base de datos"
          ok={Boolean(health?.database)}
          detail={
            health?.database
              ? "PostgreSQL conectado correctamente"
              : "Sin conexión a la base de datos"
          }
          icon={Database}
        />
        <StatusRow
          label="Almacenamiento (Vercel Blob)"
          ok={Boolean(health?.blobConfigured)}
          detail={
            health?.blobConfigured
              ? "Token configurado — subida de imágenes habilitada"
              : "BLOB_READ_WRITE_TOKEN no configurado"
          }
          icon={Cloud}
        />
        <StatusRow
          label="Entorno"
          ok={true}
          detail={health?.environment || "—"}
          icon={Server}
        />
      </div>

      {health?.timestamp && (
        <p className="mt-6 text-xs text-slate-500">
          Última verificación: {formatDate(health.timestamp)}
        </p>
      )}
    </div>
  );
}
