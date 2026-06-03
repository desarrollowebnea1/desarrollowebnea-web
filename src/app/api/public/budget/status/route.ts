import { prisma } from "@/lib/prisma";
import { BUDGET_STATUS_LABELS } from "@/lib/constants";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-response";
import { budgetStatusSchema, parseBody } from "@/lib/validations";
import {
  buildConsultWhatsAppMessage,
  getWhatsAppLink,
} from "@/lib/whatsapp";
import { getSiteSettings } from "@/lib/db-helpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = parseBody(budgetStatusSchema, body);

    const budget = await prisma.budgetRequest.findUnique({
      where: { code: code.trim().toUpperCase() },
    });

    if (!budget) {
      return jsonError("No encontramos una solicitud con ese código", 404);
    }

    const settings = await getSiteSettings();
    const consultMessage = buildConsultWhatsAppMessage(budget.code);
    const whatsappLink = getWhatsAppLink(consultMessage, settings?.whatsapp);

    return jsonOk({
      code: budget.code,
      status: budget.status,
      statusLabel: BUDGET_STATUS_LABELS[budget.status] ?? budget.status,
      statusMessage: budget.statusMessage,
      createdAt: budget.createdAt,
      updatedAt: budget.updatedAt,
      whatsappLink,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
