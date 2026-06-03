"use client";

import { AlertMessage } from "@/components/admin/AlertMessage";
import { DataTable, DataTableColumn } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { SelectField } from "@/components/admin/SelectField";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { BUDGET_STATUS_LABELS } from "@/lib/constants";
import { adminFetch, ensureArray } from "@/lib/admin-fetch";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type BudgetRequest = {
  id: string;
  code: string;
  name: string;
  businessName: string;
  email: string;
  whatsapp: string;
  serviceNeeded?: string | null;
  status: string;
  createdAt: string;
};

type RequestsResponse = {
  items: BudgetRequest[];
  total: number;
  limit: number;
  offset: number;
};

function normalizeRequest(raw: Partial<BudgetRequest> & { id?: string }): BudgetRequest | null {
  if (!raw?.id) return null;
  return {
    id: raw.id,
    code: raw.code || "Sin código",
    name: raw.name || "Sin nombre",
    businessName: raw.businessName || "Sin negocio",
    email: raw.email || "",
    whatsapp: raw.whatsapp || "",
    serviceNeeded: raw.serviceNeeded || "No especificado",
    status: raw.status || "NUEVA",
    createdAt: raw.createdAt || new Date().toISOString(),
  };
}

const statusOptions = [
  { value: "", label: "Todos los estados" },
  ...Object.entries(BUDGET_STATUS_LABELS).map(([value, label]) => ({
    value,
    label,
  })),
];

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<BudgetRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (search.trim()) params.set("q", search.trim());
      const qs = params.toString();

      const res = await adminFetch<RequestsResponse | BudgetRequest[]>(
        `/api/admin/requests${qs ? `?${qs}` : ""}`
      );

      if (!res.ok) {
        setRequests([]);
        setError(res.error || "No pudimos cargar las solicitudes.");
        return;
      }

      const rawItems = ensureArray<BudgetRequest>(res.data);
      const normalized = rawItems
        .map((item) => normalizeRequest(item))
        .filter((item): item is BudgetRequest => item !== null);

      setRequests(normalized);

      if (process.env.NODE_ENV === "development" && res.data && !Array.isArray(res.data)) {
        console.info(
          "[AdminRequests] API devolvió objeto paginado; items extraídos:",
          normalized.length
        );
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("[AdminRequests] Error al cargar:", err);
      }
      setRequests([]);
      setError("No pudimos cargar las solicitudes.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    void load();
  }, [load]);

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
    { key: "business", header: "Negocio", render: (row) => row.businessName },
    {
      key: "service",
      header: "Servicio",
      render: (row) => row.serviceNeeded || "No especificado",
    },
    {
      key: "status",
      header: "Estado",
      render: (row) => (
        <StatusBadge variant="budget" value={row.status || "NUEVA"} />
      ),
    },
    {
      key: "date",
      header: "Fecha",
      render: (row) => (
        <span className="text-slate-500">{formatDate(row.createdAt)}</span>
      ),
    },
  ];

  const emptyMessage =
    statusFilter || search.trim()
      ? "No hay solicitudes con esos filtros"
      : "Todavía no hay solicitudes de presupuesto.";

  return (
    <div>
      <PageHeader
        title="Solicitudes de presupuesto"
        description="Consultas recibidas desde el formulario público"
      />

      {error && (
        <div className="mb-6">
          <AlertMessage type="error" message={error} onDismiss={() => setError(null)} />
        </div>
      )}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SelectField
          label="Filtrar por estado"
          name="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={statusOptions}
        />
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-slate-200">
            Buscar
          </label>
          <div className="flex gap-2">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Código, nombre, email..."
              className="flex-1 rounded-lg border border-slate-600/80 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <button
              type="button"
              onClick={() => void load()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={requests}
        keyExtractor={(r) => r.id}
        loading={loading}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}
