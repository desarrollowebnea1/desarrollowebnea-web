"use client";

import { adminFetch } from "@/lib/admin-fetch";
import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingButton } from "./LoadingButton";

type AdminHeaderProps = {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
};

type SessionUser = {
  id: string;
  email: string;
  name: string | null;
};

export function AdminHeader({ title, subtitle, onMenuClick }: AdminHeaderProps) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    void adminFetch<{ user: SessionUser }>("/api/auth/me").then((res) => {
      if (res.ok && res.data?.user) setUser(res.data.user);
    });
  }, []);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/90 px-4 py-4 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-white sm:text-xl">
            {title}
          </h1>
          {subtitle && (
            <p className="truncate text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {user && (
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-200">
              {user.name || "Administrador"}
            </p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
        )}
        <LoadingButton
          variant="ghost"
          loading={loggingOut}
          onClick={handleLogout}
          className="!px-2"
          title="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Salir</span>
        </LoadingButton>
      </div>
    </header>
  );
}
