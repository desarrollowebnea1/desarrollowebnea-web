"use client";

import { ADMIN_NAV, APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Activity,
  BookOpen,
  Briefcase,
  CreditCard,
  FolderKanban,
  HelpCircle,
  Image,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Settings,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  FolderKanban,
  BookOpen,
  Briefcase,
  CreditCard,
  Inbox,
  MessageSquare,
  HelpCircle,
  Image,
  Settings,
  Activity,
};

type AdminSidebarProps = {
  open?: boolean;
  onClose?: () => void;
  className?: string;
};

export function AdminSidebar({ open, onClose, className }: AdminSidebarProps) {
  const pathname = usePathname();

  const content = (
    <>
      <div className="flex items-center justify-between border-b border-slate-700/80 px-4 py-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-sky-400">
            Panel admin
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{APP_NAME}</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {ADMIN_NAV.map((item) => {
          const Icon = ICONS[item.icon] || LayoutDashboard;
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-blue-600/20 text-sky-300 ring-1 ring-blue-500/30"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      <aside
        className={cn(
          "hidden w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 lg:flex",
          className
        )}
      >
        {content}
      </aside>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-slate-950 shadow-2xl transition-transform duration-200 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {content}
      </aside>
    </>
  );
}
