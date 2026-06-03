import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const budgetRequestSchema = z.object({
  name: z.string().min(2, "Ingresá tu nombre"),
  whatsapp: z.string().min(8, "Ingresá un WhatsApp válido"),
  email: z.string().email("Email inválido"),
  businessName: z.string().min(2, "Ingresá el nombre del negocio"),
  rubro: z.string().min(2, "Ingresá el rubro"),
  serviceNeeded: z.string().min(2, "Seleccioná qué necesitás"),
  hasLogo: z.string().optional(),
  hasContent: z.string().optional(),
  needsAdmin: z.string().optional(),
  needsWhatsapp: z.string().optional(),
  budgetApprox: z.string().optional(),
  message: z.string().optional(),
});

export const budgetStatusSchema = z.object({
  code: z.string().min(8, "Ingresá un código DWN válido"),
});

export const projectSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  slug: z.string().min(2, "El slug es obligatorio"),
  rubro: z.string().min(2, "El rubro es obligatorio"),
  shortDesc: z.string().min(10, "La descripción corta es obligatoria"),
  longDesc: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  result: z.string().optional(),
  webUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  imageUrl: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const caseStudySchema = z.object({
  projectId: z.string().optional().nullable(),
  title: z.string().min(2, "El título es obligatorio"),
  slug: z.string().min(2, "El slug es obligatorio"),
  problem: z.string().min(10, "Describí el problema"),
  solution: z.string().min(10, "Describí la solución"),
  features: z.array(z.string()).default([]),
  result: z.string().min(10, "Describí el resultado"),
  technologies: z.array(z.string()).default([]),
  systemType: z.string().optional(),
  learnings: z.string().optional(),
  imageUrl: z.string().optional(),
  webUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  active: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const serviceSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  description: z.string().min(10, "La descripción es obligatoria"),
  icon: z.string().optional(),
  idealFor: z.string().optional(),
  priceFrom: z.string().optional(),
  active: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const pricingPlanSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  priceFrom: z.string().min(1, "El precio es obligatorio"),
  description: z.string().min(10, "La descripción es obligatoria"),
  features: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const testimonialSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  business: z.string().min(2, "El negocio es obligatorio"),
  text: z.string().min(10, "El testimonio es obligatorio"),
  imageUrl: z.string().optional(),
  active: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const faqSchema = z.object({
  question: z.string().min(5, "La pregunta es obligatoria"),
  answer: z.string().min(10, "La respuesta es obligatoria"),
  active: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const settingsSchema = z.object({
  brandName: z.string().min(2),
  slogan: z.string().optional(),
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  heroImage: z.string().optional(),
  logo: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  location: z.string().optional(),
  footerText: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  whatsappMessage: z.string().optional(),
  aboutText: z.string().optional(),
  processText: z.string().optional(),
  techText: z.string().optional(),
  supportText: z.string().optional(),
  pricingNote: z.string().optional(),
  supportNote: z.string().optional(),
  trustBarItems: z.any().optional(),
  processSteps: z.any().optional(),
  includedFeatures: z.any().optional(),
  techStack: z.any().optional(),
  maintenancePlans: z.any().optional(),
});

export const requestStatusSchema = z.object({
  status: z.enum([
    "NUEVA",
    "CONTACTADA",
    "EN_ANALISIS",
    "PRESUPUESTADA",
    "CERRADA",
    "CANCELADA",
  ]),
  statusMessage: z.string().optional(),
});

export function parseBody<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const first = result.error.issues[0];
    throw new Error(first?.message || "Datos inválidos");
  }
  return result.data;
}

export function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}
