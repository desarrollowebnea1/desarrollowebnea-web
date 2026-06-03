"use client";

import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";
import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
};

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-16 text-center",
        className
      )}
    >
      <Inbox className="mb-4 h-10 w-10 text-slate-600" />
      <h3 className="text-base font-medium text-slate-200">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
      )}
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
