"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

type AlertMessageProps = {
  type: "success" | "error";
  message: string;
  onDismiss?: () => void;
  className?: string;
};

export function AlertMessage({
  type,
  message,
  onDismiss,
  className,
}: AlertMessageProps) {
  const isSuccess = type === "success";

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3 text-sm",
        isSuccess
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
          : "border-red-500/30 bg-red-500/10 text-red-200",
        className
      )}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
      )}
      <p className="flex-1">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded p-0.5 opacity-70 hover:opacity-100"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
