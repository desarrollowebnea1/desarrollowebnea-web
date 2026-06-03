import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-response";
import {
  pricingPlanSchema,
  parseBody,
  parseStringArray,
} from "@/lib/validations";

type RouteContext = { params: { id: string } };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const plan = await prisma.pricingPlan.findUnique({
      where: { id: params.id },
    });
    if (!plan) {
      return jsonError("Plan no encontrado", 404);
    }
    return jsonOk(plan);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const raw = await request.json();
    const body = {
      ...raw,
      features: parseStringArray(raw?.features),
    };
    const data = parseBody(pricingPlanSchema, body);
    const plan = await prisma.pricingPlan.update({
      where: { id: params.id },
      data,
    });
    return jsonOk(plan);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const plan = await prisma.pricingPlan.update({
      where: { id: params.id },
      data: { active: false },
    });
    return jsonOk({ message: "Plan desactivado", plan });
  } catch (error) {
    return handleApiError(error);
  }
}
