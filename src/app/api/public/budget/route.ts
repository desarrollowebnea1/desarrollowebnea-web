import { prisma } from "@/lib/prisma";
import { generateBudgetCode } from "@/lib/utils";
import { getSiteSettings } from "@/lib/db-helpers";
import {
  buildBudgetWhatsAppMessage,
  getWhatsAppLink,
} from "@/lib/whatsapp";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-response";
import { budgetRequestSchema, parseBody } from "@/lib/validations";
import { isPrismaUniqueError } from "@/lib/api-helpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = parseBody(budgetRequestSchema, body);

    let created = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      const code = generateBudgetCode();
      try {
        created = await prisma.budgetRequest.create({
          data: { ...data, code },
        });
        break;
      } catch (error) {
        if (!isPrismaUniqueError(error)) throw error;
      }
    }

    if (!created) {
      return jsonError(
        "No se pudo generar un código único. Intentá nuevamente en unos segundos.",
        500
      );
    }

    const settings = await getSiteSettings();
    const message = buildBudgetWhatsAppMessage({
      name: created.name,
      businessName: created.businessName,
      rubro: created.rubro,
      serviceNeeded: created.serviceNeeded,
      budgetApprox: created.budgetApprox,
      message: created.message,
      code: created.code,
    });
    const whatsappLink = getWhatsAppLink(message, settings?.whatsapp);

    return jsonOk(
      {
        code: created.code,
        whatsappLink,
        message: "Solicitud registrada correctamente",
      },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
