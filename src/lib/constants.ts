export const APP_NAME = "DESARROLLO WEB NEA";

export const COLORS = {
  techBlack: "#020617",
  deepBlue: "#0F172A",
  electricBlue: "#2563EB",
  premiumSky: "#38BDF8",
  whatsappGreen: "#22C55E",
  white: "#F8FAFC",
  grayText: "#94A3B8",
  violetAccent: "#7C3AED",
} as const;

export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#casos", label: "Casos" },
  { href: "#precios", label: "Precios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
] as const;

export const BUDGET_STATUS_LABELS: Record<string, string> = {
  NUEVA: "Nueva solicitud recibida",
  CONTACTADA: "Fuiste contactado por nuestro equipo",
  EN_ANALISIS: "Tu solicitud está en análisis",
  PRESUPUESTADA: "Presupuesto enviado",
  CERRADA: "Solicitud cerrada",
  CANCELADA: "Solicitud cancelada",
};

export const ADMIN_NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/projects", label: "Proyectos", icon: "FolderKanban" },
  { href: "/admin/cases", label: "Casos de estudio", icon: "BookOpen" },
  { href: "/admin/services", label: "Servicios", icon: "Briefcase" },
  { href: "/admin/plans", label: "Planes y precios", icon: "CreditCard" },
  { href: "/admin/requests", label: "Solicitudes", icon: "Inbox" },
  { href: "/admin/testimonials", label: "Testimonios", icon: "MessageSquare" },
  { href: "/admin/faq", label: "FAQ", icon: "HelpCircle" },
  { href: "/admin/images", label: "Imágenes", icon: "Image" },
  { href: "/admin/settings", label: "Configuración", icon: "Settings" },
  { href: "/admin/health", label: "Estado del sistema", icon: "Activity" },
] as const;
