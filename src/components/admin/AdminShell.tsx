"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

type AdminShellProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

export function AdminShell({ children, title, subtitle }: AdminShellProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const pageTitle =
    title ||
    pathname
      .split("/")
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase()) ||
    "Admin";

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100">
      <AdminSidebar
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {drawerOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-label="Cerrar menú"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader
          title={pageTitle}
          subtitle={subtitle}
          onMenuClick={() => setDrawerOpen(true)}
        />
        <main className={cn("flex-1 p-4 sm:p-6 lg:p-8")}>{children}</main>
      </div>
    </div>
  );
}
