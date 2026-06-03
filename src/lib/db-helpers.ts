import { prisma, checkDatabaseConnection } from "@/lib/prisma";

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    return settings;
  } catch {
    return null;
  }
}

export async function getPublicProjects() {
  try {
    return await prisma.project.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getPublicCaseStudies() {
  try {
    return await prisma.caseStudy.findMany({
      where: { active: true },
      include: { project: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getPublicServices() {
  try {
    return await prisma.service.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getPublicPlans() {
  try {
    return await prisma.pricingPlan.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getPublicTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getPublicFaqs() {
  try {
    return await prisma.faq.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getDashboardStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    requestsToday,
    pendingRequests,
    activeProjects,
    activeServices,
    recentRequests,
    dbOk,
  ] = await Promise.all([
    prisma.budgetRequest.count({ where: { createdAt: { gte: today } } }),
    prisma.budgetRequest.count({
      where: { status: { in: ["NUEVA", "CONTACTADA", "EN_ANALISIS"] } },
    }),
    prisma.project.count({ where: { active: true } }),
    prisma.service.count({ where: { active: true } }),
    prisma.budgetRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    checkDatabaseConnection(),
  ]);

  return {
    requestsToday,
    pendingRequests,
    activeProjects,
    activeServices,
    recentRequests,
    dbOk,
    blobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  };
}

export { checkDatabaseConnection };
