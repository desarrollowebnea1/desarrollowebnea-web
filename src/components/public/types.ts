export type PublicSettings = {
  brandName?: string | null;
  slogan?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroImage?: string | null;
  logo?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  location?: string | null;
  footerText?: string | null;
  whatsappMessage?: string | null;
  aboutText?: string | null;
  processText?: string | null;
  techText?: string | null;
  supportText?: string | null;
  pricingNote?: string | null;
  supportNote?: string | null;
  trustBarItems?: unknown;
  processSteps?: unknown;
  includedFeatures?: unknown;
  techStack?: unknown;
  maintenancePlans?: unknown;
};

export type PublicProject = {
  id: string;
  name: string;
  slug: string;
  rubro: string;
  shortDesc: string;
  longDesc?: string | null;
  imageUrl?: string | null;
  webUrl?: string | null;
  technologies: string[];
  features: string[];
  featured?: boolean;
};

export type PublicCaseStudy = {
  id: string;
  title: string;
  slug: string;
  problem: string;
  solution: string;
  result: string;
  features: string[];
  technologies: string[];
  systemType?: string | null;
  imageUrl?: string | null;
  webUrl?: string | null;
  project?: { name: string; rubro: string } | null;
};

export type PublicService = {
  id: string;
  name: string;
  description: string;
  icon?: string | null;
  idealFor?: string | null;
  priceFrom?: string | null;
};

export type PublicPlan = {
  id: string;
  name: string;
  priceFrom: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export type PublicFaq = {
  id: string;
  question: string;
  answer: string;
};

export type PublicTestimonial = {
  id: string;
  name: string;
  business: string;
  text: string;
  imageUrl?: string | null;
};

export type TrustBarItem = { label: string; icon?: string };
export type ProcessStep = { title: string; description: string; icon?: string };
export type MaintenancePlan = {
  name: string;
  price?: string;
  description?: string;
  features?: string[];
};

export function parseJsonArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  return [];
}
