import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-response";
import { serviceSchema, parseBody } from "@/lib/validations";

type RouteContext = { params: { id: string } };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const service = await prisma.service.findUnique({
      where: { id: params.id },
    });
    if (!service) {
      return jsonError("Servicio no encontrado", 404);
    }
    return jsonOk(service);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const body = await request.json();
    const data = parseBody(serviceSchema, body);
    const service = await prisma.service.update({
      where: { id: params.id },
      data,
    });
    return jsonOk(service);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const service = await prisma.service.update({
      where: { id: params.id },
      data: { active: false },
    });
    return jsonOk({ message: "Servicio desactivado", service });
  } catch (error) {
    return handleApiError(error);
  }
}
