import type { Metadata } from "next";
import {
  Navbar,
  Hero,
  TrustBar,
  ServicesSection,
  PortfolioSection,
  CaseStudiesSection,
  IncludedSection,
  ProcessSection,
  PricingSection,
  TechSection,
  SupportSection,
  AboutSection,
  BudgetForm,
  StatusLookup,
  FAQSection,
  ContactSection,
  Footer,
  WhatsAppButton,
  FloatingOrbs,
} from "@/components/public";
import {
  getSiteSettings,
  getPublicProjects,
  getPublicCaseStudies,
  getPublicServices,
  getPublicPlans,
  getPublicFaqs,
} from "@/lib/db-helpers";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title =
    settings?.seoTitle ||
    "DESARROLLO WEB NEA | Webs y sistemas que trabajan por tu negocio";
  const description =
    settings?.seoDescription ||
    "Diseñamos y desarrollamos páginas web, catálogos digitales, sistemas de gestión y aplicaciones web para comercios, profesionales y empresas del NEA.";
  const keywords =
    settings?.seoKeywords ||
    "desarrollo web, NEA, Corrientes, páginas web, catálogo digital, sistema de gestión, panel admin, WhatsApp";

  return {
    title,
    description,
    keywords: keywords.split(",").map((k) => k.trim()),
    openGraph: {
      title,
      description,
      type: "website",
      locale: "es_AR",
      siteName: settings?.brandName || "DESARROLLO WEB NEA",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function HomePage() {
  const [settings, projects, cases, services, plans, faqs] =
    await Promise.all([
      getSiteSettings(),
      getPublicProjects(),
      getPublicCaseStudies(),
      getPublicServices(),
      getPublicPlans(),
      getPublicFaqs(),
    ]);

  return (
    <>
      <FloatingOrbs />
      <Navbar
        brandName={settings?.brandName ?? undefined}
        logo={settings?.logo}
        whatsapp={settings?.whatsapp}
        whatsappMessage={settings?.whatsappMessage}
      />
      <main>
        <Hero
          title={settings?.heroTitle}
          subtitle={settings?.heroSubtitle}
          slogan={settings?.slogan}
          projects={projects}
        />
        <TrustBar items={settings?.trustBarItems} />
        <ServicesSection services={services} />
        <PortfolioSection projects={projects} />
        <CaseStudiesSection cases={cases} />
        <IncludedSection features={settings?.includedFeatures} />
        <ProcessSection
          steps={settings?.processSteps}
          processText={settings?.processText}
        />
        <PricingSection
          plans={plans}
          pricingNote={settings?.pricingNote}
        />
        <TechSection
          techStack={settings?.techStack}
          techText={settings?.techText}
        />
        <SupportSection
          maintenancePlans={settings?.maintenancePlans}
          supportText={settings?.supportText}
          supportNote={settings?.supportNote}
        />
        <AboutSection
          aboutText={settings?.aboutText}
          location={settings?.location}
          brandName={settings?.brandName}
        />
        <section id="presupuesto" className="section-padding">
          <div className="section-container grid gap-12 lg:grid-cols-2">
            <BudgetForm services={services} whatsapp={settings?.whatsapp} />
            <StatusLookup />
          </div>
        </section>
        <FAQSection faqs={faqs} />
        <ContactSection
          email={settings?.email}
          whatsapp={settings?.whatsapp}
          location={settings?.location}
          instagram={settings?.instagram}
          linkedin={settings?.linkedin}
        />
      </main>
      <Footer
        brandName={settings?.brandName ?? undefined}
        footerText={settings?.footerText}
        email={settings?.email}
        whatsapp={settings?.whatsapp}
        location={settings?.location}
      />
      <WhatsAppButton
        phone={settings?.whatsapp}
        message={settings?.whatsappMessage ?? undefined}
        variant="floating"
      />
    </>
  );
}
