import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, handleApiError } from "@/lib/api-response";
import {
  pricingPlanSchema,
  parseBody,
  parseStringArray,
} from "@/lib/validations";

export async function GET() {
  try {
    await requireSession();
    const plans = await prisma.pricingPlan.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return jsonOk(plans);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSession();
    const raw = await request.json();
    const body = {
      ...raw,
      features: parseStringArray(raw?.features),
    };
    const data = parseBody(pricingPlanSchema, body);
    const plan = await prisma.pricingPlan.create({ data });
    return jsonOk(plan, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
