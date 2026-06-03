import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-response";
import { requestStatusSchema, parseBody } from "@/lib/validations";

type RouteContext = { params: { id: string } };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const requestItem = await prisma.budgetRequest.findUnique({
      where: { id: params.id },
    });
    if (!requestItem) {
      return jsonError("Solicitud no encontrada", 404);
    }
    return jsonOk(requestItem);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const body = await request.json();
    const data = parseBody(requestStatusSchema, body);

    const requestItem = await prisma.budgetRequest.update({
      where: { id: params.id },
      data: {
        status: data.status,
        statusMessage: data.statusMessage ?? null,
      },
    });
    return jsonOk(requestItem);
  } catch (error) {
    return handleApiError(error);
  }
}
