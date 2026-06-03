"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { Plus } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  children?: ReactNode;
};

export function PageHeader({
  title,
  description,
  actionHref,
  actionLabel,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {children}
        {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            <Plus className="h-4 w-4" />
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
