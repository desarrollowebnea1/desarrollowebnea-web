import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-response";
import { faqSchema, parseBody } from "@/lib/validations";

type RouteContext = { params: { id: string } };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const item = await prisma.faq.findUnique({
      where: { id: params.id },
    });
    if (!item) {
      return jsonError("Pregunta no encontrada", 404);
    }
    return jsonOk(item);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const body = await request.json();
    const data = parseBody(faqSchema, body);
    const item = await prisma.faq.update({
      where: { id: params.id },
      data,
    });
    return jsonOk(item);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await requireSession();
    const item = await prisma.faq.update({
      where: { id: params.id },
      data: { active: false },
    });
    return jsonOk({ message: "Pregunta desactivada", faq: item });
  } catch (error) {
    return handleApiError(error);
  }
}
