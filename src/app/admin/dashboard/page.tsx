"use client";

import { DataTable, DataTableColumn } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin-fetch";
import { formatDate } from "@/lib/utils";
import {
  Briefcase,
  FolderKanban,
  Inbox,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type DashboardData = {
  requestsToday: number;
  pendingRequests: number;
  activeProjects: number;
  activeServices: number;
  recentRequests: Array<{
    id: string;
    code: string;
    name: string;
    businessName: string;
    status: string;
    createdAt: string;
  }>;
  dbOk: boolean;
  blobConfigured: boolean;
};

type BudgetRequest = DashboardData["recentRequests"][number];

const statCards = [
  {
    key: "requestsToday",
    label: "Solicitudes hoy",
    icon: Inbox,
    color: "text-sky-400 bg-sky-500/15 border-sky-500/25",
  },
  {
    key: "pendingRequests",
    label: "Pendientes",
    icon: TrendingUp,
    color: "text-amber-400 bg-amber-500/15 border-amber-500/25",
  },
  {
    key: "activeProjects",
    label: "Proyectos activos",
    icon: FolderKanban,
    color: "text-violet-400 bg-violet-500/15 border-violet-500/25",
  },
  {
    key: "activeServices",
    label: "Servicios activos",
    icon: Briefcase,
    color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/25",
  },
] as const;

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void adminFetch<DashboardData>("/api/admin/dashboard").then((res) => {
      if (res.ok && res.data) setData(res.data);
      setLoading(false);
    });
  }, []);

  const columns: DataTableColumn<BudgetRequest>[] = [
    {
      key: "code",
      header: "Código",
      render: (row) => (
        <Link
          href={`/admin/requests/${row.id}`}
          className="font-medium text-sky-400 hover:underline"
        >
          {row.code}
        </Link>
      ),
    },
    { key: "name", header: "Cliente", render: (row) => row.name },
    {
      key: "business",
      header: "Negocio",
      render: (row) => row.businessName,
    },
    {
      key: "status",
      header: "Estado",
      render: (row) => <StatusBadge variant="budget" value={row.status} />,
    },
    {
      key: "date",
      header: "Fecha",
      render: (row) => (
        <span className="text-slate-500">{formatDate(row.createdAt)}</span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white">Dashboard</h2>
        <p className="mt-1 text-sm text-slate-400">
          Resumen de actividad y solicitudes recientes
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon, color }) => (
          <div
            key={key}
            className="rounded-xl border border-slate-700/80 bg-slate-900/50 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {loading ? "—" : data?.[key] ?? 0}
                </p>
              </div>
              <div className={`rounded-lg border p-2.5 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <span
          className={`rounded-full border px-3 py-1 ${
            data?.dbOk
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          Base de datos: {loading ? "..." : data?.dbOk ? "Conectada" : "Error"}
        </span>
        <span
          className={`rounded-full border px-3 py-1 ${
            data?.blobConfigured
              ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
              : "border-amber-500/30 bg-amber-500/10 text-amber-300"
          }`}
        >
          Vercel Blob:{" "}
          {loading ? "..." : data?.blobConfigured ? "Configurado" : "No configurado"}
        </span>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">
            Solicitudes recientes
          </h3>
          <Link
            href="/admin/requests"
            className="text-sm text-sky-400 hover:underline"
          >
            Ver todas
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={data?.recentRequests ?? []}
          keyExtractor={(r) => r.id}
          loading={loading}
          emptyMessage="No hay solicitudes recientes"
        />
      </section>
    </div>
  );
}
