"use client";

import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes } from "react";

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export function TextAreaField({
  label,
  hint,
  error,
  className,
  id,
  rows = 4,
  ...props
}: TextAreaFieldProps) {
  const fieldId = id || props.name;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-slate-200"
      >
        {label}
      </label>
      <textarea
        id={fieldId}
        rows={rows}
        className={cn(
          "w-full resize-y rounded-lg border border-slate-600/80 bg-slate-900/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500",
          error && "border-red-500/60 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-slate-500">{hint}</p>
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
