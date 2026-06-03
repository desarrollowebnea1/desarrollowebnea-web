import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, handleApiError } from "@/lib/api-response";

const VALID_STATUSES = [
  "NUEVA",
  "CONTACTADA",
  "EN_ANALISIS",
  "PRESUPUESTADA",
  "CERRADA",
  "CANCELADA",
] as const;

export async function GET(request: Request) {
  try {
    await requireSession();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const q = searchParams.get("q")?.trim();
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? "50", 10) || 50,
      200
    );
    const offset = parseInt(searchParams.get("offset") ?? "0", 10) || 0;

    const where: Prisma.BudgetRequestWhereInput = {};

    if (status && VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
      where.status = status as (typeof VALID_STATUSES)[number];
    }

    if (q) {
      where.OR = [
        { code: { contains: q, mode: "insensitive" } },
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { businessName: { contains: q, mode: "insensitive" } },
        { whatsapp: { contains: q, mode: "insensitive" } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.budgetRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.budgetRequest.count({ where }),
    ]);

    return jsonOk({ items, total, limit, offset });
  } catch (error) {
    return handleApiError(error);
  }
}
