import {
  Globe,
  ShoppingCart,
  Layout,
  Smartphone,
  Settings,
  Palette,
  Code,
  Megaphone,
  Database,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  ShoppingCart,
  Layout,
  Smartphone,
  Settings,
  Palette,
  Code,
  Megaphone,
  Database,
};

export function getServiceIcon(name?: string | null): LucideIcon {
  if (!name) return Globe;
  return ICON_MAP[name] ?? Globe;
}
