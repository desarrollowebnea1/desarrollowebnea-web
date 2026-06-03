"use client";

import { cn } from "@/lib/utils";

type FloatingOrbsProps = {
  className?: string;
  variant?: "hero" | "section";
};

export function FloatingOrbs({ className, variant = "section" }: FloatingOrbsProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden
    >
      <div
        className={cn(
          "absolute rounded-full blur-3xl animate-pulse-soft",
          variant === "hero"
            ? "-left-20 top-10 h-72 w-72 bg-electric/20"
            : "-left-16 top-1/4 h-48 w-48 bg-electric/15"
        )}
        style={{ transform: "translateZ(-40px)" }}
      />
      <div
        className={cn(
          "absolute rounded-full blur-3xl animate-float",
          variant === "hero"
            ? "right-0 top-1/3 h-96 w-96 bg-violet-accent/15"
            : "right-0 top-1/2 h-56 w-56 bg-violet-accent/10"
        )}
      />
      <div
        className={cn(
          "absolute rounded-full blur-3xl animate-float-delayed",
          variant === "hero"
            ? "bottom-0 left-1/3 h-64 w-64 bg-sky/15"
            : "bottom-1/4 left-1/2 h-40 w-40 bg-sky/10"
        )}
      />
    </div>
  );
}
