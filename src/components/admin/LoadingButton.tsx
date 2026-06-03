"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "ghost";
};

export function LoadingButton({
  loading,
  children,
  disabled,
  className,
  variant = "primary",
  ...props
}: LoadingButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500 disabled:bg-blue-600/50",
    secondary:
      "border border-slate-600 bg-slate-800/80 text-slate-100 hover:bg-slate-700",
    danger:
      "border border-red-500/40 bg-red-500/10 text-red-200 hover:bg-red-500/20",
    ghost: "text-slate-300 hover:bg-slate-800 hover:text-white",
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
